import React from "react";
import PropTypes from "prop-types";
const Cards = (props) => {
  const { name, age, location } = props;

  return (
    <>
      <h1>Name : {name}</h1>
      <h2>Age : {age}</h2>
      <h2>Location : {location}</h2>
    </>
  );
};
export default Cards;

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};
