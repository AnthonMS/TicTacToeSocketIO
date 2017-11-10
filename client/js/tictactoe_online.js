var socket  = io.connect('http://localhost:4000');
var gOppoName = '';
var gOppoId = '';
var gUsername = '';
var gUserId = '';
var gplayer = '';
var gActiveUser;

class Tictactoe_online
{

    constructor(oppo, oppoid, username, userid, ifelse)
    {
        const that = this;
        this.ROWS = 3;
        this.COLS = 3;
        this.opponame = oppo;
        this.oppoid = oppoid;
        this.username = username;
        this.userid = userid;

        gOppoName = oppo;
        gOppoId = oppoid;
        gUsername = username;
        gUserId = userid;

        if (ifelse == 1)
        {
            // Then you have to send information to oppenent, that you accepted match.
            //console.log('test1', socket.id);
            socket.emit('startgame', {
                userid: this.oppoid,
                username: this.opponame,
                opponame: this.username,
                oppoid: this.userid
            });
            gplayer = 'red';
            gActiveUser = true;

            $('#opponent').html(gOppoName);
            $('#yourturn').html('Your Turn');
        } else {
            // Else if 2 then you send the new userid to opponent
            //console.log('test2', socket.id);
            gplayer = 'black';
            gActiveUser = false;

            $('#opponent').html(gOppoName);
            $('#yourturn').html(`${gOppoName}'s Turn`);
        }

        this.createGrid();
        this.setupEventListeners();

        socket.on('colclick_deactivate', function (data) {
            //console.log(data);
            let $checkCell = $getCell(data.row, data.col);
            //console.log($checkCell);
            $checkCell.removeClass(`empty hover-${data.color}`);
            $checkCell.addClass(data.color);
            $checkCell.attr('data-player', data.color);
            gActiveUser = false;

            $('#yourturn').html(`${gOppoName}'s Turn`);

            that.checkForWinner(data.row, data.col, data.color);

        });
        socket.on('colclick_activate', function (data) {
            //console.log(data);
            let $checkCell = $getCell(data.row, data.col);
            //console.log($checkCell);
            $checkCell.removeClass(`empty hover-${data.color}`);
            $checkCell.addClass(data.color);
            $checkCell.attr('data-player', data.color);
            gActiveUser = true;

            $('#yourturn').html(`Your Turn`);

            that.checkForWinner(data.row, data.col, data.color);
        });

    }

    checkForWinner(row, col, color)
    {
        const that = this;
        let totalVer = 0;
        let totalHor = 0;
        let totalDia = 0;
        let totalDia2 = 0;

        let $cellClicked = $getCell(row, col);

        function checkHor()
        {
            for (let j = 0; j < that.COLS; j++)
            {
                let $checkCell = $getCell($cellClicked.data('row'), j);
                if ($checkCell.data('player') != color)
                {
                    //return false;
                } else {
                    totalHor++;
                }
            }
            return totalHor;
        }
        if (checkHor() >=3)
        {
            //alert(`Game Over! ${color} has won!`);
            $('#index_title h1').html(`${color} has won!`);
        }

        function checkVer()
        {
            for (let i = 0; i < that.ROWS; i++)
            {
                let $checkCell = $getCell(i, $cellClicked.data('col'));
                if ($checkCell.data('player') != color)
                {
                    //return false;
                } else {
                    totalVer++;
                }
            }
            return totalVer;
        }
        if (checkVer() >= 3)
        {
            $('#index_title h1').html(`${color} has won!`);
        }

        function checkDiaTLtoBR()
        {
            for (let z = 0; z < that.ROWS; z++)
            {
                let $checkCell = $getCell(z, z);
                if ($checkCell.data('player') != color)
                {
                    // return false;
                } else {
                    totalDia++;
                }
            }
            return totalDia;
        }
        if (checkDiaTLtoBR() >= 3)
        {
            $('#index_title h1').html(`${color} has won!`);
        }

        function checkDiaTRtoBL()
        {
            let z = 0;
            let x = that.COLS - 1; // = 2
            for (z; z < that.ROWS; z++)
            {
                let $checkCell = $getCell(z, x);
                if ($checkCell.data('player') != color)
                {
                    // return false;
                } else {
                    totalDia2++;
                }
                x--;
            }
            return totalDia2;
        }
        if (checkDiaTRtoBL() >= 3)
        {
            $('#index_title h1').html(`${color} has won!`);
        }

    }


    createGrid()
    {
        //console.log(this.challenger, this.challenged, this.challengerid, this.challengedid);
        const $board = $('#middlesection');
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
    }

    setupEventListeners()
    {
        const $container = $("#middlesection");
        const that = this;

        // checks if the mouse enters any item with class col empty, if so, a function is called
        $container.on('mouseenter', '.col.empty', function () {
            const col = $(this).data('col');
            const row = $(this).data('row');
            //console.log(row + ', ' + col);
            // checks if the class of the div is empty or not
            if ($(this).hasClass('empty'))
            {
                // If it is empty, we will change it to hover-(color) (Where the color is the player)
                $(this).addClass(`hover-${gplayer}`);
            }
        });

        // checks if the mouse leaves any item with class col, if so function is called
        $container.on('mouseleave', '.col', function () {
            $('.col').removeClass(`hover-${gplayer}`);
        });

        $container.on('click', '.col.empty', function () {
            const col = $(this).data('col');
            const row = $(this).data('row');

            if (gActiveUser == true)
            {
                socket.emit('colclick', {
                    col: col,
                    row: row,
                    id: gOppoId,
                    color: gplayer
                });
            } else {
                // Not this clients turn turn
            }
        });
    }
}

function $getCell(i, j)
{
    return $(`.col[data-row='${i}'][data-col='${j}']`);
}





























