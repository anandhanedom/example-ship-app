import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Bootstrap
import { Modal, Button } from "react-bootstrap";

// Actions
import { togglePrompt } from "../../redux/prompt/prompt.actions";

const Prompt = () => {
  const prompt = useSelector(state => state.prompt);
  const dispatch = useDispatch();

  return (
    <Modal
      show={prompt.showPrompt}
      onHide={() => dispatch(togglePrompt("", "", ""))}
      backdrop="static"
      keyboard={false}
      centered>
      <Modal.Header closeButton>
        <Modal.Title>{prompt.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{prompt.message}</Modal.Body>
      {prompt.type === "alert" ? (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(togglePrompt("", "", ""))}>
            Close
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(togglePrompt("", "", ""))}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => dispatch(togglePrompt("", "", ""))}>
            Yes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Prompt;
