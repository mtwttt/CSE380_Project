Wall = function(Game, x, y){


    this.timer = 120;
    this.forming = true;
    this.sprite = Game.game.add.sprite(x, y, 'Wall');
    var start = this.sprite.animations.add('forming', [0,1,2,3,4], 10, true);
    start.loop = false;
    start.onComplete.add(function(){this.forming = false}, this);

    var formed = this.sprite.animations.add('formed', [5], 1000, true);

    var dying = this.sprite.animations.add('dying', [4,3,2,1,0], 10, true);
    dying.loop = false;
    dying.onComplete.add(function(){this.sprite.kill(), Game.itemManager.destroy(this)}, this);

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;


    this.update = function(){
        if(this.forming){
            this.sprite.animations.play('forming');
        }
        else if(!this.forming && this.timer>0){
            this.sprite.animations.play('formed');
        }
        else{
            this.sprite.animations.play('dying');
        }
        if(this.timer > 0){
            this.timer --;
        }

        for(var i = 0 ;i <Game.creatureManager.creatures.length; i++){
            Game.game.physics.arcade.collide(Game.creatureManager.creatures[i].sprite, this.sprite);
        }

    }

}
