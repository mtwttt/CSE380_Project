var Mo= Mo || {};

//loading the game assets
Mo.Preload = function(){};
Mo.Preload.prototype = {

    preload: function() {

          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.setMinMax(400, 300, 1920, 1200); 
      
          this.load.image('black', 'assets/open/black.png');
          this.load.image('main', 'assets/open/main.png');

          this.load.spritesheet('menuButtons', 'assets/open/menuButtons.png', 100, 38);
          
          this.load.image('TutorialSign0', 'assets/objects/signs/TutorialSign0.png')
          this.load.image('Fire_Tile', 'assets/Tiles/Fire_Tile.png');
          this.load.image('Tiles', 'assets/Tiles/Tiles.png'); 

          this.load.image('Spellbook', 'assets/items/Spellbook.png');
          this.load.image('spellTreeWindow', 'assets/UI/spellTreeWindow.png');
          this.load.image('fire_background', 'assets/background/fire_background.png');

          this.load.spritesheet('ming', 'assets/character/ming.png', 64, 64);
          this.load.spritesheet('character', 'assets/character/character.png', 64, 96);
          this.load.spritesheet('fireBaby', 'assets/monster/fire baby/firebaby.png', 32, 32);
          this.load.spritesheet('fireball', 'assets/spells/fireball.png', 32, 32);
          this.load.spritesheet('firePillar', 'assets/spells/firePillar.png', 64, 256);
          this.load.spritesheet('waterBallStrom', 'assets/spells/WaterBallStrom.png', 640, 640);
          this.load.spritesheet('explosion_1', 'assets/effects/explosion.png', 64, 64);
          this.load.spritesheet('explosion_2', 'assets/effects/explosion_1.png', 64, 64);
          this.load.spritesheet('wood_heal', 'assets/spells/Wood_heal.png', 64, 64);
          this.load.spritesheet('attacks', 'assets/effects/attacks.png', 256, 256);
          this.load.spritesheet('attacks_2', 'assets/effects/attacks_2.png', 64, 64)
          this.load.spritesheet('fire_minion', 'assets/monster/fire minion/FireMinion.png', 64, 64);
          this.load.spritesheet('EarthDefender', 'assets/monster/earth defender/EarthDefender.png', 78, 96);
          this.load.spritesheet('EarthOffender', 'assets/monster/earth offender/EarthOffender.png', 128, 96);
          this.load.spritesheet('fireBoss', 'assets/monster/fire boss/fireBoss.png', 256, 256);
          this.load.spritesheet('SandMinion', 'assets/monster/sand minion/SandMinion.png', 64, 64);
          this.load.spritesheet('WaterMinion', 'assets/monster/water minion/WaterMinion.png', 64, 64);
          this.load.spritesheet('EarthCrab', 'assets/monster/earth crab/EarthCrab.png', 256, 256);

          this.load.spritesheet('waterball', 'assets/spells/WaterBall.png', 32, 32);
          this.load.spritesheet('explosion_3', 'assets/effects/water_explosion.png', 64, 64);
          this.load.spritesheet('explosion_4', 'assets/effects/explosion_4.png', 128, 128);
          this.load.spritesheet('explosion_5', 'assets/effects/explosion_5.png', 256, 256);
          this.load.spritesheet('waterCannon', 'assets/spells/waterCannon.png', 320, 48);
          this.load.spritesheet('MetallicBoost', 'assets/spells/MetallicBoost.png', 128, 128);
          this.load.spritesheet('MetallicShift', 'assets/spells/MetallicShift.png', 128, 128);
          this.load.spritesheet('FireCannon', 'assets/spells/FireCannon.png', 512, 512);
          this.load.spritesheet('Wall', 'assets/spells/Wall.png', 64, 64);
          this.load.spritesheet('SandTornado', 'assets/spells/SandTornado.png', 230, 512);
          this.load.spritesheet('SandBall', 'assets/spells/SandBall.png', 128, 128);
          this.load.spritesheet('HealingLaser', 'assets/spells/HealingLaser.png', 96, 100);
          this.load.spritesheet('HealingCircle', 'assets/spells/HealingCircle.png', 128, 128);
          this.load.spritesheet('Smite', 'assets/spells/Smite.png', 96, 96);

          this.load.image('TutorialSign1', 'assets/objects/signs/TutorialSign1.png')
          this.load.image('TutorialSign2', 'assets/objects/signs/TutorialSign2.png')
          this.load.image('TutorialSign3', 'assets/objects/signs/TutorialSign3.png')
          this.load.image('TutorialSign4', 'assets/objects/signs/TutorialSign4.png')
          this.load.image('TutorialSign5', 'assets/objects/signs/TutorialSign5.png')

          

          this.load.spritesheet('orbs', 'assets/UI/orbs.png', 16, 16);
          this.load.spritesheet('orbs_2', 'assets/UI/orbs_2.png',32,32);
          this.load.spritesheet('healthBar_1', 'assets/UI/healthBar_1.png', 64,16);
          this.load.image('healthBar_2', 'assets/UI/healthBar_2.png');
          
          
          this.load.tilemap('Fire_Level', 'assets/Levels/Fire_Level.json', null, Phaser.Tilemap.TILED_JSON);
          this.load.tilemap('Wood_Level', 'assets/Levels/Wood_Level.json', null, Phaser.Tilemap.TILED_JSON);

          // music
          this.load.audio('openmusic', ['assets/music/openmusic.mp3', 'assets/music/openmusic.mp3']);
          this.load.audio('firemusic', ['assets/music/firemusic.mp3', 'assets/music/firemusic.mp3']);
          this.load.audio('pickup', ['assets/music/pickup.mp3', 'assets/music/pickup.mp3']);
          this.load.audio('jump', ['assets/music/jump.mp3', 'assets/music/jump.mp3']);
          this.load.audio('hit', ['assets/music/hit.mp3', 'assets/music/hit.mp3']);
          this.load.audio('hurt', ['assets/music/hurt.mp3', 'assets/music/hurt.mp3']);
          this.load.audio('explosion', ['assets/music/explosion.mp3', 'assets/music/explosion.mp3']);

          // wuxing
          this.load.image('wuxing', 'assets/UI/wuxing.png');

          this.load.image('spike', 'assets/objects/Spike.png');
    },

    create : function(){
      this.state.start('Menu');
    }
};