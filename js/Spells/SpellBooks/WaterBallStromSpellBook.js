WaterBallStromSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'waterball strom', 'ewete', 'water');
};

WaterBallStromSpellBook.prototype = Object.create(SpellBook.prototype);

WaterBallStromSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new WaterBallStrom(this.Game, this.Game.game.camera.x +this.Game.game.width/2 - 320, this.Game.game.camera.y, true));
}

