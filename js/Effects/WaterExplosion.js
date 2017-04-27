WaterExplosion = function(Game, x, y){
    
    var explosion = Game.game.add.sprite(x, y, 'explosion_3');
    var anim = explosion.animations.add('proceed', [0, 1, 2, 3, 4 ,5, 6, 7, 8, 9], 12, true);
    anim.loop = false;
    anim.onComplete.add(function(){explosion.destroy(); Game.itemManager.remove(this)}, this);

    this.update = function(){
        explosion.animations.play('proceed');
    }
}