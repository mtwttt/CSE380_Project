var Mo = Mo || {};

//title screen
Mo.Control = function(){};

//setting game configuration and loading the assets for the loading screen
Mo.Control.prototype = {
  preload: function() {
  	this.load.image('control', 'assets/open/control.png');
    this.load.spritesheet('menuButtons', 'assets/open/menuButtons.png',100,38);
  },
  create: function() {
    this.game.add.sprite(0, 0, 'control');
    backButton = this.game.add.button(this.game.world.centerX - 80, 450, 'menuButtons', this.Back, this, 3, 10);
  },
  Back: function() {
	this.game.state.start('Preload');
        music.stop();
  }
};