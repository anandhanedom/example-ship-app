import React, { useState, useEffect } from "react";

// Components
import DataBox from "../../../components/DataBox";
import Box from "../Box";

// API
import { getBoxes } from "../../../Api/shipments";

//Bootstrap
import { Col, Container, Row } from "react-bootstrap";

const BoxDetails = ({ handlingInfo }) => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const boxes = getBoxes();
    setBoxes(boxes);
  }, []);

  return (
    <Container fluid className="px-0">
      <div className="d-flex mb-5">
        <Container fluid>
          <Row>
            <Col sm={3}>
              <DataBox
                title="No. of boxes"
                content={boxes.length ? boxes.length : "Loading"}
              />
            </Col>
            <Col sm={3}>
              <DataBox title="Net Weight (gm)" content={handlingInfo} />
            </Col>
            <Col sm={3}>
              <DataBox
                title={<>Total Volume cm&#179;</>}
                content="2700"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        {boxes.map(box => (
          <Box key={box.sequenceNumber} seqNo={box.sequenceNumber} />
        ))}
      </div>
    </Container>
  );
};

export default BoxDetails;
