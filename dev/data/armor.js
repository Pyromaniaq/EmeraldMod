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