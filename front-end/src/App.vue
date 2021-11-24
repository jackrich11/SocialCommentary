<template>
  <div id="app">
    <div id="header">
        <div id="logo">
          <h1>Social Commentary</h1>
        </div>
        <div id="nav">
          <div id="links">
            <router-link to="/">Posts</router-link> |
            <router-link to="/create">Create</router-link> |
            <router-link to="/login">Login</router-link>
          </div>
          <div id="current-user">
            <h5 v-if="this.$root.$data.user === ''">Not logged in.</h5>
            <div v-else id="logged-in-div">
              <h5>Logged in as {{this.$root.$data.user}}</h5>
            </div>
          </div>
        </div>
    </div>
    
    <router-view/>
    <div id="footer">
      <h3>Jack Richardson</h3>
      <a href="https://github.com/jackrich11/SocialCommentary" target="_blank">Github Repository</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    this.setUp();
  },
  methods: {
    async setUp() {
      try {
        console.log("start set up");
        let response = await axios.get('/api/setup');
        console.log(response);
        console.log("between");
        this.$root.$data.user = response.data[0].currentUser;
        let comments = await axios.get('/api/comments');
        this.$root.$data.comments = comments.data;
        console.log(this.$root.$data.comments);
        console.log("end setup");
      }
      catch(err) {
        console.log(err);
      }
    }
  }
}
</script>


<style>

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#header {
  display: flex;
  justify-content: space-between;
  background: #F4442E;
}

#footer {
  background: #F4442E;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-evenly;
  padding-bottom: 20px;
}

#header h1 {
  font-size: 300%;
}

#nav, #logo {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;

}

#nav a.router-link-exact-active {
  color: /*#F4442E*/white;
}

a:visited {
  color: white;
}
</style>
