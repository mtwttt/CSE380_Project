Creature = function(Game, x, y, name, attribute, friendly){
    this.Game = Game;
    this.name = name;
    
    //animation properties
    this.facing = 'left';
    this.jumping = false;
    this.dying = false;
    this.attacking = false;
    //game properties
    this.maxHealth = 100;
    this.health = 100;
    this.speed = 30;
    this.friendly = friendly;
    this.damage = 10;
    

    

    //setting attribute
    this.attribute = attribute;
    this.overcomeBy;
    this.generateBy;
    switch(this.attribute){
        case 'wood' : this.overcomeBy = 'metal'; this.generateBy = 'water'; break;
        case 'fire' : this.overcomeBy = 'water'; this.generateBy = 'wood'; break;
        case 'earth' : this.overcomeBy = 'wood'; this.generateBy = 'fire'; break;
        case 'metal' : this.overcomeBy = 'fire'; this.generateBy = 'earth'; break;
        case 'water' : this.overcomeBy = 'earth'; this.generateBy = 'metal'; break; 
    }
    //AI properties
    this.engage = false;
    this.detectRange =640;


    //health bar
    this.healthBar_2 = this.Game.game.add.sprite(0, 0, 'healthBar_2');
    this.healthBar_2.height = 16;
    this.healthBar = this.Game.game.add.sprite(0, 0, 'healthBar_1');
    this.healthBar.animations.add('proceed', [0,1,2,3,4,5,6,7,8], 12, true);
    this.healthBar.height = 16;

    this.healthBarTimer = 0;

};



//update method
Creature.prototype.update = function(){

    if(this.health <=0){

        this.die();
    }

    this.Game.game.physics.arcade.collide(this.Game.platforms, this.sprite);
    if(!this.Game.player.immortal && this.Game.game.physics.arcade.overlap(this.sprite, this.Game.player.player) && !this.friendly){
        if(this.sprite.x < this.Game.player.player.x){
            this.Game.player.takeDamage(this.damage, 'right');
        }
        else{
            this.Game.player.takeDamage(this.damage, 'left');
        }
        
    }
    this.move();
    this.subUpdate();
    this.playAnimations();
    if(this.healthBarTimer > 0){
        this.healthBarTimer--;
        this.healthBarUpdate();
    }
    else{
        this.healthBar.visible = false;
        this.healthBar_2.visible = false;
    }
    
};

Creature.prototype.playAnimations = function(){
    if(this.dying){
        if(this.facing == 'right'){
            this.sprite.animations.play('dying_right');
        }
        else{
            this.sprite.animations.play('dying_left');
        }
    }
    else if(this.attacking){
        if(this.facing == 'right'){
            this.sprite.animations.play('attacking_right');
        }
        else{
            this.sprite.animations.play('attacking_left');
        }

    }
    else if(this.jumping){
        if(this.facing == 'right'){
            this.sprite.animations.play('in_air_right');
        }
        else{
            this.sprite.animations.play('in_air_left');
        }
        if(this.sprite.body.touching.down){
            this.jumping = false;
        }
    }

    else if(this.sprite.body.velocity.x>0){
        this.sprite.animations.play('right');
    }
    else if(this.sprite.body.velocity.x<0){
        this.sprite.animations.play('left');
    }
    else{
                    
        if(this.facing == 'right'){
            this.sprite.animations.play('standing_right');
        }
        else{
            this.sprite.animations.play('standing_left');
        }
    }

    
};

Creature.prototype.healthBarUpdate = function(){

    this.healthBar.visible = true;
    this.healthBar_2.visible = true;
    this.healthBar.animations.play('proceed');
    this.healthBar.x = this.sprite.x;
    this.healthBar.width = this.sprite.width * (this.health/this.maxHealth);
    this.healthBar_2.x = this.sprite.x;
    this.healthBar_2.width = this.sprite.width;
    this.healthBar.y = this.sprite.y - 16;
    this.healthBar_2.y = this.sprite.y -  16;
};

Creature.prototype.move = function(){
    
    this.sprite.body.velocity.x = 0;
    
    if(Math.abs(this.sprite.x - this.Game.player.player.x) <= this.detectRange){
        this.engage = true;
        
    }
    else{
        this.engage = false;
    }

    if(this.dying){
        return;
    }
    if(this.attacking){
        return;
    }
    if(this.engage){
        this.moveToPlayer();
    }

    if(this.sprite.body.velocity.x > 0){
        this.facing = 'right';
    }
    else if(this.sprite.body.velocity.x < 0){
        this.facing = 'left';
    }
};

Creature.prototype.takeDamage = function(damage, attribute){

    if(this.attribute == null || attribute == null){
        //do nothing
    }

    else if(attribute == this.generateBy){
        this.getHealed(2*damage);
        return;
    }

    else if(attribute == this.attribute){
        this.getHealed(damage);
        return;
    }

    else if(attribute == this.overcomeBy){
        damage = damage * 2;
    }
    this.Game.itemManager.add(new DamageText(this.Game, damage, this.sprite.x + 16, this.sprite.y - 16));
    this.health -= damage;

    this.healthBarTimer = 120;
};

Creature.prototype.getHealed = function(heal){
    this.Game.itemManager.add(new HealingText(this.Game, heal, this.sprite.x + 16, this.sprite.y - 16));
    if(heal + this.health <= this.maxHealth){
        this.health += heal;
    }
    else{
        this.health = this.maxHealth;
    }
};

Creature.prototype.die = function(){
    this.healthBar.destroy();
    this.healthBar_2.destroy();
    
    this.dying = true;
    //delete in dying animation on complete
    
};

//simple AI
Creature.prototype.moveToPlayer = function(){
    
    if(this.Game.player.player.body.x > this.sprite.body.x){
        this.sprite.body.velocity.x = this.speed;
    }
    else{
          this.sprite.body.velocity.x = -this.speed;
    }
};

//helper methods
Creature.prototype.subUpdate = function(){

};
