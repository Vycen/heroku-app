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

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function () {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser', name);
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    if(bgColor == 5) {
        bgColor = 0;
    }
    else {
        bgColor += 1;
    }
    $('#conversation').append('<div class="messages" style="background-color:' + bgColors[bgColor] + '")><div>' + escaped(data) + '</div><div class="signature">- ' + escaped(username) + '</div></div>');
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function (data) {
    $('#users').empty();
    $.each(data, function (key, value) {
        $('#users').append('<div><a href="' + searchUrlFor(key) + '" target="_blank">' + key + '</div>');
    });
});

socket.on('servernotification', function (data) {
    var searchUrl = searchUrlFor(data.username);

    if (data.connected) {
        if (data.toSelf) data.username = 'you';
        $('#conversation').append('connected: <a href="' + searchUrl + '" target="_blank">' + escaped(data.username) + '</a><br/>');
    } else {
        $('#conversation').append('disconnected: <a href="' + searchUrl + '" target="_blank">' + escaped(data.username) + '</a><br/>');
    }
});

// on load of page
$(function () {
    var color = Math.floor((Math.random() * 6));
    $('#body').css('background-color',  bgColors[color]);
    $('#send').css('background-color',  bgColorsInv[color]);
    // when the client hits ENTER on their keyboard
    $('#msg').submit(function () {
        if ($('#pseudo').val() != '' && $('#data').val()  != '') {
            var pseudo = $('#pseudo').val();
            var message = $('#data').val();
            $('#data').val('');
            $('#pseudo').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', pseudo, message);
        }
    });
});
