var socket  = io.connect('http://localhost:4000');
var gOppoName = '';
var gOppoId = '';
var gUsername = '';
var gUserId = '';

class Tictactoe_online
{

    constructor(oppo, oppoid, username, userid, ifelse)
    {
        //this.socket = io.connect('http://localhost:4000');
        /*socket.emit('newuser', {
            name: $input_name.val(),
            id: socket.id
        });*/

        this.ROWS = 3;
        this.COLS = 3;
        this.player = '';
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
        } else {
            // Else if 2 then you send the new userid to opponent
            //console.log('test2', socket.id);
        }

        this.createGrid();
        this.setupEventListeners();

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
        console.log('myname', gUsername);
        console.log('myuserid', gUserId);
        console.log('myoppo', gOppoName);
        console.log('myoppoid', gOppoId);
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
                $(this).addClass(`hover-red`);
            }
        });

        // checks if the mouse leaves any item with class col, if so function is called
        $container.on('mouseleave', '.col', function () {
            $('.col').removeClass(`hover-red`);
        });

        $container.on('click', '.col', function () {
            //$(this).removeClass(`empty hover-red`);
            //$(this).addClass('red');
            console.log('myname', gUsername);
            console.log('myuserid', gUserId);
            console.log('myoppo', gOppoName);
            console.log('myoppoid', gOppoId);

            const col = $(this).data('col');
            const row = $(this).data('row');
            const id = this.oppoid

            socket.emit('colclick', {
                col: col,
                id: gOppoId,
                row: row
            });
        });
    }


}



























