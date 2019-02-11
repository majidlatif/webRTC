    var getUserMedia = require('getusermedia')

    getUserMedia({ video: true, audio: false }, function (err, stream) {
    if (err) return console.error(err)


var Peer = require('simple-peer');
var peer = new Peer({
    // initialize the id auto
    initiator: location.hash === '#init',
    // create connection b/w clients 
    trickle : false,
    stream:stream
});

peer.on('signal', function(data){
document.getElementById('yourId').value = JSON.stringify(data);
})
document.getElementById('connect').addEventListener('click',function(){
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
})
document.getElementById('send').addEventListener('click',function(){
    var yourMassage = document.getElementById('yourMassage').value
    peer.send(yourMassage)
})
peer.on('data' , function(data){
document.getElementById('massages').textContent += data + '\n'
})
peer.on('stream', function(stream){
    var video = document.createElement('video');
    document.body.appendChild(video);
    video.src = window.URL.createObjectURL(stream);
    video.play();
})
});