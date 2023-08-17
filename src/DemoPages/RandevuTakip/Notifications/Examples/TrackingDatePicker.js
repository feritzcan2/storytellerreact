import React, { Fragment } from "react";
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
class OfficeTrackingDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      startDate: new Date(props.data.trackingStartDate),
      endDate: new Date(props.data.trackingEndDate),
      changed: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  updateDate = (serviceType, startDate, endDate) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "http://triviastars-env.eba-vqcrvzer.eu-central-1.elasticbeanstalk.com/admin/updateTrackingDate?serviceType=" +
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
  setStartDate(date) {
    this.setState({ startDate: date, changed: true });
  }
  setEndDate(date) {
    this.setState({ endDate: date, changed: true });
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
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
                        selected={this.state.startDate}
                        onChange={(date) => this.setStartDate(date)}
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
                        selected={this.state.endDate}
                        onChange={(date) => this.setEndDate(date)}
                      />
                    </div>
                  </InputGroup>
                </Row>
                <Row md="6">
                  <Button
                    onClick={() => {
                      this.updateDate(
                        this.props.data.serviceType,
                        this.state.startDate,
                        this.state.endDate
                      );
                    }}
                    active={this.state.changed}
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
  }
}

export default OfficeTrackingDates;
