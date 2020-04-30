/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 16
*/



// file: /base.js

IMPORT("Ace3");
IMPORT("ToolLib");
IMPORT("Bow");



// file: /api/Ace3_PlantAPI.js

IMPORT("Harvest_Core");

var ageSpeedCrop = 0.067;
var growChanceCrop = 0.7;

CropRegistry.registerClass("harvestcraft_crop");
CropRegistry.registerClassConfig("harvestcraft_crop",{
    ageSpeed:ageSpeedCrop,
    manure:{id:351,data:15},
    farmland:[{id:60,data:0},{id:60,data:7}],
    seedsPlaceFunc:true,
    growStages:4
});

CropRegistry.setRegularFunctionsForClass("harvestcraft_crop",growChanceCrop,10);
CropRegistry.registerClassDeriveFunction("harvestcraft_crop",function(classs,idd){
    Recipes.addFurnaceFuel(CropRegistry.getSeedFromCrop(idd), 0, 60);
    var cfg = CropRegistry.getConfigFromCrop(idd);
    Harvest.registerDroppingBlock(idd);
    Block.setDestroyLevelForID (idd, 0);
    ToolAPI.registerBlockMaterial(idd, "plant");
    Block.setRandomTickCallback(idd,function(x,y,z,id,data){
        var chance = cfg.ageSpeed;
        if(Math.random()<chance&&data<3){
            World.setBlock(x,y,z,id,data+1);
for(var f in cfg.farmland){
            if(World.getBlockID(x,y-1,z)!=cfg.farmland[f].id&&World.getBlockData(x,y-1,z)!=cfg.farmland[f].data){
                World.destroyBlock(x,y,z,true);
            }
        }
        }
    });

    Block.registerDropFunction(idd, function(coords, blockID, blockData, level){
return[[ CropRegistry.getSeedFromCrop(idd), 1,0 ]];
    });
    
    ModAPI.addAPICallback("ForestryAPI", function(api){
        for(var m = 0;m<3;m++){ 
            api.BeeRegistry.FLOWERS_FLOWERS.push(idd+':'+m);
        }
    });
});

CropRegistry.registerClass("harvestcraft_garden");
CropRegistry.registerClassConfig("harvestcraft_garden",{
    farmland:[{id:60,data:0},{id:2,data:0},{id:3,data:0},{id:60,data:7}],
    seedsPlaceFunc:true
});

CropRegistry.registerClassDeriveFunction("harvestcraft_garden",function(classs,id){
Recipes.addFurnaceFuel(CropRegistry.getSeedFromCrop(id), 0, 120);
    Block.setDestroyLevelForID (id, 0);
    ToolAPI.registerBlockMaterial(id, "plant");
    Harvest.registerDroppingBlock(id);
    
    Callback.addCallback("ItemUse", function(coords, item, block){
        if(block.id==id){
Harvest.drop(CropRegistry.getSeedFromCrop(id),1,coords);
World.setBlock(coords.x,coords.y,coords.z,0,0);
        }
    });
    
ModAPI.addAPICallback("ForestryAPI", function(api){
api.BeeRegistry.FLOWERS_FLOWERS.push(id+':'+0);
});

});


Ace3.setPlantRender = function(id,type){
if(type=="crop"){
Block.setBlockShape(id,{x:0,y:0,z:0},{x:1,y:0.001,z:1});

BlockRenderer.addRenderCallback(id, function(api, coords,block){    
api.renderBoxId(coords.x, coords.y, coords.z, 0.2499, 0.01, 0, 0.25, 0.99, 1, id, block.data);
api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.2499, 1, 0.99, 0.25, id, block.data);  
api.renderBoxId(coords.x, coords.y, coords.z, 0.7499, 0.01, 0, 0.75, 0.99, 1, id, block.data);  
api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.7499, 1, 0.99, 0.75, id, block.data);                                      
});
BlockRenderer.enableCustomRender(id);
}
if(type=="tree"){
Block.setBlockShape(id,{x:0.25,y:0,z:0.25},{x:0.75,y:1,z:0.75});

BlockRenderer.addRenderCallback(id, function(api, coords,block){
api.renderBoxId(coords.x, coords.y, coords.z, 0.4999, 0.01, 0, 0.5, 0.99, 1, id, block.data);
api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.4999, 1, 0.99, 0.5, id, block.data);
});
BlockRenderer.enableCustomRender(id);
}
}


