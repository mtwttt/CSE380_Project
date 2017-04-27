HealingCircle = function(Game, x, y, caster){

    this.caster = caster;

    this.sprite = Game.game.add.sprite(x, y, 'HealingCircle');

    this.attribute = 'wood';

    this.healing = 5;

    this.healingTimer = 30;
    this.timer = 240;


    var anim = this.sprite.animations.add('proceed', [0,1,2,3], 15, true);

    this.update = function(){

        this.sprite.animations.play('proceed');

        if(this.caster === Game.player){
            this.sprite.x = Game.player.player.x + 32 - 64;
            this.sprite.y = Game.player.player.y + 96 - 128;
        }
        else{
            this.sprite.x = this.caster.sprite.x + this.caster.sprite.width/2 - 64;
            this.sprite.y = this.caster.sprite.y + this.caster.sprite.height - 128;
        }

        if(this.timer>=0){
            this.timer--;
        }
        else{
            Game.itemManager.remove(this);
            this.sprite.destroy();
        }

        
        if(this.healingTimer >= 0){
            this.healingTimer --;
        }
        else{
            this.caster.getHealed(this.healing);
            this.healingTimer = 30;
        }
    }

}