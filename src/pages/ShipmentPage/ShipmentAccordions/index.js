import React from "react";

// Components
import BoxDetails from "../BoxDetails";
import ItemDetails from "../ItemDetails";
import AccordionToggleBtn from "../../../components/AccordionToggleBtn";

// Bootstrap
import { Col, Row, Accordion, Tab, Nav } from "react-bootstrap";

const ShipmentAccordions = () => {
  return (
    <div className="mt-5">
      <Accordion className="rounded">
        <div className="py-3 align-items-center">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1 mr-3 px-0">
              <h5 className="boxTitle my-0 h-100">Handling Information</h5>
            </div>
            <AccordionToggleBtn eventKey="0" />
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="px-0">
              <Tab.Container defaultActiveKey="first">
                <div className="container-fluid my-3">
                  <Row>
                    <Col className="px-0">
                      <Nav variant="pills">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Box Details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Item Details</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                </div>
                <Tab.Content className="p-0">
                  <Tab.Pane eventKey="first">
                    <BoxDetails handlingInfo={"Loading"} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ItemDetails />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
      <Accordion className="rounded">
        <div className="py-3 align-items-center">
          <div className="d-flex justify-content-between">
            <div className="flex-grow-1 mr-3 px-0">
              <h5 className="boxTitle my-0 h-100">Other Information</h5>
            </div>
            <AccordionToggleBtn eventKey="1" />
          </div>
          <Accordion.Collapse eventKey="1">
            <div className="px-0">Hello! I'm the body</div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
};

export default ShipmentAccordions;
