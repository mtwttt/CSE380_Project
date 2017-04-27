ObjectManager = function(){

    this.objects = new Array();


    this.add = function(object){
        this.objects.push(object);
    }

    this.remove = function(object){
        for(var i = 0 ; i<this.objects.length ; i++){
            if(this.objects[i] === object){
                this.objects.splice(i, 1);
            }
        }
    }

    this.update = function(){
        for(var i = 0; i<this.objects.length; i++){
            this.objects[i].update();
        }
    }

}