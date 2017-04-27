HealingLaserSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Healing laser', 'wew', 'wood');
};

HealingLaserSpellBook.prototype = Object.create(SpellBook.prototype);

HealingLaserSpellBook.prototype.cast = function(){

    this.Game.itemManager.add(new HealingLaser(this.Game, this.Game.player.player.body.x + 32 - 48, this.Game.player.player.y + 96 - 100, true));
    
}