Ace3.dropPlant = function(blockID,itemID,itemID2,itemData){
if(!itemData) itemData=0;
Block.registerDropFunctionForID(blockID,function(coords,block,blockData,level,enchant){
Ace3.resetParticleDrop(coords);
if(blockData==0|blockData==1){
return [[itemID2,1,itemData]];
}
if(blockData==2){
return [[itemID,random(0,1),itemData],[itemID2,1,itemData]];
}
if(blockData==3){
return [[itemID,random(2,3),itemData],[itemID2,random(1,3),itemData]];
}
},0);
};


Ace3.addPlant = function(crop){
CropRegistry.registerWithID(crop.blockID,crop.name,crop.texture,crop.type);
if(crop.render=="tree") Ace3.setPlantRender(BlockID[crop.blockID],"tree");
if(crop.render=="crop") Ace3.setPlantRender(BlockID[crop.blockID],"crop");
CropRegistry.deriveCropAsClass("harvestcraft_crop",{
    id:BlockID[crop.blockID],
    drop:crop.drop,
    seed:crop.seed
});
Ace3.dropPlant(BlockID[crop.blockID],crop.drop,crop.seed);
};


Ace3.addGardenPlant = function(plant){
IDRegistry.genBlockID(plant.blockID);
Block.createBlock(plant.blockID,plant.prop,plant.type);
if(plant.render=="tree") Ace3.setPlantRender(BlockID[plant.blockID],"tree");
if(plant.render=="crop") Ace3.setPlantRender(BlockID[plant.blockID],"crop");
if(!plant.drop) plant.drop=0;
CropRegistry.deriveCropAsClass("harvestcraft_garden",{  
id:BlockID[plant.blockID],   
drop:plant.drop, 
seed:plant.seed
});
Harvest.addBlockGeneration({id:BlockID[plant.blockID],data:0},plant.genBiomes,plant.genCount,0.1);
};



// file: /data/items.js

Ace3.addItem("emerald_dust","Emerald Dust",{name:"EmeraldDust",meta:0},{stack:16});

//v1.1
Ace3.addItem("emerald_bone","Emerald Bone",{name:"EmeraldBone",meta:0},{});
Ace3.addItem("emerald_arrow","Emerald Arrow",{name:"EmeraldArrow",meta:0},{});
Ace3.addItem("emerald_rod","Emerald Rod",{name:"EmeraldRod",meta:0},{});
Ace3.addItem("emerald_star","Emerald Star",{name:"EmeraldStar",meta:0},{});
Ace3.addItem("emerald_FAS","Emerald Flint and Steel",{name:"EmeraldFAS",meta:0},{stack:1});

Item.setMaxDamage(ItemID.emerald_FAS,101);


Callback.addCallback('ItemUse', function (coords, item, block) {
if(item.id==ItemID.emerald_FAS){
World.setBlock(coords.relative.x,coords.relative.y,coords.relative.z,51,0);
World.playSoundAtEntity(Player.get(), "item.flintandsteel.use", 1)
ToolLib.breakCarriedTool(1);
}
});



// file: /data/food.js

Ace3.addFood("emerald_apple","Emerald Apple",{name:"EmeraldApple",meta:0},16);






// file: /data/block.js

IDRegistry.genBlockID("emerald_obsidian");
Block.createBlock("emerald_obsidian",[
     {name: "Emerald Obsidian", texture: [["emerald_obsidian", 0]], inCreative:true}
]);

/*IDRegistry.genBlockID("emerald_obsidian");
Block.createBlock("emerald_obsidian",[
     {name: "Emerald Obsidian", texture: [["emerald_obsidian", 0]], inCreative:true}
]);*/



// file: /data/tools.js

Ace3.addItem("emerald_sword","Emerald Sword",{name:"EmeraldSword",meta:0},{stack:1});
Ace3.addItem("emerald_pickaxe","Emerald Pickaxe",{name:"EmeraldPickaxe",meta:0},{stack:1});
Ace3.addItem("emerald_axe","Emerald Axe",{name:"EmeraldAxe",meta:0},{stack:1});
Ace3.addItem("emerald_shovel","Emerald Shovel",{name:"EmeraldShovel",meta:0},{stack:1});
Ace3.addItem("emerald_hoe","Emerald Hoe",{name:"EmeraldHoe",meta:0},{stack:1});
Ace3.addItem("emerald_sword_big","Big Emerald Sword",{name:"BigEmeraldSword",meta:0},{stack:1});
Ace3.addItem("emerald_khopesh","Emerald Khopesh",{name:"EmeraldKhopesh",meta:0},{stack:1});
Ace3.addItem("emerald_katana","Emerald Katana",{name:"EmeraldKatana",meta:0},{stack:1});
Ace3.addItem("emerald_axe_battle","Emerald Battle Axe",{name:"EmeraldBattleAxe",meta:0},{stack:1});
Ace3.addItem("emerald_staff","Emerald Staff",{name:"EmeraldStaff",meta:0},{stack:1});


