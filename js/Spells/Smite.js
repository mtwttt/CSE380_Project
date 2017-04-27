Smite = function(Game, x, y, friendly, damage){

    this.sprite = Game.game.add.sprite(x, y, 'Smite');
    this.attribute = 'wood';
    this.damage = damage;
    this.friendly = friendly;
    this.direction = 'left';

    var hasAttacked = false;

    var anim = this.sprite.animations.add('proceed', [0,1,2,3,4,5,6,7,8,9], 12, true);
    anim.loop = false;
    anim.onComplete.add(function(){Game.itemManager.remove(this), this.sprite.destroy()}, this);

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.scale.setTo(256/this.sprite.width, Game.game.height/this.sprite.height);

    this.update = function(){
        this.sprite.animations.play('proceed');

        if(this.sprite.frame == 7 && !hasAttacked){
            spellOverlapWithCreature(Game, this);
            hasAttacked = true;
        }
    }
}