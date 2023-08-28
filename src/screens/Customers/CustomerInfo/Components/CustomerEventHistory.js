import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
export const CustomerEventHistory = (props) => {
  return (
    <Card className="card-hover-shadow-2x mb-3">
      <CardHeader className="card-header-tab">
        <div className="card-header-title font-size-lg text-capitalize fw-normal">
          <i className="header-icon lnr-lighter icon-gradient bg-amy-crisp">
            {" "}
          </i>
          Timeline Example
        </div>
        <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
          <UncontrolledButtonDropdown>
            <DropdownToggle className="btn-icon btn-icon-only" color="link">
              <i className="pe-7s-menu btn-icon-wrapper" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-inbox"> </i>
                <span>Menus</span>
              </DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-file-empty"> </i>
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem>
                <i className="dropdown-icon lnr-book"> </i>
                <span>Actions</span>
              </DropdownItem>
              <DropdownItem divider />
              <div className="p-3 text-end">
                <Button className="me-2 btn-shadow btn-sm" color="link">
                  View Details
                </Button>
                <Button className="me-2 btn-shadow btn-sm" color="primary">
                  Action
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </CardHeader>
      <div className="scroll-area-lg">
        <PerfectScrollbar>
          <div className="p-4">
            <VerticalTimeline layout="1-column">
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-success"> </i>
                }
                date="10:30 PM"
              >
                <h4 className="timeline-title">All Hands Meeting</h4>
                <p>
                  Lorem ipsum dolor sic amet, today at{" "}
                  <a
                    href="https://colorlib.com/"
                    onClick={(e) => e.preventDefault()}
                  >
                    12:00 PM
                  </a>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-warning"> </i>
                }
                date="12:25 PM"
              >
                <p>
                  Another meeting today, at{" "}
                  <b className="text-danger">12:00 PM</b>
                </p>
                <p>
                  Yet another one, at{" "}
                  <span className="text-success">15:00 PM</span>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-danger"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title">Build the production release</h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                  incididunt ut labore et dolore magna elit enim at minim veniam
                  quis nostrud
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-primary"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title text-success">
                  Something not important
                </h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur elit enim at minim
                  veniam quis nostrud
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-success"> </i>
                }
                date="10:30 PM"
              >
                <h4 className="timeline-title">All Hands Meeting</h4>
                <p>
                  Lorem ipsum dolor sic amet, today at{" "}
                  <a
                    href="https://colorlib.com/"
                    onClick={(e) => e.preventDefault()}
                  >
                    12:00 PM
                  </a>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-warning"> </i>
                }
                date="12:25 PM"
              >
                <p>
                  Another meeting today, at{" "}
                  <b className="text-danger">12:00 PM</b>
                </p>
                <p>
                  Yet another one, at{" "}
                  <span className="text-success">15:00 PM</span>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-danger"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title">Build the production release</h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                  incididunt ut labore et dolore magna elit enim at minim veniam
                  quis nostrud
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-primary"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title text-success">
                  Something not important
                </h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur elit enim at minim
                  veniam quis nostrud
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-success"> </i>
                }
                date="10:30 PM"
              >
                <h4 className="timeline-title">All Hands Meeting</h4>
                <p>
                  Lorem ipsum dolor sic amet, today at{" "}
                  <a
                    href="https://colorlib.com/"
                    onClick={(e) => e.preventDefault()}
                  >
                    12:00 PM
                  </a>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-warning"> </i>
                }
                date="12:25 PM"
              >
                <p>
                  Another meeting today, at{" "}
                  <b className="text-danger">12:00 PM</b>
                </p>
                <p>
                  Yet another one, at{" "}
                  <span className="text-success">15:00 PM</span>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-danger"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title">Build the production release</h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
                  incididunt ut labore et dolore magna elit enim at minim veniam
                  quis nostrud
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-primary"> </i>
                }
                date="15:00 PM"
              >
                <h4 className="timeline-title text-success">
                  Something not important
                </h4>
                <p>
                  Lorem ipsum dolor sit amit,consectetur elit enim at minim
                  veniam quis nostrud
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </PerfectScrollbar>
      </div>
      <CardFooter className="d-block text-center">
        <Button className="btn-shadow btn-wide btn-pill" color="focus">
          <div className="badge badge-dot badge-dot-lg bg-warning badge-pulse">
            Badge
          </div>
          View All Messages
        </Button>
      </CardFooter>
    </Card>
  );
};