ToolAPI.addToolMaterial("emerald", {durability: 2346, level: 3, efficiency: 6, damage: 3.5, enchantability: 14});
ToolAPI.addToolMaterial("emerald_big_sword", {durability: 2346, level: 3, efficiency: 6, damage: 10, enchantability: 14});
ToolAPI.addToolMaterial("emerald_axe_battle", {durability: 2346, level: 3, efficiency: 6, damage: 7, enchantability: 14});
ToolAPI.addToolMaterial("emerald_khopesh", {durability: 2346, level: 3, efficiency: 6, damage: 8, enchantability: 14});
ToolAPI.addToolMaterial("emerald_katana", {durability: 2346, level: 3, efficiency: 6, damage: 7, enchantability: 14});


ToolLib.setTool(ItemID.emerald_sword, "emerald", ToolType.sword);
ToolLib.setTool(ItemID.emerald_pickaxe, "emerald", ToolType.pickaxe);
ToolLib.setTool(ItemID.emerald_axe, "emerald", ToolType.axe);
ToolLib.setTool(ItemID.emerald_shovel, "emerald", ToolType.shovel);
ToolLib.setTool(ItemID.emerald_hoe, "emerald", ToolType.hoe);
ToolLib.setTool(ItemID.emerald_sword_big, "emerald_big_sword", ToolType.sword);
ToolLib.setTool(ItemID.emerald_khopesh, "emerald_khopesh", ToolType.sword);
ToolLib.setTool(ItemID.emerald_katana, "emerald_katana", ToolType.sword);
ToolLib.setTool(ItemID.emerald_axe_battle, "emerald_axe_battle", ToolType.sword);

Item.setMaxDamage(ItemID.emerald_staff,51);




// file: /data/armor.js

IDRegistry.genItemID("emerald_helmet");
Item.createArmorItem("emerald_helmet", "Emerald Helmet",
{name: "EmeraldHelmet"}, 
{type: "helmet", armor: 5, durability: 551, texture: "armor/emerald_1.png"
}); 

IDRegistry.genItemID("emerald_chestplate");
Item.createArmorItem("emerald_chestplate", "EmeraldChestplate",
{name: "EmeraldChestplate"}, 
{type: "chestplate", armor: 5, durability: 801, texture: "armor/emerald_1.png"
}); 

IDRegistry.genItemID("emerald_legs");
Item.createArmorItem("emerald_legs", "Emerald Leggings",
{name: "EmeraldLeggings"}, 
{type: "leggings", armor: 5, durability: 751, texture: "armor/emerald_2.png"
}); 

IDRegistry.genItemID("emerald_boots");
Item.createArmorItem("emerald_boots", "Emerald Boots",
{name: "EmeraldBoots"}, 
{type: "boots", armor: 5, durability: 651, texture: "armor/emerald_1.png"
});


Ace3.addArmorSetFuncs({
head:ItemID.emerald_helmet,
chest:ItemID.emerald_chestplate,
legs:ItemID.emerald_legs,
feet:ItemID.emerald_boots
},function(){
Ace3.addPlayerEffect(1,0,2);
Ace3.addPlayerEffect(8,1,2);
Ace3.addPlayerEffect(11,0,2);
});



// file: /data/pots.js

Ace3.addPotion({
ID:"emerald_potion_1",
name:"Emerald Potion",
texture:{name:"EmeraldPotion",meta:0}
},
function(effects){
Ace3.addPlayerEffect(16,0,600);
Ace3.addPlayerEffect(1,1,600);
Ace3.addPlayerEffect(3,0,600);
Ace3.addPlayerEffect(5,0,600);
Ace3.addPlayerEffect(6,0,600);
Ace3.addPlayerEffect(8,1,600);
Ace3.addPlayerEffect(9,1,30);
Ace3.addPlayerEffect(10,0,600);
Ace3.addPlayerEffect(11,0,600);
Ace3.addPlayerEffect(12,0,600);
Ace3.addPlayerEffect(13,0,600);
Ace3.addPlayerEffect(14,0,600);
});


