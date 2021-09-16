<template>
  <div class="container">
    <h1>Waiting Room</h1>
      <div>
        <b-spinner style="width: 5rem; height: 5rem;" variant="success" label="Spinning"></b-spinner>
      </div>
      <div>
        <p> Wait a Moment. You are getting matched with an appropiate language buddy </p>
      </div>
    
        <div>
        <p> X people are looking to learn right now</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

//define random UserNames for testing
const names = ["Chris", "Michelle", "Mark", "Joey", "Sandra"]

export default {
  
  created() {
    this.joinWaitingRoom();
  },
  /*
sockets: { 
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
        }
    },
    */
  methods: {
    async joinWaitingRoom() {
      try {
        await axios.post(process.env.VUE_APP_API_URL + '/waitingRoom', {
          name: names[this.getRandomInt(0, names.length-1)],
          language: this.$route.query.language,
        });
      } catch (error) {
        console.log(error)
      }
    },
  
 getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  },
};
</script>