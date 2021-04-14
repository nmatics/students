const express = require("express");
const app = express();
const users = require("./students.json");

const port = 3000;
app.get("/", (req, res) => {
  res.send("Page works");
});

app.get("/students", (req, res) => {
  if (req.query.search) {
    const user = users.find((user) => {
      return req.query.search === user.name;
    });
    res.send(user);
  } else {
    res.send(users);
  }
});

app.get("/students/:studentId", (req, res) => {
  const user = users.find((user) => {
    return parseInt(req.params.studentId) === user.id;
  });
  res.send(user);
});

app.get("/grades/:studentId", (req, res) => {
  const user = users.find((user) => {
    return parseInt(req.params.studentId) === user.id;
  });

  res.status(200).send(`${user.name} - grades:  ${user.grades}`);
});

app.post("/grades", (req, res) => {
  const updatedUser = users.find((user) => {
    return user.name === req.body.name;
  });

  updatedUser.grades.push(req.body.grade);
  res.send(updatedUser);
});

app.post("/register", (req, res) => {
  users.push(req.body);
  res.send(users);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
