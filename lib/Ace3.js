//Ace3 lib by Pyrømaniaq.

LIBRARY({
    name:"Ace3",
    version:1.2,
    shared:true,
    api:"CoreEngine"
});


function random(min,max){
return Math.round((Math.random()*max)+min)
}


var BLOCK_TYPE_CAKE = Block.createSpecialType({
base:92,
destroytime:0.5
});


var Ace3 = {

entities: [],

Local: {
    RU: function(str,RU){
        Translation.addTranslation(str,{ru:RU});
        },
    EN: function(str,EN){
        Translation.addTranslation(str,{en:EN});
        },
    ZH: function(str,ZH){
        Translation.addTranslation(str,{zh:ZH});
        },
    ES: function(str,ES){
        Translation.addTranslation(str,{es:ES});
        },
    FR: function(str,FR){
        Translation.addTranslation(str,{fr:FR});
        },
    JA: function(str,JA){
        Translation.addTranslation(str,{ja:JA});
        },
    DE: function(str,DE){
        Translation.addTranslation(str,{de:DE});
        },
    PT: function(str,PT){
        Translation.addTranslation(str,{pt:PT});
        },
    NL: function(str,NL){
        Translation.addTranslation(str,{nl:NL});
        },
    KO: function(str,KO){
        Translation.addTranslation(str,{ko:KO});
        }
}
}


Ace3.addItem = function(id,name,textures,properties){
IDRegistry.genItemID(id);
Item.createItem(id,name,textures,properties);
};


Ace3.addFood = function(id,name,texture,sat,stack,isTech){
IDRegistry.genItemID(id);
if(!isTech) isTech = false;
if(!stack) stack = 64;
Item.createFoodItem(id,name,texture,{food:sat,isTech:isTech,stack:stack});
};


Ace3.addThrowableItem = function(id,name,texture,properties,func){
IDRegistry.genItemID(id);
Item.createThrowableItem(id,name,texture,properties);
if(func){
Item.registerThrowableFunction(id, function(projectile,item,target){
var item=Player.getCarriedItem();
if(item.id==ItemID[id]){
Player.decreaseCarriedItem(1);
return func();
}
});
}
};


Ace3.addCake = function(cake,effects,render){
var bid = BlockID[cake.blockID];
Block.createBlock(cake.blockID,
[{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false},
{name:cake.name,texture:[
[cake.texture+"_cake_bottom",0],
[cake.texture+"_cake_top",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_side",0],
[cake.texture+"_cake_inner",0]],
inCreative:false}],BLOCK_TYPE_CAKE);
if(!render){
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:15/16,y:.5,z:15/16},0);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:13/16,y:.5,z:15/16},1);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:11/16,y:.5,z:15/16},2);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:9/16,y:.5,z:15/16},3);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:7/16,y:.5,z:15/16},4);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:5/16,y:.5,z:15/16},5);
Block.setBlockShape(bid,{x:1/16,y:0,z:1/16},{x:3/16,y:.5,z:15/16},6);
}else render();
Callback.addCallback("ItemUse",function(c,i,b){
var Saturation = 2;
if(i.id==cake.useItem&&b.id!=199){
World.setBlock(c.relative.x,c.relative.y,c.relative.z,bid,0);
Player.decreaseCarriedItem(1);
}
var gh=Player.getHunger();
var sh=Player.setHunger;
var gSat=Player.getSaturation();
var sSat=Player.setSaturation;
if(b.id==bid){
Game.prevent();
if(gh<20){
switch(b.data){
case 0:
if(cake.slice==2){
World.setBlock(c.x,c.y,c.z,bid,3);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
}else{
World.setBlock(c.x,c.y,c.z,bid,1);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}}
if(effects) return effects(c,i,b);
break;
case 1:
World.setBlock(c.x,c.y,c.z,bid,2);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
if(effects) return effects(c,i,b);
break;
case 2:
World.setBlock(c.x,c.y,c.z,bid,3);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
if(effects) return effects(c,i,b);
break;
case 3:
if(cake.slice==2){
World.setBlock(c.x,c.y,c.z,0,0);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
}else{
World.setBlock(c.x,c.y,c.z,bid,4);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}}
if(effects) return effects(c,i,b);
break;
case 4:
World.setBlock(c.x,c.y,c.z,bid,5);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
if(effects) return effects(c,i,b);
break;
case 5:
World.setBlock(c.x,c.y,c.z,bid,6);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
if(effects) return effects(c,i,b);
break;
case 6:
World.setBlock(c.x,c.y,c.z,0,0);
if(!cake.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+cake.saturation);
sSat(gSat+cake.saturation);
}
if(effects) return effects(c,i,b);
break;
}}}
});
Block.registerDropFunctionForID(bid,function(coords,blockID,blockData,level,enchant){
return [];
},0);
};


