Spike = function(Game, x, y){
    Objects.call(this, Game, x, y);
    this.damage = 10;

    this.sprite = Game.game.add.sprite(x, y, 'spike');

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.gravity.y = 300;
    this.sprite.body.immovable = true;
};

Spike.prototype = Object.create(Objects.prototype);

Spike.prototype.update = function(){
    Objects.prototype.update.call(this);

    this.Game.game.physics.arcade.collide(this.Game.platforms, this.sprite);

    if(this.Game.game.physics.arcade.collide(this.Game.player.player, this.sprite)){
        /*
        if(this.sprite.x + 16 > this.Game.player.player.x + 32){
            this.Game.player.takeDamage(this.damage, 'right');
        }
        else{
            this.Game.player.takeDamage(this.damage, 'left');
        }
        */
        this.Game.player.takeDamage(this.damage, null);
    }
}