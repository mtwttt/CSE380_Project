MapLoader = function(Game,getSpell){

     
    this.createWorld = function(levelName, tileName){
        //create tile map
        Game.map = Game.game.add.tilemap(levelName);
        Game.map.addTilesetImage(tileName, tileName);
        //blockedLayer

        createObjects(Game, Game.map);
        createCreatures(Game, Game.map);
        createItems(Game, Game.map);
        alert(getSpell);
        Game.player = createPlayer(getSpell);
        Game.creatureManager.add(Game.player);


        Game.platforms = Game.map.createLayer('BlockedLayer');
        Game.map.setCollisionBetween(1, 10000, true, 'BlockedLayer');
        Game.platforms.resizeWorld();



    }

    function stringToFunction (str) {
        var arr = str.split(".");

        var fn = (window || this);
        for (var i = 0, len = arr.length; i < len; i++) {
            fn = fn[arr[i]];
        }

        if (typeof fn !== "function") {
            throw new Error("function not found");
        }

        return  fn;
    }

    function findObjectsByType(type, layer){
        var result = new Array();
        Game.map.objects[layer].forEach(function(element){
            if(element.properties.type === type){
                element.y -= Game.map.tileHeight;
                result.push(element);
                
            }
        });
        return result;
    }

    function createPlayer(getSpell){
        this.getSpell = getSpell;
        var result = findObjectsByType('playerStart', 'ObjectsLayer')
        return new Player(Game, result[0].x, result[0].y,this.getSpell);
    }

    function createCreatures(){


        result = findObjectsByType('creature', 'ObjectsLayer');
        //call back
        result.forEach(function(element){
            var newCreature = stringToFunction(element.properties.name);
            Game.creatureManager.add(new newCreature(Game, element.x, element.y));
        }, this);
    }

    function createItems(){


        result = findObjectsByType('item', 'ObjectsLayer');
        //call back
        result.forEach(function(element){
            var newItem = stringToFunction(element.properties.name);
            Game.itemManager.add(new newItem(Game, element.x, element.y));
        }, this);
    }

    function createObjects(){


        result = findObjectsByType('object', 'ObjectsLayer');
            //call back
            result.forEach(function(element){
                var newObject = stringToFunction(element.properties.name);
                Game.objectManager.add(new newObject(Game, element.x, element.y));
            }, this);
        }

}