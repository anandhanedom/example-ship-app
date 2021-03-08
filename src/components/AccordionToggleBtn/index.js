import React, { useState } from "react";

// Bootstrap accordion
import { Accordion } from "react-bootstrap";

const AccordionToggleBtn = ({ eventKey }) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion.Toggle
      className="btn-primary boxToggleBtn"
      variant="link"
      eventKey={eventKey}
      onClick={() => setOpen(!open)}>
      <i className={`fas fa-chevron-down ${open ? "rotate" : null}`}></i>
    </Accordion.Toggle>
  );
};

export default AccordionToggleBtn;
