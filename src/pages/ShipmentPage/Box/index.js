import React from "react";

//Components
import DataBox from "../../../components/DataBox";
import AccordionToggleBtn from "../../../components/AccordionToggleBtn";

//Bootstrap
import { Container, Col, Row, Accordion } from "react-bootstrap";

const Box = ({ seqNo }) => {
  return (
    <div
      className="W-82 bg-white mb-3"
      style={{ borderRadius: "15px", border: "" }}>
      <Accordion>
        <div className="p-2 align-items-center">
          <Container fluid>
            <Row className="bg-white p-2">
              <Col className="pl-0" sm={3}>
                <DataBox title="Box No." content={seqNo ? seqNo : "Loading"} />
              </Col>
              <Col sm={3}>
                <DataBox title="Dimensions (mm)" content="30 X 30 X 30" />
              </Col>
              <Col sm={3}>
                <DataBox title="Weight (gm)" content="500" />
              </Col>
              <Col className="d-flex justify-content-end pr-0" sm={3}>
                <AccordionToggleBtn eventKey="0" />
              </Col>
            </Row>
          </Container>

          <Accordion.Collapse eventKey="0">
            <div className="p-2 bg-white">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                dolor molestias nulla eius, reiciendis expedita vel voluptatem
                nesciunt quas nobis?
              </p>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
};

export default Box;
