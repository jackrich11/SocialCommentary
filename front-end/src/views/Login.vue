<template>
  <div id="posts">

    <div>
        <h3>Use the form below to login and see all your comments!</h3>
        <div id="posts">
        <label id="username" for="username-box">Username:</label>
        <input type="text" v-model="loginUser">
        <button id="login-button" @click="login()">Login</button>
        <button id="login-button" @click="logout()">Logout</button>
        </div>
    </div>
    <h4 v-if="this.userComments.length === 0">You don't have any comments. Use the create page to share your thoughts!</h4>
    <div v-else id="user-comments-box">
        <h3>Your comments so far:</h3>
        <ul id="user-comments-list">
            <li v-for="comment in this.userComments" v-bind:key="comment._id">{{comment.comment}}</li>
        </ul>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
//import LoginForm from '../components/LoginForm.vue'
import axios from 'axios';
export default {
  name: 'Login',
  components: {
      //LoginForm
  },
  created() {
      this.update();
  },
  data() {
    return {
      loginUser: '',
      //loggedIn: false,
      currentUser: '',
      commentsList: []
    }
  },
  methods: {
      async login() {
          try {
            if(this.loginUser != '')
            {
                //this.$root.$data.user = this.loginUser;
                console.log(`username is ${this.loginUser}`)
                let response = await axios.post('/api/users', {
                    user: this.loginUser,
                    comments: []
                });
                console.log(`logged in for`);
                console.log(response.data.username)

                //set the data from the logged in user data
                this.currentUser = response.data.username;
                this.$root.$data.user = this.currentUser;
                console.log("REsponse data:");
                console.log(response.data);
                //this.userComments = response.data.comments;

                await axios.put('/api/login', {
                    user: response.data.username
                });

                //this.loggedIn = true;
                this.loginUser = '';

                let tempList = await axios.get('/api/comments');
                console.log("update function comments:");
                console.log(tempList.data);
                this.commentsList = tempList.data;
            }
          } 
          catch(err) {
              console.log(err);
          }
      },
      async update() {
          this.login();
          //get the current logged in user

          //get the list of comments
          let tempList = await axios.get('/api/comments');
          console.log("update function comments:");
          console.log(tempList.data);
          this.commentsList = tempList.data;
      },
      async logout() {
      try {
        await axios.put('/api/logout', {
          user: ''
        })
        this.$root.$data.user = '';
      }
      catch(err) {
        console.log(err);
      }
    }
  },
  computed: {
      loggedIn() {
          return this.currentUser !== '';
      },
      userComments() {
          return this.commentsList.filter( c => c.user === this.$root.$data.user);
      }
  }
}
</script>

<style scoped>
  #posts * {
    color: #7B7B8E !important;
  }

  button, input {
      margin-left:  10px;
  }
</style>