Ace3.addSplashPotion({
ID:"emerald_potion_2",
name:"Emerald Splash Potion",
texture:{name:"EmeraldPotion2",meta:0}
},
function(effects){
Ace3.addPlayerEffect(16,0,600);
Ace3.addPlayerEffect(1,1,600);
Ace3.addPlayerEffect(3,0,600);
Ace3.addPlayerEffect(5,0,600);
Ace3.addPlayerEffect(6,0,600);
Ace3.addPlayerEffect(8,1,600);
Ace3.addPlayerEffect(9,1,30);
Ace3.addPlayerEffect(10,0,600);
Ace3.addPlayerEffect(11,0,600);
Ace3.addPlayerEffect(12,0,600);
Ace3.addPlayerEffect(13,0,600);
Ace3.addPlayerEffect(14,0,600);
});



// file: /data/plants.js

Ace3.addItem("emerald_seeds", "Emerald Seeds", {name:"EmeraldSeeds",meta:0},{});

Harvest.addGrassDrop(ItemID.emerald_seeds);

Ace3.addPlant({
blockID:"Emeraldcrop",
name:"emeraldcrop",
texture:"emerald_crop",
type:BLOCK_TYPE_CROP,
render:"crop",
seed:ItemID.emerald_seeds,
drop:ItemID.emerald
});



// file: /data/cake.js

Ace3.addItem("emerald_cake_item", "Emerald Cake", {name:"EmeraldCake",meta:0},{stack:1});

IDRegistry.genBlockID("emerald_cake");


Ace3.addCake({
blockID:"emerald_cake",
name:"Emerald Cake",
texture:"emerald",
useItem:ItemID.emerald_cake_item,
saturation:3
});



// file: /data/bow.js

IDRegistry.genItemID("emerald_bow");
Item.createItem("emerald_bow", "Emerald Bow", { name: "EmeraldBow", meta: 0 }, { stack: 1 });

Item.describeItem(ItemID.emerald_bow, {
    toolRender: true,
    maxDamage: 251,
    useAnimation: 4
});


var EmeraldBow = new Bow();

EmeraldBow.set({
    id: ItemID.emerald_bow,
    texture: "EmeraldBow",
    bullets: [ItemID.emerald_arrow],
    skin: "entity/emerald_arrow.png",
    speed: 2,
    damage: 3,
    variations: 3,
})



// file: /data/entities.js

var emeraldCow = MobRegistry.registerEntity("emerald_cow");
var emerald_cow_texture = new Texture("emerald_cow.png").setResolution(128, 64).setPixelScale(2);



//MobSpawnRegistry.registerSpawn("bird-blue", .2); // относительно редкий спавн птицы


IDRegistry.genItemID("emerald_cow_spawn");
Item.createItem("test-entity-spawn", "spawn test entity", {name: "stick"});



// file: /data/dimension/emerald.js

IMPORT("dimensions");

var Emerald = new Dimension({
    name: "emerald", // Название измерения
    
    generation: { //Генерация
        layers: [
        
        { 
    range: [0, 80],
    noise: {
        octaves: {
            count: 8,
            weight: 0.4,
            scale: [1, 0.4, 1]
        }
    },
                
    gradient: [
    [0, 1], 
    [1, -1], 
    [-0.2, 0.2], 
    [0.2, 0.9],  
    [1, 0.1]],
    terrain: {
        base: 1,
        cover: {
             height: 4,
             top: 2,
             block: 3
        },
    }
}
    
        ],
        
        decoration: {
            
        }
    },
    
    environment: {
        
    },
    
    callbacks: { 
        // Основные коллбеки измерения
        // Здесь приведены все коллбеки измерений, ненужные можно опустить.
        tick: function() { 
            
        },

        generateChunk: function(chunkX, chunkZ) { 
            // Генерация чанка
        },

        loaded: function() {
            // Загрузка измерения
        },

        unloaded: function() {
            // Выгрузка  измерения
        }
    }   
});

var EmeraldTransferSequence = new TransferSequence(Emerald);
EmeraldTransferSequence.setPortalTimeout(40);

EmeraldTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "emerald_portal_overlay_animation"
}));

EmeraldTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});


PortalRegistry.newPortalBlock("portalEmerald", ["emerald_portal", 0], EmeraldTransferSequence.getPortal(), {type: "u-plane", frameId: 4}, true);
EmeraldTransferSequence.setPortalTiles(BlockID.portalEmerald);


var shape = new PortalShape();
shape.setPortalId(BlockID.portalEmerald);
shape.setFrameIds(BlockID.emerald_obsidian);
shape.setMinSize(2, 3);

EmeraldTransferSequence.setPortalBuilder(shape.getBuilder());


