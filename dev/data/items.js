Ace3.addItem("emerald_dust","Emerald Dust",{name:"EmeraldDust",meta:0},{stack:16});

//v1.1
Ace3.addItem("emerald_bone","Emerald Bone",{name:"EmeraldBone",meta:0},{});
Ace3.addItem("emerald_arrow","Emerald Arrow",{name:"EmeraldArrow",meta:0},{});
Ace3.addItem("emerald_rod","Emerald Rod",{name:"EmeraldRod",meta:0},{});
Ace3.addItem("emerald_star","Emerald Star",{name:"EmeraldStar",meta:0},{});
Ace3.addItem("emerald_FAS","Emerald Flint and Steel",{name:"EmeraldFAS",meta:0},{stack:1});
Ace3.addItem("emerald_door","Emerald Door",{name:"EmeraldDoor",meta:0},{stack:1});

Item.setMaxDamage(ItemID.emerald_FAS,101);


Callback.addCallback('ItemUse', function (coords, item, block) {
if(item.id==ItemID.emerald_FAS){
World.setBlock(coords.relative.x,coords.relative.y,coords.relative.z,51,0);
World.playSoundAtEntity(Player.get(), "item.flintandsteel.use", 1)
ToolLib.breakCarriedTool(1);
}
});