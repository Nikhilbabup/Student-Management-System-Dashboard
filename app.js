const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  nodemailer = require("nodemailer"),
  axios = require("axios"),
  User = require("./model/User");
var app = express();

mongoose.connect("mongodb://localhost/27017");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
});
const Student = mongoose.model("Details", studentSchema);

Student.findOne({})
  .then((doc) => {
    if (doc) {
      console.log('Data already exists in the collection, not adding new data');
    } else {
      Student.create([
        {
          name: "Alice",
          age: 18,
          subject: "Mathematics",
          email: "alice@gmail.com",
        },
        {
          name: "Bob",
          age: 19,
          subject: "Physics",
          email: "bob@gmail.com",
        },
        {
          name: "Charlie",
          age: 20,
          subject: "Chemistry",
          email: "charlie@gmail.com",
        },
        {
          name: "Dave",
          age: 21,
          subject: "Computer Science",
          email: "dave@gmail.com",
        },
      ])
        .then(() => {
          console.log('New data added to the collection');
        })
        .catch((err) => {
          console.error('Error adding new data:', err);
        });
    }
  })
  .catch((err) => {
    console.error('Error:', err);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "I love you 3000",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Showing home page
app.get("/", function (req, res) {
  res.render("login");
});

// Showing secret page
// app.get("/admin", isLoggedIn, async function (req, res) {
//   // try {
//   //   const students = await Student.find();
//   //   res.render("admin", { students: students });
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).send('Server error');
//   // }
// });

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.render("admin", { students: students });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const user = User.create({
  username: "PeterParker",
  password: "edith",
});

//Showing login form
// app.get("/login", function (req, res) {
//   res.render("login");
// });

//Handling user login
app.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        try {
          const students = await Student.find();
          res.render("admin", { students: students });
        } catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/send-email", (req, res) => {
  const email = req.query.email; // Get the email address from the query string
  console.log(email);
  // Create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "peterparker@gmail.com",
      pass: "edith",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "peterparker@gmail.com",
    to: email,
    subject: "Test email",
    text: "This is a test email.",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Email cannot send");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent");
    }
  });
});

app.post("/form-submit", (req, res) => {
  if (req.body.channel == "Mathematics") {
    axios
      .post(
        "https://hooks.slack.com/services/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",
        { text: `name${req.body.name} ,Email:${req.body.email}` }
      )
      .then(() => {
        res.send("Form submitted!");
      })
      .catch(() => {
        res.send("Form submission failed!");
      });
  }
  if (req.body.channel == "Mathematics") {
    axios
      .post(
        "https://hooks.slack.com/services/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",
        { text: `name${req.body.name} ,Email:${req.body.email}` }
      )
      .then(() => {
        res.send("Form submitted!");
      })
      .catch(() => {
        res.send("Form submission failed!");
      });
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server start listening on http://localhost:${port}`);
});
