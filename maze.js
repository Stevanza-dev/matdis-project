const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

// Konfigurasi
const cols = 15; // Jumlah kolom
const rows = 15; // Jumlah baris
const cellSize = 40; // Ukuran tiap sel
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

const grid = [];
let currentCell;
let player = { x: 0, y: 0 }; // Posisi awal pemain
const finish = { x: cols - 1, y: rows - 1 }; // Posisi akhir
let gameWon = false;

// Membuat grid awal
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    grid.push(new Cell(col, row));
  }
}

// Fungsi mendapatkan indeks
function index(col, row) {
  if (col < 0 || row < 0 || col >= cols || row >= rows) return -1;
  return col + row * cols;
}

// Kelas Cell
function Cell(col, row) {
  this.col = col;
  this.row = row;
  this.walls = [true, true, true, true]; // Top, right, bottom, left
  this.visited = false;

  this.show = function () {
    const x = this.col * cellSize;
    const y = this.row * cellSize;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    if (this.walls[0]) ctx.strokeRect(x, y, cellSize, 0); // Top
    if (this.walls[1]) ctx.strokeRect(x + cellSize, y, 0, cellSize); // Right
    if (this.walls[2]) ctx.strokeRect(x, y + cellSize, cellSize, 0); // Bottom
    if (this.walls[3]) ctx.strokeRect(x, y, 0, cellSize); // Left
  };

  this.checkNeighbors = function () {
    const neighbors = [];

    const top = grid[index(this.col, this.row - 1)];
    const right = grid[index(this.col + 1, this.row)];
    const bottom = grid[index(this.col, this.row + 1)];
    const left = grid[index(this.col - 1, this.row)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      return neighbors[randomIndex];
    }
    return undefined;
  };
}

// Algoritma untuk membangun maze
const stack = [];
currentCell = grid[0];

function generateMaze() {
  currentCell.visited = true;

  const nextCell = currentCell.checkNeighbors();
  if (nextCell) {
    nextCell.visited = true;

    // Simpan posisi sebelumnya ke stack
    stack.push(currentCell);

    // Hapus dinding antara currentCell dan nextCell
    const dx = nextCell.col - currentCell.col;
    const dy = nextCell.row - currentCell.row;

    if (dx === 1) {
      currentCell.walls[1] = false; // Move right
      nextCell.walls[3] = false;
    } else if (dx === -1) {
      currentCell.walls[3] = false; // Move left
      nextCell.walls[1] = false;
    } else if (dy === 1) {
      currentCell.walls[2] = false; // Move down
      nextCell.walls[0] = false;
    } else if (dy === -1) {
      currentCell.walls[0] = false; // Move up
      nextCell.walls[2] = false;
    }

    currentCell = nextCell;
  } else if (stack.length > 0) {
    currentCell = stack.pop();
  }
}

// Fungsi menggambar pemain
function drawPlayer() {
  const x = player.x * cellSize + cellSize / 4;
  const y = player.y * cellSize + cellSize / 4;
  const size = cellSize / 2;

  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, size, size);
}

// Fungsi menggambar titik akhir
function drawFinish() {
  const x = finish.x * cellSize + cellSize / 4;
  const y = finish.y * cellSize + cellSize / 4;
  const size = cellSize / 2;

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, size, size);
}

// Kontrol pemain
document.addEventListener("keydown", (e) => {
  const current = grid[index(player.x, player.y)];

  if (!gameWon) {
    if (e.key === "ArrowUp" && !current.walls[0]) player.y -= 1;
    if (e.key === "ArrowRight" && !current.walls[1]) player.x += 1;
    if (e.key === "ArrowDown" && !current.walls[2]) player.y += 1;
    if (e.key === "ArrowLeft" && !current.walls[3]) player.x -= 1;

    // Cek apakah pemain sampai di titik akhir
    if (player.x === finish.x && player.y === finish.y) {
      gameWon = true;
      alert("You win!");
    }
  }
});

// Animasi
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((cell) => cell.show());
  drawPlayer();
  drawFinish();

  if (stack.length > 0 || currentCell) {
    generateMaze();
  }

  requestAnimationFrame(animate);
}

animate();
