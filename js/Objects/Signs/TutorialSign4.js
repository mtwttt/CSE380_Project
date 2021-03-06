TutorialSign4 = function(Game, x, y){
    Signs.call(this, Game, x, y);

    this.Game = Game;
    this.sign = Game.game.add.sprite(x, y, 'TutorialSign4');
    this.Game.game.physics.arcade.enable(this.sign);
    this.sign.body.gravity.y = 3000;


}
TutorialSign4.prototype = Object.create(Signs.prototype);

TutorialSign4.prototype.update = function(){
    Signs.prototype.update.call(this);
    this.Game.game.physics.arcade.collide(this.sign, this.Game.platforms);
}