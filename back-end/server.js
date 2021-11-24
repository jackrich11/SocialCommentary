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
    username: String,
    comments: Array
})

const commentSchema = new mongoose.Schema({
    user: String,
    datePosted: String,
    comment: String
})

commentSchema.virtual('id')
    .get(function() {
    return this._id.toHexString();
    });

commentSchema.set('toJSON', {
    virtuals: true
    });
  

const loggedInSchema = new mongoose.Schema({
    currentUser: String
})

const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);
const LoggedIn = mongoose.model('LoggedIn', loggedInSchema);

const loggedInUser = new LoggedIn({
    currentUser: ''
})

app.get('/api/setup', async (req, res) => {
    try {
        //let newLogin = new LoggedIn({user: ''});
        //await newLogin.save();
        let currLoggedIn = await LoggedIn.find();
        
        console.log("first logged in as:");
        console.log(currLoggedIn);
        res.send(currLoggedIn);
    }
    catch(err) {
        console.log(err);
    }
})

app.put('/api/login', async (req, res) => {
    try {
        let loggedIn = await LoggedIn.find();
        loggedIn[0].currentUser = req.body.user;
        await loggedIn[0].save();
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.delete('/api/comment/:id', async (req, res) => {
    try {
        console.log("inside the delete function");
        console.log(req.params.id);
        await Comment.deleteOne({_id: req.params.id});
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.post('/api/comment', async (req,res) => {
    try {
        //add to the comment collection
        //await Comment.deleteOne({user: 'jack'});

        let addComment = new Comment({
            user: req.body.user,
            datePosted: req.body.date,
            comment: req.body.comment
        })
        console.log("adding comment:");
        console.log(addComment);
        await addComment.save();
        res.send(addComment);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.get('/api/clear', async (req, res) => {
    try {
        let loggedIn = await LoggedIn.find();
        res.send(loggedIn);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.delete('/api/clear', async (req, res) => {
    try {
        await LoggedIn.deleteOne({user: 'jack'});
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})
/*app.post('/api/comment', async (req,res) => {
    try {
        let addComment = {
            user: req.body.user,
            datePosted: req.body.date,
            comment: req.body.comment
        } 
        //add to the specific person
        let addPerson = await User.findOne({username: req.body.user});
        console.log("the person to add comment to: ");
        console.log(addPerson);
        console.log("the comment to add: ");
        console.log(addComment);

        addPerson.comments.push(addComment);

        await addPerson.save();
        res.send(addPerson);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})*/

app.put('/api/logout', async (req, res) => {
    try {
        let loggedIn = await LoggedIn.find();
        loggedIn[0].currentUser = req.body.user;
        await loggedIn[0].save();
        //await Comment.deleteMany({user: 'jack'});
        res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.get('/api/comments', async (req,res) => {
    try{
        let comments = await Comment.find();
        //console.log("Comments:");
        //console.log(comments);
        res.send(comments);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
})


app.get('/api/users', async (req, res) => {
    try {
        let users = await User.find();
        console.log(users);
        res.send(users);
    }
    catch(err) {
        console.log(err);
        res.send(500);
    }
})

app.post('/api/users', async (req, res) => {
    let testUser = await User.findOne({username: req.body.user});
    console.log(testUser);
    if(testUser === null)
    {
        console.log("new user ");
        const user = new User({
            username: req.body.user,
            comments: req.body.comments
        });
    
        try {
            console.log(`new user is ${user}`);
            await user.save();
            console.log("saved user");
            res.send(user);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
    else
    {
        console.log("existing user");
        res.send(testUser);
    }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));