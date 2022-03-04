import React from "react";
const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

const Persons = ({ persons, filter, deletePerson }) => {
  let filterPersons = persons;
  if (filter) {
    filterPersons = persons.filter((person) =>
      new RegExp(filter, "i").test(person.name)
    );
  }
  return filterPersons.map((person) => (
    <div>
      <Person key={person.name} name={person.name} number={person.number} />{" "}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  ));
};

export default Persons;
