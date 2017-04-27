FireBallSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'fireball', 'r', 'fire');
    
};

FireBallSpellBook.prototype = Object.create(SpellBook.prototype);

FireBallSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new FireBall(this.Game, this.Game.player.player.x+16, this.Game.player.player.y+16, this.Game.player.facing, true));
}
