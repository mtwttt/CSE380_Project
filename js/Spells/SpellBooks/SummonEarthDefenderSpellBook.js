SummonEarthDefenderSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Summon earth defender', 'ttqt', 'earth');
};

SummonEarthDefenderSpellBook.prototype = Object.create(SpellBook.prototype);

SummonEarthDefenderSpellBook.prototype.cast = function(){



    this.Game.creatureManager.add(new EarthDefender(this.Game, this.Game.player.player.x, this.Game.player.player.y, this.Game.player.facing, true));
    
}