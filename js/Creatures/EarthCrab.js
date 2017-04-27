EarthCrab = function(Game, x, y){

    Creature.call(this, Game, x, y, 'earth crab', 'earth', false);

    this.summonTimer = 0;

    this.speed = 30;
    this.attackTimer = 240;
    this.health = 600;
    this.maxHealth = 600;

    this.Game = Game;

    this.firePillarTimer = 0;
    this.fireBallsTimer = 0;

    this.sprite = Game.game.add.sprite(x, y, 'EarthCrab');

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('right', [16,17,18,19,20], 10, true);
    this.sprite.animations.add('left', [1,2,3,4,5], 10, true);
    this.sprite.animations.add('standing_left', [0], 10, true);
    this.sprite.animations.add('standing_right', [15], 10, true);
    
    var attack_right_anim = this.sprite.animations.add('attacking_right', [15], 1, true);
    var attack_left_anim = this.sprite.animations.add('attacking_left', [0], 1, true);
    attack_right_anim.loop = false;
    attack_left_anim.loop = false;
    attack_right_anim.onComplete.add(
        function(){
            this.attacking = false; this.useAbility();
            Game.itemManager.add(new AttackEffect(Game, this.sprite.body.x + 128 - 128, this.sprite.body.y, 'earth'));
        }, this);
    attack_left_anim.onComplete.add(
        function(){
            this.attacking = false; this.useAbility();
            Game.itemManager.add(new AttackEffect(Game, this.sprite.body.x + 128 - 128, this.sprite.body.y, 'earth'));
        }, this);

    var dying_anim = this.sprite.animations.add('dying_left', [6,7,8,9,10,11,12], 8, true);
    dying_anim.loop = false;
    dying_anim.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);
    var dying_anim2 = this.sprite.animations.add('dying_right', [21,22,23,24,25,26,27], 8, true);
    dying_anim2.loop = false;
    dying_anim2.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);



};

EarthCrab.prototype = Object.create(Creature.prototype);

EarthCrab.prototype.useAbility = function(){


    var prob = Math.random();

    if(prob <= 0.33){
        this.Game.itemManager.add(new SandTornado(this.Game, this.sprite.x+ 128 - 115, this.sprite.y+ 256 - 512, this.facing, false));
    }
    else if(prob <= 0.66){
        this.summonTimer = Math.round(Math.random() * 240);
    }
    else{
        this.Game.itemManager.add(new SandBall(this.Game, this.sprite.x +128, this.sprite.y +256 - 128, this.Game.player.player.x + 32, this.Game.player.player.y + 48, false));
    }

    
};

EarthCrab.prototype.subUpdate = function(){


    Creature.prototype.subUpdate.call(this);
    if(this.attackTimer > 0){
        this.attackTimer --;
    }

    if(this.engage && this.attackTimer <= 0){
        this.attacking = true;
        this.attackTimer = Math.random() * 300;
    }

    if(this.summonTimer > 0){
        this.summonTimer --;
        if(this.summonTimer % 30 == 0){
            var newo = new EarthOffender(this.Game, this.sprite.x + 128 - 64, this.sprite.y + 256 - 98, this.facing, false);
            newo.health = 15;
            this.Game.creatureManager.add(newo);
        }
    }

    
};