var FURNACE_FUEL_MAP = {    5: 300,     6: 100,     17: 300,    263: 1600,  280: 100,   268: 200,   269: 200,   270: 200,   271: 200,   85: 300,    107: 300,   134: 300,   135: 300,   158: 150,   162: 300,   163: 300,   164: 300,   184: 300,   185: 300,   186: 300,   187: 300,   53: 300,    54: 300,    58: 300 };

IDRegistry.genBlockID("emerald_furnace");
Block.createBlockWithRotation("emerald_furnace", [{
    name: "Emerald Furnace", 
    texture: [
        ["emerald_furnace_bottom", 0], // bottom
        ["emerald_furnace_top", 0], // top
        ["emerald_furnace_side", 0], // back
        ["emerald_furnace_front_off", 0], // front
        ["emerald_furnace_side", 0], // left
        ["emerald_furnace_side", 0]  // right
    ], 
    inCreative: true 
}]);


var furnaceEmerald = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Emerald Furnace"}},
        inventory: {standart:true},
        background: {standart: true}
    },
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "arrow_bar_background", scale: 3.2},
        {type: "bitmap", x: 450, y: 150, bitmap: "fire_background", scale: 3.2}
    ],

    elements:{
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotFuel": {type: "slot", x: 441, y: 212},
        "slotResult": {type: "slot", x: 625, y: 142},
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "arrow_bar_scale", scale: 3.2},
        "burningScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: 3.2}
    }
});



TileEntity.registerPrototype(BlockID.emerald_furnace, {
    defaultValues: {
        progress: 0,
        burn: 0,
        burnMax: 0
    },
    
    getGuiScreen: function(){
        return furnaceEmerald;
    },
    
    addTransportedItem: function(self, item, direction){
        var fuelSlot = this.container.getSlot("slotFuel");
        if(FURNACE_FUEL_MAP[item.id] && (fuelSlot.id==0 || fuelSlot.id==item.id && fuelSlot.data==item.data && fuelSlot.count < 64)){
            var add = Math.min(item.count, 64 - slotFuel.count);
            item.count -= add;
            fuelSlot.id = item.id;
            fuelSlot.data = item.data;
            fuelSlot.count += add;
            if(!item.count){return;}
        }
        
        var sourceSlot = this.container.getSlot("slotSource");
        if(sourceSlot.id==0 || sourceSlot.id==item.id && sourceSlot.data==item.data && sourceSlot.count < 64){
            var add = Math.min(item.count, 64 - sourceSlot.count);
            item.count -= add;
            sourceSlot.id = item.id;
            sourceSlot.data = item.data;
            sourceSlot.count += add;
            if(!item.count){return;}
        }
    },
    
    getTransportSlots: function(){
        return {input: ["slotSource", "slotFuel"], output: ["slotResult"]};
    },
    
    tick: function(){
        var sourceSlot = this.container.getSlot("slotSource");
        var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
        if(result && this.data.burn > 0){
            var resultSlot = this.container.getSlot("slotResult");
            if((resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0) && this.data.progress++ >= 90){
                sourceSlot.count--;
                resultSlot.id = result.id;
                resultSlot.data = result.data;
                resultSlot.count++;
                this.container.validateAll();
                this.data.progress = 0;
            }
        }
        else {
            this.data.progress = 0;
        }
        
        if(this.data.burn > 0){
            this.data.burn--;
        }
        else if(result){
            this.data.burn = this.data.burnMax = this.getFuel("slotFuel");
        }
        
        this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
        this.container.setScale("progressScale", this.data.progress / 90);
    },
    
    getFuel: function(slotName){
        var fuelSlot = this.container.getSlot(slotName);
        if(fuelSlot.id > 0){
            var burn = FURNACE_FUEL_MAP[fuelSlot.id];
            if(burn){
                fuelSlot.count--;
                this.container.validateSlot(slotName);
                return burn;
            }
            if(LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data) == "lava"){
                var empty = LiquidRegistry.getEmptyItem(fuelSlot.id, fuelSlot.data);
                fuelSlot.id = empty.id;
                fuelSlot.data = empty.data;
                return 20000;
            }
        }
        return 0;
    }
});