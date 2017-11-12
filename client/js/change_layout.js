class Change_layout
{
    constructor(param, username)
    {
        if (param == 1)
        {
            this.changeTitleLayout();
        }
        else if (param == 2)
        {
            this.changeTitleLayoutBack();
        }
    }

    // Change the styles / layout to fit a mobile device
    changeTitleLayout()
    {
        //$('#index_title').css('font-size', '40px');
        $('#index_title').attr('class', 'index_title_large')
        $('#title').html('Tic Tac Toe SocketIO');
        //$('#mobile_btn').css('height', '110px');
        //$('#mobile_btn').css('width', '110px');
        $('#mobile_btn').attr('class', 'mobile_btn_small');
        $('#userlist_container').attr('class', 'userlist_container_mobile_closed');
        $('#userlist').attr('class', 'userlist_mobile_closed');
        $('#openUserTab').attr('class', 'openUserTab_open');

        $('#right_container').attr('class', 'right_container_mobile_closed');
        $('#login_container').attr('class', 'login_container_mobile_closed');
        $('#info_container').attr('class', 'info_container_mobile_closed');
        $('#openInfoTab').attr('class', 'openInfoTab_open');
        $('#name_input').attr('class', 'name_input_mobile');
        $('#login_btn').attr('class', 'login_btn_mobile');
        $('#gameinfo').attr('class', 'gameinfo_mobile');
        $('#opponent').attr('class', 'opponent_mobile');
        $('#yourturn').attr('class', 'yourturn_mobile');
        $('#wininfo').attr('class', 'wininfo_mobile');

        $('#oppotitle').attr('class', 'oppotitle_mobile');
        $('#oppo').attr('class', 'oppo_mobile');
        if (username)
        {
            $('#challenge_btn').attr('class', 'challenge_btn_active_mobile');
        }else {
            $('#challenge_btn').attr('class', 'challenge_btn_mobile');
        }

        $('#requestlist_container').attr('class', 'requestlist_container_mobile');
        $('#requestlist').attr('class', 'requestlist_mobile');
    }

    // Change the styles / layout back to fit a pc.
    changeTitleLayoutBack()
    {
        //$('#index_title').css('font-size', '40px');
        $('#index_title').attr('class', 'index_title')
        $('#title').html('Play Tic Tac Toe SocketIO');
        //$('#mobile_btn').css('height', '110px');
        //$('#mobile_btn').css('width', '110px');
        $('#mobile_btn').attr('class', 'mobile_btn');
        $('#userlist_container').attr('class', 'userlist_container');
        $('#userlist').attr('class', 'userlist')
        $('#openUserTab').attr('class', 'openUserTab');

        $('#right_container').attr('class', 'right_container');
        $('#login_container').attr('class', 'login_container');
        $('#info_container').attr('class', 'info_container');
        $('#openInfoTab').attr('class', 'openInfoTab');
        $('#name_input').attr('class', 'name_input');
        $('#login_btn').attr('class', 'login_btn');
        $('#gameinfo').attr('class', 'gameinfo');
        $('#opponent').attr('class', 'opponent');
        $('#yourturn').attr('class', 'yourturn');
        $('#wininfo').attr('class', 'wininfo');

        $('#oppotitle').attr('class', 'oppotitle');
        $('#oppo').attr('class', 'oppo');
        if (username)
        {
            $('#challenge_btn').attr('class', 'challenge_btn_active');
        }else {
            $('#challenge_btn').attr('class', 'challenge_btn');
        }

        $('#requestlist_container').attr('class', 'requestlist_container');
        $('#requestlist').attr('class', 'requestlist');
    }

}