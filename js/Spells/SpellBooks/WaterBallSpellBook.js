WaterBallSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'waterball', 'e', 'water');
};

WaterBallSpellBook.prototype = Object.create(SpellBook.prototype);

WaterBallSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new WaterBall(this.Game, this.Game.player.player.x+16, this.Game.player.player.y+16, this.Game.player.facing, true));
}

