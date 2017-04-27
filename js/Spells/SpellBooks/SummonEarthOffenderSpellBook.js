SummonEarthOffenderSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Summon earth offender', 'ttet', 'earth');
};

SummonEarthOffenderSpellBook.prototype = Object.create(SpellBook.prototype);

SummonEarthOffenderSpellBook.prototype.cast = function(){



    this.Game.creatureManager.add(new EarthOffender(this.Game, this.Game.player.player.x, this.Game.player.player.y, this.Game.player.facing, true));
    
}