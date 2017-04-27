EarthDefender = function(Game, x, y ,direction, friendly){
    Creature.call(this, Game, x, y, 'Earth defender', 'earth', friendly);

    this.speed = 80;

    this.timer = 300;

    this.health = 100;
    this.maxHealth = 100;

    this.direction = direction;

    this.sprite = Game.game.add.sprite(x, y, 'EarthDefender');  

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [12,13,14,15,16,17,18,19,20,21], 10, true);
    this.sprite.animations.add('right', [0,1,2,3,4,5,6,7,8,9], 10, true);

    var dying_right = this.sprite.animations.add('dying_right', [24,25,26,27,28,29,30], 10, true);
    dying_right.loop = false;
    dying_right.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.kill()}, this);
    var dying_left = this.sprite.animations.add('dying_left', [33,34,35,36,37,38,39], 10, true);
    dying_left.loop = false;
    dying_left.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.kill()}, this);

};

EarthDefender.prototype = Object.create(Creature.prototype);

EarthDefender.prototype.subUpdate = function(){

    Creature.prototype.subUpdate.call(this);


    if(this.direction == 'left'){
        this.sprite.body.velocity.x = -this.speed;
        this.facing = 'left';
    }
    else{
        this.sprite.body.velocity.x = this.speed;
        this.facing = 'right';
    }

    if(this.timer > 0){
        this.timer --;
    }
    else{
        this.dying = true;
    }
}