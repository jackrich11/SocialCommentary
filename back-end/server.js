const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/social', {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    gender: String,
    comments: Array
})

const commentSchema = new mongoose.Schema({
    user: String,
    datePosted: String,
    comment: String
})

const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));