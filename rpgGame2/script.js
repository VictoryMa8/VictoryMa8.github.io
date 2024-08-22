// stat total = 30 (besides fists)
// dmg = damage, dex = dexterity, rng = range
const weapons = [
  { name: "Fists", dmg: 5, dex: 5, rng: 5 }, // 0
  { name: "Hunting Rifle", dmg: 15, dex: 5, rng: 10 }, // 1
  { name: "Sawed-off Shotgun", dmg: 15, dex: 10, rng: 5 }, // etc...
  { name: "Submachine Gun", dmg: 10, dex: 15, rng: 5 },
  { name: "Revolver", dmg: 10, dex: 10, rng: 10 }
]

// health & mana total = 250 ... stat total = 50 (besides none)
// atk = attack, def = defense, spd = speed
const classes = [
  { name: "None", maxHealth: 100, mana: 100, atk: 10, def: 10, spd: 10, weapon: weapons[0] },
  { name: "Survivalist", maxHealth: 200, mana: 50, atk: 25, def: 20, spd: 5, weapon: weapons[1] },
  { name: "Raider", maxHealth: 150, mana: 100, atk: 20, def: 5, spd: 25, weapon: weapons[2] },
  { name: "Alchemist", maxHealth: 100, mana: 150, atk: 25, def: 5, spd: 20, weapon: weapons[3] },
  { name: "Wanderer", maxHealth: 150, mana: 100, atk: 20, def: 10, spd: 20, weapon: weapons[4] }
]

// player object
const player = {
  // xp, level, & gold
  xp: 0,
  level: 0,
  xpToNextLevel: 10,
  gold: 0,
  // stats
  health: 100,
  maxHealth: 100,
  mana: 100,
  maxMana: 100,
  atk: 10,
  def: 10,
  spd: 10,
  // inventory and current weapon
  inventory: [],
  currentWeapon: weapons[0]
}

// game screens
const screens = [
  { 
    name: "Start game",
    text1: "Welcome to the game!", 
    text2: "Press start to begin",
    buttonTexts: ["Start", "Start", "Start", "Start", "Start"],
    buttonFunctions: [updateScreen, updateScreen, updateScreen, updateScreen, updateScreen]
  },
  { 
    name: "Select class",
    text1: "Choose your class: ",
    text2: "You can choose between a Warrior, Rogue, Wizard, or Archer",
    buttonTexts: ["Back", classes[1].name, classes[2].name, classes[3].name, classes[4].name],
    buttonFunctions: [backScreen, backScreen, backScreen, backScreen, backScreen]
  }
];

// start of game
let currentScreen = 0;
if (currentScreen === 0) {
  $("#text-1").text(screens[0].text1);
  $("#text-2").text(screens[0].text2);
  $("#currscre-text").text(currentScreen);
  for (let i = 0; i <= screens[0].buttonTexts.length; i++) {
    $(`#btn-${i+1}`).text(screens[0].buttonTexts[i]);
  }
  for (let i = 0; i <= screens[0].buttonFunctions.length; i++) {
    $(`#btn-${i+1}`).on("click", screens[0].buttonFunctions[i]);
  }
}

function updateScreen() {
  currentScreen++;
  updateScreenContent();
}

function backScreen() {
  if (currentScreen > 0) {
    currentScreen--;
  }
  updateScreenContent();
}

function updateScreenContent() {
  // changing text-1, text2, and current screen number
  $("#text-1").text(screens[currentScreen].text1);
  $("#text-2").text(screens[currentScreen].text2);
  $("#currscre-text").text(currentScreen);
  // changing button texts and functions
  for (let i = 0; i < 5; i++) {
    const currButton = $(`#btn-${i+1}`);
    currButton.off("click");
    currButton.text(screens[currentScreen].buttonTexts[i]);
    currButton.on("click", screens[currentScreen].buttonFunctions[i]);
  }
}
