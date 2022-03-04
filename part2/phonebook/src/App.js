import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personServices from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const hook = () => {
    console.log("effect");
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);
    // });
  };

  useEffect(hook, []);

  const handleNewChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  //A function to add person's name and number in the list
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const regex = `^${newName}`;
    const res = persons.filter((person) =>
      new RegExp(regex, "i").test(person.name)
    );
    if (res.length > 0) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");

    personServices
      .create("https://localhost:3001/persons", personObject)
      .then((response) => console.log(response.data))
      .catch((error) => console.log("Error Motherfucker"));
  };

  const deletePerson = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      personServices.remove(personId);
      console.log(`${personName} successfully deleted`);
      setMessage(`${personName} was successfully deleted`);
      setPersons(persons.filter((person) => person.id !== personId));
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onFormSubmit={addPerson}
        name={newName}
        onNameChange={handleNewChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
