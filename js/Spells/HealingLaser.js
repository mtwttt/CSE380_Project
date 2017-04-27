HealingLaser = function(Game, x, y, friendly){

    this.friendly = friendly;

    this.sprite = Game.game.add.sprite(x, y, 'HealingLaser');

    this.attribute = 'wood';

    this.healing = 30;

    this.hasHealed = false;


    this.forming = true;

    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    var forming_anim = this.sprite.animations.add('forming', [0, 1, 2, 3, 4,5], 8, true);
    forming_anim.loop = false;
    forming_anim.onComplete.add(function(){this.forming = false}, this);

    var anim = this.sprite.animations.add('proceed', [6,7,8,9,10,11,12], 15, true);
    anim.loop = false;
    anim.onComplete.add(function(){Game.itemManager.remove(this), this.sprite.destroy()}, this);

    this.update = function(){

        if(this.forming){
            this.sprite.animations.play('forming');
        }
        else{
            this.sprite.animations.play('proceed');
        }

        if(this.sprite.frame == 7 && !this.hasHealed){
            for(var i = 0; i<Game.creatureManager.creatures.length; i++){

                    var creature = Game.creatureManager.creatures[i];
                    //if it is player
                    if(creature == Game.player && this.friendly){
                        if(Game.game.physics.arcade.overlap(this.sprite, creature.player)){
                            Game.player.getHealed(this.healing);
                        }
                        continue;
                    }

                    /*
                    //if it is enemy / summon monster
                    if(creature.friendly == spells.friendly){
                        continue;
                    }
                    

                    else if(Game.game.physics.arcade.overlap(spells.sprite, creature.sprite)){

                        creature.takeDamage(spells.damage, spells.attribute);

                    }
                    */
            }
            this.hasHealed = true;
        }
    }

}