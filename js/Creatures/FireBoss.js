FireBoss = function(Game, x, y){

    Creature.call(this, Game, x, y, 'fire boss', 'fire', false);

    this.speed = 30;
    this.attackTimer = 240;
    this.health = 600;
    this.maxHealth = 600;

    this.Game = Game;

    this.firePillarTimer = 0;
    this.fireBallsTimer = 0;

    this.sprite = Game.game.add.sprite(x, y, 'fireBoss');

    Game.game.physics.arcade.enable(this.sprite);

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('right', [30,31,32,33,34,35,36,37], 10, true);
    this.sprite.animations.add('left', [39,40,41,42,43,44,45,46], 10, true);
    this.sprite.animations.add('standing_left', [57,58,59,60,61,62,63], 10, true);
    this.sprite.animations.add('standing_right', [48,49,50,51,52,53,54], 10, true);
    
    var attack_right_anim = this.sprite.animations.add('attacking_right', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
    var attack_left_anim = this.sprite.animations.add('attacking_left', [15,16,17,18,19,20,21,22,23,24,25,26,27], 10, true);
    attack_right_anim.loop = false;
    attack_left_anim.loop = false;
    attack_right_anim.onComplete.add(function(){this.attacking = false; this.useAbility()}, this);
    attack_left_anim.onComplete.add(function(){this.attacking = false; this.useAbility()}, this);

    var dying_anim = this.sprite.animations.add('dying_left', [66,67,68,69,70,71], 8, true);
    dying_anim.loop = false;
    dying_anim.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);
    var dying_anim2 = this.sprite.animations.add('dying_right', [66,67,68,69,70,71], 8, true);
    dying_anim2.loop = false;
    dying_anim2.onComplete.add(function(){Game.creatureManager.remove(this); this.sprite.destroy()}, this);



};

FireBoss.prototype = Object.create(Creature.prototype);

FireBoss.prototype.subUpdate = function(){
    Creature.prototype.subUpdate.call(this);
    if(this.attackTimer > 0){
        this.attackTimer --;
    }

    if(this.engage && this.attackTimer <= 0){
        this.attacking = true;
        this.attackTimer = Math.random() * 300;
    }

    if(this.firePillarTimer > 0 ){
        
        if(this.firePillarTimer % 30 == 0){
            this.Game.objectManager.add(new FirePillar(this.Game, this.Game.player.player.x + ((Math.random()*2-1)*256), this.Game.game.camera.y - 300));
        }

        this.firePillarTimer --;

    }

    if(this.fireBallsTimer > 0){
        if(this.fireBallsTimer % 10 ==0){
            var direction;
            if(this.Game.player.player.x > this.sprite.x){
                direction = 'right';
            }
            else{
                direction = 'left';
            }
            this.Game.itemManager.add(new FireBall(this.Game, this.sprite.x+ 64, this.sprite.y + 192 + ((Math.random()*2-1)*48), direction, false));
        }
        this.fireBallsTimer --;
    }

    
};

FireBoss.prototype.useAbility = function(){


    var prob = Math.random();

    if(prob <=0.05){
        this.summonMinions();
    }
    else if(prob <=0.65){
        this.firePillar();
    }
    else{
        this.fireBalls();
    }
};

FireBoss.prototype.summonMinions = function(){

    var count = 5 * Math.random();

    for(var i = 0; i<count; i++){
        this.Game.creatureManager.add(new FireMinion(this.Game, this.sprite.x + 64 - 64*i, this.sprite.y+64));
    }
};

FireBoss.prototype.firePillar = function(){
    this.firePillarTimer = Math.round(Math.random() * 500);
};

FireBoss.prototype.fireBalls = function(){

    this.fireBallsTimer = Math.round(Math.random() * 120);

 
}
