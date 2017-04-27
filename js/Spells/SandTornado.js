SandTornado = function(Game, x, y, direction, friendly){


    this.friendly = friendly;
    this.sprite = Game.game.add.sprite(x, y, 'SandTornado');
    this.attribute = 'earth';
    this.damage = 5;
    this.direction = direction;


    var timer = 600;

    var damageTimer = 30;

    this.forming = true;
    this.dying = false;

    var speed;

    if(this.direction =='left'){
        speed = -50;
    }
    else{
        speed = 50;
    }


    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.checkCollision.up = false;
    this.sprite.body.checkCollision.left = false;
    this.sprite.body.checkCollision.right  = false;
    this.sprite.body.checkCollision.down = true;

    this.sprite.body.gravity.y = 500;

    this.sprite.animations.add('traveling', [4,5,6,7], 10, true);
    var formingAnim = this.sprite.animations.add('forming', [0,1,2,3], 10, true);
    formingAnim.loop = false;
    formingAnim.onComplete.add(function(){this.forming = false}, this);

    var dyingAnim = this.sprite.animations.add('dying',[8,9,10], 10, true);
    dyingAnim.loop = false;
    dyingAnim.onComplete.add(function(){Game.itemManager.remove(this), this.sprite.destroy()}, this);

    this.update = function(){

        Game.game.physics.arcade.collide(Game.platforms, this.sprite);

        if(this.forming){
            this.sprite.animations.play('forming');
        }
        else if(this.dying){
            this.sprite.animations.play('dying');
        }
        else{
            this.sprite.body.velocity.x = speed;
            this.sprite.animations.play('traveling');
        }

        if(timer > 0){
            timer--;
        }
        else{
            this.die();
        }

        if(damageTimer <= 0){
            spellOverlapWithCreature(Game, this);
            damageTimer = 30;
        }


            for(var i = 0; i<Game.creatureManager.creatures.length; i++){

                var creature = Game.creatureManager.creatures[i];
                //if it is player
                if(creature == Game.player && !this.friendly){
                    if(Game.game.physics.arcade.overlap(this.sprite, creature.player)){
                        Game.player.player.body.velocity.y = -100;
                    }
                    continue;
                }
                //if it is enemy / summon monster
                if(creature.friendly == this.friendly){
                    continue;
                }
                

                else if(Game.game.physics.arcade.overlap(this.sprite, creature.sprite)){

                    creature.sprite.body.velocity.y = -50 * (64*64/(creature.sprite.width * creature.sprite.height));

                }
            }

        if(damageTimer>0){
            damageTimer --;
        }
    }


    this.die = function(){
        this.dying = true;
    }


}