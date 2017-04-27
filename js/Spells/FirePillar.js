FirePillar = function(Game, x, y, friendly){
        var music3 = Game.add.audio('explosion');
        music3.play();
    var damageTimer = 0
    this.damage = 30;
    this.direction = 'left';
    var dying = false;

    this.friendly = friendly;
    this.attribute = 'fire';
    this.sprite = Game.game.add.sprite(x, y, 'firePillar');

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = 400;

    this.sprite.animations.add('travelling', [0,1,2,3], 10, true);
    var dying_anim = this.sprite.animations.add('dying',[4,5,6,7],10, true);
    dying_anim.loop =false;
    dying_anim.onComplete.add(function(){Game.objectManager.remove(this); this.sprite.destroy();}, this);

    this.update = function(){
        if(!dying){
            this.sprite.animations.play('travelling');
        }
        else{
            this.sprite.animations.play('dying');
        }
        Game.game.physics.arcade.collide(Game.platforms, this.sprite)
        if(this.sprite.body.blocked.down){

            dying = true;
        }
        if(damageTimer > 0){
            damageTimer --;
        }
        else{
            spellOverlapWithCreature(Game, this);
            damageTimer = 20;
        }
    }
}