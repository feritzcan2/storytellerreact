import React, { Fragment, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  InputGroupText,
} from "reactstrap";
import { InputGroup, Button, Input } from "reactstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModalTitle } from "react-bootstrap";
import { SubTitle } from "chart.js";
const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  formatLong: {
    date: () => "mm/dd/yyyy",
  },
};
const OfficeTrackingDates = (props) => {
  const { startDate, setStartDate } = useState(props.data.trackingStartDate);
  const { endDate, setEndDate } = useState(props.data.trackingEndDate);
  const { isUpdated, setIsUpdated } = useState(false);

  const updateDate = (serviceType, startDate, endDate) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "http://localhost:5016/admin/updateTrackingDate?serviceType=" +
        serviceType +
        "&startDate=" +
        startDate.toJSON() +
        "&endDate=" +
        endDate.toJSON(),
      requestOptions
    )
      .then((response) => {})
      .then((result) => {
        this.setState({ changed: false });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Fragment>
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <Row md="6">
                <InputGroup>
                  <div
                    style={{
                      padding: "5px",
                      backgroundColor: "#EFF9FF",
                      alignSelf: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <h5 style={{ marginRight: "20px" }}>Başlangıç tarihi </h5>
                    <DatePicker
                      locale={locale}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </InputGroup>
              </Row>
              <Row md="6">
                <InputGroup>
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "5px",
                      backgroundColor: "#EFF9FF",
                      alignSelf: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <h5 style={{ marginRight: "20px" }}>Bitiş tarihi </h5>
                    <DatePicker
                      locale={locale}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </InputGroup>
              </Row>
              <Row md="6">
                <Button
                  onClick={() => {
                    updateDate(props.data.serviceType, startDate, endDate);
                  }}
                  active={isUpdated}
                  className="m-3"
                  color="primary"
                >
                  Kaydet
                </Button>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OfficeTrackingDates;
