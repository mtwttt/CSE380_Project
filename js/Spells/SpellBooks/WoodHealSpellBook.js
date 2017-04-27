WoodHealSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'woodheal', 'qwert');

};

WoodHealSpellBook.prototype = Object.create(SpellBook.prototype);

WoodHealSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new WoodHeal(this.Game, this.Game.player.player.x-16, this.Game.player.player.y - 32));
}
