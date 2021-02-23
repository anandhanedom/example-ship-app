import React from "react";

const DataBox = ({ title, content, margin }) => {
  return (
    <div className={margin ? "my-3" : null}>
      <h6 className="text-secondary mb-0">{title}</h6>
      <h5> {content} </h5>
    </div>
  );
};

export default DataBox;
