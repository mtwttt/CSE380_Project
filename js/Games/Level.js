var Mo= Mo || {};

//loading the game assets
Mo.Level = function(){};
var button1;
var button2;
var button3;
Mo.Level.prototype = {

  preload: function() {
    this.load.image('water', 'assets/open/waterLevel.png');
    this.load.spritesheet('fire', 'assets/open/fireLevel.png', 200, 100);
    this.load.image('wood', 'assets/open/treeLevel.png');
    this.load.spritesheet('menuButtons', 'assets/open/menuButtons.png',100,38);

  },
  create: function() {
    this.game.add.sprite(0, 0, 'black');
    button2 = this.game.add.button(this.game.world.centerX - 80, 310, 'fire',this.Fire, this, 1, 2);
    backButton = this.game.add.button(this.game.world.centerX - 80, 100, 'menuButtons', this.Back, this, 16, 12);

    button2 = this.game.add.button(this.game.world.centerX - 80, 410, 'wood',this.Wood, this);

  },
  Wood: function(){
      this.game.state.start('Game', true, false, 'wood',null);
            music.stop();
  },
  Fire: function(){ 
      this.game.state.start('Game', true, false, 'fire',null);
            music.stop();
  },
  Water: function(){ 
      this.game.state.start('Game', true, false, 'water',null);
  },
  Back: function(){
    this.game.state.start('Menu');
             music.stop();
  }
}