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
  id: Number,
});

const Persons = mongoose.model("Person", personSchema);

const person = new Persons({
  name: "Anna Hathaway",
  number: "011-1234589",
  id: 1,
});

person.save().then((result) => {
  console.log("person details saved!");
  mongoose.connection.close();
});

Persons.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
