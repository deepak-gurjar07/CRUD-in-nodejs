const express = require("express");
const methodOverride = require("method-override");
const app = express();
const users = require("./data/user");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Working Fine!");
  res.render('home');
});

app.get("/users", (req, res) => {
  res.render("users", { users });
});

app.get("/user/new", (req, res) => {
  res.render("new");
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const { username, password, city } = req.body;

  let user = {
    id: users.length + 1,
    username: username,
    password: password,
    city: city,
  };
  users.push(user);

  res.redirect("/users");
  // res.send("Done")
});

app.get("/users/:id", (req, res) => {
  // console.log(req.params)
  // const id = req.params.id
  const { id } = req.params;
  let user = users.find((item) => item.id == id);
  console.log(user);
  // res.send("OK")
  res.render("show", { user });
});

app.get("/users/:id/edit", (req, res) => {
  const { id } = req.params;
  let user = users.find((item) => item.id == id);
  // res.send("Edit")
  res.render("edit", { user });
});

// update using app.patch()

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((item) => item.id == id);
  const { username, password, city } = req.body;
  user.username = username;
  user.password = password;
  user.city = city;
  res.redirect("/users");
});

// update using app.post()

// app.post('/user/edit/:id', (req, res) => {
//     console.log(req.body)
//     const {id} = req.params
//     const { username, password, city } = req.body

//     const userIndex = users.findIndex((user) => user.id == id);

//     if (userIndex !== -1) {
//         // Update the existing user
//         users[userIndex].username = username;
//         users[userIndex].password = password;
//         users[userIndex].city = city;

//         res.redirect('/users');
//     } else {
//         // Handle the case where the user is not found
//         res.status(404).send('User not found');
//     }
// });

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.redirect("/users");
  }
});

// delete using app.post()

// app.post('/users/:id',(req,res)=>{
//     const {id} = req.params
//     const userIndex = users.findIndex((user)=> user.id == id)

//     if(userIndex !== -1){
//         users.splice(userIndex, 1)
//         res.redirect('/users')
//     }
// })

app.listen(4000, () => {
  console.log(`Server Running at port number 4000 or http://localhost:4000/`);
});
