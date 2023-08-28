import React from "react";
import { Card, CardFooter, Col, Row } from "reactstrap";

export const CustomerDetailsPanel = (props) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col sm="6" md="4" xl="4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-start">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-10 bg-warning" />
              <i className="lnr-laptop-phone text-dark opacity-8" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Müşteri adı</div>
              <div className="widget-numbers">Ferit Özcan</div>
            </div>
          </div>
          <div className="divider m-0 d-md-none d-sm-block" />
        </Col>
        <Col sm="6" md="4" xl="4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-start">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-9 bg-danger" />
              <i className="lnr-graduation-hat text-white" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Başvuru Ülke</div>
              <div className="widget-numbers">Türkiye</div>
            </div>
          </div>
          <div className="divider m-0 d-md-none d-sm-block" />
        </Col>
        <Col sm="12" md="4" xl="4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-start">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-9 bg-success" />
              <i className="lnr-apartment text-white" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Vize Türü</div>
              <div className="widget-numbers text-success">Turistik vize</div>
            </div>
          </div>
        </Col>
      </Row>
      <CardFooter className="text-center d-block p-3">
        <div
          style={{ fontSize: "1rem" }}
          className="mb-2 me-2 badge bg-warning"
        >
          Randevu tarihi atanmadı.
        </div>
      </CardFooter>
    </Card>
  );
};
