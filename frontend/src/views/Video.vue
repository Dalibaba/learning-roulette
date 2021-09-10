<template>
<b-container>
    <h2>Learning roulette</h2>
    <Camera/>
  <b-row align-v="center">
    <b-col>
    <div id="video-grid">
    </div>
    
    </b-col>
    <b-col>
    <div id="video-grid"></div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import Camera from '../components/Camera.vue'

export default {
  name: "Video",
  components: {
    Camera
  },
};
</script>

    <style>
        #video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            grid-auto-rows: 300px;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
