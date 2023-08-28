import React, { Fragment } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import { CustomerChatBox } from "./Components/CustomerChatBox";
import { CustomerDetailsPanel } from "./Components/CustomerDetailsPanel";
import { CustomerEventHistory } from "./Components/CustomerEventHistory";
import { CustomerFileList } from "./Components/CustomerFileList";

// COMPONENTS

const CustomerInfoScreen = ({ match, data }) => {
  return (
    <Fragment>
      <PageTitle
        heading="Randevu Takibi"
        subheading="Randevu takibi bölümünde, seçili ülkedeki randevuları anlık olarak görebilirsiniz."
        subheading2="Veriler direkt olarak ilgili ülkenin randevu sisteminden anlık olarak çekilmektedir. Güncelleme zamanı verinin kaç dakika önce çekildiğini göstermektedir."
        subheading3="Takip planlayıcı, hangi aralıklarda yer açılması durumunda size bildirim gönderileceğini belirtmektedir."
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <TransitionGroup>
        <CSSTransition
          component="div"
          classNames="TabsAnimation"
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <div>
            <Container fluid>
              <CustomerDetailsPanel />
              <Row>
                <Col sm="12" lg="6">
                  <CustomerFileList />
                </Col>
                <Col sm="12" lg="6">
                  <CustomerEventHistory />
                </Col>
              </Row>
              <CustomerChatBox />
            </Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default CustomerInfoScreen;
