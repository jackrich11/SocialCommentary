<template>
  <div id="posts">

    <div id="login-form">
        <h3>Use the form below to login and see all your comments!</h3>
        <div id="posts">
        <label id="username" for="username-box">Username:</label>
        <input type="text" v-model="loginUser">
        <button id="login-button" @click="login()">Login</button>
        <button id="login-button" @click="logout()">Logout</button>
        </div>
    </div>
    <h4 v-if="this.$root.$data.user === ''">Enter your username in the box above to log in!</h4>
    <h4 v-else-if="this.userComments.length === 0">You don't have any comments. Use the <router-link to="/create">create</router-link> page to share your thoughts!</h4>
    <div v-else id="user-comments-box">
        <h3>Your comments so far:</h3>
        <!--<div id="user-comments-div">
            <ul id="user-comments-list">
                <li v-for="comment in this.userComments" v-bind:key="comment._id">{{comment.comment}}</li>
            </ul>
        </div>-->
        <div id="posts-list" v-for="comment in this.userComments" v-bind:key="comment._id">
            <!--<hr v-if="comment._id === commentsList[0]._id">-->
            <p id="comment-body">{{comment.comment}}</p>
            <div id="date-delete">
                <p>Posted by {{comment.user}} at {{comment.date}}.</p>
            <button @click="deleteComment(comment)" id="delete-button">Delete</button>
            </div>
            <!--<hr>-->
        </div>
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
    },
    async deleteComment(comment)
    {
      if(comment.user !== this.$root.$data.user)
      {
        alert("You can't delete this comment, it's not yours!");
      }
      else
      {
        console.log("Will delete the comment that says:");
        console.log(comment.comment);

        try {
          console.log("comment id is:");
          console.log(comment._id);
          await axios.delete('/api/comment/' + comment._id);
          this.update();
        }
        catch(err) {
          console.log(err);
        }


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

  #user-comments-div {
      display: flex;

      width: 50%;
  }

  button, input {
      margin-left:  10px;
  }

  #login-form h3, #login-form h4, h4 {
      font-size: 150%;
  }

  #posts-list {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    justify-content: flex-start;
  }

  #comment-body {
    font-style: bold;
    font-size: 170%;
    overflow-wrap: break-word;
  }

  #posts-list * {
    text-align: left;
  }

  #date-delete {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #date-delete button {
    height: 100% !important;
    margin: auto;
    font-size: 50%;
  }

  ul {
    list-style: none;
  }
</style>