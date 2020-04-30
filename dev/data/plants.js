Ace3.addItem("emerald_seeds", "Emerald Seeds", {name:"EmeraldSeeds",meta:0},{});

Harvest.addGrassDrop(ItemID.emerald_seeds);

Ace3.addPlant({
blockID:"Emeraldcrop",
name:"emeraldcrop",
texture:"emerald_crop",
type:BLOCK_TYPE_CROP,
render:"crop",
seed:ItemID.emerald_seeds,
drop:ItemID.emerald
});