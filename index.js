import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Store blog posts here
let posts = [];

// ✅ Home route — display all posts
app.get("/", (req, res) => {
  res.render("home", { posts: posts, activePage: "home" }); // Remove .ejs, Express knows it's ejs
});

// ✅ Compose route — show form
app.get("/compose", (req, res) => {
  res.render("compose", {activePage: "compose"});
});

// app.get("/posts/:postId", (req,res)=>{
// const requestId = Number(req.params.postId);
// const foundPost = posts.find(post => post.id === requestId);

// if (foundPost) {
//     res.render("post.ejs", { post:foundPost });
// } else{
// res.status(204).send("Post Not Found");
// }
// });

app.get("/edit/:id", (req, res) => {
  const postId = Number(req.params.id); // Use Number to match ID type
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.render("edit", { post: post, activePage: "edit" });  // ✅ Pass activePage
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/about", (req,res)=>{
    res.render("about.ejs", {activePage:"about"}); 
});

app.get("/contact", (req,res)=>{
    res.render("contact.ejs", {activePage: "contact"})
})

// ✅ Handle form submission from compose page
app.post("/compose", (req, res) => {
  const postTitle = req.body.Title;
  const postContent = req.body.Content;

  const post = {
    id: Date.now(), // unique ID
    title: postTitle,
    content: postContent,
  };

  posts.push(post);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.redirect("/");
});

app.post('/edit/:id', (req, res) => {
  const postId = Number(req.params.id);
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  const post = posts.find(p => p.id === postId);
  if (post) {
    post.title = updatedTitle;
    post.content = updatedContent;
  }

  res.redirect('/');
});



// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
