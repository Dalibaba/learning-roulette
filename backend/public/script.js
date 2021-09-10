const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

const peers = {}
const myVideo = document.createElement('video')
//we dont want to hear our own microphone play back to us
myVideo.muted = true 

//connect our video
// get video and audio to send to other people
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => { //strea contains video and audio
    addVideoStream(myVideo, stream)

    //listen when someone tries to call
    myPeer.on('call', call => {
        // sent them our stream
        call.answer(stream)
        const video = document.createElement('video')
        // respond to videostreams that come in
        call.on('stream'), userVideoStream => {
            addVideoStream(video, userVideoStream)
        }
    })


    socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    // call a user with certain id and send him the stream
    const call = myPeer.call(userId, stream)
   
    const video = document.createElement('video')
     // when video stream is sent back
    call.on('stream', userVideoStream => {
        //add video of other user in own custom video element
        addVideoStream(video, userVideoStream)
    })
    // when someone leaves, close the room
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

// video object shall use the stream
function addVideoStream(video, stream) {
    video.srcObject = stream // play video
    //when stream is loaded and video is loaded on page
    video.addEventListener('loadedmetadata', () =>
    {
        video.play()
    })
    videoGrid.append(video)
}