Ace3.addRulette = function(rul,effects,render){
var bid = BlockID[rul.blockID];
if(rul.normal){
Block.createBlock(rul.blockID,
[{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false}],BLOCK_TYPE_CAKE);
}

if(rul.bothside){
Block.createBlock(rul.blockID,
[{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false},
{name:rul.name,texture:[
[rul.texture+"_cake_bottom",0],
[rul.texture+"_cake_top",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_inner",0],
[rul.texture+"_cake_side",0],
[rul.texture+"_cake_side",0]],
inCreative:false}],BLOCK_TYPE_CAKE);
}
if(!render){
Block.setBlockShape(bid,{x:4/16,y:0,z:1/16},{x:12/16,y:.5,z:15/16},0);
Block.setBlockShape(bid,{x:4/16,y:0,z:1/16},{x:12/16,y:.5,z:11/16},1);
Block.setBlockShape(bid,{x:4/16,y:0,z:1/16},{x:12/16,y:.5,z:7/16},2);
} else render();
Callback.addCallback("ItemUse",function(c,i,b){
var Saturation = 2;
if(i.id==rul.useItem&&b.id!=199){
World.setBlock(c.relative.x,c.relative.y,c.relative.z,bid,0);
Player.decreaseCarriedItem(1);
}
var gh=Player.getHunger();
var sh=Player.setHunger;
var gSat=Player.getSaturation();
var sSat=Player.setSaturation;
if(b.id==bid){
Game.prevent();
if(gh<20){
switch(b.data){
case 0:
World.setBlock(c.x,c.y,c.z,bid,1);
if(!rul.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+rul.saturation);
sSat(gSat+rul.saturation);
}
if(effects) return effects();
break;
case 1:
World.setBlock(c.x,c.y,c.z,bid,2);
if(!rul.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+rul.saturation);
sSat(gSat+rul.saturation);
}
if(effects) return effects();
break;
case 2:
World.setBlock(c.x,c.y,c.z,0,0);
if(!rul.saturation){
sh(gh+Saturation);
sSat(gSat+Saturation);
}else{
sh(gh+rul.saturation);
sSat(gSat+rul.saturation);
}
if(effects) return effects();
break;
}}}
});
Block.registerDropFunctionForID(bid,function(coords,blockID,blockData,level,enchant){
return [];
},0);
};


Ace3.addPotion = function(pot, effects){
IDRegistry.genItemID(pot.ID);
if(!pot.stack) pot.stack = 1;
if(!pot.isTech) pot.isTech = false;
Item.createFoodItem(pot.ID,pot.name,pot.texture,{food:0,isTech:pot.isTech,stack:pot.stack});

Callback.addCallback("FoodEaten", function (heal, satRatio){
var item=Player.getCarriedItem();
if(item.id==ItemID[pot.ID]){
if(pot.isPotion) Player.addItemToInventory(374,1,0);
if(effects) return effects();
}
});

Callback.addCallback("tick",function(){
var item=Player.getCarriedItem();
if(item.id==ItemID[pot.ID]&&Player.getHunger()>=20){
Player.setHunger(19);
}
});
};


Ace3.addSplashPotion = function(pot, effects){
IDRegistry.genItemID(pot.ID);
if(!pot.stack) pot.stack = 1;
if(!pot.range) pot.range = 4;
if(!pot.isTech) pot.isTech = false;
Item.createThrowableItem(pot.ID,pot.name,pot.texture,{isTech:pot.isTech,stack:pot.stack});

Item.registerThrowableFunctionForID (ItemID[pot.ID], function(projectile,item,target){
var Item=Player.getCarriedItem();
if(Item.id==ItemID[pot.ID]){
if(effects){
Player.decreaseCarriedItem(1);
for(var i=0;i<100;i++){
Particles.addParticle(5,target.x, target.y+0.5, target.z, random(-0.5,0.8), random(-0.5,0.7), random(-0.5,0.8),0);
}
var player = Player.getPosition();
var bx = target.x-player.x;
var by = target.y-player.y;
var bz = target.z-player.z;
if(bx*bx+by*by+bz*bz<=pot.range*pot.range){
return effects();
}
}}
});
};


Ace3.addPlayerEffect = function(effect,value,tick){
Entity.addEffect(Player.get(),effect,value,tick*20,false,false);
};


