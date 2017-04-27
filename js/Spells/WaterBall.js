WaterBall = function(Game, x, y, direction, friendly){


    this.friendly = friendly;
    this.sprite = Game.game.add.sprite(x, y, 'waterball');
    this.attribute = 'water';
    this.damage = 10;
    this.direction = direction;


    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.animations.add('traveling', [0, 1, 2, 3, 4,5,6,7,8], 10, true);
    
    

    var maxDistance = 640;
    this.speed;


    if(this.direction == 'left'){
        this.speed = -300;
    }
    else if(this.direction == 'right'){
        this.speed = 300;
    }
    else{
        this.speed = 0;
        this.sprite.body.gravity.y = 400;
    }


    this.update = function(){
        this.sprite.body.velocity.x = this.speed;
        this.sprite.animations.play('traveling');

        projectileCollideWithCreature(Game, this);

        ProjectileUpdate(Game, this);

        if(Math.abs(this.sprite.x - x) >=maxDistance ){
            this.die();
        }
    }

    this.die = function(){
        Game.itemManager.remove(this);
        
        Game.itemManager.add(new WaterExplosion(Game, this.sprite.body.x-16, this.sprite.body.y-16));

        this.sprite.destroy();
    }


}