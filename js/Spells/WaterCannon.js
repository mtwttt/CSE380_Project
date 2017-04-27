WaterCannon = function(Game, x, y, direction, friendly, damage){ 
    
    this.friendly = friendly;
    this.direction = direction;
    this.attribute = 'water';
    this.damage = damage;

    var damageTimer = 0;

    this.sprite = Game.game.add.sprite(x, y, 'waterCannon');
    var anim;
    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    if(direction == 'left'){
        anim = this.sprite.animations.add('proceed', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], 10, true);
    }
    else{
        anim = this.sprite.animations.add('proceed', [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38], 10, true);
    }

    anim.loop = false;
    anim.onComplete.add(function(){this.sprite.destroy(); Game.itemManager.remove(this)}, this)

    this.update = function(){
        this.sprite.animations.play('proceed');
        if(damageTimer > 0){
            damageTimer --;
        }

        if(damageTimer <= 0){
            spellOverlapWithCreature(Game, this);
            damageTimer = 20;
        }
        
    }
};