Callback.addCallback("ItemUse", function(coords, item) {
    if (item.id == ItemID.emerald_FAS) {
        Game.prevent();
        ToolLib.breakCarriedTool(1);
        var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
        if (rect) {
            shape.buildPortal(rect, false);
        }
    }
});

Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == BlockID.emerald_obsidian || block.id == BlockID.portalEmerald) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.portalEmerald, [4]);
    }
});



// file: /data/craft/default.js

Callback.addCallback("PostLoaded", function(){

Recipes.addShaped({id:ItemID.emerald_helmet,count:1,data:0},[
    "aaa",
    "a a",
    ""
],["a",388,0]); 

Recipes.addShaped({id:ItemID.emerald_chestplate,count:1,data:0},[
    "a a",
    "aaa",
    "aaa"
],["a",388,0]); 

Recipes.addShaped({id:ItemID.emerald_legs,count:1,data:0},[
    "aaa",
    "a a",
    "a a"
],["a",388,0]); 

Recipes.addShaped({id:ItemID.emerald_boots,count:1,data:0},[
    "",
    "a a",
    "a a"
],["a",388,0]); 

Recipes.addShaped({id:ItemID.emerald_arrow,count:8,data:0},[
    "a",
    "b",
    "c"
],["a",318,0,"b",ItemID.emerald_rod,0,"c",288,0]);

Recipes.addShaped({id:ItemID.emerald_khopesh,count:1,data:0},[
    " a ",
    "  a",
    " b "
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_axe_battle,count:1,data:0},[
    "aaa",
    "aba",
    " b "
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_pickaxe,count:1,data:0},[
    "aaa",
    " b ",
    " b "
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_sword,count:1,data:0},[
    "a",
    "a",
    "b"
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_shovel,count:1,data:0},[
    "a",
    "b",
    "b"
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_axe,count:1,data:0},[
    "aa ",
    "ab ",
    " b "
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_hoe,count:1,data:0},[
    "aa ",
    " b ",
    " b "
],["a",388,0,"b",280,0]);

Recipes.addShaped({id:ItemID.emerald_bow,count:1,data:0},[
    " ab",
    "a b",
    " ab"
],["a",388,0,"b",287,0]);

Recipes.addShaped({id:ItemID.emerald_sword_big,count:1,data:0},[
    " aa",
    "aba",
    "ca"
],["a",388,0,"b",133,0,"c",280,0]);

Recipes.addShaped({id:ItemID.emerald_star,count:1,data:0},[
    " a ",
    "aba",
    " a "
],["a",388,0,"b",399,0]);

Recipes.addShaped({id:ItemID.emerald_staff,count:1,data:0},[
    "  a",
    " b ",
    "b"
],["a",388,0,"b",280,0]);


Recipes.addShaped({id:ItemID.emerald_potion_1,count:1,data:0},[
    "abc",
    "ded",
    " f "
],["a",466,0,"b",ItemID.emerald_dust,0,"c",ItemID.emerald_apple,0,"d",ItemID.emerald_rod,0,"e",388,0,"f",374,0]);

Recipes.addShaped({id:ItemID.emerald_cake_item,count:1,data:0},[
    "aaa",
    "bcb",
    "ddd"
],["a",325,1,"b",ItemID.emerald_seeds,0,"c",344,0,"d",296,0]);

Recipes.addShaped({id:BlockID.emerald_obsidian,count:4,data:0},[
    " a ",
    "aba",
    " a "
],["a",49,0,"b",388,0]);


});



// file: /data/craft/shapeless.js

Callback.addCallback("PostLoaded", function(){

Recipes.addShapeless({id:ItemID.emerald_apple,count:3,data:0},[{id:260,data:0},{id:388,data:0}]);

Recipes.addShapeless({id:ItemID.emerald_dust,count:2,data:0},[{id:ItemID.emerald_rod,data:0}]); 

Recipes.addShapeless({id:ItemID.emerald_seeds,count:3,data:0},[{id:388,data:0}]); 

Recipes.addShapeless({id:ItemID.emerald_FAS,count:1,data:0},[{id:388,data:0},{id:318,data:0}]); 

Recipes.addShapeless({id:ItemID.emerald_potion_2,count:1,data:0},[{id:289,data:0},{id:ItemID.emerald_potion_1,data:0}]); 

Recipes.addShapeless({id:ItemID.emerald_bone,count:1,data:0},[{id:352,data:0},{id:ItemID.emerald_dust,data:0}]); 


});



// file: /localisation/ru_RU.js

