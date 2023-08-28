import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const CustomerFileList = (props) => {
  return (
    <Card className="card-hover-shadow-2x mb-3">
      <CardHeader className="card-header-tab">
        <div className="card-header-title font-size-lg text-capitalize fw-normal">
          <i className="header-icon lnr-database icon-gradient bg-malibu-beach">
            {" "}
          </i>
          Tasks List
        </div>
      </CardHeader>
      <div className="scroll-area-lg">
        <PerfectScrollbar>
          <div className="p-2">
            <ListGroup className="todo-list-wrapper" flush>
              <ListGroupItem>
                <div className="todo-indicator bg-warning" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox12"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Wash the car
                        <div className="badge bg-danger ms-2">Rejected</div>
                      </div>
                      <div className="widget-subheading">
                        <i>Written by Bob</i>
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-focus" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox1"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Task with hover dropdown menu
                      </div>
                      <div className="widget-subheading">
                        <div>
                          By Johnny
                          <div className="badge rounded-pill bg-info ms-2">
                            NEW
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-primary" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox4"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">Task with Badge</div>
                      <div className="widget-subheading">
                        Show on hover actions!
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                    <div className="widget-content-right ms-3">
                      <div className="badge rounded-pill bg-success">New</div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-info" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox2"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left me-3">
                      <div className="widget-content-left">
                        <img
                          width={42}
                          className="rounded"
                          src={avatar2}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">Go grocery shopping</div>
                      <div className="widget-subheading">
                        A short description here
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-success" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox3"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">Development Task</div>
                      <div className="widget-subheading">
                        Finish React ToDo List App
                      </div>
                    </div>
                    <div className="widget-content-right">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-warning" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox12"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Wash the car
                        <div className="badge bg-danger ms-2">Rejected</div>
                      </div>
                      <div className="widget-subheading">
                        <i>Written by Bob</i>
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-focus" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox1"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">
                        Task with hover dropdown menu
                      </div>
                      <div className="widget-subheading">
                        <div>
                          By Johnny
                          <div className="badge rounded-pill badge-info ms-2">
                            NEW
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-primary" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox4"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">
                        Badge on the right task
                      </div>
                      <div className="widget-subheading">
                        This task has show on hover actions!
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="success"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                    <div className="widget-content-right ms-3">
                      <div className="badge rounded-pill badge-dark">NEW</div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div className="todo-indicator bg-info" />
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left me-2 ms-2">
                      <Input
                        type="checkbox"
                        className="me-2 form-check-input-custom"
                        id="exampleCustomCheckbox2"
                        label="&nbsp;"
                      />
                    </div>
                    <div className="widget-content-left me-3">
                      <div className="widget-content-left">
                        <img
                          width={42}
                          className="rounded"
                          src={avatar2}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="widget-content-left">
                      <div className="widget-heading">Purchase apples</div>
                      <div className="widget-subheading">
                        Description here...
                      </div>
                    </div>
                    <div className="widget-content-right widget-content-actions">
                      <Button
                        className="border-0 btn-transition"
                        outline
                        color="danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </div>
        </PerfectScrollbar>
      </div>
      <CardFooter className="d-block text-end">
        <Button size="sm" className="me-2" color="link">
          Cancel
        </Button>
        <Button color="primary">Add Task</Button>
      </CardFooter>
    </Card>
  );
};
