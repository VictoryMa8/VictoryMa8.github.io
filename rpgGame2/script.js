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
  { name: "None", maxHealth: 100, mana: 100, atk: 10, def: 10, spd: 10, weapon: weapons[0],
    desc: ""
   },
  { name: "Survivalist", maxHealth: 200, mana: 50, atk: 25, def: 20, spd: 5, weapon: weapons[1], 
    desc: "a tough and experienced wilderness expert with high health and a powerful hunting rifle"
   },
  { name: "Raider", maxHealth: 150, mana: 100, atk: 20, def: 5, spd: 25, weapon: weapons[2],
    desc: "a quick and crafty outlaw with a sawed-off shotgun ...usually aimed at unexpecting victims"
   },
  { name: "Alchemist", maxHealth: 100, mana: 150, atk: 25, def: 5, spd: 20, weapon: weapons[3],
    desc: "an intelligent potion maker who knows much about the world... also holds a submachine gun"
   },
  { name: "Wanderer", maxHealth: 150, mana: 100, atk: 20, def: 10, spd: 20, weapon: weapons[4],
    desc: "a worthy foe for anyone who crosses paths with them, knows their revolver well"
   }
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
  currentWeapon: weapons[0],
  class: "None",
  classDesc: ""
}

const enemies = [
  {
    name: "Enemy Raider",
    health: 100,
    maxHealth: 100,
    atk: 10,
    def: 10,
    spd: 10,
    weapon: { name: "Makeshift Dagger", dmg: 5, dex: 5, rng: 5 }
  }
];

// set player class
function setPlayerClass(classIndex) {
  const selectedClass = classes[classIndex];
  player.health = selectedClass.maxHealth;
  player.maxHealth = selectedClass.maxHealth;
  player.mana = selectedClass.mana;
  player.maxMana = selectedClass.mana;
  player.atk = selectedClass.atk;
  player.def = selectedClass.def;
  player.spd = selectedClass.spd;
  player.currentWeapon = selectedClass.weapon;
  player.class = selectedClass.name;
  player.classDesc = selectedClass.desc;
  updatePlayerStatsDisplay();
}

// game screens
const screens = [
  { 
    name: "Start game",
    text1: "Welcome to the nuclear wasteland.", 
    text2: "Press start to begin.",
    buttonTexts: ["Start", "Start", "Start", "Start", "Start"],
    nextScreens: [1, 1, 1, 1, 1]
  },
  { 
    name: "Select class",
    text1: "Choose your class before you go into the wasteland: ",
    text2: "You can choose between a Survivalist, Raider, Alchemist, or Wanderer.",
    buttonTexts: [classes[1].name, classes[2].name, classes[3].name, classes[4].name, "Back"],
    nextScreens: [2, 2, 2, 2, 0],
    classChoices: [1, 2, 3, 4, undefined]
  },
  {
    name: "Class selected",
    text1: () => `You are the ${player.class}, who is ${player.classDesc}.`,
    text2: () => "Press continue to start the game or go back to change your selection.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Back"],
    nextScreens: [3, 3, 3, 3, 1]
  },
  { 
    name: "Game explanation",
    text1: "You must be wondering what is happening right now.", 
    text2: "The year is 2174, it has been 150 years since the world was plunged into darkness.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Continue"],
    nextScreens: [4, 4, 4, 4, 4]
  },
  { 
    name: "Game explanation",
    text1: "The 'Last War' ended in nuclear annihilation. It is unclear how many people died, experts estimate more than 90% of the world population did not survive the fallout.", 
    text2: "Many of the rich and wealthy hid in their bunkers, while the average working man perished.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Back"],
    nextScreens: [5, 5, 5, 5, 3]
  },
  { 
    name: "Game explanation",
    text1: "Due to the conflict of the 'Last War', major cities such as New York, Los Angeles, London, and Tokyo, were completely wiped off the map.", 
    text2: "The surviving population of Earth reside in areas where the nukes never reached, and where the nuclear radiation is least potent.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Back"],
    nextScreens: [6, 6, 6, 6, 4]
  },
  { 
    name: "Game explanation",
    text1: "It is believed that places such as central Mongolia, Siberia, the Amazon Rainforest, Polynesia, the Sahara Desert, and Northern Canada are the safest for humans to inhabit.", 
    text2: "Over the decades after the war, tribes started to form and society tried to rebuild itself in these areas.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Back"],
    nextScreens: [7, 7, 7, 7, 5]
  },
  { 
    name: "Game explanation",
    text1: () => `You are a ${player.class} who lives in North America. Your ancestors lived in what used to be Minnesota of the United States.`,
    text2: "You are apart of a tribe that lives in what used to be a small town in Ontario, not too far from what was the U.S. border.",
    buttonTexts: ["Continue", "Continue", "Continue", "Continue", "Back"],
    nextScreens: [8, 8, 8, 8, 6]
  },
  { 
    name: "Game explanation",
    text1: "Not many people leave the town, because it is dangerous out in the wilderness. You currently are out collecting supplies from a nearby factory",
    text2: "The sun is setting. Try to find a way back before it gets too dark.",
    buttonTexts: ["Walk North", "Walk East", "Walk South", "Walk West", "Random"],
    nextScreens: [9, 10, 11, 12, 11]
  },
  { 
    name: "Wilderness",
    text1: "You walk north, there seems to be a figure in the distance.",
    text2: "Choose a direction to continue walking in.",
    buttonTexts: ["Continue North", "Walk East", "Walk South", "Walk West", "Random"],
    nextScreens: [13, 14, 15, 16, 14]
  }
];

// start of game
let currentScreen = 0;
updateScreenContent();

// change screen
function changeScreen(screenNumber, classIndex) {
  if (screenNumber >= 0 && screenNumber < screens.length) {
    currentScreen = screenNumber;

    // set player class
    if (classIndex !== undefined) {
      setPlayerClass(classIndex);
      console.log(`Player class set to ${player.class}`)
    }

    updateScreenContent();
  } else {
    console.log("Invalid screen number");
  }
}

function updateScreenContent() {

  // changing text-1, text2, and current screen number
  $("#text-1").text(typeof screens[currentScreen].text1 === 'function' 
    ? screens[currentScreen].text1() 
    : screens[currentScreen].text1);
  
  $("#text-2").text(typeof screens[currentScreen].text2 === 'function' 
    ? screens[currentScreen].text2() 
    : screens[currentScreen].text2);

  $("#currscre-text").text(currentScreen);
  // changing button texts and functions
  for (let i = 0; i < 5; i++) {
    const currButton = $(`#btn-${i+1}`);
    currButton.off("click");
    currButton.text(screens[currentScreen].buttonTexts[i] || "Error");
    currButton.on("click", () => changeScreen(
      screens[currentScreen].nextScreens[i],
      screens[currentScreen].classChoices ? screens[currentScreen].classChoices[i] : undefined
    ));
  }
}

function updatePlayerStatsDisplay() {
  // update xp, xp to next level, and gold
  $("#xp-text").text(player.xp);
  $("#xptnl-text").text(player.xpToNextLevel);
  $("#gold-text").text(player.gold);

  // update health and mana
  $("#hp-text").text(player.health);
  $("#maxhp-text").text(player.maxHealth);
  $("#mana-text").text(player.mana);
  $("#maxmana-text").text(player.maxMana);

  // update attack, speed, and defense
  $("#atk-text").text(player.atk);
  $("#def-text").text(player.def);
  $("#spd-text").text(player.spd);

  // inventory and current weapon
  $("inv-text").text(player.inventory);
  $("#currweap-text").text(player.currentWeapon.name);
}