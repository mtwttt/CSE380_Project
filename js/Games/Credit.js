var Mo = Mo || {};

//title screen
Mo.Credit = function(){};

//setting game configuration and loading the assets for the loading screen
Mo.Credit.prototype = {
  preload: function() {
  	this.load.image('credit', 'assets/open/credit.png');
    this.load.spritesheet('menuButtons', 'assets/open/menuButtons.png',100,38);
  },
  create: function() {
    this.game.add.sprite(200, 40, 'credit');
    backButton = this.game.add.button(this.game.world.centerX - 80, 440, 'menuButtons', this.Back, this, 1, 8);
  },
  Back: function() {
	 this.game.state.start('Preload');
   music.stop();
  }
};