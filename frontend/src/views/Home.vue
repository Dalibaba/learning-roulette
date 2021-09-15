<template>
<b-container>
  <h2>Choose the Language</h2>
  <b-row align-v="center">
    <b-col>
        <img @click="onClickLanguage(0)" src="../assets/images/english_flag.webp"
        width="300" height="200"/>
    </b-col>
    <b-col>
      <img @click="onClickLanguage(1)" src="../assets/images/spanish_flag.webp"
      width="300" height="200"/>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
const languagesJSON = require('../assets/languageMapping.json');

export default {
  name: "Home",
  components: {
  },
   methods: {
    onClickLanguage(num) {
      let language = "";
      //map number to language from json
      for (let [key, value] of Object.entries(languagesJSON)) {
            if (value == num) {
            language = key
          }
        }
      this.$router.push({path: 'waitingroom',  query: {language: language}})
    },
}
};
</script>
