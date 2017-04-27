//make friendly, sprite, damage, direction, attribute property

projectileCollideWithCreature = function(Game, projectile){
    for(var i = 0; i<Game.creatureManager.creatures.length; i++){
                var creature = Game.creatureManager.creatures[i];
                //if it is player
                if(creature == Game.player && !projectile.friendly){
                    if(!creature.immortal && Game.game.physics.arcade.collide(projectile.sprite, creature.player)){
                        Game.player.takeDamage(projectile.damage, projectile.direction);
                        projectile.die();
                    }
                }
                //if it is enemy / summon monster
                if(creature.friendly == projectile.friendly){
                    continue;
                }

                else if(Game.game.physics.arcade.collide(projectile.sprite, creature.sprite)){
                    


                    creature.takeDamage(projectile.damage, projectile.attribute);
                    
                    projectile.die();

                }
    }

}
//die method
ProjectileUpdate = function(Game, projectile){

        if(Game.game.physics.arcade.collide(Game.platforms, projectile.sprite)){
            projectile.die();
        }
}
//sprite, friednly, damage, directio, attribute
spellOverlapWithCreature = function(Game, spells){
    for(var i = 0; i<Game.creatureManager.creatures.length; i++){

                var creature = Game.creatureManager.creatures[i];
                //if it is player
                if(creature == Game.player && !spells.friendly){
                    if(!creature.immortal && Game.game.physics.arcade.overlap(spells.sprite, creature.player)){
                        Game.player.takeDamage(spells.damage, spells.direction);
                    }
                    continue;
                }
                //if it is enemy / summon monster
                if(creature.friendly == spells.friendly){
                    continue;
                }
                

                else if(Game.game.physics.arcade.overlap(spells.sprite, creature.sprite)){

                    creature.takeDamage(spells.damage, spells.attribute);

                }
    }
}
