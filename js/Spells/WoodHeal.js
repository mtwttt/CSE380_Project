WoodHeal = function(Game, x, y){

    var timer = 300;

    var woodheal = Game.game.add.sprite(x, y, 'wood_heal');
    Game.game.physics.enable(woodheal, Phaser.Physics.ARCADE);
    woodheal.body.gravity.y = 700;

    var opening = true;
    var open_anim = woodheal.animations.add('opening', [0, 1, 2, 3, 4, 5, 6], 10, true);
    open_anim.loop = false;
    open_anim.onComplete.add(function(){opening = false});
    woodheal.animations.add('healing', [7, 8, 9], 10, true);
    var close_anim = woodheal.animations.add('closing', [10, 11, 12, 13], 10, true);
    close_anim.loop = false;
    close_anim.onComplete.add(function(){Game.itemManager.remove(this); woodheal.destroy()}, this);

    this.update = function(){

        Game.game.physics.arcade.collide(Game.platforms, woodheal);

        if(timer > 0){
            timer --;
        }
        if(timer <= 0){
            woodheal.animations.play('closing');
            
        }

        else if(opening){
            woodheal.animations.play('opening');
        }
        else{
            woodheal.animations.play('healing');
        }

        if(Game.game.physics.arcade.overlap(Game.player.player, woodheal)){

        }
    }


}