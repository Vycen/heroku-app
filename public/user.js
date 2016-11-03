/**
 * Created by SQLI on 02/11/2016.
 */

var bgColors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
var bgColorsInv = ['rgb(101, 192, 185)', 'rgb(107, 171, 216)', 'rgb(105, 107, 223)', 'rgb(169, 118, 210)', 'rgb(177, 149, 101)', 'rgb(113, 193, 123)'];
var bgColor = 5;

function escaped(s) {
    return $('<div></div>').html(s).html();
}

var socket = io.connect('/');

// on load of page
$(function () {
    $.cookieEnabled = true;
    var color = Math.floor((Math.random() * 6));
    $('#body').css('background-color',  bgColors[color]);
    $('#send').css('background-color',  bgColorsInv[color]);
    if(Cookies.get("pseudo") && Cookies.get("pseudo") != ''){
        $('#pseudo').val(Cookies.get("pseudo"));
    }
    console.log(Cookies.get("pseudo"));
    // when the client hits ENTER on their keyboard
    $('#send').click(function () {
        if ($('#pseudo').val() != '' && $('#data').val()  != '') {
            var pseudo = $('#pseudo').val();
            var message = $('#data').val();
            Cookies.set("pseudo", pseudo);
            $('#data').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', pseudo, message);
        }
        else {
            alert("Veuillez saisir un surnom et un message");
        }
    });
});
