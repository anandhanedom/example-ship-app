import React from "react";
import { useHistory } from "react-router-dom";

// Bootstrap
import { Col, Container, Row } from "react-bootstrap";

const SideNav = props => {
  const history = useHistory();

  const options = [
    { title: "Dashboard", endpoint: "/", icon: "fas fa-tachometer-alt" },
    {
      title: "Shipments",
      endpoint: "/shipments",
      icon: "fas fa-shopping-cart",
    },
    { title: "NDRs", endpoint: "/", icon: "fas fa-users-cog fa-fw" },
    { title: "Invoices", endpoint: "/", icon: "fas fa-file-alt fa-fw" },
    { title: "COD Remittance", endpoint: "/", icon: "fas fa-truck fa-fw" },
    { title: "Reports", endpoint: "/", icon: "fas fa-chart-line fa-fw" },
  ].map((link, index) => (
    <li
      key={index}
      className="py-3 sidenavLinks"
      onClick={() => history.push(link.endpoint)}>
      <i className={`${link.icon} mr-2 font-weight-bold`}></i>
      {link.title}
    </li>
  ));

  return (
    <Container fluid className="px-5">
      <Row>
        <Col sm={2}>
          <ul className="mt-5" style={{ listStyleType: "none" }}>
            {options}
          </ul>
        </Col>
        <Col sm={10} className="py-5">
          <div
            className="p-4"
            style={{ borderRadius: "20px", background: "#f3f3f3" }}>
            {props.children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SideNav;
