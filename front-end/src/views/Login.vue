<template>
  <div id="posts">

    <h3 v-if="this.currentUser === ''" >Use the form below to login and see all your comments!</h3>
    <div id="posts">
        <p>{{currUser}}</p>
      <label id="username" for="username-box">Username:</label>
      <input type="text" v-model="loginUser">
      <button id="login-button" @click="login()">Login</button>
    </div>
    <h4 v-if="this.userComments.length === 0 && this.$root.$data.user != ''">You don't have any comments. Use the create page to share your thoughts!</h4>
    <div v-else id="user-comments-box">
        <ul id="user-comments-list">
            <li v-for="comment in userComments" v-bind:key="comment.user">{{comment.comment}}</li>
        </ul>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
//import LoginForm from '../components/LoginForm.vue'
export default {
  name: 'Login',
  components: {
      //LoginForm
  },
  data() {
    return {
      loginUser: '',
      loggedIn: false,
      currentUser: '',
    }
  },
  methods: {
      login() {
          if(this.loginUser != '')
          {
              this.$root.$data.user = this.loginUser;
              this.loggedIn = true;
              this.loginUser = '';
          }
      }
  },
  computed: {
      userComments() {
          return this.$root.$data.comments.filter( c => c.user === this.$root.$data.user);
      }
  }
}
</script>

<style scoped>
  #posts * {
    color: #7B7B8E !important;
  }
</style>