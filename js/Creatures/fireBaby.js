

fireBaby = function(Game, x, y){


    Creature.call(this, Game, x, y, 'fire baby', 'fire', false);
    //set up
    this.sprite = Game.game.add.sprite(x, y, 'fireBaby');
    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [0,1,2,3,4,5,6,7,8], 10, true);
    this.sprite.animations.add('right', [9,10,11,12,13,14,15,16,17], 10, true);
    this.sprite.animations.add('jumping_left', [18,19,20,21,22], 10, true);
    this.sprite.animations.add('jumping_right', [24,25,26,27,28], 10, true);
    this.sprite.animations.add('in_air_left', [22], 1000, true);
    this.sprite.animations.add('in_air_right', [28], 1000, true);
    this.sprite.animations.add('standing_left', [0], 1000, true);
    this.sprite.animations.add('standing_right', [9], 1000, true);


    


};
fireBaby.prototype = Object.create(Creature.prototype);

