class PirateParty {
    constructor() {
        this.player = { x: 1, y: 1, hp: 20, attack: 5 };
        this.currentStage = 1;
        this.mapData = {
            1: {
                size: 5,
                playerStart: { x: 1, y: 1 },
                chest: { x: 5, y: 3 },
                walls: [
                    { x: 1, y: 2 },
                    { x: 2, y: 2 },
                    { x: 1, y: 4 },
                    { x: 2, y: 4 },
                    { x: 5, y: 2 },
                    { x: 5, y: 4 }
                ],
                grumete: [
                    { x: 4, y: 2 },
                    { x: 4, y: 3 },
                    { x: 4, y: 4 }
                ],
                pirates: [],
                marines: [],
                heals: [],
                attackBuffs: []
            },
            2: {
                size: 6,
                playerStart: { x: 1, y: 1 },
                chest: { x: 6, y: 6 },
                walls: [
                    { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 },
                    { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
                    { x: 4, y: 5 }, { x: 5, y: 5 }
                ],
                grumete: [
                    { x: 6, y: 3 },
                    { x: 3, y: 3 },
                    { x: 3, y: 6 }
                ],
                pirates: [],
                marines: [],
                heals: [
                    { x: 6, y: 1 },
                    { x: 1, y: 6 }
                ],
                attackBuffs: [
                    { x: 2, y: 2, effect: 1 }
                ]
            },
            3: {
                size: 7,
                playerStart: { x: 7, y: 7 },
                chest: { x: 4, y: 4 },
                walls: [
                    { x: 6, y: 7 }, { x: 6, y: 6 }, { x: 6, y: 5 }, { x: 6, y: 4 },
                    { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 5, y: 1 },
                    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
                    { x: 2, y: 5 }, { x: 2, y: 6 }
                ],
                grumete: [
                    { x: 5, y: 6 }
                ],
                pirates: [
                    { x: 5, y: 5 }
                ],
                marines: [],
                heals: [
                    { x: 5, y: 3 },
                    { x: 3, y: 5 }
                ],
                attackBuffs: [
                    { x: 1, y: 1, effect: 1 }
                ]
            },
            4: {
                size: 8,
                playerStart: { x: 1, y: 8 },
                chest: { x: 8, y: 1 },
                walls: [
                    { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
                    { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 },
                    { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
                    { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 },
                    { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 },
                    { x: 7, y: 5 }, { x: 7, y: 6 }
                ],
                grumete: [
                    { x: 4, y: 8 }
                ],
                pirates: [
                    { x: 6, y: 1 }
                ],
                marines: [],
                heals: [
                    { x: 4, y: 1 },
                    { x: 7, y: 3 },
                    { x: 7, y: 8 }
                ],
                attackBuffs: [
                    { x: 1, y: 1, effect: 1 },
                    { x: 7, y: 4, effect: 1 },
                    { x: 7, y: 7, effect: 1 }
                ]
            },
            5: {
                size: 9,
                playerStart: { x: 1, y: 1 },
                chest: { x: 9, y: 9 },
                walls: [
                    { x: 2, y: 8 }, { x: 2, y: 7 }, { x: 2, y: 6 }, { x: 2, y: 5 }, { x: 2, y: 4 }, { x: 2, y: 3 },
                    { x: 2, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 },
                    { x: 8, y: 7 },
                    { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 },
                    { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 },
                    { x: 6, y: 7 }, { x: 6, y: 8 }
                ],
                grumete: [
                    { x: 5, y: 4 },
                    { x: 5, y: 5 }
                ],
                pirates: [
                    { x: 9, y: 1 },
                    { x: 1, y: 9 },
                    { x: 5, y: 9 }
                ],
                marines: [
                    { x: 9, y: 8 },
                    { x: 8, y: 9 }
                ],
                heals: [],
                attackBuffs: []
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

        // Cek batas peta
        const isOutOfBounds = nextPosition.x < 1 || nextPosition.x > stageData.size || nextPosition.y < 1 || nextPosition.y > stageData.size;

        if (!isWall && !isOutOfBounds) {
            this.player.x = nextPosition.x;
            this.player.y = nextPosition.y;
        }

        this.renderMap();
    }
}

const game = new PirateParty();