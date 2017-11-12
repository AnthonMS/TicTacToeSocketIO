class Change_layout
{
    constructor(param)
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


        $('#requestlist_container').css('margin-left', '0');
        $('#requestlist_container').css('margin-right', '0');
    }

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
        $('#openUserTab').attr('class', 'openUserTab_closed');


        $('#requestlist_container').css('margin-left', '200px');
        $('#requestlist_container').css('margin-right', '200px');
    }

}