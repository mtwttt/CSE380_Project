var Mo= Mo || {};

Mo.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
Mo.Boot.prototype = {
  preload: function() {
    this.load.image('mo', 'assets/open/mo.jpg');
    this.load.image('bg', 'assets/open/bg.png');
  },
  create: function() {
    this.game.add.sprite(0, 0, 'bg');
    var sprite = this.game.add.sprite(this.game.world.centerX-100, this.game.world.centerY, 'mo');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.alpha = 0;
    s = this.game.add.tween(sprite);
    s.to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None,true, 0, 60, true);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Preload');
    }
  }
};
