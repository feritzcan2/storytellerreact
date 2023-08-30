import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  ListGroupItem,
  ListGroup,
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  Input,
  Container,
} from "reactstrap";

import MultiStepWizard from "./MultiStepWizard";

import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step4 from "./Steps/Step4";

import avatar2 from "../../assets/utils/images/avatars/2.jpg";

import {
  faTrashAlt,
  faCheck,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../../Layout/AppMain/PageTitle";

const steps = [
  { name: "Kişisel Bilgiler", component: <Step1 /> },
  { name: "Dosya yükleme", component: <Step2 /> },
  { name: "Finish Wizard", component: <Step4 /> },
];

export default class CustomerRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      cSelected: [],
      dropdownOpen: false,
    };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            component="div"
            classNames="TabsAnimation"
            appear={true}
            timeout={1500}
            enter={false}
            exit={false}
          >
            <Container fluid style={{ backgroundColor: "whitesmoke" }}>
              <Row>
                <PageTitle
                  style={{
                    margin: "0px",
                    backgroundColor: "#232425",
                    color: "white",
                  }}
                  heading="Global Consultancy - Müşteri Kayıt Formu"
                  subheading="Başvuru sürecinizi daha rahat takip edebilmek için, lütfen kaydınızı oluşturun."
                  icon="lnr-map text-info"
                />
              </Row>
              <Row>
                <Col className="p-5" md="12" lg="5">
                  <MultiStepWizard showNavigation={true} steps={steps} />
                </Col>
              </Row>
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
