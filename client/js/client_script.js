var socket = io.connect('http://localhost:4000');
var $userlist = null;
var username, markedUser;
var nameArray = new Array();
var idArray = new Array();

$(document).ready(function () {
    $userlist = $('#userlist');

    socket.emit('getarrays', socket.id);
    //console.log(socket.id);

    setupEventListeners();
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
        }
    });
}

socket.on('newuser', function(data) {
    //console.log('new user ' + data.name + data.id);
    nameArray.push(data.name);
    idArray.push(data.id);
    const $listItem = ('<li data-name=' + data.name + '>- ' + data.name + '</li>');
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
        const $listItem = ('<li data-name=' + nameArray[i] + '>- ' + nameArray[i] + '</li>');
        $userlist.append($listItem);
    }
}

socket.on('splicearrays', function (data) {
    idArray.splice(data, 1);
    nameArray.splice(data, 1);
    //console.log('number ' + data + ' spliced');
    populateUsers();
});



























