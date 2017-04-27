var Mo= Mo || {};

//title screen
Mo.Help = function(){};

//setting game configuration and loading the assets for the loading screen
Mo.Help.prototype = {
  preload: function() {
  	this.load.image('help', 'assets/open/help.png');
    this.load.spritesheet('menuButtons', 'assets/open/menuButtons.png',100,38);
  },
  create: function() {
    this.game.add.sprite(150, 120, 'help');
    backButton = this.game.add.button(this.game.world.centerX - 80, 450, 'menuButtons', this.Back, this, 21, 17);
  },
  Back: function() {
  this.music.stop();
	this.game.state.start('Preload');
  music.stop();
  }
};