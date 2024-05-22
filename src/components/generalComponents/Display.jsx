import React from "react";

const Display = ({ value }) => {
  return <input id="display" value={value || "0"} readOnly />;
};

export default Display;
