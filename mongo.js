const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Samardeep:${password}@cluster0.sae6g.mongodb.net/Persons?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Persons = mongoose.model("Person", personSchema);

const person = new Persons({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv[3] && process.argv[4]) {
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook.`);
    mongoose.connection.close();
  });
} else {
  Persons.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
