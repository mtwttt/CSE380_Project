SandTornadoSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Sand tornado', 'wewqw', 'earth');
    
};

SandTornadoSpellBook.prototype = Object.create(SpellBook.prototype);

SandTornadoSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new SandTornado(this.Game, this.Game.player.player.x+32 - 115, this.Game.player.player.y+96 - 512, this.Game.player.facing, true));
}
