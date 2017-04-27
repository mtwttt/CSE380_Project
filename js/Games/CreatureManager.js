CreatureManager = function(){

    this.creatures = new Array();


    this.add = function(creature){
        this.creatures.push(creature);
    }

    this.remove = function(creature){
        for(var i = 0 ; i<this.creatures.length ; i++){
            if(this.creatures[i] === creature){
                this.creatures.splice(i, 1);
            }
        }
    }

    this.update = function(){
        for(var i = 0; i<this.creatures.length; i++){
            this.creatures[i].update();
        }
    }

}