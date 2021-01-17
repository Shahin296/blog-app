//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose   = require("mongoose")


const homeContent = "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie."
const aboutContent = "Hey! My name is Shahin and I'm a Self taught Web Developer With a passion for front end and back end development. I'm always eager to learn more in this fast paced industry.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/BlogDB', {useNewUrlParser: true});


const postSchema = new mongoose.Schema({
     Title: String,
     Content:String
})

const Post = mongoose.model("post", postSchema);



app.get("/", function (req, res) {


  Post.find({}, (err, posts)=>{
    if(!err){
      res.render("home", {
        startingContent: homeContent,
        posts: posts
      });
    }
  })
  
})


app.get("/about", function (req, res) {

  res.render("about", {
    AboutContent: aboutContent
  })
})

app.get("/contact", function (req, res) {

  res.render("contact");
    
 
})

app.get("/compose", function (req, res) {

  res.render("compose")
})


app.post("/compose", function (req, res) {

  const Posts = new Post ({
    Title: req.body.publishText,
    Content: req.body.textarea
  });

  Posts.save(function(err){
    if(!err){
      res.redirect("/");
    } else {
      res.redirect("/compose")
    }
  })
  

})

app.get("/posts/:PostName", function (req, res) {
    const requestPostName =req.params.PostName;
   
      Post.findOne({_id:requestPostName}, function(err, post){
          if(!err){
             res.render("post", {
              postTitle:post.Title,
              postContent:post.Content
             })
          }  

      })

});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});

