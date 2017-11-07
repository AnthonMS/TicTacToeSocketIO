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
        const $board = $(this.selector);

        // checks if the mouse enters any item with class col empty, if so, a function is called
        $board.on('mouseenter', '.col.empty', function () {
            const col = $(this).data('col');
            const row = $(this).data('row');
            console.log(row + ', ' + col);
            // checks if the class of the div is empty or not
            if ($(this).hasClass('empty'))
            {
                // If it is empty, we will change it to hover-red to make hover effect for red player (only for now)
                $(this).addClass('hover-red');
            }
        });

        // checks if the mouse leaves any item with class col, if so function is called
        $board.on('mouseleave', '.col', function () {
            $('.col').removeClass('hover-red');
        });
    }
}



























