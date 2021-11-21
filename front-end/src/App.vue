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
              <button id="logout-button" @click="logout()">Logout</button>
            </div>
          </div>
        </div>
    </div>
    
    <router-view/>
    <div id="footer">
      <h3>Jack Richardson</h3>
      <a href="www.github.com" target="_blank">Github Repository</a>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$root.$data.user = '';
    }
  }
}
</script>


<style>
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
</style>
