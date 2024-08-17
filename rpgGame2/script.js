let xp = 0;
let level = 0;
let xpToNextLevel = 10;
let gold = 0;
let currentWeapon = "Fists";

let health = 100;
let maxHealth = 100;
let mana = 100;
let maxMana = 100;
let inventory = [];

let atk = 10;
let def = 10;
let spd = 10;

const classes = [
  { name: "None", health: 100, maxHealth: 100, mana: 100, maxMana: 100, atk: 10, def: 10, spd: 10, weapon: "Fists" },
  { name: "Warrior", health: 200, maxHealth: 200, mana: 50, maxMana: 50, atk: 25, def: 20, spd: 5, weapon: "Sword" },
  { name: "Rogue", health: 150, maxHealth: 150, mana: 100, maxMana: 100, atk: 20, def: 5, spd: 25, weapon: "Dagger" },
  { name: "Wizard", health: 100, maxHealth: 100, mana: 150, maxMana: 150, atk: 25, def: 5, spd: 20, weapon: "Staff" },
  { name: "Archer", health: 150, maxHealth: 150, mana: 100, maxMana: 100, atk: 20, def: 10, spd: 20, weapon: "Bow" }
]

const screens = [
  { text1: "Welcome to the game!", text2: "Press start to begin." },
  { text1: "Choose your class: ", text2: "Hello"}
]

let currentClass = 0;
let currentScreen = 0;

if (currentScreen === 0) {
  $("#btn-1").on("click", function() {
    currentScreen++;
    changeScreen();
  });
  $("#btn-2").hide();
  $("#btn-3").hide();
  $("#btn-4").hide();
  $("#btn-5").hide();
}

function changeScreen() {
  currentScreen = screen;
}

