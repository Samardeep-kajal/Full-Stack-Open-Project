import React from "react";

const success = {
  color: "green",
  background: "grey",
  font_size: 20,
  border_style: "solid",
  border_radius: 7,
  padding: 10,
};

const err = {
  color: "red",
  background: "grey",
  font_size: 20,
  border_radius: 7,
  border_style: "solid",
  padding: 10,
};

const Notification = ({ message }) => {
  if (message == null) {
    return null;
  }
  if (message.includes("Information")) {
    return (
      <div style={err} className="error">
        {message}
      </div>
    );
  } else {
    return (
      <div style={success} className="error">
        {message}
      </div>
    );
  }
};

export default Notification;
