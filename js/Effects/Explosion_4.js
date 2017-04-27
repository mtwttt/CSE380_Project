Explosion_4 = function(Game, x, y){

    this.sprite = Game.game.add.sprite(x, y, 'explosion_4');

    var anim = this.sprite.animations.add('proceed', [0,1,2,3,4,5,6,7], 10, true);
    anim.loop = false;
    anim.onComplete.add(function(){this.sprite.destroy(); Game.itemManager.remove(this)}, this);

    this.update = function(){
        console.log('updating');
        this.sprite.animations.play('proceed');

    }
}