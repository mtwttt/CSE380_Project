FireCannon = function(Game, x, y, friendly, damage){

    this.sprite = Game.game.add.sprite(x, y, 'FireCannon');
    this.attribute = 'fire';
    this.damage = damage;
    this.friendly = friendly;
    this.direction = 'left';

    var hasAttacked = false;

    var anim = this.sprite.animations.add('proceed', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 10, true);
    anim.loop = false;
    anim.onComplete.add(function(){Game.itemManager.remove(this), this.sprite.destroy()}, this);

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = 1800;


    this.update = function(){
        this.sprite.animations.play('proceed');

        Game.game.physics.arcade.collide(Game.platforms, this.sprite);
        

        if(this.sprite.frame == 15 && !hasAttacked){
            spellOverlapWithCreature(Game, this);
            hasAttacked = true;
        }
    }
}