WallSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Wall', 'ww', 'earth');
    
};

WallSpellBook.prototype = Object.create(SpellBook.prototype);

WallSpellBook.prototype.cast = function(){
        if(this.Game.player.facing == 'left'){
        var shift = -256;
    }
    else{
        var shift = 256;
    }

    this.Game.itemManager.add(new Wall(this.Game, this.Game.player.player.x+shift, this.Game.player.player.y));
}