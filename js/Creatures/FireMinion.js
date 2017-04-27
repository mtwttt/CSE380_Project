FireMinion = function(Game, x, y){

    Creature.call(this, Game, x, y, 'Fire minion', 'fire', false);
    //setting game properties
    this.speed = 50;

    this.health = 50;
    this.maxHealth = 50;

    this.attackTimer = 180;
    //set up
    this.sprite = Game.game.add.sprite(x, y, 'fire_minion');  

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [45,46,47,48,49,50,51,52,53], 10, true);
    this.sprite.animations.add('right', [36,37,38,39,40,41,42,43,44], 10, true);
    this.sprite.animations.add('in_air_left', [45,46,47,48,49,50,51,52,53], 10, true);
    this.sprite.animations.add('in_air_right', [36,37,38,39,40,41,42,43,44], 10, true);
    this.sprite.animations.add('standing_left', [45,46,47,48,49,50,51,52,53], 10, true);
    this.sprite.animations.add('standing_right', [36,37,38,39,40,41,42,43,44], 10, true);

    var attack_left_anim = this.sprite.animations.add('attacking_left', [0,1,2,3,4,5,6,7,8], 10, true);
    attack_left_anim.loop = false;
    attack_left_anim.onComplete.add(function(){
        this.attacking =false;
        Game.itemManager.add(new FireBall(Game, this.sprite.x +16, this.sprite.y + 24, 'left', false))
    },this);
    var attack_right_anim = this.sprite.animations.add('attacking_right', [9,10,11,12,13,14,15,16,17], 10, true);
    attack_right_anim.loop = false;
    attack_right_anim.onComplete.add(function(){
        this.attacking =false; 
        Game.itemManager.add(new FireBall(Game, this.sprite.x + 16, this.sprite.y + 24, 'right', false));
    },this);

    var dying_right = this.sprite.animations.add('dying_right', [18,19,20,21,22,23,24,25,26], 10, true);
    dying_right.loop = false;
    dying_right.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);
    var dying_left = this.sprite.animations.add('dying_left', [27,28,29,30,31,32,33,34,35], 10, true);
    dying_left.loop = false;
    dying_left.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);

};

FireMinion.prototype = Object.create(Creature.prototype);

FireMinion.prototype.subUpdate = function(){

    Creature.prototype.subUpdate.call(this);
    
    if(this.attackTimer > 0 ){
        this.attackTimer -- ;
    }

    if(this.engage && this.attackTimer <= 0){
        this.attacking = true;
        this.attackTimer = Math.random()*240;
    }

}