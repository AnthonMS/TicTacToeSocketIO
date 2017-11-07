class Tictactoe
{
    constructor(selector)
    {
        this.ROWS = 3;
        this.COLS = 3;
        this.player = 'red';
        this.selector = selector;

        //const $grid = $(selector);
        //$grid.html('Hello World');
        this.createGrid();
        this.setupEventListeners();
    }

    createGrid()
    {
        const $board = $(this.selector);
        for (let row = 0; row < this.ROWS; row++)
        {
            const $row = $('<div>')
                .addClass('row');
            for (let col = 0; col < this.COLS; col++)
            {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
        //console.log($board.html());
    }

    setupEventListeners()
    {
        const that = this;
        const $board = $(this.selector);

        // checks if the mouse enters any item with class col empty, if so, a function is called
        $board.on('mouseenter', '.col.empty', function () {
            const col = $(this).data('col');
            const row = $(this).data('row');
            //console.log(row + ', ' + col);
            // checks if the class of the div is empty or not
            if ($(this).hasClass('empty'))
            {
                // If it is empty, we will change it to hover-(color) (Where the color is the player)
                $(this).addClass(`hover-${that.player}`);
            }
        });

        // checks if the mouse leaves any item with class col, if so function is called
        $board.on('mouseleave', '.col', function () {
            $('.col').removeClass(`hover-${that.player}`);
        });

        $board.on('click', '.col.empty', function () {
            const col = $(this).data('col');
            const row = $(this).data('row');
            // Checks if div is class empty
            if ($(this).hasClass('empty'))
            {
                const $emptyCell = $(this);
                $emptyCell.removeClass(`empty hover-${that.player}`);
                $emptyCell.addClass(that.player);
                $emptyCell.attr('data-player', that.player);

                that.checkForWinner2(
                    $emptyCell.data('row'),
                    $emptyCell.data('col')
                );

                /*const winner = that.checkForWinner(
                    $emptyCell.data('row'),
                    $emptyCell.data('col'));
                if (winner)
                {
                    alert(`Game Over! Player ${that.player} has won!`);
                    return;
                }*/

                // If player variable is red, change it to black, or else change it to red.
                that.player = (that.player === 'red') ? 'black' : 'red';
                $(this).trigger('mouseenter');
            }

        });
    }

    checkForWinner2(row, col)
    {
        const that = this;
        let totalVer = 0;
        let totalHor = 0;
        let totalDia = 0;
        let totalDia2 = 0;
        //console.log(playerColor);

        function $getCell(i, j)
        {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        let $cellClicked = $getCell(row, col);

        // CHECK HORIZONTAL
        function checkHor()
        {
            for (let j = 0; j < that.COLS; j++)
            {
                //console.log(`row: ${row} col: ${col}`);
                let $checkCell2 = $getCell($cellClicked.data('row'), j);
                if ($checkCell2.data('player') != that.player)
                {
                    console.log(`!hor/check: ${$cellClicked.data('row')}, ${j} click: ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalHor: ${totalHor}`);
                    return false;
                } else {
                    totalHor++;
                    console.log(`hor/check: ${$cellClicked.data('row')}, ${j} click: ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalHor: ${totalHor}`);
                }
            }
            return true;
        }
        if (checkHor() == true)
        {
            //if (totalHor >= 3)
            //{
            alert(`Game Over! ${that.player} player has won!`);
            //}
        }
        // ----------------------------------------------------------

        // CHECK VERTICAL
        // this for loop checks above and below (the rows), if the div data attr 'player'
        // is the same as the one who just put a piece down.
        function checkVer()
        {
            for (let i = 0; i < that.ROWS; i++)
            {
                let $checkCell = $getCell(i, $cellClicked.data('col'));
                // if the data 'player' is the same as above or below data, add point to totalVer.
                if ($checkCell.data('player') != that.player)
                {
                    console.log(`!ver/check: ${i}, ${$cellClicked.data('col')} click: ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalVer: ${totalVer}`);
                    return false;
                } else {
                    totalVer++;
                    console.log(`ver/check: ${i}, ${$cellClicked.data('col')} click: ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalVer: ${totalVer}`);
                }
            }
            return true;
        }
        if (checkVer() == true)
        {
            //if (totalHor >= 3)
            //{
            alert(`Game Over! ${that.player} player has won!`);
            //}
        }
        // ----------------------------------------------------------

        // CHECK DIAGONAL TOP LEFT TO BOTTOM RIGHT
        function checkDiaTLtoBR()
        {
            for (let z = 0; z < that.ROWS; z++)
            {
                // Go through the Rows of the gameboard grid
                let $checkCell3 = $getCell(z, z); // goes through 0,0 1,1 2,2
                if ($checkCell3.data('player') != that.player)
                {
                    console.log(`!dia/check: ${z}, ${z} click ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalDia: ${totalDia}`);
                    return false;
                } else {
                    totalDia++;
                    console.log(`dia/check: ${z}, ${z} click ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalDia: ${totalDia}`);
                }
            }
            return true;
        }
        if (checkDiaTLtoBR() == true)
        {
            alert(`Game Over! ${that.player} player has won!`);
        }
        // ----------------------------------------------------------

        // CHECK DIAGONAL TOP RIGHT TO BOTTOM LEFT
        function checkDiaTRtoBL()
        {
            let z = 0;
            let x = that.COLS - 1; // = 2
            for (z; z < that.ROWS; z++)
            {
                let $checkCell4 = $getCell(z, x);
                //console.log(`${z}, ${x}`);
                if ($checkCell4.data('player') != that.player)
                {
                    console.log(`!dia2/check: ${z}, ${x} click ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalDia2: ${totalDia2}`);
                    return false;
                } else {
                    totalDia2++;
                    console.log(`dia2/check: ${z}, ${x} click ${$cellClicked.data('row')}, ${$cellClicked.data('col')} totalDia2: ${totalDia2}`);
                }
                x--;
            }
            return true;
        }
        if (checkDiaTRtoBL() == true)
        {
            alert(`Game Over! ${that.player} player has won!`);
        }
        // ----------------------------------------------------------
    }







    checkForWinner(row, col)
    {
        const that = this;

        function $getCell(i, j)
        {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }
        
        function checkDirection(direction)
        {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLS &&
                $next.data('player') === that.player)
            {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }


        function checkWin(directionA, directionB)
        {
            const total = 1 +
                checkDirection(directionA) +
                checkDirection(directionB);
            if (total >= 3)
            {
                return that.player;
            } else {
                return null;
            }
        }
        
        function checkDiagonalBLtoTR() {
            return checkWin({i: 1, j: -1}, {i: 1, j: 1});
        }

        function checkDiagonalTLtoBR() {
            return checkWin({i: 1, j: 1}, {i: -1, j: -1});
        }

        function checkVerticals()
        {
            return checkWin({i: -1, j: 0}, {i: 1, j: 0});
        }

        function checkHorizontals()
        {
            return checkWin({i: 0, j: -1}, {i: 0, j: 1});
        }

        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR() ||
            checkDiagonalTRtoBL;
    }
}



























