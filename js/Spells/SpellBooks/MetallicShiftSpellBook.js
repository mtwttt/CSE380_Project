MetallicShiftSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Metallic shift', 'qrq', 'metal');
};

MetallicShiftSpellBook.prototype = Object.create(SpellBook.prototype);

MetallicShiftSpellBook.prototype.cast = function(){


    if(this.Game.player.facing == 'left'){
        var shift = -500;
    }
    else{
        var shift = 500;
    }

    this.Game.itemManager.add(new MetallicShift(this.Game, this.Game.player.player.x+shift, this.Game.player.player.y, 'reverse'));

    this.Game.player.player.x += shift;
    this.Game.itemManager.add(new MetallicShift(this.Game, this.Game.player.player.x, this.Game.player.player.y, 'forward'));
    
}