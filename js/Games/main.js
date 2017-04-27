
var Mo= Mo || {};

Mo.game = new Phaser.Game(1280, 720, Phaser.AUTO, '');

Mo.game.state.add('Boot', Mo.Boot);
Mo.game.state.add('Preload', Mo.Preload);
Mo.game.state.add('Menu', Mo.Menu);
Mo.game.state.add('Control', Mo.Control);
Mo.game.state.add('Help', Mo.Help);
Mo.game.state.add('Level', Mo.Level);
Mo.game.state.add('Game', Mo.Game);
Mo.game.state.add('Credit', Mo.Credit);

Mo.game.state.start('Boot');