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