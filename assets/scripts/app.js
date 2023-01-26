const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const logEntries = [];

let enteredValue = prompt("Maximum life for you and the monster : ", "100");

if (isNaN(enteredValue) || enteredValue <= 0) {
  enteredValue = 100;
}

let chosenMaxLife = enteredValue;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonnus = true;

adjustHealthBars(chosenMaxLife);

function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  logEntries.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  monsterHealthBar.value = chosenMaxLife;
  playerHealthBar.value = chosenMaxLife;
}

function attackMonster(mode) {
  let maxDamage;
  if (mode == "ATTACK") maxDamage = ATTACK_VALUE;
  else maxDamage = STRONG_ATTACK_VALUE;
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(maxDamage);
  currentPlayerHealth -= playerDamage;

  writeToLog(mode, maxDamage, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && bonnus) {
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    alert("You would be dead but the bonnus save your live");
    bonnus = false;
    removeBonusLife();
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You win");
    writeToLog(
      "PLAYER WIN",
      maxDamage,
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    writeToLog(
      "MONSTER WIN",
      maxDamage,
      currentMonsterHealth,
      currentPlayerHealth
    );
    alert("You Lost !!!");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw !!!");
    writeToLog("DRAW", maxDamage, currentMonsterHealth, currentPlayerHealth);
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function strongAttackHandler() {
  attackMonster("ATTACK");
}

function attackHandler() {
  attackMonster("STRONG_ATTACK");
}

function printLogs() {
  console.log(logEntries);
}

healBtn.addEventListener("click", healPlayerHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
attackBtn.addEventListener("click", attackHandler);
logBtn.addEventListener("click", printLogs);
