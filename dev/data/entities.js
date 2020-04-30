var emeraldCow = MobRegistry.registerEntity("emerald_cow");
//var emerald_cow_texture = new Texture("emerald_cow.png").setResolution(128, 64).setPixelScale(2);
//var emerald_cow_texture = new Texture("emerald_cow.png");
//MobSpawnRegistry.registerSpawn("bird-blue", .2); // относительно редкий спавн птицы
emeraldCow.setBaseType(11);

IDRegistry.genItemID("emerald_cow_spawn");
Item.createItem("emerald_cow_spawn", "Emerald Cow Spawn", {name: "stick"});

Item.registerUseFunction("emerald_cow_spawn", function(coords, item, block){
Entity.spawnCustom("emerald_cow", coords.relative.x + .5, coords.relative.y + .5, coords.relative.z + .5);
});


emeraldCow.customizeEvents({
    tick:function(){
        if(this.setSkin === 0){
            Entity.setRender(this.entity, 6);
            Entity.setSkin(this.entity, "entity/emerald_cow.png");
        }
        if(this.setSkin != undefined && this.setSkin > -1){
           this.setSkin--;
        }
    },

    loaded:function(){
        this.setSkin = 5;
    },
    
        getHealth: function() {
        return maxHealth;
    },
    
    getHitbox: function() {
        // возвращает ширину и высоту хитбокса моба, если не задана, его размеры будут 1, 1
        return {
            w: 1,
            h: 2
        };
    },
    
    getDrop: function() {
      return [{
         id: 388,
         count: {min: 0, max: 5},
         separate: true, chance: 0.5
    }];
    },
 
 
});






var emeraldWolf = MobRegistry.registerEntity("emerald_wolf");
//MobSpawnRegistry.registerSpawn("bird-blue", .2); // относительно редкий спавн птицы


IDRegistry.genItemID("emerald_wolf_spawn");
Item.createItem("emerald_wolf_spawn", "Emerald Wolf Spawn", {name: "stick"});

Item.registerUseFunction("emerald_wolf_spawn", function(coords, item, block){
Entity.spawnCustom("emerald_wolf", coords.relative.x + .5, coords.relative.y + .5, coords.relative.z + .5);
});
emeraldWolf.setBaseType(14);

emeraldWolf.customizeEvents({
    tick:function(){
        if(this.setSkin === 0){
            Entity.setRender(this.entity, 11);
            Entity.setSkin(this.entity, "entity/emerald_wolf_default.png");
        }
        if(this.setSkin != undefined && this.setSkin > -1){
           this.setSkin--;
        }
    },

    loaded:function(){
        this.setSkin = 5;
    },
    
    getHealth: function() {
        return maxHealth;
    },
    
    getHitbox: function() {
        return {
            w: 1,
            h: 1
        };
    },
    
    getDrop: function() {
      return [{
         id: 388,
         count: {min: 0, max: 5},
         separate: true, chance: 0.5
    }];
    },
 
    attackedBy: function(attacker) {
      Entity.setTarget(this.entity,attacker);
      Entity.setSkin(this.entity, "entity/emerald_wolf_angry.png");
    },
  
});