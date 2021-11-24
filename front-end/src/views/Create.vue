<template>
<div id="create">
    <h3>Here's where you can create a comment to post on the board for others to see!</h3>
    <h4 v-if="this.$root.$data.user === ''">You'll have to <router-link to="/login">log in</router-link> before you can post a comment.</h4>
    <div v-else id="input-comment-form">
        <textarea id="add-comment-box" v-model="commentBody" placeholder="Type your comment here..."></textarea>
        <button id="submit-comment" @click="addComment()">Add Comment</button>
        <button id="submit-comment" @click="clear()">Clear Logged in Database</button>
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

                const d = new Date();
                let hour = d.getHours();
                let minutes = d.getMinutes();
                let amPm = "am";
                if(hour >= 12) 
                {
                    hour = hour - 12;
                    amPm = 'pm';
                }
                let dateString = hour + ':' + minutes + ' ' + amPm + ' ' + ' on ' + (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();

                let newComment = {
                    user: this.$root.$data.user,
                    date: dateString,
                    comment: '\t' + this.commentBody
                };
                //use a post request to add the comment to the comment collection

                let responseComment = await axios.post('/api/comment', newComment);
                console.log("response comment data:")
                console.log(responseComment.data);
                this.commentBody = '';

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
        },
        async clear() {
            try {
                let loggedIn = await axios.get('api/clear');
                console.log("logged in:");
                console.log(loggedIn);
                await axios.delete('/api/clear');
            }
            catch(err) {
                console.log(err);
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

  #create {
      font-size: 150%;
  }
</style>