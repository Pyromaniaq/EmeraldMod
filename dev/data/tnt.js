IDRegistry.genBlockID("emerald_tnt");
Block.createBlock("emerald_tnt", [
	 {name: "Emerald TNT", texture: [
	   ["emerald_tnt_bottom",0],
	   ["emerald_tnt_top",0],
	   ["emerald_tnt_side",0],
  ],inCreative: true}
], "opaque");


var emeraldTNT = MobRegistry.registerEntity("emeraldTnt");

//emeraldTNT.setBaseType(65);


emeraldTNT.customizeEvents({
    tick:function(){
        if(this.setSkin === 0){
            //Entity.setRender(this.entity, 2);
            Entity.setSkin(this.entity, "entity/emerald_tnt.png");
        }
        if(this.setSkin != undefined && this.setSkin > -1){
           this.setSkin--;
        }
     Entity.getHealth(this.entity)+"/"+this.parent.description.getHealth();
     
     var x = Entity.getPosition(this.entity).x;
     var y = Entity.getPosition(this.entity).y;
     var z = Entity.getPosition(this.entity).z;
        if(Entity.getHealth(this.entity)>=1){
     Entity.setHealth(this.entity,Entity.getHealth(this.entity)-1);
     }
     if(Entity.getHealth(this.entity)==1){
     	Entity.remove(this.entity);
     	World.explode(x, y, z, 3,false);
     }
    },

    loaded:function(){
        this.setSkin = 5;
    },
         
    attackedBy: function(attacker) {
    }
       
});


emeraldTNT.customizeDescription({
	   getHealth: function() {
        return 80;
    },
    
    getHitbox: function() {
        return {
            w: 0,
            h: 0
        };
    },
	
});

Callback.addCallback("ItemUse", function (c, i, b){
  if(i.id == 259 || i.id == ItemID.emerald_FAS && (b.id == BlockID.emerald_tnt)){
    Game.prevent();
    World.setBlock(c.x,c.y,c.z,0,0);    
    Entity.spawnCustom("emeraldTnt", c.relative.x, c.relative.y + .5, c.relative.z);
    ToolLib.breakCarriedTool(1);
  }
});