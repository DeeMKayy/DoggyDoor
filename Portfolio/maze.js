let maze = document.querySelector('.maze');
let player = document.getElementById('player');
let ctx = maze.getContext('2d');

let current;

class Maze {
    constructor (size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }

    play(direction) {
        let newRow = player.rowNum;
        let newCol = player.colNum;

        switch (direction) {
            case 'up':
                newRow = Math.max(0, newRow - 1);
                break;
            case 'down':
                newRow = Math.min(this.rows - 1, newRow + 1);
                break;
            case 'left':
                newCol = Math.max(0, newCol - 1);
                break;
            case 'right':
                newCol = Math.min(this.columns - 1, newCol + 1);
                break;
        }

        if (!this.grid[newRow][newCol].walls.topWall && direction === 'up' ||
        !this.grid[newRow][newCol].walls.rightWall && direction === 'right' ||
        !this.grid[newRow][newCol].walls.bottomWall && direction === 'down' ||
        !this.grid[newRow][newCol].walls.leftWall && direction === 'left') {
            // Update the player's position
            player.rowNum = newRow;
            player.colNum = newCol;

            let x = (newCol * this.size) / this.columns;
            let y = (newRow * this.size) / this.rows;
            //let { x, y } = this.grid[newRow][newCol].calculatePixelCoordinates(this.size, this.rows, this.columns);

            //ctx.clearRect(0, 0, maze.width, maze.height);
            // Redraw the maze with the updated player position
            this.draw();

            //ctx.drawImage(player, x, y, player, player);
            //this.play(x, y);
        }
    }

    draw() {
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = 'black';
        current.visited = true;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns);
            }
        }

        let next = current.checkNeighbours();

        if (next) {
            next.visited = true;
            this.stack.push(current);
            current.highlight(this.columns);
            current.removeWall(current, next);
            current = next;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            current = cell;
            current.highlight(this.columns);
        }

        if (this.stack.length === 0) {
            return;
        }

        window.requestAnimationFrame(() => {
            this.draw();
        });   
    }
}


class Cell {
    constructor (rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true,
        };
    }

    checkNeighbours() {
        let grid = this.parentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = row !== 0 ? grid[row - 1][col] :  undefined;
        let right = col !== grid.length - 1 ? grid[row][col + 1] :  undefined;
        let bottom = row !== grid.length - 1 ? grid[row + 1][col] :  undefined;
        let left = col !== 0 ? grid[row][col - 1] :  undefined;

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if(neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];   
        } else {
            return undefined;
        }
    }

    drawTopWall(x, y, size, rows, columns) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / columns, y);
        ctx.stroke();
    }

    drawRightWall(x, y, size, rows, columns) {
        ctx.beginPath();
        ctx.moveTo(x + size / columns, y);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }

    drawBottomWall(x, y, size, rows, columns) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / rows);
        ctx.lineTo(x + size / columns, y + size / rows);
        ctx.stroke();
    }

    drawLeftWall(x, y, size, rows, columns) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
    }

    highlight(columns) {
        let x = this.colNum * this.parentSize / columns + 1;
        let y = this.rowNum * this.parentSize / columns + 1;

        //ctx.fillStyle = 'pink';
        ctx.fillRect(x, y, this.parentSize / columns - 3, this.parentSize / columns - 3);
    }

    removeWall(cell1, cell2) {
        let x = (cell1.colNum - cell2.colNum);
        
        if (x === 1) {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        } else if (x === -1) {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = (cell1.rowNum - cell2.rowNum);

        if (y === 1) {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        } else if (y === -1) {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    }

    show(size, rows, columns){
        let x = (this.colNum * size) / columns;
        let y = (this.rowNum * size) / rows;

        ctx.strokeStyle = 'rgb(254, 223, 168)';
        ctx.fillStyle = 'black';
        ctx.lineWidth = '2';

        if (this.walls.topWall) this.drawTopWall(x, y, size, rows, columns);
        if (this.walls.rightWall) this.drawRightWall(x, y, size, rows, columns);
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, rows, columns);
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, rows, columns);
        if (this.visited) {
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
        }
    }

    /*[calculatePixelCoordinates(size, rows, columns) {
        let x = (this.colNum  * size) / columns;
        let y = (this.colNum * size) / rows;
        return {x, y};
    }*/
}

let newMaze = new Maze(500, 15, 15);
newMaze.setup();

player = new Cell(0, 0, newMaze.grid, newMaze.size);
newMaze.draw();

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            newMaze.play('up');
            break;
        case 'ArrowDown':
            newMaze.play('down');
            break;
        case 'ArrowLeft':
            newMaze.play('left');
            break;
        case 'ArrowRight':
            newMaze.play('right');
            break;
    }
});