AttackEffect = function (Game, x, y, attribute){
    var sprite = Game.game.add.sprite(x, y, 'attacks');
    Game.game.physics.arcade.enable(sprite);
    var speed = 15;
    var animation;  
    
        switch(attribute){
            case'earth':animation = sprite.animations.add('proceed', [0,1,2,3,4,5,6,7,8], speed, true);break;
            case'fire':animation = sprite.animations.add('proceed', [9,10,11,12,13,14,15,16,17], speed, true);break;
            case'water':animation = sprite.animations.add('proceed', [27,28,29,30,31,32,33,34,35], speed, true);break;
            case'metal':animation = sprite.animations.add('proceed', [18,19,20,21,22,23,24,25,26], speed, true);break;
            case'wood':animation = sprite.animations.add('proceed', [36,37,38,39,40,41,42,43,44], speed, true);break;
        }
        
    animation.loop = false;
    animation.onComplete.add(function(){sprite.destroy(); Game.itemManager.remove(this) });

    this.update = function(){
        sprite.animations.play('proceed');
    }
}