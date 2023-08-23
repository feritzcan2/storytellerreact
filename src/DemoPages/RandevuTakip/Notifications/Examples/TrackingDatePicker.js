import React, { Fragment, useEffect, useState } from "react";

import {
  InputGroup,
  FormGroup,
  Label,
  Form,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
} from "reactstrap";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";
import { ModalTitle } from "react-bootstrap";
import { SubTitle } from "chart.js";
import moment from "moment/moment";
import { date } from "date-arithmetic";
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
  console.log(props.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isUpdated === false) {
      setStartDate(new Date(props.data.trackingStartDate));
      setEndDate(new Date(props.data.trackingEndDate));
    }
  }, [props.data]);

  const handleChange = (start, end) => {
    start = start || startDate;
    end = end || endDate;
    debugger;
    if (moment(start).isAfter(moment(end))) {
      end = start;
    }
    setIsUpdated(true);
    setStartDate(start);
    setEndDate(end);
  };
  const updateDate = (serviceType, startDate, endDate) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "https://api.vizedefteri.com/admin/updateTrackingDate?serviceType=" +
        serviceType +
        "&startDate=" +
        startDate.toJSON() +
        "&endDate=" +
        endDate.toJSON(),
      requestOptions
    )
      .then((response) => {})
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return (
    <Fragment>
      <Card className="main-card mb-3">
        <CardBody>
          <CardTitle>Takip edilen tarih aralığı</CardTitle>
          <div className="divider" />

          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail" className="me-sm-2">
                    Start Date
                  </Label>
                  <InputGroup>
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                    <DatePicker
                      selected={startDate}
                      selectsStart
                      className="form-control"
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(date) => handleChange(date, undefined)}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword" className="me-sm-2">
                    End Date
                  </Label>
                  <DatePicker
                    selected={endDate}
                    selectsEnd
                    className="form-control"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => handleChange(undefined, date)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            outline={!isUpdated}
            disabled={!isUpdated}
            size="lg"
            block
            color={!isUpdated ? "focus" : "success"}
          >
            Kaydet
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default OfficeTrackingDates;
