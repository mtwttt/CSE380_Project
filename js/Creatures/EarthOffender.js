EarthOffender = function(Game, x, y ,direction, friendly){
    Creature.call(this, Game, x, y, 'Earth offender', 'earth', friendly);

    this.speed = 200;

    this.timer = 300;
    this.atkTimer = 20;
    this.health = 30;
    this.maxHealth = 30;

    this.damage = 10;

    this.direction = direction;
    
    this.sprite = Game.game.add.sprite(x, y, 'EarthOffender');  

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 10, true);
    this.sprite.animations.add('right', [12,13,14,15,16,17,17,19,20,21], 10, true);

    var dying_right = this.sprite.animations.add('dying_right', [30,31,32,33,34,35], 10, true);
    dying_right.loop = false;
    dying_right.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);
    var dying_left = this.sprite.animations.add('dying_left', [24,25,26,27,28,29], 10, true);
    dying_left.loop = false;
    dying_left.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);

};

EarthOffender.prototype = Object.create(Creature.prototype);

EarthOffender.prototype.subUpdate = function(){

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

    if(this.atkTimer >0){
        this.atkTimer --;
    }

    if(this.atkTimer <= 0 ){
        for(var i = 0; i < this.Game.creatureManager.creatures.length; i++){
            var creature = this.Game.creatureManager.creatures[i];

            if(creature.friendly != this.friendly && this.Game.game.physics.arcade.overlap(this.sprite, creature.sprite)){
                creature.takeDamage(this.damage, this.attribute);
            }
        }
        this.atkTimer = 20;
    }
}