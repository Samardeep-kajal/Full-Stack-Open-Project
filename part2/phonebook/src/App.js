import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personServices from "./services/person";
import Notification from "./components/Notification";

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
  };

  useEffect(hook, []);

  const handleNewChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  //A function to add person's name and number in the list
  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.filter((person) => person.name === newName);
    const personToAdd = person[0];
    const updatedPerson = { ...personToAdd, number: newNumber };
    // const regex = `^${newName}`;
    // const res = persons.filter((person) =>
    //   new RegExp(regex, "i").test(person.name)
    // );
    if (person.length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one ?`
        )
      )
        personServices
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            console.log(`${returnedPerson.name} successfully updated`);
            setPersons(
              persons.map((personItem) =>
                personItem.id !== personToAdd.id ? personItem : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(`Added ${updatedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
            setNewName("");
            setNewNumber("");
          });
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };
      personServices
        .create("https://localhost:3001/persons", persons)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const deletePerson = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      personServices.remove(personId);
      console.log(`${personName} successfully deleted`);
      setPersons(persons.filter((person) => person.id !== personId));
    }
    setMessage(
      `Information of ${personName} has already been removed from server`
    );
    setPersons(persons.filter((person) => person.id !== personId));
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
