class PirateParty {
    constructor() {
        this.player = { x: 1, y: 1, hp: 20, attack: 5 };
        this.currentStage = 1;
        this.mapData = {
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
                    { x: 6, y: 3 }, { x: 6, y: 2 }, {x:5, y:2}, {x:4, y:2}, {x:3, y:2},
                    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
                    { x: 2, y: 5 }, { x: 2, y: 6 }, {x:3, y:6}, {x:4, y:6}
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
                    { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, {x: 3, y: 8},
                    { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
                    { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, {x: 5, y:7},
                    { x: 7, y: 2 }, {x:8, y:2}, { x: 8, y: 3 }, { x: 8, y: 4 },
                    { x: 8, y: 5 }, { x: 8, y: 6 }, {x: 8, y: 7}, {x:8, y:8}
                ],
                grumete: [
                    { x: 4, y: 8 }, {x: 6, y: 2}
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
                    { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
                    { x: 8, y: 2 },
                    { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 },
                    { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 },
                    { x: 6, y: 7 }, { x: 6, y: 8 }, {x: 6, y: 6}, {x: 7, y: 6}, {x: 8, y: 6}
                ],
                grumete: [
                    { x: 5, y: 4 },
                    { x: 5, y: 5 }
                ],
                pirates: [
                    { x: 9, y: 1 },
                    { x: 1, y: 9 },
                    { x: 5, y: 9 },
                    { x: 9, y: 5},
                    { x: 5, y: 5}
                ],
                marines: [
                    { x: 9, y: 8 },
                    { x: 8, y: 9 }
                ],
                heals: [],
                attackBuffs: []
            }
        };
        this.loadStage(this.currentStage);
    }

    loadStage(stage) {
        this.currentStage = stage;
        const nextStageData = this.mapData[this.currentStage];
        this.player.x = nextStageData.playerStart.x;
        this.player.y = nextStageData.playerStart.y;

        this.renderMap();
    }

    renderMap() {
        const stageData = this.mapData[this.currentStage];
        const grid = Array(stageData.size).fill(0).map(() => Array(stageData.size).fill(" "));

        // Add player
        grid[this.player.x - 1][this.player.y - 1] = "P";

        // Add chest
        const chest = stageData.chest;
        grid[chest.x - 1][chest.y - 1] = "C";

        // Add walls
        stageData.walls.forEach((wall) => {
            grid[wall.x - 1][wall.y - 1] = "W";
        });

        // Add grumete
        stageData.grumete.forEach((grumete) => {
            grid[grumete.x - 1][grumete.y - 1] = "T";
        });

        // Add pirates
        stageData.pirates.forEach((pirate) => {
            grid[pirate.x - 1][pirate.y - 1] = "B";
        });

        // Add marines
        stageData.marines.forEach((marine) => {
            grid[marine.x - 1][marine.y - 1] = "M";
        });

        // Add heal
        stageData.heals.forEach((heal) => {
            grid[heal.x - 1][heal.y - 1] = "H";
        });

        // Add attack buffs
        stageData.attackBuffs.forEach((buff) => {
            grid[buff.x - 1][buff.y - 1] = "A";
        });

        console.clear();
        console.log(grid.map((row) => row.join(" ")).join("\n"));
    }

    move(direction) {
        const nextPosition = { x: this.player.x, y: this.player.y };
        if (direction === "up") nextPosition.x -= 1;
        if (direction === "down") nextPosition.x += 1;
        if (direction === "left") nextPosition.y -= 1;
        if (direction === "right") nextPosition.y += 1;

        const isWall = this.mapData[this.currentStage].walls.some(
            (wall) => wall.x === nextPosition.x && wall.y === nextPosition.y
        );

        if (isWall) {
            alert("You can't move through walls!");
            return;
        }

        const interactElement = this.getElementAtPosition(nextPosition);
        if (interactElement) {
            this.interact(interactElement, nextPosition);
        } else {
            this.player.x = nextPosition.x;
            this.player.y = nextPosition.y;
        }

        this.renderMap();
    }

    getElementAtPosition(position) {
        const stageData = this.mapData[this.currentStage];

        if (stageData.grumete.some((grumete) => grumete.x === position.x && grumete.y === position.y)) {
            return { type: "grumete", ...stageData.grumete.find((grumete) => grumete.x === position.x && grumete.y === position.y) };
        }
        if (stageData.pirates.some((pirate) => pirate.x === position.x && pirate.y === position.y)) {
            return { type: "pirate", ...stageData.pirates.find((pirate) => pirate.x === position.x && pirate.y === position.y) };
        }
        if (stageData.marines.some((marine) => marine.x === position.x && marine.y === position.y)) {
            return { type: "marine", ...stageData.marines.find((marine) => marine.x === position.x && marine.y === position.y) };
        }
        if (stageData.heals.some((heal) => heal.x === position.x && heal.y === position.y)) {
            return { type: "heal", ...stageData.heals.find((heal) => heal.x === position.x && heal.y === position.y) };
        }
        if (stageData.attackBuffs.some((buff) => buff.x === position.x && buff.y === position.y)) {
            return { type: "attackBuff", ...stageData.attackBuffs.find((buff) => buff.x === position.x && buff.y === position.y) };
        }
        if (stageData.chest.x === position.x && stageData.chest.y === position.y) {
            return { type: "chest" };
        }
        return null;
    }

    interact(element, position) {
        if (element.type === "grumete" || element.type === "pirate" || element.type === "marine") {
            this.combat(element, position);
        } else if (element.type === "heal") {
            this.player.hp += 5;
            alert("You gained 5 HP!");
            this.mapData[this.currentStage].heals = this.mapData[this.currentStage].heals.filter(
                (heal) => heal.x !== position.x || heal.y !== position.y
            );
        } else if (element.type === "attackBuff") {
            this.player.attack += element.effect;
            alert(`Your attack increased by ${element.effect}!`);
            this.mapData[this.currentStage].attackBuffs = this.mapData[this.currentStage].attackBuffs.filter(
                (buff) => buff.x !== position.x || buff.y !== position.y
            );
        } else if (element.type === "chest") {
            alert("You found the chest! Proceed to the next stage?");
            const proceed = confirm("Do you want to continue to the next stage?");
            if (proceed) {
                this.nextStage();
            } else {
                this.restartGame();
            }
        }

        this.player.x = position.x;
        this.player.y = position.y;
    }

    combat(enemy, position) {
        alert(`Combat initiated! Player HP: ${this.player.hp}, Enemy HP: ${enemy.hp}`);
        while (this.player.hp > 0 && enemy.hp > 0) {
            enemy.hp -= this.player.attack;
            if (enemy.hp <= 0) {
                alert("You defeated the enemy!");
                this.mapData[this.currentStage].grumete = this.mapData[this.currentStage].grumete.filter(
                    (grumete) => grumete.x !== position.x || grumete.y !== position.y
                );
                this.mapData[this.currentStage].pirates = this.mapData[this.currentStage].pirates.filter(
                    (pirate) => pirate.x !== position.x || pirate.y !== position.y
                );
                this.mapData[this.currentStage].marines = this.mapData[this.currentStage].marines.filter(
                    (marine) => marine.x !== position.x || marine.y !== position.y
                );
                this.player.x = position.x;
                this.player.y = position.y;
                return;
            }

            this.player.hp -= enemy.attack;
            if (this.player.hp <= 0) {
                alert("You lost all your HP! Game over.");
                this.restartGame();
                return;
            }
        }
    }

    nextStage() {
        this.currentStage += 1;
        if (this.currentStage > Object.keys(this.mapData).length) {
            alert("Congratulations! You completed all stages!");
            this.restartGame();
            return;
        }

        const nextStageData = this.mapData[this.currentStage];
        this.player.x = nextStageData.playerStart.x;
        this.player.y = nextStageData.playerStart.y;

        this.renderMap();
    }

    restartGame() {
        this.player = { x: 1, y: 1, hp: 20, attack: 5 };
        this.currentStage = 1;
        this.loadStage(this.currentStage);
        alert("Game restarted!");
    }
}

const game = new PirateParty();
game.renderMap();
