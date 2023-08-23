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
  Input,
} from "reactstrap";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";
import { ModalTitle } from "react-bootstrap";
import { SubTitle } from "chart.js";
import moment from "moment/moment";
import { date } from "date-arithmetic";
import CountryService from "../../../../api/CountryService";
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
  const { updateTrackingRange } = CountryService();
  const [startDate, setStartDate] = useState(
    new Date(props.data.trackingStartDate)
  );
  console.log(props.data);
  const [endDate, setEndDate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isNotifUpdated, setNotifUpdated] = useState(false);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(
    props.data.notificationsEnabled
  );

  const toggleCheckbox = () => {
    let newVal = !isNotificationsEnabled;
    setNotificationsEnabled(!isNotificationsEnabled);
    setNotifUpdated(props.data.notificationsEnabled !== newVal);
  };
  useEffect(() => {
    if (isUpdated === false) {
      setStartDate(new Date(props.data.trackingStartDate));
      setEndDate(new Date(props.data.trackingEndDate));
    }
    if (isNotifUpdated === false) {
      setNotificationsEnabled(props.data.notificationsEnabled);
    }
  }, [props.data]);

  const handleChange = (start, end) => {
    start = start || startDate;
    end = end || endDate;
    if (moment(start).isAfter(moment(end))) {
      end = start;
    }
    setIsUpdated(true);
    setStartDate(start);
    setEndDate(end);
  };
  const updateDate = (serviceType, startDate, endDate) => {
    updateTrackingRange({
      serviceType,
      startDate,
      endDate,
      isNotificationsEnabled,
    })
      .then((response) => {
        if (response !== true) {
          setStartDate(new Date(props.data.trackingStartDate));
          setEndDate(new Date(props.data.trackingEndDate));
          setNotificationsEnabled(props.data.notificationsEnabled);
        }
        setIsUpdated(false);
        setNotifUpdated(false);
      })
      .then((result) => {
        setIsUpdated(false);
        setNotifUpdated(false);
      })
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
            <FormGroup
              check
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Input
                onChange={() => {
                  toggleCheckbox();
                }}
                checked={isNotificationsEnabled}
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  minHeight: "20px",
                  marginRight: "20px",

                  minWidth: "20px",
                }}
                type="checkbox"
                placeholder="lg"
              />
              <Label style={{ fontSize: "1rem" }} className="w-55" check>
                {props.data.name} mail bildirimlerini aç / kapa.
              </Label>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            outline={!isUpdated && !isNotifUpdated}
            disabled={!isUpdated && !isNotifUpdated}
            size="lg"
            block
            onClick={() => {
              updateDate(props.data.serviceType, startDate, endDate);
            }}
            color={!isUpdated && !isNotifUpdated ? "focus" : "success"}
          >
            Kaydet
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default OfficeTrackingDates;
