SmiteSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Smite', 'wrwqw', 'wood');
};

SmiteSpellBook.prototype = Object.create(SpellBook.prototype);

SmiteSpellBook.prototype.cast = function(){

    var shift;

    if(this.Game.player.facing == 'left'){
        shift = -512;
    }
    else{
        shift = 512 - 256;
    }

    this.Game.itemManager.add(new Smite(this.Game, this.Game.player.player.body.x + 32 + shift, this.Game.game.camera.y, true, 30));
    
}