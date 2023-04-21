const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const expressSession = require("express-session")

const app = express();

//Sets our view engine to load files ending in .ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.use(expressSession({
  secret:"secret key"
}))

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "index.html"));
  console.log(req.session);
  let sessy = req.session.sessy;
  res.render("index", {sessy});
});

app.post("/update-index", (req, res) =>{
  console.log(req.body);
  req.session.sessy = req.body;
  res.redirect("/");
});

app.get("/profile", (req, res) => {
  console.log(req.session);
  let user = req.session.user;
  res.render("profile", {user})
});

app.post("/update-profile", (req, res) =>{
  console.log(req.body);
  req.session.user = req.body;
  res.redirect("/");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/carouselimagecarousel", (req, res) => {
  res.render("photos");
});

app.get("/minesweeper", (req, res) => {
  res.render("minesweeper");
});

app.get("/math", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "math.html"));
});

app.get("/faq", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "faq.html"));
});

app.get("/minesweeper", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "minesweeper.html"));
});

app.get("/slides", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "slide-show.html"));
});

app.post("/update-profile", (req, res)=>{
  console.log(req.body);

  req.session.user= req.body;

  res.redirect("/profile")
})