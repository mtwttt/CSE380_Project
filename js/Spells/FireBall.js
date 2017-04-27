FireBall = function(Game, x, y, direction, friendly){


    this.friendly = friendly;
    this.sprite = Game.game.add.sprite(x, y, 'fireball');
    this.attribute = 'fire';
    this.damage = 10;
    this.direction = direction;


    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    if(this.direction == 'left'){
        this.sprite.animations.add('traveling', [0, 1, 2, 3, 4,5,6,7,8], 10, true);
    }
    else{
        this.sprite.animations.add('traveling', [9,10,11,12,13,14,15,16,17], 10, true);
    }
    

    var maxDistance = 640;
    var speed;


    if(this.direction == 'left'){
        speed = -300;
    }
    else{
        speed = 300;
    }

    this.update = function(){
        this.sprite.body.velocity.x = speed;
        this.sprite.animations.play('traveling');

        projectileCollideWithCreature(Game, this);

        ProjectileUpdate(Game, this);
        
        if(Math.abs(this.sprite.x - x) >= maxDistance ){

            this.die();
        }
    }

    this.die = function(){
        Game.itemManager.remove(this);
        Game.itemManager.add(new FireExplosion(Game, this.sprite.body.x-16, this.sprite.body.y-16));

        this.sprite.destroy();

    }


}