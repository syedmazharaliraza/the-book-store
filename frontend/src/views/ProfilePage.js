import React from "react";
import Profile from "../components/profile/Profile";
import Orders from "../components/profile/Orders";
import { Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Row>
      <Col md={3}>
        <Profile />
      </Col>
      <Col md={9}>
        <Orders />
      </Col>
    </Row>
  );
};

export default ProfilePage;
