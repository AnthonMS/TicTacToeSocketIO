var socket = io.connect('http://localhost:4000');

$(document).ready(function () {
    for (let row = 0; row < 1; row++)
    {
        const $row = $('<div>')
            .addClass('row');
        for (let col = 0; col < 3; col++)
        {
            const $col = $('<div>')
                .addClass('col empty')
                .attr('data-col', col);
            $row.append($col);
        }
        $("#index_container").append($row);
    }

    setupEventListeners();

    /*var testArray = new Array('Test1', 'Test2', 'Test3');
    console.log(testArray);
    testArray.push('Test4');
    console.log(testArray);*/
});


function setupEventListeners()
{
    const that = this;
    const $board = $("#index_container");

    // checks if the mouse enters any item with class col empty, if so, a function is called
    /*$board.on('mouseenter', '.col.empty', function () {
        const col = $(this).data('col');
        const row = $(this).data('row');

        $(this).addClass(`hover-red`);

    });

    // checks if the mouse leaves any item with class col, if so function is called
    $board.on('mouseleave', '.col', function () {
        $('.col').removeClass(`hover-red`);
    });*/

    $board.on('click', '.col', function () {
        // Checks if div is class empty
        const $emptyCell = $(this);
        let col = $emptyCell.data('col');
        //console.log(col);
        /*$emptyCell.removeClass(`empty hover-red`);
        $emptyCell.addClass('red');
        $emptyCell.attr('data-player', 'red');*/

        if ($emptyCell.hasClass('red'))
        {
            //$emptyCell.attr('class', 'col ').addClass('black').attr('data-player', 'black');
            sendColorChange('black', col);
        } else {
            //$emptyCell.attr('class', 'col ').addClass('red').attr('data-player', 'red');
            sendColorChange('red', col);
        }
    });
}


function sendColorChange(color, col)
{
    socket.emit('colorchange', {
        color: color,
        column: col
    });
}

socket.on('colorchange', function(data) {
    const $cell = $(`.col[data-col='${data.column}']`);
    //console.log($cell.data('col'), $cell.data('player'));
    $cell.attr('class', 'col ').addClass(data.color).attr('data-player', data.color);
});






