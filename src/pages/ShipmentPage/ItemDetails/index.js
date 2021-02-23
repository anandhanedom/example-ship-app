import React from "react";

// Components
import DataBox from "../../../components/DataBox";

//Bootstrap
import { Container } from "react-bootstrap";

const ItemDetails = () => {
  return (
    <Container fluid className="px-0">
      <div className="mb-5">
        <DataBox title="No. of items" content={3} />
      </div>
    </Container>
  );
};

export default ItemDetails;
