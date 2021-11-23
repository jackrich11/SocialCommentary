<template>
  <div id="posts">
    <h3 v-if="this.$root.$data.user === ''">You're not logged in, head to the "Login" tab to do so!</h3>
    <div v-else id="comments-div">
      <h3>Hey {{this.$root.$data.user}}! Welcome to the info board.</h3>
      <h4>Here's all the posts made so far:</h4>
      <ul id="posts-list">
        <hr>
        <li v-for="comment in commentsList" v-bind:key="comment._id">
          <h5>{{comment.comment}}</h5>
          <p>Posted by {{comment.user}} at {{comment.date}}.</p>
          <button @click="deleteComment(comment)" id="delete-button">Delete Comment</button>
          <hr>
        </li>
      </ul>
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
      }
    }
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
  #posts h3, #posts-list * {
    color: #7B7B8E !important;
  }

  #posts-list {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
  }

  ul {
    list-style: none;
  }
</style>