import React from "react";
const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

const Persons = ({ persons, filter }) => {
  let filterPersons = persons;
  if (filter) {
    filterPersons = persons.filter((person) =>
      new RegExp(filter, "i").test(person.name)
    );
  }
  return filterPersons.map((person) => (
    <Person key={person.name} name={person.name} number={person.number} />
  ));
};

export default Persons;
