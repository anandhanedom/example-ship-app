import React from "react";
import { useDispatch } from "react-redux";

//Bootstrap
import { Button } from "react-bootstrap";

// Actions
import { togglePrompt } from "../../../redux/prompt/prompt.actions";

const ShipmentActions = () => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex justify-content-end">
      <Button
        variant="primary actionsBtn"
        className="mr-3"
        onClick={() => {
          dispatch(togglePrompt("prompt", "Prompt", "This is a prompt!"));
        }}>
        Print Label
      </Button>
      <Button
        variant="primary actionsBtn"
        className="mr-3"
        onClick={() => {
          dispatch(togglePrompt("alert", "Alert", "This is an alert!"));
        }}>
        Track
      </Button>
      <Button variant="primary actionsBtn" className="mr-3">
        Clone Shipment
      </Button>
      <Button variant="primary actionsBtn" className="mr-3">
        Return Shipment
      </Button>
      <Button variant="danger">
        <span style={{ fontSize: "15px" }}>&#10005;</span> Cancel Shipment
      </Button>
    </div>
  );
};

export default ShipmentActions;
