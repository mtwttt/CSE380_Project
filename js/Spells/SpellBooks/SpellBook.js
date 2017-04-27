var SpellBook = function(Game, x, y, name, sequence, attribute){
    
    this.Game = Game;
    this.name = name;
    this.sequence = sequence;
    this.attribute = attribute;

    

    this.sprite = Game.game.add.sprite(x, y, 'Spellbook');
    Game.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.gravity.y = 300;
    this.sprite.body.bounce.y = 0.3  

};
SpellBook.prototype.update = function(){
    this.Game.game.physics.arcade.collide(this.Game.platforms, this.sprite);
    if(this.Game.game.physics.arcade.overlap(this.Game.player.player, this.sprite)){
        this.learnMe();
    }
        
};

SpellBook.prototype.learnMe = function(){  
        
    this.Game.player.learn(this);
    this.sprite.destroy();
    this.Game.itemManager.remove(this);

};

SpellBook.prototype.cast = function(){
    
}
