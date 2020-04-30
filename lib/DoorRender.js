//Door Render by Pyrømaniaq.

LIBRARY({
    name:"Door",
    version:1,
    shared:true,
    api:"CoreEngine"
});



var Door = {
    
    add: function (params){
        Block.createBlockWithRotation(params.upper.id, [
        {name: params.upper.name, texture: [
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData]],    
        inCreative: false},
        {name: params.upper.name, texture: [
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData]],    
        inCreative: false},
        {name: params.upper.name, texture: [
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData]],    
        inCreative: false},
        {name: params.upper.name, texture: [
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData],
            [params.upper.texture, params.upper.textureData]],    
        inCreative: false}
        ]);
        Block.setBlockShape(BlockID[params.upper.id],{x:0,y:0,z:0},{x:1,y:1,z:3/16},0);
        Block.createBlockWithRotation(params.lower.id, [
        {name: params.lower.name, texture: [
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData]], 
        inCreative: false},
        {name: params.lower.name, texture: [
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData]], 
        inCreative: false},
        {name: params.lower.name, texture: [
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData]], 
        inCreative: false},
        {name: params.lower.name, texture: [
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData],
            [params.lower.texture, params.lower.textureData]], 
        inCreative: false}
        ]);
        Block.setBlockShape(BlockID[params.lower.id],{x:0,y:0,z:0},{x:1,y:1,z:3/16},0);
        Item.registerUseFunction(params.itemID, function(coords, item, block){  
            World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID[params.lower.id], block.data);
            World.setBlock(coords.relative.x, coords.relative.y+1, coords.relative.z, BlockID[params.upper.id], block.data);
        }); 
    },
    
    get: function (params){
        return this.add (params);
    }
}



EXPORT("Door",Door);