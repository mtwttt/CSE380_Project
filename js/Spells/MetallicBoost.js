MetallicBoost = function(Game, x, y){

    this.sprite = Game.game.add.sprite(x, y, 'MetallicBoost');

    var anim = this.sprite.animations.add('proceed', [0,1,2,3,4,5,6], 20, true);
    anim.loop = false;
    anim.onComplete.add(function(){Game.itemManager.remove(this), this.sprite.destroy()}, this);
    
    this.sprite.x = Game.player.player.x + 32 - 64;
    this.sprite.y = Game.player.player.y - 32;

    this.update = function(){
        this.sprite.animations.play('proceed');
        
    }
}