var Mo = Mo || {};

Mo.Menu = function(){};
var music;
Mo.Menu.prototype = {

    create: function() {
        this.game.add.sprite(0, 0, 'black');
        var sprite = this.game.add.image(this.game.world.centerX-200, this.game.world.centerY-280, 'main');
            
        button1 = this.game.add.button(this.game.world.centerX - 80, 260, 'menuButtons', this.Level, this, 9, 5);
        button2 = this.game.add.button(this.game.world.centerX - 80, 310, 'menuButtons',this.Control, this, 6, 2);
        button3 = this.game.add.button(this.game.world.centerX - 80, 360, 'menuButtons',this.Story, this, 13, 20);
        button4 = this.game.add.button(this.game.world.centerX - 80, 410, 'menuButtons',this.Credit, this, 4, 0);
        
        music = this.game.add.audio('openmusic');
        music.loopFull();

    },
    Level: function(){ 
        this.game.state.start('Level');
    },
    Control: function(){
        this.game.state.start('Control');
    },
    Story: function(){ 
        this.game.state.start('Help');
    },
    Credit: function(){ 
        this.game.state.start('Credit');
    }
}