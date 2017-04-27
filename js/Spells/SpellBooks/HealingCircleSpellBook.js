HealingCircleSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Healing laser', 'wewww', 'wood');
};

HealingCircleSpellBook.prototype = Object.create(SpellBook.prototype);

HealingCircleSpellBook.prototype.cast = function(){

    this.Game.itemManager.add(new HealingCircle(this.Game, this.Game.player.player.body.x + 32 - 48, this.Game.player.player.y + 96 - 100, this.Game.player));
    
}