import React, { useEffect, useState } from "react";

// Components
import DataTable from "../../components/DataTable";

// Bootstrap
import { Badge } from "react-bootstrap";

// API
import { getShipments } from "../../Api/shipments";

const ShipmentsListPage = () => {
  const [shipments, setShipments] = useState([]);

  const columns = [
    {
      name: "checkbox",
      label: "C",
      customCellRender: row => <Badge></Badge>,
    },
    {
      name: "shipmentId",
      label: "Shipment ID",
      customCellRender: row => (
        <Badge>
          <p>{row.waybill}</p>
        </Badge>
      ),
    },
    {
      name: "orderTypeAndStatus",
      label: "Order Type and Status",
      customCellRender: row => (
        <Badge>
          <p className="d-flex">
            {row.shipmentType === "forward" ? (
              <i className="fas fa-caret-right fa-2x mr-2"></i>
            ) : null}
            <span className="align-self-baseline">{row.status}</span>
          </p>
        </Badge>
      ),
    },
    {
      name: "payment",
      label: "Payment",
      customCellRender: row => (
        <Badge>
          <p>{row.paymentInfo.paymentMode}</p>
        </Badge>
      ),
    },
    {
      name: "pickupDetails",
      label: "Pickup Details",
      customCellRender: row => (
        <Badge>
          <p>{row.pickupPOC.name}</p>
          <p>
            {row.requestedPickupDate}, {row.requestedPickupTimeSlot.startTime} -{" "}
            {row.requestedPickupTimeSlot.endTime}
          </p>
        </Badge>
      ),
    },
    {
      name: "dropDetails",
      label: "Drop Details",
      customCellRender: row => (
        <Badge>
          <p>{row.deliveryPOC.name}</p>
          <p>
            {row.requestedDeliveryDate},{" "}
            {row.requestedDeliveryTimeSlot.startTime} -{" "}
            {row.requestedDeliveryTimeSlot.endTime}
          </p>
        </Badge>
      ),
    },
    {
      name: "overlay",
      label: "O",
      customCellRender: row => <Badge></Badge>,
    },
  ];

  // const [pagination, setPagination] = useState({
  //   page: +urlParams.get("page") || 0,
  //   rowsPerPage: +urlParams.get("size") || 25,
  // });

  useEffect(() => {
    const shipments = getShipments();
    setShipments(shipments);
  }, []);

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={shipments}
        classes="margin-between-rows"
      />
    </div>
  );
};

export default ShipmentsListPage;