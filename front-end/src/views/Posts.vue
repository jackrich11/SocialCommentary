<template>
  <div id="posts">
    <h3 id="not-logged-in" v-if="this.$root.$data.user === ''">You're not logged in, head to the <router-link id="login" to="/login">login</router-link> tab to do so!</h3>
    <div v-else id="comments-div">
      <h1>Hey {{this.$root.$data.user}}! Welcome to the posts page.</h1>
      <h2 v-if="this.$root.$data.comments.length !== 0">Here's all the posts made so far:</h2>
      <h3 v-else>There's no posts yet! Head to the <router-link id="create" to="/create">create</router-link> page to get started!</h3>

      <div id="posts-list" v-for="comment in commentsList" v-bind:key="comment._id">
        <hr v-if="comment._id === commentsList[0]._id">
        <p id="comment-body">{{comment.comment}}</p>
        <div id="date-delete">
          <p>Posted by {{comment.user}} at {{comment.datePosted}}.</p>
        </div>
        <hr>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  components: {},
  created() {
    this.update();
  },
  data() {
    return {
      commentsList: []
    }
  }, 
  methods: {
    async update() {
      try{
        let comments = await axios.get('/api/comments');
        console.log("posts function:");
        console.log(comments.data);
        this.commentsList = comments.data;
        this.$root.$data.comments = this.commentsList;
      }
      catch(err) {
        console.log(err);
      }
    },
    
  },
  computed: {
    username() {
      console.log("updated");
      return this.$root.$data.username;
    },
  }
}
</script>

<style scoped>
  #posts h3, #posts-list *, #comments-div * {
    color: #7B7B8E !important;
  }

  #not-logged-in {
    font-size: 170%;
  }

  #comment-body {
    font-style: bold;
    font-size: 170%;
    overflow-wrap: break-word;
  }

  #create {
    font-size: 100%;
  }

  #posts-list {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
    justify-content: flex-start;
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

  #login:visited, #create:visited {
    color: #7B7B8E;
  }

  ul {
    list-style: none;
  }
</style>