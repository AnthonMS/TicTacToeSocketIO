var socket = io.connect('http://localhost:4000');
var $userlist = null;
var username, markedUser, markedUserID;
var nameArray = new Array();
var idArray = new Array();
var testname, testid;

$(document).ready(function () {
    $userlist = $('#userlist');

    socket.emit('getarrays', socket.id);
    //console.log(socket.id);

    setupEventListeners();

    //$("#middlesection").html('');
    //drawChallengeSection();

});


function setupEventListeners()
{
    const $container = $("#index_container");
    const that = this;

    //-------------------------- USER TITLE CLIICKED -----------------------------------------------
    $container.on('click', '#userlist b', function () {
        $('#userlist li').attr('class', '');
        markedUserID = '';
        markedUser = '';
        $("#oppo").html('Noone selected');
    });
    //-----------------------------------------------------------------------------------------------

    //-------------------------- LOGIN BUTTON CLIICKED -----------------------------------------------
    $container.on('click', '#login_btn', function () {
        // Get name input field
        const $input_name = $('#name_input');
        if (!$input_name.val())
        {
            alert('Your name cannot be empty...');
        }
        else
        {
            //alert('Successfully got on the line');
            username = $input_name.val();
            socket.emit('newuser', {
                name: $input_name.val(),
                id: socket.id
            });
            $(this).attr('id', 'login_btn_clicked');
            $('#challenge_btn').attr('class', 'btn_active');
        }
    });
    //-----------------------------------------------------------------------------------------------

    //-------------------------- USER CLIICKED --------------------------------------------------------
    $container.on('click', '#userlist li', function ()
    {
        if ($(this).data('name') != username)
        {
            $('#userlist li').attr('class', '');
            $(this).attr('class', 'marked_listitem');
            markedUser = $(this).data('name');
            markedUserID = $(this).data('id');
            //console.log(markedUserID);
            $("#oppo").html(markedUser);
        }
    });
    //-----------------------------------------------------------------------------------------------

    //-------------------------- CHALLENGE BUTTON CLIICKED -----------------------------------------------
    $container.on('click', '#challenge_btn', function () {
        if (markedUser != "")
        {
            // Marked user is not empty
            if ($(this).hasClass('btn_active'))
            {
                socket.emit('challenge', {
                    challenger: username,
                    challengerid: socket.id,
                    challenged: markedUser,
                    challengedid: markedUserID
                });
            } else {
                // not on the line
                $("#oppo").html('Please enter your name >>>>');
            }
        }
    });
    //-----------------------------------------------------------------------------------------------

    //-------------------------- ACCEPT BUTTON CLIICKED -------------------------------------
    $container.on('click', 'tr td .a', function () {

        const $nametable = $(this).parent().parent().parent();
        const $name1 = $nametable.find('.namecol');
        var challName = $name1.html();
        let oppName, oppId;

        for (let i = 0; i < nameArray.length; i++)
        {
            //console.log(nameArray[i] + ' ' + challName + ' ' + idArray[i]);
            if (nameArray[i] === challName)
            {
                //console.log("USER FOUND!");
                oppName = nameArray[i];
                oppId = idArray[i];
            }
        }
        //console.log(oppName + ' ' + oppId);

        if (oppName || oppId)
        {
            //alert("Successfully accepted match and found opponent");
            socket.emit('accept_challenge', {
                challenger: oppName,
                challengerid: oppId,
                challenged: username,
                challengedid: socket.id
            });
        } else {
            alert("Something went wrong, Couldn't find the player you accepted the challenge from...");
        }
    });
    //-----------------------------------------------------------------------------------------------

    //-------------------------- DENY BUTTON CLIICKED -----------------------------------------------
    $container.on('click', 'tr td .d', function () {
        $(this).parent().parent().parent().remove();
    });
    //-----------------------------------------------------------------------------------------------

}

socket.on('newuser', function(data) {
    //console.log('new user ' + data.name + data.id);
    nameArray.push(data.name);
    idArray.push(data.id);
    const $listItem = ('<li data-name=' + data.name + ' data-id=' + data.id + '>- ' + data.name + '</li>');
    $userlist.append($listItem);
});

socket.on('getarrays', function (data) {
    nameArray = data.namearray;
    idArray = data.idarray;

    populateUsers();
});

function populateUsers()
{
    $('ul li').empty();
    for (let i = 0; i < nameArray.length; i++)
    {
        const $listItem = ('<li data-name=' + nameArray[i] + ' data-id=' + idArray[i] + '>- ' + nameArray[i] + '</li>');
        $userlist.append($listItem);
    }
}

socket.on('splicearrays', function (data) {
    idArray.splice(data, 1);
    nameArray.splice(data, 1);
    //console.log('number ' + data + ' spliced');
    populateUsers();
});

socket.on('challenged', function (data) {
    const $tablerow = (`<tr id="name_${data.challenger}"><td class="namecol">${data.challenger}</td><td id='timer_${data.challenger}'>60</td><td><div><p class='a'>Accept</p><p>/</p><p class='d'>Deny</p></div></td></tr>`);
    //const $tablerow = ('<tr><td>' + data.challenger + '</td><td class="challenge_timer">30</td><td><div><p class="a">Accept</p><p>/</p><p class="d">Deny</p></div></td></tr>');
    $('#requestlist').append($tablerow);


    var date = new Date();
    var time = date.toLocaleTimeString();
    time = date.getTime() + 1*60*1000; // add 1 min
    setCountDown(data.challenger, time);
});


function setCountDown(name, time)
{
    let i = 60;
    var counter = setInterval(function () {
        i--;

        $(`#timer_${name}`).html(i).addClass('red_background');

        if (new Date().getTime() > time)
        {
            stopCounter();
        }
    }, 1000);


    function stopCounter() {
        clearInterval(counter);
        //console.log("1 minute has passed! Counter should stop");
        $(`#name_${name}`).remove();
    }

}

socket.on('you_accept_challenge', function (data) {
    //console.log(data);
    $("#middlesection").html('');
    const tictactoe = new Tictactoe_online(data.opponame, data.oppoid, data.username, data.userid, 1);
    console.log('Coppo', data.opponame);
    console.log('Coppoid', data.oppoid);
    console.log('Cusername', data.username);
    console.log('Cuserid', data.userid);
});

socket.on('other_accept_challenge', function (data) {
    $("#middlesection").html('');
    const tictactoe = new Tictactoe_online(data.opponame, data.oppoid, data.username, data.userid, 2);
    console.log('Coppo', data.opponame);
    console.log('Coppoid', data.oppoid);
    console.log('Cusername', data.username);
    console.log('Cuserid', data.userid);
});

function drawChallengeSection()
{
    const $middle_section = $('#middlesection');
    const $title = ('<h3><u>Opponent</u></h3>');
    const $oppo = ('<p id="oppo">Noone Selected</p>');
    const $button = ('<button id="challenge_btn" class="btn_grey">Challenge</button>');
    const $requesttable = ('<div id="requestlist_container">\n' +
        '            <table id="requestlist">\n' +
        '                <tr>\n' +
        '                    <th>Challenger</th>\n' +
        '                    <th>Timer</th>\n' +
        '                    <th>Accept/Deny</th>\n' +
        '                </tr>\n' +
        '            </table>\n' +
        '        </div>');
    $middle_section.append($title);
    $middle_section.append($oppo);
    $middle_section.append($button);
    $middle_section.append($requesttable);
}

























