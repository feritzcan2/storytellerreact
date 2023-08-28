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
          Geçmiş İşlemler
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
                date="11/08/2023"
              >
                <p className="timeline-title">Kayıt</p>
                <p>
                  Müşteri sisteme eklendi.
                  <b className="text-secondary">15:00 PM</b>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-warning"> </i>
                }
                date="11/08/2023"
              >
                <p className="timeline-title">Ödeme</p>
                <p>
                  Müşteriden 1000 tl ödeme alındı.
                  <b className="text-secondary">15:00 PM</b>
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-item"
                icon={
                  <i className="badge badge-dot badge-dot-xl bg-warning"> </i>
                }
                date="11/08/2023"
              >
                <p className="timeline-title">Ödeme</p>
                <p>
                  Randevu tarihi atandı.
                  <b className="text-secondary">15:00 PM</b>
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
