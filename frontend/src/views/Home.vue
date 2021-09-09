<template>
<b-container>
  <b-row align-v="center">
    <b-col>
       <router-link to="/roulette">
        <img src="../assets/images/english_flag.webp"
        width="300" height="200"/>
        </router-link> |
    </b-col>
    <b-col>
      <router-link to="/roulette">
      <img src="../assets/images/spanish_flag.webp"
      width="300" height="200"/>
      </router-link> |
    </b-col>
  </b-row>
</b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
};
</script>
