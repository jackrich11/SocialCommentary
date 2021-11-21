<template>
  <div id="posts">
      <label id="username" for="username-box">Username:</label>
      <input type="text" v-model="this.$root.$data.user">
      <p>{{this.$root.$data.user}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LoginForm',
  components: {},
  data() {
    return {
      username: ''
    }
  }
}
</script>

<style scoped>
  #posts h3 {
    color: #7B7B8E !important;
  }

  #username {
      margin: 5px;
  }
</style>