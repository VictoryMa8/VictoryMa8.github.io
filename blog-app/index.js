import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// array of posts

let arrayOfPosts = [];

// home page

app.get("/", (req, res) => {
    res.render("index.ejs", { arrayOfPosts: arrayOfPosts });
});

// create post

app.post("/submit", (req, res) => {
    const d = new Date();
    if (req.body["postTitle"] !== '' && req.body["postBody"] !== '') {
        const newPost = {
            title: req.body["postTitle"],
            body: req.body["postBody"],
            date: d
        };
        arrayOfPosts.push(newPost);
        console.log(arrayOfPosts);
    }
    res.redirect("/");
});

app.post('/clear', (req, res) => {
    arrayOfPosts = [];
    res.redirect('/');
});

// clear all posts

app.post('/delete', (req, res) => {
    arrayOfPosts = [];
    res.redirect('/');
});

// clear specific post

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    arrayOfPosts = arrayOfPosts.filter((post, index) => index !== id);
    res.redirect('/');
});

// edit post

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = arrayOfPosts[id];
    res.render("edit.ejs", { 
        post: post, 
        id: id 
    });
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    arrayOfPosts[id] = {
        title: req.body.postTitle,
        body: req.body.postBody,
        date: arrayOfPosts[id]["date"]
    };
    res.redirect('/');
});
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  