Ace3.addSpawnItem = function(itemID,name,img,prop){
if(!prop.isTech) prop.isTech=false;
if(!prop.stack) prop.stack=16;
IDRegistry.genItemID(itemID);

Item.createItem(itemID,name, {name:img.texture,meta:img.data},{stack:prop.stack,isTech:prop.isTech});

if(prop.reaction=="f") Ace3.entities.push({F:itemID});
if(prop.reaction=="e") Ace3.entities.push({E:itemID});
if(!prop.dimension) prop.dimension=="all";

Item.registerUseFunction(itemID,function(coords,item,block){
for(var c in Ace3.entities){
if(prop.dimension=="world"){
if(Player.getDimension()==1|Player.getDimension()==2){
return;
}}
if(prop.dimension=="nether"){
if(Player.getDimension()==0|Player.getDimension()==2){
return;
}}
if(prop.dimension=="end"){
if(Player.getDimension()==0|Player.getDimension()==1){
return;
}}
if(itemID==Ace3.entities[c].F){
Game.message("§aFriend");
if(prop.spawn&&!prop.rider&&!prop.mount){
Entity.spawn(coords.relative.x,coords.relative.y,coords.relative.z,prop.spawn);
Player.decreaseCarriedItem(1);
}}
if(itemID==Ace3.entities[c].E&&Game.getDifficulty()!=0){
Game.message("§cEnemy");
if(prop.spawn&&!prop.rider&&!prop.mount){ 
Entity.spawn(coords.relative.x,coords.relative.y,coords.relative.z,prop.spawn);
Player.decreaseCarriedItem(1);
}}

if(prop.rider&&prop.mount&&!prop.spawn){
var mob_1=Entity.spawn(coords.relative.x,coords.relative.y,coords.relative.z,prop.rider);
var mob_2=Entity.spawn(coords.relative.x,coords.relative.y,coords.relative.z,prop.mount);
Entity.rideAnimal(mob_1,mob_2);
}}
});
};


/*Ace3.addArmor = function(id,name,texture,prop,func){
IDRegistry.genItemID(id);
Item.createArmorItem(id,name,texture,prop);

if(func){
Armor.registerFuncs(id,{
tick: function(slot, inventory, index){
return func(slot,inventory,index);
}
});
}
}*/


Ace3.addArmorSetFuncs = function(armSet,func){

Callback.addCallback("tick", function(){
var helmet = Player.getArmorSlot(0);
var chestplate = Player.getArmorSlot(1);
var leggings = Player.getArmorSlot(2);
var boots = Player.getArmorSlot(3);
if(helmet.id==armSet.head&&chestplate.id==armSet.chest&&leggings.id==armSet.legs&&boots.id==armSet.feet){
return func();
}
});
}


Ace3.addOre = function(ore,prop,meta,generate,customDrop){
IDRegistry.genBlockID(ore);
Block.createBlock(ore,prop,"opaque");
Block.setDestroyTime(BlockID[ore],meta.destroytime);
ToolAPI.registerBlockMaterial(BlockID[ore], "stone",meta.destroylevel,true);
Block.setDestroyLevel(ore,meta.destroylevel);
if(customDrop){
Block.registerDropFunction(ore,function(coords,blockID,blockData,level,enchant){
return customDrop(coords,blockID,blockData,level,enchant);
},meta.destroylevel);
}

if(generate.NORMAL_UNDERGROUND){
Callback.addCallback("PostLoaded", function(){
Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
for(var i = 0; i < generate.NORMAL_UNDERGROUND.rare; i++){
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, generate.NORMAL_UNDERGROUND.minY, generate.NORMAL_UNDERGROUND.maxY);
GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[ore], 0, generate.NORMAL_UNDERGROUND.count);
}
});
});
}

if(generate.NORMAL){
Callback.addCallback("PostLoaded", function(){
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < generate.NORMAL.rare; i++){
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, generate.NORMAL.minY, generate.NORMAL.maxY);
GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[ore], 0, generate.NORMAL.count);
}
});
});
}

if(generate.NETHER){
Callback.addCallback("PostLoaded", function(){
Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < generate.NETHER.rare; i++){
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, generate.NETHER.minY, generate.NETHER.maxY);
GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[ore], 0, generate.NETHER.count);
}
});
});
}

if(generate.END){
Callback.addCallback("PostLoaded", function(){
Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
for(var i = 0; i < generate.END.rare; i++){
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, generate.END.minY, generate.END.maxY);
GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID[ore], 0, generate.END.count);
}
});
});
}
}


Ace3.resetParticleDrop = function(coords){
Game.prevent();
World.setBlock(coords.x,coords.y,coords.z,0,0);
}


Ace3.addEntityDrop = function(entity,id,count,data){
Callback.addCallback("EntityDeath",function(ent){
var coords=Entity.getPosition(ent);
var type=Entity.getType(ent);
if(type==entity){
World.drop(coords.x,coords.y,coords.z,id,count,data);
}
});
}


Ace3.clearInventory = function(){
for(var i=0;i<44;i++){
Player.setInventorySlot(i,0,0,0);
}
};




EXPORT("Ace3", Ace3);
EXPORT("BLOCK_TYPE_CAKE",  BLOCK_TYPE_CAKE);
EXPORT("random", random);