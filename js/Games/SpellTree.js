SpellTree = function(Game,getSpell){
    this.window;
    this.getSpell = getSpell;
    if(getSpell == null){
          this.learnedSpell = new Array();
          alert(getSpell);
    }else{
         this.learnedSpell = getSpell;
    }
    /*
    this.window = Game.game.add.image(0, 0, 'spellTreeWindow');
    this.window.visible = false;
    */
    //this.window = new Phaser.Rectangle(100,100,100,100);

    var nameArray = new Array();

    this.getTree = function(){
        return this.learnedSpell;
    }
    this.add = function(spellBook){
        this.learnedSpell.push(spellBook);
    }

    this.cast = function(sequence){
        
        var index = this.findSpell(sequence);
        if(index != -1){
            this.learnedSpell[index].cast();
            return this.learnedSpell[index].attribute;
        }
        else{
            return null;
        }
    }

    this.findSpell = function(sequence){
        for(var i = 0; i < this.learnedSpell.length; i++){
            if(sequence == this.learnedSpell[i].sequence){
                return i;
            }
        }
        return -1;
    }

    this.toggle = function(){
        if(this.window == undefined){
            this.window = Game.game.add.image(0, 0, 'spellTreeWindow');
            this.window.visible = false;
        }
        
        if(this.window.visible == true){
            for(var i = 0; i<nameArray.length; i ++){
                nameArray[i].kill();
            }
            nameArray = [];
            this.window.visible = false;
        }
        else{
            this.window.visible = true;
            var header = Game.game.add.text(0,0, 'Name'+'    '+'Attribute'+'    '+'Sequence')
            nameArray.push(header);
            for(var i = 0 ; i<this.learnedSpell.length; i++){
                
                var text = Game.game.add.text(0,0, this.learnedSpell[i].name+'   '+this.learnedSpell[i].attribute+'   '+this.learnedSpell[i].sequence);
                nameArray.push(text);
            }
        }
        
    }

    this.wuxing = function(){
        if(this.window2 == undefined){
            this.window2 = Game.game.add.image(0, 0, 'wuxing');
            this.window2.visible = false;
        }  
        if(this.window2.visible == true){
            this.window2.visible = false;
        }
        else{
            this.window2.visible = true;
        }
    }

    this.update = function(){
        if(this.window != undefined && this.window.visible){
            this.window.x = Game.game.camera.x + 300;
            this.window.y = Game.game.camera.y + 100;
        }

         if(this.window2 != undefined && this.window2.visible){
            this.window2.x = Game.game.camera.x + 300;
            this.window2.y = Game.game.camera.y + 100;
        }

        for(var i = 0; i<nameArray.length; i++){
            nameArray[i].x = this.window.x + 30;
            nameArray[i].y = this.window.y +30* i;
        }

        
    }

}