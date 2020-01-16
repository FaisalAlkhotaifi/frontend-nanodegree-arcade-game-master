
// Declare a variable to hold the current score
let score = 0;

// Declare a variables to hold score and final score element
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');

// Constructor function that set the position x and y on canvas
class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// Constructor function that set the emeny position, speed, width and height on canvas
class Enemy {
    constructor(pos, speed, width, height) {
        this.pos = pos;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.sprite = 'images/enemy-bug.png';
    }

    // To handle the change position of enemy
    update(dt) {
        this.pos.x += this.speed * dt;

        // if it reached to the end of the canvas and move it the start position
        if (this.pos.x > 505) {
            this.pos.x = -15;
        }

        // if the player collide enemy, then reset player position to beginning
        if (
            player.pos.x < this.pos.x + (this.width - (this.width * 0.2)) &&
            player.pos.x + player.width > this.pos.x &&
            player.pos.y < this.pos.y + (this.height - (this.height * 0.2)) &&
            player.pos.y + player.height > this.pos.y
        ) {
            setTimeout(() => {
                player.pos = new Position(203, 400);
            }, 100);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.pos.x, this.pos.y);
    }
}

// Constructor function that set the player position, width and height on canvas
class Player {
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.player = 'images/char-boy.png';
    }

    update() {
        
    }

    render() {
        ctx.drawImage(Resources.get(this.player), this.pos.x, this.pos.y);
    }

    // Handle user input key and make sure that player does not get out the canvas
    handleInput(key) {
        switch (key) {
            case 'left': 
                this.pos.x = this.pos.x <= 3 ? 3 : this.pos.x - 100;
                break;
            case 'up': 
                this.pos.y = this.pos.y <= 0 ? -15 : this.pos.y - 83
                break;
            case 'right': 
                this.pos.x = this.pos.x >= 403 ? 403 : this.pos.x + 100;
                break;
            case 'down':  
                this.pos.y = this.pos.y >= 400 ? 400 : this.pos.y + 83
                break;
        }

        // Display success message on reaching to the end and reset player position
        if (this.pos.y <= 0) {
            setTimeout(() => {
                this.pos = new Position(203, 400);
                score += 1;
                scoreElement.textContent = score;
                
                showSuccessMessage();
            }, 250);
        }
    }
}

// Declare a variables that hold initial value of player and enemies
let allEnemies = [];
const allSpeed = [300, 155, 70];
const playerPos = new Position(203, 400);
const player = new Player(playerPos, 60, 50);
const enemiesPostion = [
    new Position(-15, 60), 
    new Position(-15, 143), 
    new Position(-15, 226)
];

// pushing enemies value to allEnemies array
enemiesPostion.forEach(function(pos, index) {
    const speed = allSpeed[index];
    const enemy = new Enemy(pos, speed, 100, 60);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const showSuccessMessage = () => {
    finalScoreElement.textContent = score;

    $("#myModal").modal("toggle");
}

// Resetting initail values of score and player
const resetGame = () => {
    score = 0;
    scoreElement.textContent = score;
    player = new Player(playerPos, 60, 50)
}

// Handle play again action when the user click on play again button on success pop message
const playAgain = () => {
    $("#myModal").modal("hide");
    resetGame();
}



