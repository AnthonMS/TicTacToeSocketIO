class Tictactoe
{
    constructor(selector)
    {
        this.ROWS = 3;
        this.COLS = 3;
        this.selector = selector;

        //const $grid = $(selector);
        //$grid.html('Hello World');
        this.createGrid();
    }

    createGrid()
    {
        const $board = $(this.selector);
        for (let row = 0; row < this.ROWS; row++)
        {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.COLS; col++)
            {
                const $col = $('<div>').addClass('col empty');
                $row.append($col);
            }
            $board.append($row);
        }
        //console.log($board.html());
    }
}