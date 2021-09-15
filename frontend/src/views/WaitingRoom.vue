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
export default {
  
  created() {
    this.joinWaitingRoom();
  },

  methods: {
    async joinWaitingRoom() {
      try {
        const response = await axios.post(process.env.VUE_APP_API_URL + '/waitingRoom', {
          name: "test",
          language: "english",
        });
        console.log(response)
      } catch (error) {
        console.log(error)
}
    },
  },
};
</script>