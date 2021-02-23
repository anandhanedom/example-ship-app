import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import DataBox from "../../../components/DataBox";
import ShipmentActions from "../ShipmentActions";

// API
import { getShipmentByWaybillNumber } from "../../../Api/shipments";

//Bootstrap
import { Col, Row, Container } from "react-bootstrap";

const ShipmentDetails = () => {
  const { waybillNumber } = useParams();
  const history = useHistory();

  const [shipment, setShipment] = useState({});

  useEffect(() => {
    const shipment = getShipmentByWaybillNumber(waybillNumber);
    setShipment(shipment);
  }, [waybillNumber]);

  return (
    <div>
      <div>
        <i
          className="fas fa-arrow-left pointer"
          onClick={() => history.goBack()}></i>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <h1 className="font-weight-bold">#{waybillNumber}</h1>
          <div className="text-secondary">Shipment Information</div>
        </div>
        <div className="d-flex">
          <div className="mr-5">
            <div className="text-secondary">Client Order Ref</div>
            <h5 className="font-weight-bold">
              {shipment.clientOrderInfo
                ? shipment.clientOrderInfo.orderID
                : "Loading"}
            </h5>
          </div>
          <div className="mr-5">
            <div className="text-secondary">Status</div>
            <h5 className="font-weight-bold">
              {shipment.status ? shipment.status : "Loading"}
            </h5>
          </div>
          <div>
            <div className="mr-5 text-secondary">Shipment Type</div>
            <h5 className=" font-weight-bold">
              {shipment.shipmentType ? shipment.shipmentType : "Loading"}
            </h5>
          </div>
          <div>
            <div className="text-secondary">TAT</div>
            <h5 className="font-weight-bold">Fixed</h5>
          </div>
        </div>
      </div>
      <div>
        <ShipmentActions />
      </div>
      <div className="d-flex justify-content-between mt-5">
        <div
          className="bg-white flex-grow-1 mr-5 p-4 shadow-sm"
          style={{ borderRadius: "15px" }}>
          <div className="text-secondary mb-3">Pickup Details</div>
          <DataBox
            margin
            title="Date and Timeslot"
            content={
              shipment.requestedPickupDate
                ? `${shipment.requestedPickupDate}, ${shipment.requestedPickupTimeSlot.startTime} - ${shipment.requestedPickupTimeSlot.endTime}`
                : "Loading"
            }
          />
          <DataBox
            margin
            title="Address"
            content={
              shipment.pickupAddress
                ? shipment.pickupAddress.address
                : "Loading"
            }
          />
          <Container fluid>
            <Row>
              <Col sm={4} className="px-0">
                <DataBox
                  title="Pincode"
                  content={
                    shipment.pickupAddress
                      ? shipment.pickupAddress.postalCode
                      : "Loading"
                  }
                />
              </Col>
              <Col sm={7} className="pl-3">
                <DataBox
                  title="POC"
                  content={
                    shipment.pickupPOC ? (
                      <div>
                        <p className="mb-0">{shipment.pickupPOC.name}</p>
                        <p className="mb-0">{shipment.pickupPOC.phoneNumber}</p>
                        <p className="mb-0">{shipment.pickupPOC.email}</p>
                      </div>
                    ) : (
                      "Loading"
                    )
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div
          className="bg-white flex-grow-1 p-4 shadow-sm"
          style={{ borderRadius: "15px" }}>
          <div className="text-secondary">Delivery Details</div>
          <DataBox
            margin
            title="Date and Timeslot"
            content={
              shipment.requestedDeliveryDate
                ? `${shipment.requestedDeliveryDate}, ${shipment.requestedDeliveryTimeSlot.startTime} - ${shipment.requestedDeliveryTimeSlot.endTime}`
                : "Loading"
            }
          />
          <DataBox
            margin
            title="Address"
            content={
              shipment.deliveryAddress
                ? shipment.deliveryAddress.address
                : "Loading"
            }
          />
          <Container fluid>
            <Row>
              <Col sm={4} className="px-0">
                <DataBox
                  title="Pincode"
                  content={
                    shipment.deliveryAddress
                      ? shipment.deliveryAddress.postalCode
                      : "Loading"
                  }
                />
              </Col>
              <Col sm={7} className="pl-3">
                <DataBox
                  title="POC"
                  content={
                    shipment.deliveryPOC ? (
                      <div>
                        <p className="mb-0">{shipment.deliveryPOC.name}</p>
                        <p className="mb-0">
                          {shipment.deliveryPOC.phoneNumber}
                        </p>
                        <p className="mb-0">{shipment.deliveryPOC.email}</p>
                      </div>
                    ) : (
                      "Loading"
                    )
                  }
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
