Ace3.addItem("emerald_cake_item", "Emerald Cake", {name:"EmeraldCake",meta:0},{stack:1});

IDRegistry.genBlockID("emerald_cake");


Ace3.addCake({
blockID:"emerald_cake",
name:"Emerald Cake",
texture:"emerald",
useItem:ItemID.emerald_cake_item,
saturation:3
});