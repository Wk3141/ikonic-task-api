var express = require('express');
var mongoose = require( 'mongoose');
require('dotenv').config();

var port = process.env.PORT 
var url= process.env.URL 
var { signup, login } = require('./controllers/authController')
var auth = require('./middleware/authMiddleware')
var role = require('./middleware/roleMiddleware')
var { getUsers, getUserByID,updateUserByID,deleteUserByID,createUser } = require('./controllers/userController')
var {getComments,createComment,getCommentByID,updateCommentByID,deleteCommentByID}= require("./controllers/commentController")
var {createPost,getPosts,getpostByID,updatePostByID,deletePostByID}= require("./controllers/postController")



var app = express();
app.use(express.json());
var cors = require('cors')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((error:any) => console.log(error.message));

  app.use(cors())


app.get('/', function(req:any, res:any) {
  res.send('Hello, world!');
});
app.post('/signup', signup);
app.post('/login', login);
app.get('/users', auth, role(['admin']),getUsers);
app.post('/user/create', auth, role(['admin']),createUser);
app.get('/user/:id', auth, role(['admin','user']),getUserByID);
app.post('/user/update/:id', auth, role(['admin','user']),updateUserByID);
app.post('/user/delete/:id', auth, role(['admin','user']),deleteUserByID);

app.get('/comment', auth, role(['admin']),getComments);
app.post('/comment/create', auth, role(['admin']),createComment);
app.get('/comment/:id', auth, role(['admin','user']),getCommentByID);
app.post('/comment/update/:id', auth, role(['admin','user']),updateCommentByID);
app.post('/comment/delete/:id', auth, role(['admin','user']),deleteCommentByID);

app.post('/post/create', auth, role(['admin']),createPost);
app.get('/posts', auth, role(['admin']),getPosts);
app.get('/post/:id', auth, role(['admin','user']),getpostByID);
app.post('/post/update/:id', auth, role(['admin','user']),updatePostByID);
app.post('/post/delete/:id', auth, role(['admin','user']),deletePostByID);










