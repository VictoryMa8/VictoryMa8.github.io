let xp = 0;
let level = 0;
let xpToNextLevel = 10;
let health = 100;
let maxHealth = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const text2 = document.querySelector("#text2");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const maxHealthText = document.querySelector("#maxHealthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'Stick', power: 15 },
  { name: ' Dagger', power: 30 },
  { name: ' Khopesh', power: 50 },
  { name: ' Scimitar', power: 100 }
];
const monsters = [
  {
    name: "Scorpion",
    level: 5,
    health: 20
  },
  {
    name: "Jackal",
    level: 10,
    health: 60
  },
  {
    name: "Geb, God of the Earth",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Village",
    "button text": ["Go To Store", "Go To Ancient Ruins", "Fight Geb, God of the Earth"],
    "button functions": [goStore, goRuins, fightGeb],
    text: "You are in the Village square. You see a sign that says \"Store\".",
    text2: ""
  },
  {
    name: "store",
    "button text": ["Buy Potion (10 gold)", "Buy Weapon (30 gold)", "Leave The Store"],
    "button functions": [buyPotion, buyWeapon, goVillage],
    text: "You enter the store.",
    text2: ""
  },
  {
    name: "Ruins",
    "button text": ["Fight Scorpion", "Fight Jackal", "Go Back To Village"],
    "button functions": [fightScorpion, fightBeast, goVillage],
    text: "You walk through the ancient ruins. There are evil creatures lurking about.",
    text2: ""
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goVillage],
    text: "You are fighting a monster.",
    text2: ""
  },
  {
    name: "kill monster",
    "button text": ["Go To Village", "Go To Village", "Go To Village"],
    "button functions": [goVillage, goVillage, easterEgg],
    text: 'The creature yelps in pain as it dies. You gain experience points and acquire gold.',
    text2: ""
  },
  {
    name: "lose",
    "button text": ["Restart", "Restart", "Restart"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
    text2: ""
  },
  { 
    name: "win", 
    "button text": ["Restart", "Restart", "Restart"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat Geb, God of The Earth! You win the game! &#x1F389;",
    text2: ""
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go To Village?"],
    "button functions": [pickTwo, pickEight, goVillage],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    text2: ""
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goRuins;
button3.onclick = fightGeb;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  text2.innerHTML = location.text2;
}

function goVillage() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goRuins() {
  update(locations[2]);
}

function buyPotion() {
  if (gold >= 10 && health < maxHealth) {
    gold -= 10;
    health += 20;
    if (health > maxHealth) {
      health = maxHealth;
    }
    goldText.innerText = gold;
    healthText.innerText = health;
  } else if (health === maxHealth) {
    text2.innerText = "You are already at full health.";
  }
  else if (gold < 10) {
    text2.innerText = "You do not have enough gold to buy a potion.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text2.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text2.innerText = "You already have the most powerful weapon.";
    button2.innerText = "Sell item for 10 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 10;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text2.innerText = " In your inventory you have: " + inventory;
  } else {
    text2.innerText = "You cannot sell your only weapon.";
  }
}

function fightScorpion() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightGeb() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text2.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text2.innerText = " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function gainXP(amount) {
  xp += amount;
  xpText.innerText = xp;
  if (xp >= xpToNextLevel) {
    levelUp();
  }
}

function levelUp() {
  xp -= xpToNextLevel;
  level++;
  xpToNextLevel *= 1.5;
  health += (3 * level);
  maxHealth += (4 * level);
  healthText.innerText = health;
  maxHealthText.innerText = maxHealth;
  xpText.innerText = xp;
  levelText.innerText = level;
  text2.innerText = "You have leveled up. You are now level " + level + "." + " You healed up slightly, and gained " + (4 * level) + " max health.";
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  gainXP(monsters[fighting].level);
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  maxHealth = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  maxHealthText.innerText = maxHealth;
  xpText.innerText = xp;
  goVillage();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}