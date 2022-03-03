import React from "react";
import Countries from "./Countries";

const Content = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, speccify another filter</p>;
  } else if (
    (countries.length > 2 && countries.length < 10) ||
    countries.length === 0
  ) {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={i}>
            {country.name}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <Countries country={countries[0]} />;
  }
};
export default Content;
