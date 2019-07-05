let canvas = document.getElementById("game");
let context = canvas.getContext('2d');

let grid = 16;
let count = 0;
let score = 0;

//khởi tạo snake
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
}

//khởi tạo apple
let apple = {
    x: 320,
    y: 320
}

//sinh số random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//loop
function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    //khi snake đụng tường thì kết thúc game
    if (snake.x < 0) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        return;
    } else if (snake.x >= canvas.width) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        return;
    } else if (snake.y < 0) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        return;
    } else if (snake.y >= canvas.height) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        return;
    }

    //thêm 1 ô vuông vào đầu snake
    snake.cells.unshift({x: snake.x, y: snake.y});

    //thêm 1 ô vuông vào đầu thì xóa ô vuông ở cuối
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    //drawApple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    //drawSnake
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        //snake eat apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            score += 10;
            document.getElementById("score").innerHTML = "Score: " + score;
        }

        //snake cắn đuôi
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
                score = 0;
                document.getElementById("score").innerHTML = "Score: " + score;
                return;
            }
        }
    })
}

//sự kiện ấn phím
document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
})
requestAnimationFrame(loop);