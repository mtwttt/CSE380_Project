MetallicBoostSpellBook = function(Game, x, y){
    SpellBook.call(this, Game, x, y, 'Metallic boost', 'qq', 'metal');
};

MetallicBoostSpellBook.prototype = Object.create(SpellBook.prototype);

MetallicBoostSpellBook.prototype.cast = function(){
    this.Game.itemManager.add(new MetallicBoost(this.Game, this.Game.player.player.x, this.Game.player.player.y));
    this.Game.player.player.body.velocity.y = -300;
}