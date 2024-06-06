const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require("uuid");

app.use(express.static(path.join(__dirname, "/public/css"))); //to access the public folder from the parent folder
app.use(express.urlencoded({ extended: true })); //to parse the url encoded data

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "shubham",
    content: "i love coding specially backend",
  },
  {
    id: uuidv4(),
    username: "Pavan",
    content: "I wanted to become a cma",
  },
  {
    id: uuidv4(),
    username: "ashish",
    content: "I just wanna travel around the world",
  },
];

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  let data = { id, username, content };
  posts.push(data);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((po) => {
    return id === po.id;
  });
  res.render("view", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((po) => {
    return id === po.id;
  });
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(newContent);
  let post = posts.find((po) => {
    return id === po.id;
  });
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((po) => {
    return id === po.id;
  });
  let idx=posts.indexOf(post);
  posts.splice(idx,1);
  res.redirect("/posts");
});
