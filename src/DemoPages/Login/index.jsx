import React, { Fragment, useContext, useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GlobalContext } from "../../context/GlobalProvider";

import AuthService from "../../api/AuthService";
// Layout
import SweetAlert from "react-bootstrap-sweetalert";

const LoginBoxed = ({ match }) => {
  const { countryAppointmentData } = useContext(GlobalContext);
  const { loginUser } = AuthService();
  const [email, setEmali] = useState(""); // Declare a state variable...
  const [showAlert, setShowAlert] = useState(false); // Declare a state variable...
  const [password, setPassword] = useState(""); // Declare a state variable...
  const [alertText, setAlertText] = useState(""); // Declare a state variable...

  const addAlert = (text) => {
    setAlertText(text);
    setShowAlert(true);
  };
  const login = () => {
    loginUser({ username: email, password: password }, addAlert);
  };
  return (
    <Fragment>
      <div className="h-100 bg-plum-plate bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div className="app-logo-inverse mx-auto mb-3" />
            <div className="modal-dialog w-100 mx-auto">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="h5 modal-title text-center">
                    <h4 className="mt-2">
                      <div>Hoşgeldiniz,</div>
                      <span>
                        Lütfen uygulamamızı kullanmak için siteye giriş yapın.
                      </span>
                    </h4>
                  </div>
                  <Form>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            value={email}
                            onChange={(e) => setEmali(e.target.value)}
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email adresi"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Şifre"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <div className="divider" />
                </div>
                <div className="modal-footer clearfix">
                  <div className="float-start"></div>
                  <div className="float-end">
                    <Button
                      color="primary"
                      size="lg"
                      onClick={() => {
                        login();
                      }}
                    >
                      Giriş yap
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-white opacity-8 mt-3">
              Vize Defterim
            </div>
          </Col>
        </div>
      </div>
      <SweetAlert
        error
        title="Giriş başarısız."
        show={showAlert}
        onConfirm={() => setShowAlert(false)}
        timeout={3000}
      >
        {alertText}
      </SweetAlert>
    </Fragment>
  );
};

export default LoginBoxed;
