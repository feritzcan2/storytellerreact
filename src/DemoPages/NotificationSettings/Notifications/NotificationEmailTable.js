import React, { Fragment } from "react";
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

import PageTitle from "../../../Layout/AppMain/PageTitle";

export default class NotificationEmailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: false,
    };
    this.getData();
  }

  getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://triviastars-env.eba-vqcrvzer.eu-central-1.elasticbeanstalk.com/admin/mail",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ data: result, modal: false });
      })
      .catch((error) => console.log("error", error));
  };
  save = () => {
    if (this.state.mail == null) return;
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    fetch(
      "http://triviastars-env.eba-vqcrvzer.eu-central-1.elasticbeanstalk.com/admin/mail?name=" +
        this.state.name +
        "&email=" +
        this.state.mail,
      requestOptions
    )
      .then((result) => {
        this.getData();
      })
      .catch((error) => console.log("error", error));
  };
  remove = (mail) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      "http://triviastars-env.eba-vqcrvzer.eu-central-1.elasticbeanstalk.com/admin/mail?&email=" +
        mail,
      requestOptions
    )
      .then((result) => {
        this.getData();
      })
      .catch((error) => console.log("error", error));
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Yeni mail ekle</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                onChange={(s) => this.setState({ mail: s.target.value })}
                placeholder="Email adresi"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">İsim</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                onChange={(s) => this.setState({ name: s.target.value })}
                placeholder="Kişinin adı"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              İptal
            </Button>
            <Button color="primary" onClick={this.save}>
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
                    {this.state.data.map((mailData, i) => {
                      return (
                        <tr key={mailData.mail}>
                          <th scope="row">1</th>
                          <td>{mailData.name}</td>
                          <td>{mailData.mail}</td>
                          <td>
                            <button
                              onClick={() => {
                                this.remove(mailData.mail);
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
                  <button
                    onClick={this.toggle}
                    className="btn-wide btn btn-success"
                  >
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
  }
}
