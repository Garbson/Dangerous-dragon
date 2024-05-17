let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["bastão"];

const imagem = document.querySelector("#imagemText");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "bastão", power: 5 },
  { name: "Adaga", power: 30 },
  { name: "machado", power: 50 },
  { name: "espada", power: 100 },
];
const monsters = [
  {
    name: "urso",
    level: 2,
    health: 15,
  },
  {
    name: "cavaleiro das trevas",
    level: 8,
    health: 60,
  },
  {
    name: "dragão",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Va para a loja", "Va para a floresta", "Lute com o dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Você está na praça da cidade. Você vê uma placa que diz "Loja".',
    img: "./img/goTown.jpeg",
  },
  {
    name: "store",
    "button text": [
      "compre 10 de vida (10 de ouro)",
      "compre arma (30 de ouro)",
      "Volte para a cidade",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entrou na loja",
    img: "./img/store.jpeg",
  },
  {
    name: "cave",
    "button text": [
      "Lute com Urso",
      "Lute contra o cavaleiro das trevas",
      "volte para a cidade",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você, entrou na floresta, você ver monstros e trevas",
    img: "./img/floresta.jpg",
  },
  {
    name: "fight",
    "button text": ["atacar", "esquivar", "correr"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando contra um monstro",
    
  },
  {
    name: "kill monster",
    "button text": [
      "Volte para a cidade",
      "Volte para a cidade",
      "Volte para a cidade",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro grita "Arg!" à medida que morre. Você ganha pontos de experiência e encontra ouro.',
    img: "./img/killer.jpg",
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Minha arma quebrou, minha armadura está quebrada, gotas de sangue escorrem, Estou cansado eu não quero mais correr... estou aqui há muito tempo vou descansar aqui um pouco, sim apenas um pouco...",
    img: "./img/lose.jpg"  
},
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "No auge da batalha, quando o clangor das espadas ecoava pelos campos e o fogo do dragão pintava o céu de rubro, o cavaleiro ergueu sua espada com determinação. Seu coração pulsava com a coragem dos ancestrais, e seus olhos refletiam a chama da vitória queimando intensamente.Com um golpe certeiro, o cavaleiro brandiu sua lâmina contra as sombras que assolavam a cidade. O dragão, por um instante, pareceu recuar diante da ferocidade da investida. E então, em um momento de triunfo, o monstro alado soltou um rugido de morte. E assim, com a força de um herói determinado e a coragem de um verdadeiro cavaleiro, a batalha chegou ao seu glorioso fim. O dragão, agora enfraquecido e derrotado, recuou para as profundezas de sua caverna, deixando para trás apenas o eco distante de sua ira vencida.Sob os olhares admirados dos cidadãos, o cavaleiro ergueu sua espada para o céu, uma testemunha silenciosa da vitória conquistada. Nas ruas da cidade, o povo celebrava, suas vozes se unindo em um coro de gratidão e alegria pela libertação da tirania do dragão. E ali, no resplendor da luz da vitória, o cavaleiro permaneceu — um símbolo de esperança e coragem para todos aqueles que ousavam sonhar com um futuro livre da sombra do medo. Pois naquele momento, ele não era apenas um guerreiro vitorioso, mas sim um verdadeiro herói, cujo nome seria lembrado nas canções e lendas de tempos imemoriais.",
    img: "./img/win.jpeg"
},
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você encontra um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número escolhido corresponder a um dos números aleatórios, você ganha!",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  imagem.src = location.img;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    imagem.src = "./img/buyHealth.jpeg";
  } else {
    text.innerText = "Você não tem ouro suficiente para comprar saúde.";
    imagem.src = "./img/buyHealth.jpeg";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Agora você tem " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " no seu inventario você tem " + inventory;
      imagem.src = "./img/armas.jpg";
    } else {
      text.innerText = "Você não tem ouro suficiente para comprar uma arma.";
    }
  } else {
    text.innerText = "Você já tem a arma mais poderosa!";
    button2.innerText = "Venda arma por 15 ouro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu um" + currentWeapon + ".";
    text.innerText += " No seu inventorio tem: " + inventory;
  } else {
    text.innerText = "você não pode vender sua unica arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  imagem.src = "./img/urso.jpg"
}

function fightBeast() {
  fighting = 1;
  goFight();
  imagem.src = "./img/cavaleiro.jpg"
}

function fightDragon() {
  fighting = 2;
  goFight();
  imagem.src = "./img/dragonFight.jpg"
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "O " + monsters[fighting].name + " ataca.";
  text.innerText += " Você ataca com sua " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Voce errou.";
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
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " sua " + inventory.pop() + " quebrou.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "Você evita o ataque do " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
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
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
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
  text.innerText =
    "Você achou " + guess + ". Aqui estão os números aleatórios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Acertou! você ganha 20 de ouro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Errou! você perdeu 10 de vida!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
