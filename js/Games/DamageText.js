DamageText = function(Game, damage, x, y){
    var timer = 60;
    var text = Game.game.add.text(x, y, '-'+damage);
    text.font = 'Algerian';
    text.fontSize = 25;
    text.stroke = '#ffffff';
    text.strokeThickness = 1;
    text.fill = '#ff0000';
    Game.game.physics.enable(text, Phaser.Physics.ARCADE);
    text.body.velocity.y = -30;

    this.update = function(){
        
        if(timer > 0){
            timer --;
        }
        else{
            Game.itemManager.remove(this);
            text.kill();
            return;
        }

    }
}