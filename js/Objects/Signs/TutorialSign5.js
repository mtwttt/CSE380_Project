TutorialSign5 = function(Game, x, y){
    Signs.call(this, Game, x, y);

    this.Game = Game;
    this.sign = Game.game.add.sprite(x, y, 'TutorialSign5');
    this.Game.game.physics.arcade.enable(this.sign);
    this.sign.body.gravity.y = 3000;


}
TutorialSign5.prototype = Object.create(Signs.prototype);

TutorialSign5.prototype.update = function(){
    Signs.prototype.update.call(this);
    this.Game.game.physics.arcade.collide(this.sign, this.Game.platforms);
}