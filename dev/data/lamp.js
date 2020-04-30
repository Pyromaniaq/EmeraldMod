IDRegistry.genBlockID("emerald_lamp");
IDRegistry.genBlockID("emerald_lamp_on");

Block.createSpecialType({
	solid: true,
	destroytime: 2,
	explosionres: 5,
	lightlevel: 15,
	renderlayer: 3
}, "lamp_on");
Block.createSpecialType({
	solid: true,
	destroytime: 2,
	explosionres: 5,
	renderlayer: 3
}, "lamp_off");

Block.createBlock("emerald_lamp", [
	{name: "Emerald Lamp", texture: [["emerald_lamp", 0]], inCreative: true}], "lamp_off");
Block.createBlock("emerald_lamp_on", [
	{name: "Emerald Activated Lamp", texture: [["emerald_lamp_on", 0]], inCreative: true}], "lamp_on");
	
Block.registerDropFunction("emerald_lamp", function(coords, blockID, blockData, level){
	return [];
});
Block.registerDropFunction("emerald_lamp_on", function(coords, blockID, blockData, level){
	return [];
});


TileEntity.registerPrototype(BlockID.emerald_lamp, { 

defaultValues: { 
activated: false
}, 

redstone: function(params){
	if(!this.data.activated && params.power){
		this.selfDestroy();
		World.setBlock(this.x,this.y,this.z,BlockID.emerald_lamp_on,0);
		var tile = World.addTileEntity(this.x,this.y,this.z);
		tile.data.activated = false;
	}
	if(this.data.activated && !params.power){
		this.selfDestroy();
		World.setBlock(this.x,this.y,this.z,BlockID.emerald_lamp_on,0);
		var tile = World.addTileEntity(this.x,this.y,this.z);
		tile.data.activated = true;
	}
}, 

 destroyBlock: function(coords, player){
	if(this.data.activated){
		World.drop(coords.x, coords.y, coords.z, BlockID.emerald_lamp, 1, 0);
	}else{
		World.drop(coords.x, coords.y, coords.z, BlockID.emerald_lamp, 1, 0);
	}
	}

});


TileEntity.registerPrototype(BlockID.emerald_lamp_on, { 

defaultValues: { 
activated: true
}, 

redstone: function(params){
	if(!this.data.activated && !params.power){
		this.selfDestroy();
		World.setBlock(this.x,this.y,this.z,BlockID.emerald_lamp,0);
		var tile = World.addTileEntity(this.x,this.y,this.z);
		tile.data.activated = false;
	}
	if(this.data.activated && params.power){
		this.selfDestroy();
		World.setBlock(this.x,this.y,this.z,BlockID.emerald_lamp,0);
		var tile = World.addTileEntity(this.x,this.y,this.z);
		tile.data.activated = true;
	}
}, 

 destroyBlock: function(coords, player){
	if(this.data.activated){
		World.drop(coords.x, coords.y, coords.z, BlockID.emerald_lamp, 1, 0);
	}else{
		World.drop(coords.x, coords.y, coords.z, BlockID.emerald_lamp, 1, 0);
	}
	}

});


Block.registerPlaceFunction("emerald_lamp", function(coords, item, block){
	Game.prevent();
	block = World.getBlockID(coords.relative.x, coords.relative.y, coords.relative.z);
	if(GenerationUtils.isTransparentBlock(block)){
		World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, item.data);
		World.addTileEntity(coords.relative.x, coords.relative.y, coords.relative.z);
}
});

Block.registerPlaceFunction("emerald_lamp_on", function(coords, item, block){
	Game.prevent();
	block = World.getBlockID(coords.relative.x, coords.relative.y, coords.relative.z);
	if(GenerationUtils.isTransparentBlock(block)){
		World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, item.id, item.data);
		World.addTileEntity(coords.relative.x, coords.relative.y, coords.relative.z);
	 }
});