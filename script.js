let score = 0;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
let changingSnakeDirection = false;


creatFood();
// main();

function main(){
    setTimeout(function onTik(){
        if(Snake.die())
            return;
        changingSnakeDirection = false;
        clearCanvas();
        Food.drawFood();
        Snake.eat();
        Snake.drawSnake();
        main();
    }, 100);
};

document.addEventListener("keydown", changeSnakeDirection);
function clearCanvas(){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "brown";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function randomTen(min, max){
    return Math.round(Math.random()* ((max-min)+min) / 10) * 10;
}

let Food = {
    foodX : randomTen(0, canvas.width - 10),
    foodY : randomTen(0, canvas.height - 10),

    drawFood : function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.foodX,this.foodY,10,10);
        ctx.stroke();
    }
}

let Snake = {
    array_snake : [
        {x: 150, y:75},
        {x: 140, y:75},
        {x: 130, y:75},
        {x: 120, y:75},
        {x: 110, y:75}
    ],

    drawSnakePart : function (snakePart) {
        ctx.fillStyle = "lightgreen";
        ctx.strokeStyle= "darkgreen";
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    },

    drawSnake : function () {
        this.array_snake.forEach(this.drawSnakePart);
    },

    eat : function () {
        const head = {x: this.array_snake[0].x + dx, y: this.array_snake[0].y + dy}
        this.array_snake.unshift(head);
        const didEatFood = head.x == Food.foodX && head.y == Food.foodY;
        if(didEatFood){
            score += 10;
            document.getElementById("score").innerHTML = "Score: " + score;
            creatFood();
        }else{
            this.array_snake.pop();
        }
    },
    
    die : function () {
        for(var i=4; i< this.array_snake.length; i++){
            var didItCollie = (this.array_snake[0].x === this.array_snake[i].x &&
                this.array_snake[0].y === this.array_snake[i].y);
            if(didItCollie)
                return true;
        }
        const hitLeftWall = this.array_snake[0].x < 0;
        const hitRightWall = this.array_snake[0].x > canvas.width - 10;
        const hitToptWall = this.array_snake[0].y < 0;
        const hitBottomtWall = this.array_snake[0].y > canvas.height - 10;

        return hitLeftWall || hitBottomtWall || hitRightWall || hitToptWall;
    },

    move : function (event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            const keyPressed = event.keyCode;
            const goingUp = dy === -10;
            const goingDown = dy === 10;
            const goingLeft = dx === -10;
            const goingRight = dx === 10;
            if(changingSnakeDirection)
                return;
            changingSnakeDirection = true;
            if(keyPressed == LEFT_KEY && !goingRight){
                dx = -10;
                dy = 0;
            }
            if(keyPressed == RIGHT_KEY && !goingLeft){
                dx= 10;
                dy=0;
            }
            if(keyPressed == UP_KEY && !goingDown){
                dx = 0;
                dy = -10;
            }
            if(keyPressed == DOWN_KEY && !goingUp){
                dx = 0;
                dy = 10;
            }
        }
}

function creatFood(){
    Food.foodX = randomnTen(0, canvas.width - 10);
    Food.foodY = randomnTen(0, canvas.height - 10);

    Snake.array_snake.forEach(function isFoodOnSnake(part){
        const foodIsOnSnake = part.x == Food.foodX && part.y == Food.foodY;
        if(foodIsOnSnake)
            creatFood();
    });
}
