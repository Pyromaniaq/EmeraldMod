Ace3.addItem("emerald_sword","Emerald Sword",{name:"EmeraldSword",meta:0},{stack:1});
Ace3.addItem("emerald_pickaxe","Emerald Pickaxe",{name:"EmeraldPickaxe",meta:0},{stack:1});
Ace3.addItem("emerald_axe","Emerald Axe",{name:"EmeraldAxe",meta:0},{stack:1});
Ace3.addItem("emerald_shovel","Emerald Shovel",{name:"EmeraldShovel",meta:0},{stack:1});
Ace3.addItem("emerald_hoe","Emerald Hoe",{name:"EmeraldHoe",meta:0},{stack:1});
Ace3.addItem("emerald_sword_big","Big Emerald Sword",{name:"BigEmeraldSword",meta:0},{stack:1});
Ace3.addItem("emerald_khopesh","Emerald Khopesh",{name:"EmeraldKhopesh",meta:0},{stack:1});
Ace3.addItem("emerald_katana","Emerald Katana",{name:"EmeraldKatana",meta:0},{stack:1});
Ace3.addItem("emerald_axe_battle","Emerald Battle Axe",{name:"EmeraldBattleAxe",meta:0},{stack:1});
Ace3.addItem("emerald_staff","Emerald Staff",{name:"EmeraldStaff",meta:0},{stack:1});


ToolAPI.addToolMaterial("emerald", {durability: 2346, level: 3, efficiency: 6, damage: 3.5, enchantability: 14});
ToolAPI.addToolMaterial("emerald_big_sword", {durability: 2346, level: 3, efficiency: 6, damage: 10, enchantability: 14});
ToolAPI.addToolMaterial("emerald_axe_battle", {durability: 2346, level: 3, efficiency: 6, damage: 7, enchantability: 14});
ToolAPI.addToolMaterial("emerald_khopesh", {durability: 2346, level: 3, efficiency: 6, damage: 8, enchantability: 14});
ToolAPI.addToolMaterial("emerald_katana", {durability: 2346, level: 3, efficiency: 6, damage: 7, enchantability: 14});


ToolLib.setTool(ItemID.emerald_sword, "emerald", ToolType.sword);
ToolLib.setTool(ItemID.emerald_pickaxe, "emerald", ToolType.pickaxe);
ToolLib.setTool(ItemID.emerald_axe, "emerald", ToolType.axe);
ToolLib.setTool(ItemID.emerald_shovel, "emerald", ToolType.shovel);
ToolLib.setTool(ItemID.emerald_hoe, "emerald", ToolType.hoe);
ToolLib.setTool(ItemID.emerald_sword_big, "emerald_big_sword", ToolType.sword);
ToolLib.setTool(ItemID.emerald_khopesh, "emerald_khopesh", ToolType.sword);
ToolLib.setTool(ItemID.emerald_katana, "emerald_katana", ToolType.sword);
ToolLib.setTool(ItemID.emerald_axe_battle, "emerald_axe_battle", ToolType.sword);

Item.setMaxDamage(ItemID.emerald_staff,51);
