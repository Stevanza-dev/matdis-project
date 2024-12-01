const container = document.getElementById('game-container');
const hpElement = document.getElementById('hp');
const attackElement = document.getElementById('attack');
const stageElement = document.getElementById('stage');

// Ukuran grid
const gridSize = 10;

// Statistik Pemain
let stats = {
  hp: 20,
  attack: 5,
  stage: 1,
};

// Posisi awal pemain
let playerPosition = { x: 1, y: 1 };

// Statistik Musuh
const enemyStats = {
  G: { name: 'Grumete', attack: 2 },
  B: { name: 'Pirate', attack: 5 },
  M: { name: 'Marine', attack: 3 },
};

// Peta permainan
const map = [
  ['P', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'B'],
  [' ', 'W', 'W', 'W', ' ', 'W', 'W', ' ', 'W', ' '],
  [' ',' ', 'G', 'G', ' ', ' ', ' ', ' ', 'A', ' '],
  [' ', ' ', ' ', ' ', 'W', 'W', 'W', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', 'H', ' ', ' ', ' ', ' ', ' '],
  ['W', 'W', ' ', 'W', ' ', ' ', ' ', 'W', 'W', ' '],
  [' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' '],
  [' ', 'B', ' ', ' ', ' ', ' ', ' ', ' ', 'M', 'C'],
  [' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

// Fungsi untuk menggambar peta
function drawMap() {
  container.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const element = map[y][x];
      if (element !== ' ') {
        const img = document.createElement('img');
        img.src = getImageForElement(element);
        img.alt = element;
        img.classList.add('icon');
        cell.appendChild(img);
      }

      container.appendChild(cell);
    }
  }
}

// Fungsi untuk menentukan gambar berdasarkan elemen
function getImageForElement(element) {
  switch (element) {
    case 'W':
      return 'assets/Wall.jpg';
    case 'P':
      return 'assets/Player.jpg';
    case 'G':
      return 'assets/Enemy.jpg';
    case 'B':
      return 'assets/Enemy.jpg';
    case 'M':
      return 'assets/Enemy.jpg';
    case 'C':
      return 'assets/Treasure.jpg';
    case 'H':
      return 'assets/BUFF1.jpg';
    case 'A':
      return 'assets/BUFF2.jpg';
    default:
      return '';
  }
}

// Fungsi untuk memindahkan pemain
function movePlayer(event) {
  const { x, y } = playerPosition;

  let newX = x;
  let newY = y;

  if (event.key === 'ArrowUp') newY--;
  if (event.key === 'ArrowDown') newY++;
  if (event.key === 'ArrowLeft') newX--;
  if (event.key === 'ArrowRight') newX++;

  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
    if (map[newY][newX] !== 'W') {
      // Update posisi pemain
      const element = map[newY][newX];
      map[y][x] = ' ';
      playerPosition = { x: newX, y: newY };
      map[newY][newX] = 'P';

      // Interaksi
      handleInteraction(element);
    }
  }

  drawMap();
}

// Fungsi untuk menangani interaksi
function handleInteraction(element) {
  if (['G', 'B', 'M'].includes(element)) {
    // Dapatkan statistik musuh
    const enemy = enemyStats[element];
    alert(`You encountered a ${enemy.name}!`);

    // Pertempuran
    stats.hp -= enemy.attack;
    alert(`${enemy.name} attacked you! -${enemy.attack} HP`);
    if (stats.hp <= 0) {
      alert('Game Over!');
      resetGame();
      return;
    }

    // Pemain menyerang musuh (hapus musuh setelah menyerang)
    alert(`You defeated the ${enemy.name}!`);
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'H') {
    // Heal pemain
    stats.hp += 10;
    alert('You found a Heal! +10 HP');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'A') {
    // Buff Attack
    stats.attack += 2;
    alert('You found an Attack Buff! +2 Attack');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'C') {
    stats.stage++;
    alert('You found the chest! Stage +1');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  // Update statistik
  updateStats();
}

// Fungsi untuk memperbarui statistik
function updateStats() {
  hpElement.textContent = stats.hp;
  attackElement.textContent = stats.attack;
  stageElement.textContent = stats.stage;
}

// Fungsi untuk mereset game
function resetGame() {
  stats.hp = 20;
  stats.attack = 5;
  stats.stage = 1;
  playerPosition = { x: 1, y: 1 };

  // Reset peta
  map[2][1] = 'P'; // Tempatkan pemain kembali
  drawMap();
  updateStats();
}

// Event listener untuk kontrol pemain
window.addEventListener('keydown', movePlayer);

// Inisialisasi game
drawMap();