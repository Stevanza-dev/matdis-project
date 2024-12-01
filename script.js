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
let playerPosition = { x: 0, y: 0 };

// Statistik Musuh
const enemyStats = {
  G: { name: 'Grumete', attack: 2 },
  B: { name: 'Pirate', attack: 5 },
  M: { name: 'Marine', attack: 3 },
};

// Peta permainan
const map = [
  ['P', 'A', ' ', ' ', ' ', ' ', ' ', ' ', 'H', 'H'],
  ['A', 'W', 'W', 'W', ' ', ' ', 'W', 'W', 'W', ' '],
  [' ', 'W', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' '],
  [' ', 'W', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 'W', 'H', 'G', ' ', ' ', 'W', ' '],
  [' ', ' ', 'G', 'W', 'G', 'W', ' ', ' ', 'W', 'H'],
  [' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
  [' ', 'W', ' ', ' ', ' ', ' ', ' ', 'B', 'G', 'W'],
  ['H', 'W', ' ', ' ', 'W', 'W', 'W', 'G', ' ', ' '],
  ['H', ' ', ' ', ' ', ' ', 'H', 'W', 'W', ' ', 'C'],
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
    case 'B':
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

  validatePlayerPosition();
  moveEnemies(); // Pindahkan musuh setelah pemain bergerak
  drawMap();
}

// Fungsi untuk memindahkan musuh
function moveEnemies() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const element = map[y][x];
      if (['G', 'B', 'M'].includes(element)) {
        const target = calculateTargetMove(x, y);
        if (target) {
          const [newX, newY] = target;
          if (newX === playerPosition.x && newY === playerPosition.y) {
            // Musuh menyerang pemain
            const enemy = enemyStats[element];
            stats.hp -= enemy.attack;
            alert(`${enemy.name} attacked you! -${enemy.attack} HP`);
            if (stats.hp <= 0) {
              alert('Game Over!');
              resetGame();
              return;
            }
          } else {
            // Pindahkan musuh ke posisi baru
            map[y][x] = ' ';
            map[newY][newX] = element;
          }
        }
      }
    }
  }
}

// Fungsi untuk menghitung langkah target musuh
function calculateTargetMove(enemyX, enemyY) {
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 },  // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 },  // Right
  ];

  let shortestDistance = Infinity;
  let bestMove = null;

  for (const { dx, dy } of directions) {
    const newX = enemyX + dx;
    const newY = enemyY + dy;

    if (
      newX >= 0 &&
      newX < gridSize &&
      newY >= 0 &&
      newY < gridSize &&
      map[newY][newX] === ' '
    ) {
      const distance = Math.abs(newX - playerPosition.x) + Math.abs(newY - playerPosition.y);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        bestMove = [newX, newY];
      }
    }
  }

  return bestMove;
}

// Fungsi untuk menangani interaksi
function handleInteraction(element) {
  if (['G', 'B', 'M'].includes(element)) {
    const enemy = enemyStats[element];
    alert(`You encountered a ${enemy.name}!`);
    stats.hp -= enemy.attack;
    alert(`${enemy.name} attacked you! -${enemy.attack} HP`);

    if (stats.hp <= 0) {
      alert('Game Over!');
      resetGame();
      return;
    }

    alert(`You defeated the ${enemy.name}!`);
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'H') {
    stats.hp += 10;
    alert('You found a Heal! +10 HP');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'A') {
    stats.attack += 2;
    alert('You found an Attack Buff! +2 Attack');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'C') {
    stats.stage++;
    alert('You found the chest! Stage +1');
    map[playerPosition.y][playerPosition.x] = ' ';
  }

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
  playerPosition = { x: 0, y: 0 };

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 'P') map[y][x] = ' ';
    });
  });
  map[0][0] = 'P';

  validatePlayerPosition();
  drawMap();
  updateStats();
}

// Fungsi untuk memvalidasi posisi pemain
function validatePlayerPosition() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (map[y][x] === 'P') {
        playerPosition = { x, y };
        return;
      }
    }
  }
}

// Event listener untuk kontrol pemain
window.addEventListener('keydown', movePlayer);

// Inisialisasi game
drawMap();
updateStats();
