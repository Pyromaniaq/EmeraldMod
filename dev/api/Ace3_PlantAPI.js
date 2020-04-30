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