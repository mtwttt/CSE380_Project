ItemManager = function(Game){

    this.items = new Array();


    this.add = function(item){
        this.items.push(item);
    }

    this.remove = function(item){
        for(var i = 0 ; i<this.items.length ; i++){
            if(this.items[i] === item){
                this.items.splice(i, 1);
            }
        }
    }

    this.update = function(){
        for(var i = 0; i<this.items.length; i++){
            this.items[i].update();
        }
    }

}