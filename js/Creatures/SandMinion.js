SandMinion = function(Game, x, y){

    Creature.call(this, Game, x, y, 'Sand minion', 'earth', false);
    //setting game properties
    this.speed = 50;

    this.health = 50;
    this.maxHealth = 50;

    this.attackTimer = 180;
    //set up
    this.sprite = Game.game.add.sprite(x, y, 'SandMinion');  

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [9,10,11,12,13,14,15,16], 10, true);
    this.sprite.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
    this.sprite.animations.add('in_air_left', [9,10,11,12,13,14,15,16], 10, true);
    this.sprite.animations.add('in_air_right', [0,1,2,3,4,5,6,7], 10, true);
    this.sprite.animations.add('standing_left', [27,28,29,30,31,32,33,34], 10, true);
    this.sprite.animations.add('standing_right', [18,19,20,21,22,23,24,25], 10, true);

    var attack_left_anim = this.sprite.animations.add('attacking_left', [42,43,44,45], 10, true);
    attack_left_anim.loop = false;
    attack_left_anim.onComplete.add(function(){
        this.attacking =false;
        Game.itemManager.add(new FireBall(Game, this.sprite.x +16, this.sprite.y + 24, 'left', false))
    },this);
    var attack_right_anim = this.sprite.animations.add('attacking_right', [36,37,38,39], 10, true);
    attack_right_anim.loop = false;
    attack_right_anim.onComplete.add(function(){
        this.attacking =false; 
        Game.itemManager.add(new FireBall(Game, this.sprite.x + 16, this.sprite.y + 24, 'right', false));
    },this);

    var dying_right = this.sprite.animations.add('dying_right', [48,49,50,51,52,53], 10, true);
    dying_right.loop = false;
    dying_right.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);
    var dying_left = this.sprite.animations.add('dying_left', [54,55,56,57,58,59], 10, true);
    dying_left.loop = false;
    dying_left.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);

};

SandMinion.prototype = Object.create(Creature.prototype);

SandMinion.prototype.subUpdate = function(){

    Creature.prototype.subUpdate.call(this);
    
    if(this.attackTimer > 0 ){
        this.attackTimer -- ;
    }

    if(this.engage && this.attackTimer <= 0){
        this.attacking = true;
        this.attackTimer = Math.random()*240;
    }

}