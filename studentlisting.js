const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/studentss", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });

// Define a schema for the students collection
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
});

// Define a model for the students collection
const Student = mongoose.model("Student", studentSchema);

// Seed the database with some students
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
    console.log("Seeded the database with students");
  })
  .catch((err) => {
    console.error("Failed to seed the database with students:", err);
  });
