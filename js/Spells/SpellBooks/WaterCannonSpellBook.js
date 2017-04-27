WaterCannonSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'water cannon', 'eee', 'water');
};

WaterCannonSpellBook.prototype = Object.create(SpellBook.prototype);

WaterCannonSpellBook.prototype.cast = function(){
    if(this.Game.player.facing == 'left'){
        var x = this.Game.player.player.x - 320;
    }
    else{
        var x = this.Game.player.player.x + 64;
    }
    var y =this.Game.player.player.y;
    this.Game.itemManager.add(new WaterCannon(this.Game, x, y+6, this.Game.player.facing, true, 5));
}