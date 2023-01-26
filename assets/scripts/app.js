const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonnus = true;

adjustHealthBars(chosenMaxLife);

function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);
}

function attackMonster(mode) {
  let maxDamage;
  if (mode == "ATTACK") maxDamage = ATTACK_VALUE;
  else maxDamage = STRONG_ATTACK_VALUE;
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(maxDamage);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && bonnus) {
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    alert("You would be dead but the bonnus save your live");
    bonnus = false;
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) alert("You win");
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0)
    alert("You Lost !!!");
  else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
    alert("You have a draw !!!");
}

function strongAttackHandler() {
  attackMonster("ATTACK");
}

function attackHandler() {
  attackMonster("STRONG_ATTACK");
}

healBtn.addEventListener("click", healPlayerHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
attackBtn.addEventListener("click", attackHandler);
