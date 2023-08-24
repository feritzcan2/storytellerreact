import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Alert,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import PageTitle from "../../../../Layout/AppMain/PageTitle";
import CountryService from "../../../../api/CountryService";
import AuthService from "../../../../api/AuthService";
import { GlobalContext } from "../../../../context/GlobalProvider";

export const NotificationEmailTable = (props) => {
  const { addMail, deleteMail } = CountryService();
  const context = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toggle = () => {
    setModalVisible(!modalVisible);
  };
  const save = () => {
    if (mail == null) return;
    setModalVisible(false);
    addMail({ name: name, mail: mail })
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };
  const remove = (mail) => {
    deleteMail({ email: mail })
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return (
    <Fragment>
      <Modal
        isOpen={modalVisible}
        toggle={() => setModalVisible(!modalVisible)}
        className={props.className}
      >
        <ModalHeader toggle={() => setModalVisible(!modalVisible)}>
          Yeni mail ekle
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              onChange={(s) => setMail(s.target.value)}
              placeholder="Email adresi"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">İsim</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              onChange={(s) => setName(s.target.value)}
              placeholder="Kişinin adı"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="link" onClick={() => setModalVisible(!modalVisible)}>
            İptal
          </Button>
          <Button color="primary" onClick={save}>
            Kaydet
          </Button>
        </ModalFooter>
      </Modal>
      <PageTitle
        heading="Bildirim ayarları"
        subheading=""
        subheading2="Bu alanda, planladığınız tarihlerde yer açıldığında hangi adreslere bildirim gönderileceğini belirleyebilirsiniz."
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              {" "}
              <div className="mbg-3 h-auto ps-0 pe-0 bg-transparent no-border card-header">
                <div className="card-header-title fsize-2 text-capitalize fw-normal">
                  <CardTitle>EMail Listesi</CardTitle>
                </div>
              </div>
              <Table striped className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Kişi Adı</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {context.userData &&
                    context.userData.mailList &&
                    context.userData.mailList.map((mailData, i) => {
                      return (
                        <tr key={mailData.mail}>
                          <th scope="row">1</th>
                          <td>{mailData.name}</td>
                          <td>{mailData.mail}</td>
                          <td>
                            <button
                              onClick={() => {
                                remove(mailData.mail);
                              }}
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              SİL
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <div className="d-block text-center card-footer">
                <button onClick={toggle} className="btn-wide btn btn-success">
                  EKLE
                </button>
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
