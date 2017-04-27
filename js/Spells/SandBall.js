SandBall = function(Game, x, y, targetX, targetY, friendly){


    this.friendly = friendly;
    this.sprite = Game.game.add.sprite(x, y, 'SandBall');
    this.attribute = 'earth';
    this.damage = 10;

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);


    this.sprite.body.gravity.y = 400;

    this.xSpeed = (targetX - (this.sprite.x + 64))/2;

    this.sprite.body.velocity.y = -500;

    this.sprite.animations.add('traveling', [0,1,2,3], 10, true);
    


    this.update = function(){
        this.sprite.body.velocity.x = this.xSpeed;
        this.sprite.animations.play('traveling');

        projectileCollideWithCreature(Game, this);

        ProjectileUpdate(Game, this);
        
    }

    this.die = function(){
        Game.itemManager.remove(this);
        
        Game.itemManager.add(new Explosion_5(Game, this.sprite.body.x+64-128, this.sprite.body.y+128-256));
        Game.creatureManager.add(new SandMinion(Game, this.sprite.body.x +32, this.sprite.body.y + 64));
        Game.creatureManager.add(new SandMinion(Game, this.sprite.body.x + 96 , this.sprite.body.y + 64));

        this.sprite.destroy();

    }


}