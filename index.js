const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const EmployeeModel = require("./Models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://viktoryaremenko92:96hJIR1L0MTVaUQq@cluster0.l73txlm.mongodb.net/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send({email:`Welcome ${email}!`});
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No Record");
    }
  });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});
app.post('/test', (req, res)=>{
  const name = req.query;
  res.send({msg:`Welcome ${name}!`});
})
// app.listen(3001, () => {
//   console.log("port running");
// });
module.exports = app;