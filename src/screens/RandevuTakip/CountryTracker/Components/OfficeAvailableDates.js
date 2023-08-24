import React, { Component, Fragment, useState } from "react";
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

const OfficeAvailableDates = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Fragment>
      <Card className="main-card mb-3">
        <CardBody>
          <CardTitle>Uygun TARİHLER</CardTitle>
          <div className="divider" />

          <Nav pills fill>
            {props.data.officeData
              .slice() // Create a copy of the officeData array
              .sort((a, b) => {
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
                        active: activeTab === i,
                      })}
                      onClick={() => {
                        setActiveTab(i);
                      }}
                    >
                      {popover.officeName}
                    </NavLink>
                  </NavItem>
                );
              })}
          </Nav>
          <TabContent activeTab={"" + activeTab}>
            {props.data.officeData
              .sort((a, b) => {
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
          Son güncelleme zamanı :
          {" " + getMinuteDifference(props.data.officeData[activeTab]) + " "}
          dakika önce
        </CardFooter>
      </Card>
    </Fragment>
  );
};
const getMinuteDifference = (data) => {
  let date1 = new Date();
  let date2 = new Date(data.updateDate);
  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  return diffInMinutes;
};

export default OfficeAvailableDates;
