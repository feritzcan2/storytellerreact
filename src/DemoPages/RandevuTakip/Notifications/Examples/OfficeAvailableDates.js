import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Alert,
} from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import classnames from "classnames";

import "react-toastify/dist/ReactToastify.css";
import { valid } from "chroma-js";
import { date } from "date-arithmetic";

class OfficeAvailableDates extends Component {
  state = OfficeAvailableDates.getDefaultState();

  static getDefaultState() {
    return {
      activeTab: 0,
      officeData: [
        {
          Office: "Altunzade",
          AvailableDates: ["2023-10-20", "2023-10-20", "2023-10-20"],
        },
        {
          Office: "Altunzade",
          AvailableDates: ["2023-18-20"],
        },
      ],
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <Nav pills fill>
                  {this.props.data.officeData
                    .slice() // Create a copy of the officeData array
                    .sort((a, b) => {
                      debugger;
                      // Compare the minimum available dates
                      const minDateA = Math.min(
                        ...a.dates.map((date) => new Date(date))
                      );
                      const minDateB = Math.min(
                        ...b.dates.map((date) => new Date(date))
                      );
                      return minDateA - minDateB; // Sort in ascending order
                    })
                    .map((popover, i) => {
                      return (
                        <NavItem>
                          <NavLink
                            href="#"
                            className={classnames({
                              active: this.state.activeTab === i,
                            })}
                            onClick={() => {
                              this.toggle(i);
                            }}
                          >
                            {popover.officeName}
                          </NavLink>
                        </NavItem>
                      );
                    })}
                </Nav>
                <TabContent activeTab={"" + this.state.activeTab}>
                  {this.props.data.officeData
                    .sort((a, b) => {
                      debugger;
                      // Compare the minimum available dates
                      const minDateA = Math.min(
                        ...a.dates.map((date) => new Date(date))
                      );
                      const minDateB = Math.min(
                        ...b.dates.map((date) => new Date(date))
                      );
                      return minDateA - minDateB; // Sort in ascending order
                    })
                    .map((popover, i) => {
                      return (
                        <TabPane tabId={"" + i}>
                          {popover.dates.map((date, i) => {
                            return (
                              <Alert color="success">
                                <a
                                  style={{ marginLeft: "50px" }}
                                  className="alert-link"
                                >
                                  {date.split("T")[0]}
                                </a>
                              </Alert>
                            );
                          })}
                          {popover.dates.length == 0 && (
                            <Alert color="danger">
                              <a
                                style={{ marginLeft: "50px" }}
                                className="alert-link"
                              >
                                UYGUN RANDEVU YOK
                              </a>
                            </Alert>
                          )}
                        </TabPane>
                      );
                    })}
                </TabContent>
              </CardBody>
              <CardFooter>
                Son güncelleme zamanı : {this.getMinuteDifference()} dakika önce
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
  getMinuteDifference = () => {
    let date1 = new Date();
    let date2 = new Date(
      this.props.data.officeData[this.state.activeTab].updateDate
    );
    const diffInMilliseconds = Math.abs(date2 - date1);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    return diffInMinutes;
  };
}

function convertUtcToLocal(utcDateStr) {
  const utcDate = new Date(utcDateStr);
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000
  );
  return localDate;
}
function formatReadableDate(inputDate) {
  console.log(inputDate);
  inputDate = formatUTCtoLocal(inputDate);
  console.log(inputDate);
  const currentDate = new Date();
  const inputTime = new Date(inputDate);

  const timeDifference = currentDate - inputTime;

  // Dakika cinsinden farkı hesapla
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 1) {
    return "Şimdi";
  } else if (minutesDifference === 1) {
    return "1 dakika önce";
  } else if (minutesDifference < 60) {
    return `${minutesDifference} dakika önce`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} saat önce`;
  } else if (minutesDifference < 43200) {
    const daysDifference = Math.floor(minutesDifference / 1440);
    return `${daysDifference} gün önce`;
  } else {
    const formattedDate = inputTime.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return `Son güncelleme zamanı: ${formattedDate}`;
  }
}
function formatUTCtoLocal(inputDate) {
  const inputTime = new Date(inputDate);

  const localTime = new Date(inputTime);
  localTime.setMinutes(localTime.getMinutes() - localTime.getTimezoneOffset());

  const currentDate = new Date();
  const timeDifference = currentDate - localTime;

  // Diğer adımlar aynı şekilde devam eder...
  // ...
  // ...

  return localTime;
}
export default OfficeAvailableDates;
