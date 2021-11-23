<template>
<div id="create">
    <h3>Here's where you can create a comment to post on the board for others to see!</h3>
    <h4 v-if="this.$root.$data.user === ''">You'll have to log in before you can post a comment.</h4>
    <div v-else id="input-comment-form">
        <textarea id="add-comment-box" v-model="commentBody" placeholder="Type your comment here..."></textarea>
        <button id="submit-comment" @click="addComment()">Add Comment</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Create',
    data() {
        return {
            commentBody: ""
        }
    },
    methods: {
        async addComment() {
            if(this.$root.$data.user !== '')
            {
                console.log(`Will add comment as ${this.$root.$data.user}`);
                let newComment = {
                    user: this.$root.$data.user,
                    date: 'today',
                    comment: this.commentBody
                };
                //use a post request to add the comment to the comment collection

                let responseComment = await axios.post('/api/comment', newComment);
                console.log("response comment data:")
                console.log(responseComment.data);

                /*
                let responsePerson = await axios.post('/api/comment', newComment);

                console.log(responseComment.data);
                console.log(responsePerson.data);

                this.$root.$data.comments.push(responseComment.data);
                this.commentBody = '';*/
            }
            else
            {
                console.log("Not logged in!");
            }
        }
    }
}
</script>

<style>
    #create * {
    color: #7B7B8E !important;
  }

  #input-comment-form {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  #input-comment-form * {
      margin: 10px;
  }

  #submit-comment {
      height: 100%;
  }
</style>