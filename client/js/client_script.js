var socket = io.connect('http://localhost:4000');
var $userlist = null;
var username, markedUser, markedUserID;
var nameArray = new Array();
var idArray = new Array();

$(document).ready(function () {
    $userlist = $('#userlist');

    socket.emit('getarrays', socket.id);
    //console.log(socket.id);

    setupEventListeners();

    //var name = "Testorino";
    //var date = new Date();
    //var time = date.toLocaleTimeString();

    //const $tablerow = (`<tr id="name_${name}"><td>${name}</td><td id='timer_${name}'>60</td><td><div><p class='a'>Accept</p><p>/</p><p class='d'>Deny</p></div></td></tr>`);
    //$('#requestlist').append($tablerow);

    //time = date.getTime() + 1*60*1000; // add 1 min
    //setCountDown(name, time, $tablerow);
});


function setupEventListeners()
{
    const $container = $("#index_container");
    const that = this;

    $container.on('click', '#userlist b', function () {
        $('#userlist li').attr('class', '');
    });

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
        }
    });

    $container.on('click', '#userlist li', function ()
    {
        if ($(this).data('name') != username)
        {
            $('#userlist li').attr('class', '');
            $(this).attr('class', 'marked_listitem');
            markedUser = $(this).data('name');
            markedUserID = $(this).data('id');
            console.log(markedUserID);

            $("#oppo").html(markedUser);
        }
    });

    $container.on('click', '#challenge_btn', function () {
        if (markedUser != "")
        {
            // Marked user is not empty
            socket.emit('challenge', {
                challenger: username,
                challengerid: socket.id,
                challenged: markedUser,
                challengedid: markedUserID
            });
        }
    });
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

    //console.log(data.namearray);
    //console.log(data.idarray);

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
    console.log(data);


    const $tablerow = (`<tr id="name_${data.challenger}"><td>${data.challenger}</td><td id='timer_${data.challenger}'>60</td><td><div><p class='a'>Accept</p><p>/</p><p class='d'>Deny</p></div></td></tr>`);
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
        console.log(i + " remaining");

        //const $tablerow = (`<tr><td>${name}</td><td id='timer_${name}'>${i}</td><td><div><p class='a'>Accept</p><p>/</p><p class='d'>Deny</p></div></td></tr>`);
        //$('#requestlist').append($tablerow);
        //$(tablerow).text($tablerow);

        $(`#timer_${name}`).html(i).addClass('red_background');

        if (new Date().getTime() > time)
        {
            stopCounter();
        }
    }, 1000);

    function stopCounter() {
        clearInterval(counter);
        console.log("1 minute has passed! Counter should stop");
        $(`#name_${name}`).html('');
    }
}
























