FireCannonSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Fire cannon', 'rrqe', 'fire');
};

FireCannonSpellBook.prototype = Object.create(SpellBook.prototype);

FireCannonSpellBook.prototype.cast = function(){

    var shift;

    if(this.Game.player.facing == 'left'){
        shift = -512;
    }
    else{
        shift = 0;
    }

    this.Game.itemManager.add(new FireCannon(this.Game, this.Game.player.player.body.x + 32 + shift, this.Game.player.player.y - 512, true, 60));
    
}