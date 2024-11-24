class PirateParty {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = 50; // Ukuran tiap tile
        this.player = { x: 1, y: 1, hp: 20, attack: 5 };
        this.currentStage = 1;
        this.mapData = this.getMapData();
        this.loadImages();
        this.setupInput();
        this.loadStage(this.currentStage);
    }

    loadImages() {
        this.images = {
            player: new Image(),
            heal: new Image(),
            buff: new Image(),
            chest: new Image(),
            grumete: new Image()
        };
        this.images.player.src = 'player.png'; // Pastikan file gambar tersedia
        this.images.heal.src = 'heal.png';
        this.images.buff.src = 'buff.png';
        this.images.chest.src = 'chest.png';
        this.images.grumete.src = 'grumete.png';
    }

    setupInput() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') this.move('up');
            if (event.key === 'ArrowDown') this.move('down');
            if (event.key === 'ArrowLeft') this.move('left');
            if (event.key === 'ArrowRight') this.move('right');
        });
    }

    getMapData() {
        // (Pindahkan data map Anda ke sini)
        return {
            1: {
                size: 5,
                playerStart: { x: 1, y: 3 },
                chest: { x: 5, y: 3 },
                walls: [
                    { x: 1, y: 2 },
                    { x: 2, y: 2 },
                    { x: 1, y: 4 },
                    { x: 2, y: 4 },
                    { x: 5, y: 2 },
                    { x: 5, y: 4 },
                ],
                heals: [{ x: 3, y: 3 }],
                buffs: [{ x: 4, y: 4, effect: 1 }],
                grumetes: [{ x: 4, y: 2 }],
            }
        };
    }

    loadStage(stage) {
        this.currentStage = stage;
        const stageData = this.mapData[this.currentStage];
        this.player.x = stageData.playerStart.x;
        this.player.y = stageData.playerStart.y;
        this.renderMap();
    }

    renderMap() {
        const stageData = this.mapData[this.currentStage];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render grid
        for (let x = 0; x < stageData.size; x++) {
            for (let y = 0; y < stageData.size; y++) {
                this.ctx.fillStyle = '#eaeaea';
                this.ctx.fillRect(y * this.tileSize, x * this.tileSize, this.tileSize, this.tileSize);
            }
        }

        // Render walls
        stageData.walls.forEach((wall) => {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(
                (wall.y - 1) * this.tileSize,
                (wall.x - 1) * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        });

        // Render player
        this.ctx.drawImage(
            this.images.player,
            (this.player.y - 1) * this.tileSize,
            (this.player.x - 1) * this.tileSize,
            this.tileSize,
            this.tileSize
        );

        // Render other elements (heal, buff, chest, etc.)
        const elements = ['heal', 'buff', 'chest', 'grumete'];
        elements.forEach((el) => {
            stageData[el + 's'].forEach((item) => {
                this.ctx.drawImage(
                    this.images[el],
                    (item.y - 1) * this.tileSize,
                    (item.x - 1) * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            });
        });
    }

    move(direction) {
        const nextPosition = { x: this.player.x, y: this.player.y };
        if (direction === 'up') nextPosition.x -= 1;
        if (direction === 'down') nextPosition.x += 1;
        if (direction === 'left') nextPosition.y -= 1;
        if (direction === 'right') nextPosition.y += 1;
    
        const stageData = this.mapData[this.currentStage];
        const isWall = stageData.walls.some(
            (wall) => wall.x === nextPosition.x && wall.y === nextPosition.y
        );
    
        if (!isWall) {
            this.player.x = nextPosition.x;
            this.player.y = nextPosition.y;
        }
    
        this.renderMap();
    }
    
}

const game = new PirateParty();
