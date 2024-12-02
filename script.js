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
  updateStats();
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

function movePlayer(event) {
  // Hanya proses jika tombol panah ditekan
  const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (!validKeys.includes(event.key)) return;

  const { x, y } = playerPosition;

  let newX = x;
  let newY = y;

  if (event.key === 'ArrowUp') newY--;
  if (event.key === 'ArrowDown') newY++;
  if (event.key === 'ArrowLeft') newX--;
  if (event.key === 'ArrowRight') newX++;

  // Periksa apakah pergerakan valid
  let playerMoved = false;

  if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      if (map[newY][newX] !== 'W') {
          // Update posisi pemain
          const element = map[newY][newX];
          map[y][x] = ' ';
          playerPosition = { x: newX, y: newY };
          map[newY][newX] = 'P';

          // Interaksi
          handleInteraction(element);
          
          // Tandai bahwa pemain berhasil bergerak
          playerMoved = true;
      }
  }

  validatePlayerPosition();
  
  // Hanya pindahkan musuh jika pemain berhasil bergerak
  if (playerMoved) {
      moveEnemies();
  }
  
  drawMap();
}

function moveEnemies() {
  const newPositions = []; // Menyimpan posisi tujuan sementara

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const element = map[y][x];
      if (['G', 'B', 'M'].includes(element)) {
        const target = calculateTargetMoveAStar(x, y);

        if (target) {
          const { x: newX, y: newY } = target;

          if (newPositions.some(pos => pos.x === newX && pos.y === newY)) {
            // Jika posisi tujuan sudah ditempati, musuh tetap di tempat
            newPositions.push({ x, y, element });
            continue;
          }

          if (newX === playerPosition.x && newY === playerPosition.y) {
            // Musuh menyerang pemain
            const enemy = enemyStats[element];
            stats.hp -= enemy.attack;

            if (stats.hp <= 0) {
              alert('Game Over!');
              location.reload();
              return;
            }
          } else {
            // Tambahkan posisi tujuan ke daftar
            newPositions.push({ x: newX, y: newY, element });
            map[y][x] = ' '; // Kosongkan posisi awal
          }
        }
      }
    }
  }

  // Perbarui posisi musuh di peta setelah semua validasi
  newPositions.forEach(({ x, y, element }) => {
    map[y][x] = element;
  });
}

function calculateTargetMoveAStar(enemyX, enemyY) {
  const openList = []; // Node yang akan dievaluasi
  const closedList = []; // Node yang telah dievaluasi

  // Fungsi untuk menghitung jarak heuristik (Manhattan Distance)
  function heuristic(x, y) {
    return Math.abs(x - playerPosition.x) + Math.abs(y - playerPosition.y);
  }

  // Fungsi untuk memeriksa apakah node ada dalam list
  function isInList(list, x, y) {
    return list.some(node => node.x === x && node.y === y);
  }

  // Fungsi untuk mendapatkan node dengan nilai f terkecil
  function getLowestFNode(list) {
    return list.reduce((lowest, node) => (node.f < lowest.f ? node : lowest), list[0]);
  }

  // Tambahkan node awal (posisi musuh) ke openList
  openList.push({
    x: enemyX,
    y: enemyY,
    g: 0, // Biaya dari awal
    h: heuristic(enemyX, enemyY), // Estimasi jarak ke tujuan
    f: heuristic(enemyX, enemyY), // Total biaya
    parent: null, // Jalur sebelumnya
  });

  while (openList.length > 0) {
    // Ambil node dengan nilai f terkecil
    const current = getLowestFNode(openList);

    // Jika mencapai pemain, rekonstruksi jalur
    if (current.x === playerPosition.x && current.y === playerPosition.y) {
      let path = [];
      let temp = current;
      while (temp.parent) {
        path.push({ x: temp.x, y: temp.y });
        temp = temp.parent;
      }
      path.reverse();
      return path.length > 0 ? path[0] : null; // Kembalikan langkah pertama
    }

    // Pindahkan node ke closedList
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);

    // Periksa semua tetangga
    const neighbors = [
      { x: current.x, y: current.y - 1 }, // Atas
      { x: current.x, y: current.y + 1 }, // Bawah
      { x: current.x - 1, y: current.y }, // Kiri
      { x: current.x + 1, y: current.y }, // Kanan
    ];

    for (const neighbor of neighbors) {
      // Abaikan jika di luar grid atau di dinding
      if (
        neighbor.x < 0 ||
        neighbor.x >= gridSize ||
        neighbor.y < 0 ||
        neighbor.y >= gridSize ||
        map[neighbor.y][neighbor.x] === 'W'
      ) {
        continue;
      }

      // Hitung nilai g, h, dan f untuk tetangga
      const g = current.g + 1;
      const h = heuristic(neighbor.x, neighbor.y);
      const f = g + h;

      // Abaikan jika tetangga sudah di closedList
      if (isInList(closedList, neighbor.x, neighbor.y)) continue;

      // Tambahkan tetangga ke openList jika belum ada
      if (!isInList(openList, neighbor.x, neighbor.y)) {
        openList.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          h,
          f,
          parent: current,
        });
      } else {
        // Perbarui node jika jalur baru lebih baik
        const existingNode = openList.find(
          node => node.x === neighbor.x && node.y === neighbor.y
        );
        if (g < existingNode.g) {
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = current;
        }
      }
    }
  }

  return null; // Tidak ada jalur ke pemain
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";

  // Hapus notifikasi setelah 2 detik
  setTimeout(() => {
      notification.style.display = "none";
  }, 2000);
}

// Fungsi untuk menangani interaksi
function handleInteraction(element) {
  if (['G', 'B', 'M'].includes(element)) {
      const enemy = enemyStats[element];
      showNotification(`You encountered a ${enemy.name}!`);
      stats.hp -= enemy.attack;
      showNotification(`${enemy.name} attacked you! -${enemy.attack} HP`);

      if (stats.hp <= 0) {
          showNotification('Game Over!');
          location.reload();
          return;
      }

      showNotification(`You defeated the ${enemy.name}!`);
      map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'H') {
      stats.hp += 10;
      showNotification('You found a Heal! +10 HP');
      map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'A') {
      stats.attack += 2;
      showNotification('You found an Attack Buff! +2 Attack');
      map[playerPosition.y][playerPosition.x] = ' ';
  }

  if (element === 'C') {
      stats.stage++;
      showNotification('You found the chest! Stage +1');
      map[playerPosition.y][playerPosition.x] = ' ';
  }
  map[playerPosition.y][playerPosition.x] = 'P';
  updateStats();
}


// Fungsi untuk memperbarui statistik
function updateStats() {
  hpElement.textContent = stats.hp;
  attackElement.textContent = stats.attack;
  stageElement.textContent = stats.stage;
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
