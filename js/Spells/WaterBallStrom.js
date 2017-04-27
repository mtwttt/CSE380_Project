WaterBallStrom = function(Game, x, y, friendly){

    var dropTimer = 1;

    var timer = 600;

    var forming = true;
    var dying = false;
    this.sprite = Game.game.add.sprite(x, y, 'waterBallStrom');

    var forming_anim = this.sprite.animations.add('forming', [0,1,2,3,4], 10, true);
    this.sprite.animations.add('proceed', [5,6,7,8,9,10,11,12,13,14], 10, true);
    var dying_anim = this.sprite.animations.add('dying', [4,3,2,1,0], 10 ,true);

    forming_anim.loop = false;
    forming_anim.onComplete.add(function(){forming = false}, this);

    dying_anim.loop = false;
    dying_anim.onComplete.add(function(){Game.itemManager.remove(this); this.sprite.destroy();}, this);

    this.update = function(){

        this.playAnimation();
        if(timer > 0){
            timer --;
        }
        else{  
            dying = true;
        }
        if(dropTimer >0){
             dropTimer --;
        }
        else{
            var waterBall = new WaterBall(Game, this.sprite.x + 640 * Math.random(), this.sprite.y + 64, null, friendly);
            waterBall.damage = 5;
            Game.itemManager.add(waterBall);
            dropTimer =3;
        }
        

    }

    this.playAnimation = function(){
        if(forming){
            this.sprite.animations.play('forming');
        }
        else if(dying){
            this.sprite.animations.play('dying');
        }
        else{
            this.sprite.animations.play('proceed');
        }
    }
}