var Mo = Mo || {};

//title screen
Mo.Game = function(){};
/*
    var player;
    var qKey;
    var wKey;
    var eKey;
    var rKey;
    var tKey;
    var spaceKey;

    var spellTree;
    var itemManager;
    var creatureManager;
    var objectManager;

    var mapLoader;
    var background;

    var map;
    var platforms;
    */  
//setting game configuration and loading the assets for the loading screen

Mo.Game.prototype = {

    init: function(level,getSpell){
        this.level = level;
        if(getSpell == null){
            this.getSpell = getSpell;
        }else{

            this.getSpell = getSpell;
        }
    },

  create: function() {
        this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.tKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.kKey = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.mKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.iKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.makenew = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.arrows = this.game.input.keyboard.createCursorKeys();

        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        this.background = this.game.add.sprite(0, 0, 'fire_background');
        this.background.fixedToCamera = true;
        
        // music
        music1 = this.game.add.audio('firemusic');
        music1.loopFull();
        //manager
        this.itemManager = new ItemManager();
        this.creatureManager = new CreatureManager();
        this.objectManager = new ObjectManager();

        //populating the map
        this.mapLoader = new MapLoader(this,this.getSpell);
        switch(this.level){
            case 'fire': this.mapLoader.createWorld('Fire_Level', 'Fire_Tile'); break;
            case 'wood': this.mapLoader.createWorld('Wood_Level', 'Tiles'); break;
        }
        
        

        //element bar
        this.fire = new Array();
        this.earth = new Array();
        this.wood = new Array();
        this.metal = new Array();
        this.water = new Array();
        for(var i = 0; i< 5 ; i++){
            this.fire[i] = this.game.add.image(this.game.camera.x +i*32, this.game.camera.y + 64, 'orbs_2', 1); 
            this.fire[i].fixedToCamera = true;
            
            this.earth[i] = this.game.add.image(this.game.camera.x + i*32, this.game.camera.y+ 32, 'orbs_2', 0); 
            this.earth[i].fixedToCamera = true;
            this.wood[i] = this.game.add.image(this.game.camera.x + i*32, this.game.camera.y+96, 'orbs_2', 2); 
            this.wood[i].fixedToCamera = true;
            this.metal[i] = this.game.add.image(this.game.camera.x + i*32, this.game.camera.y+128, 'orbs_2', 3); 
            this.metal[i].fixedToCamera = true;
            this.water[i] = this.game.add.image(this.game.camera.x + i*32 , this.game.camera.y+160, 'orbs_2', 4); 
            this.water[i].fixedToCamera = true;

        }

        this.healthBar_2 = this.game.add.image(this.game.camera.x, this.game.camera.y, 'healthBar_2');
        this.healthBar_2.width = 160;
        this.healthBar_2.height = 32;
        this.healthBar = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'healthBar_1');
        this.healthBar.animations.add('proceed', [0,1,2,3,4,5,6,7,8], 12, true);
        this.healthBar.width = 160;
        this.healthBar.height = 32;
        this.healthBar.fixedToCamera = true;
        this.healthBar_2.fixedToCamera = true;
  },
    update: function (){
        

        this.creatureManager.update();
        this.objectManager.update();
        this.itemManager.update();
        this.barsUpdate();
        this.healthBarUpdate();

    },

    barsUpdate : function(){
        for(var i = 1; i<=5; i++){
            if(this.player.fire<i){
                this.fire[i-1].visible = false;
            }
            else{
                this.fire[i-1].visible = true;
            }
            if(this.player.earth < i){
                this.earth[i-1].visible = false;
            }
            else{
                this.earth[i-1].visible = true;
            }
            if(this.player.wood < i){
                this.wood[i-1].visible = false;
            }
            else{
                this.wood[i-1].visible = true;
            }
            if(this.player.water < i){
                this.water[i-1].visible = false;
            }
            else{
                this.water[i-1].visible = true;
            }
            if(this.player.metal < i){
                this.metal[i-1].visible = false;
            }
            else{
                this.metal[i-1].visible = true;
            }
            this.fire[i-1].bringToTop();
            this.metal[i-1].bringToTop();
            this.earth[i-1].bringToTop();
            this.wood[i-1].bringToTop();
            this.water[i-1].bringToTop();
        }
    },

    healthBarUpdate : function(){
        this.healthBar.width = this.player.health/this.player.maxHealth * 160;
        this.healthBar.animations.play('proceed');
        this.healthBar_2.bringToTop();
        this.healthBar.bringToTop();

    }
};