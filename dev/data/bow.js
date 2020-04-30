IDRegistry.genItemID("emerald_bow");
Item.createItem("emerald_bow", "Emerald Bow", { name: "EmeraldBow", meta: 0 }, { stack: 1 });

Item.describeItem(ItemID.emerald_bow, {
    toolRender: true,
    maxDamage: 251,
    useAnimation: 4
});


var EmeraldBow = new Bow();

EmeraldBow.set({
    id: ItemID.emerald_bow,
    texture: "EmeraldBow",
    bullets: [ItemID.emerald_arrow],
    skin: "entity/emerald_arrow.png",
    speed: 2,
    damage: 3,
    variations: 3,
})