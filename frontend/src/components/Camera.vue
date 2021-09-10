<template>
    <div class="camera" id="video-div">
        <video autoplay class="feed"></video>
    </div>
</template>


<script>
export default {
  name: "camera",
  methods: {
    init () {
      const myVideo = document.createElement('video')

      myVideo.muted = true 
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video: true ,audio: true}).then(stream => 
          { //strea contains video and audio
          this.addVideoStream(myVideo, stream)

        })
      } else {
        alert("cannot get media devices")
      }
    },
    // video object shall use the stream
 addVideoStream(video, stream) {
    const videoGrid = document.getElementById('video-div')
    video.srcObject = stream // play video
    //when stream is loaded and video is loaded on page
    video.addEventListener('loadedmetadata', () =>
    {
        video.play()
    })
    videoGrid.append(video)
},
  },
  beforeMount() {
  this.init()
}
};
</script>

<style lang="scss">
  #camera {
    padding: 25px;
      width: 100%;
      height: 100%;
      object-fit: cover;
  }
  #feed {
    background-color: #171717;
    box-shadow: 4px 4px 12px 0 rgba(0,0,0,0.25) ;
  }
</style>