Player = function(Game, x, y,getSpell){

    this.getSpell = getSpell;

    this.spellTree = new SpellTree(Game,this.getSpell);
    var inputSequence = '';

    this.friendly = true;


    this.facing = 'left';
    var speed = 400;
    var jumpingHeight = - 300;
    

    var attacking = false;
    var jumping = false;
    var knockBackTimer = 0;
    var knockBackDirection = 'right';
    var knockBackYFlag = false;
    var opacityTimer = 5;
    
    this.immortalTimer = 0;
    this.immortal = false;

    //game status
    this.maxHealth = 100;
    this.health = 100;
    this.fire = 5;
    this.water = 5;
    this.metal = 5;
    this.wood = 5;
    this.earth = 5;

    var regenerateTimer = 90;
    //input state
    var qKeyPressed = false;
    var wKeyPressed = false;
    var eKeyPressed = false;
    var rKeyPressed = false;
    var tKeyPressed = false;
    var spacePressed = false;
    var kKeyPressed = false;
    var mKeyPressed = false;

    //cheat
    var iKeyPressed = false;
    var cheating = false;
    //player sprite
    this.player = Game.game.add.sprite(x, y, 'character');
    this.player.animations.add('standing_left', [24,25,26,27,28,29,30,31], 10, true);
    this.player.animations.add('standing_right', [33,34,35,36,37,38,39,40], 10, true);
    this.player.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 10, true);
    this.player.animations.add('right', [12,13,14,15,16,17,18,19,20,21], 10, true);
    var jumpingAnimation_left = this.player.animations.add('jumping_left', [42,43,44,45,46], 10, true);
    jumpingAnimation_left.loop = false;
    jumpingAnimation_left.onComplete.add(function(){jumping = true});
    this.player.animations.add('in_air_left', [47,48,49,50], 10, true);
    var jumpingAnimation_right = this.player.animations.add('jumping_right', [51,52,53,54,55], 10, true);
    jumpingAnimation_right.loop = false;
    jumpingAnimation_right.onComplete.add(function(){jumping = true});
    this.player.animations.add('in_air_right', [56,57,58,59], 10, true)

    var attackAnim_left = this.player.animations.add('attack_left', [42,43,44,45,46], 15, true);
    attackAnim_left.loop = false;
    attackAnim_left.onComplete.add(function(){attacking = false});
    var attackAnim_right = this.player.animations.add('attack_right', [51,52,53,54,55], 15,true);
    attackAnim_right.loop = false;
    attackAnim_right.onComplete.add(function(){attacking = false});
    //  We need to enable physics on the player
    Game.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 500;
    this.player.body.collideWorldBounds = true;

    Game.game.camera.follow(this.player);

    
    var sequenceImage = new Array();
    for(var i = 0; i<5; i++){
        sequenceImage[i] = Game.game.add.sprite(this.player.body.x+16, this.player.body.y - 20, 'orbs');
    }
    Game.game.physics.enable(sequenceImage, Phaser.Physics.ARCADE);
    


    this.update = function(){
        Game.game.physics.arcade.collide(Game.platforms, this.player);
        //picking up spell book
        
        this.input();
        this.playAnimation();
        this.sequenceImageUpdate();
        this.spellTree.update();
        //knock back
        if(knockBackTimer > 0){
            this.knockBack();    
        }
        else{
            knockBackYFlag = false;
        }
        //immortal
        if(this.immortalTimer > 0){
            this.immortal = true;
            this.immortalTimer --;

            if(opacityTimer>0){
            opacityTimer--;
            }
            if(opacityTimer<=0){
                if(this.player.alpha == 1){
                    this.player.alpha = 0.5;
                }
                else{
                    this.player.alpha = 1;
                }
                opacityTimer = 10;
            }
        }
        else{
            this.immortal = false;
            this.player.alpha = 1;
        }
        //regen
        if(regenerateTimer > 0){
            regenerateTimer --;
        }
        if(regenerateTimer <= 0){
            if(this.fire < 5){
                this.fire++;
            }
            if(this.water < 5){
                this.water++;
            }
            if(this.metal < 5){
                this.metal++;
            }
            if(this.earth < 5){
                this.earth ++;
            }
            if(this.wood < 5){
                this.wood++;
            }
            regenerateTimer = 60;
        }

        if(cheating){
            this.immortalTimer = 10;
            this.wood = 5;
            this.fire = 5;
            this.water = 5;
            this.metal = 5;
            this.earth = 5;
        }
    }

    this.sequenceImageUpdate = function(){
        for(var i = 0; i<5; i++){
            if(i < inputSequence.length){
                
                sequenceImage[i].body.x = this.player.body.x + 32 -16 * (inputSequence.length/2-i);
                sequenceImage[i].body.y = this.player.body.y - 20;

                switch(inputSequence.charAt(i)){
                    case'q': sequenceImage[i].frame = 3; break;
                    case'w': sequenceImage[i].frame = 2; break;
                    case'e': sequenceImage[i].frame = 4; break;
                    case'r': sequenceImage[i].frame = 1; break;
                    case't': sequenceImage[i].frame = 0; break;
                }

            }
            else{
                sequenceImage[i].frame = 5;
            }
        }
    }

    this.cast = function(){
        var attribute = this.spellTree.cast(inputSequence)
        if(attribute != null){
            attacking = true;
            Game.itemManager.add(new AttackEffect(Game, this.player.body.x + 32 - 128, this.player.body.y + 96 - 256, attribute));
        }
        inputSequence = '';
    }

    this.learn = function(spell){
                        var music3 = Game.add.audio('pickup');
                music3.play();
        this.spellTree.add(spell);
    }


    this.input = function(){
        this.getQWERTSpace();
        this.getArrowsInput();
        
    }

    this.getQWERTSpace = function(){
        //q key
        if(inputSequence.length <5){
            if(Game.qKey.isDown){
                qKeyPressed = true;
            }
            else if(qKeyPressed){
                qKeyPressed = false;
                if(this.metal>0){
                    inputSequence += 'q';
                    this.metal --;
                }
            }
            //w key
            if(Game.wKey.isDown){
                wKeyPressed = true;
            }
            else if(wKeyPressed){
                wKeyPressed = false;
                if(this.wood>0){
                    inputSequence += 'w';
                    this.wood --;
                }
            }
            //e key
            if(Game.eKey.isDown){
                eKeyPressed = true;
            }
            else if(eKeyPressed){
                eKeyPressed = false;
                if(this.water>0){
                    inputSequence += 'e';
                    this.water --;
                }
            }
            //r key
            if(Game.rKey.isDown){
                rKeyPressed = true;
            }
            else if(rKeyPressed){
                rKeyPressed = false;
                if(this.fire>0){
                    inputSequence += 'r';
                    this.fire --;
                }
            }

            // make new
             if(Game.makenew.isDown){
                 Game.state.start('Game', true, false, 'wood',this.spellTree.getTree());
                 music1.stop();
             }
            //t key
            if(Game.tKey.isDown){
                tKeyPressed = true;
            }
            else if(tKeyPressed){
                tKeyPressed = false;
                if(this.earth>0){
                    inputSequence += 't';
                    this.earth --;
                }
            }
        }
        //space
        if(Game.spaceKey.isDown){
            spacePressed = true;
        }
        else if(spacePressed){
                            var music3 = Game.add.audio('hit');
                music3.play();
            this.cast(inputSequence);
            spacePressed = false;
        }
        //k
        if(Game.kKey.isDown){
            kKeyPressed = true;
        }
        else if(kKeyPressed){
            this.spellTree.toggle();
            kKeyPressed = false;
        }

              //m
        if(Game.mKey.isDown){
            mKeyPressed = true;
        }
        else if(mKeyPressed){
            this.spellTree.wuxing();
            mKeyPressed = false;
        }

        //i key
        if(Game.iKey.isDown){
            iKeyPressed = true;
        }
        else if(iKeyPressed){
            iKeyPressed = false;
            cheating = !cheating;
        }
    }


    this.getArrowsInput = function(){
        if(Game.arrows.left.isDown){
            this.player.body.velocity.x = -speed;
            this.facing = 'left';
        }
        else if(Game.arrows.right.isDown){
            this.player.body.velocity.x = speed;
            this.facing = 'right';
        }
        else{

            this.player.body.velocity.x= 0;
        }
        if(Game.arrows.up.isDown){
            if(this.player.body.blocked.down){
                var music3 = Game.add.audio('jump');
                music3.play();
                this.player.body.velocity.y = jumpingHeight; 
            }
        }
    }
    this.playAnimation = function(){
        if(attacking){
            if(this.facing == 'right'){
                this.player.animations.play('attack_right');
            }
            else{
                this.player.animations.play('attack_left');
            }
        }
        else if(jumping){
            if(this.facing == 'right'){
                this.player.animations.play('in_air_right');
            }
            else{
                this.player.animations.play('in_air_left');
            }
            if(this.player.body.blocked.down){
                jumping = false;
            }
        }

        else if(this.player.body.velocity.y != 0 && !this.player.body.blocked.down){
            if(this.facing == 'right'){
                this.player.animations.play('jumping_right');
            }
            else{
                this.player.animations.play('jumping_left');
            }
        }

        else if(this.player.body.velocity.x>0){
            this.player.animations.play('right');
        }
        else if(this.player.body.velocity.x<0){
            this.player.animations.play('left');
        }
        else{
            if(this.facing == 'right'){
                this.player.animations.play('standing_right');
            }
            else{
                this.player.animations.play('standing_left');
            }
        }
    }

    this.takeDamage = function(damage, direction){

        if(this.immortalTimer<=0){
            this.health -= damage;
                var music3 = Game.add.audio('hurt');
            music3.play();
            Game.itemManager.add(new DamageText(Game, damage, this.player.body.x + 16, this.player.body.y - 16));
            //knockBack
            if(direction != null){
                if(direction == 'left'){
                    knockBackTimer = 20;
                    knockBackDirection = 'left';
                }
                else{
                    knockBackTimer = 20;
                    knockBackDirection = 'right';
                }
            }
            else{
                this.player.body.velocity.y  = -100;
            }
            this.immortalTimer = 60;
        }

    }

    this.getHealed = function(healing){

        if(this.health + healing > this.maxHealth){
            this.health = this.maxHealth;
        }
        else{
            this.health += healing;
        }

        Game.itemManager.add(new HealingText(Game, healing, this.player.body.x + 16, this.player.body.y - 16));
    }

    

    this.knockBack = function(){
        knockBackTimer --;

        if(!this.player.body.blocked.down){
            knockBackYFlag = true;
        }

        if(!knockBackYFlag){
            this.player.body.velocity.y = -50;
            knockBackYFlag = true;
        }

        if(knockBackDirection == 'left'){
            if(!this.player.body.blocked.down){
                this.player.body.velocity.x = -100;
            }
            else{
                this.player.body.velocity.x = -50;
            }
        }
        else{
            if(!this.player.body.blocked.down){
                this.player.body.velocity.x = 100;
            }
            else{
                this.player.body.velocity.x = 50;
            }
        }
        

        
    }


}