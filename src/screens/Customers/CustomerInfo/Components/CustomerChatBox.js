import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
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
  Input,
  UncontrolledButtonDropdown,
} from "reactstrap";
import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const CustomerChatBox = (props) => {
  return (
    <Card className="card-hover-shadow-2x mb-3">
      <CardHeader className="card-header-tab">
        <div className="card-header-title font-size-lg text-capitalize fw-normal">
          <i className="header-icon lnr-printer icon-gradient bg-ripe-malin">
            {" "}
          </i>
          Chat Box
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
          <div className="p-2">
            <div className="chat-wrapper p-1">
              <div className="chat-box-wrapper">
                <div>
                  <div className="avatar-icon-wrapper me-1">
                    <div className="badge badge-bottom btn-shine bg-success badge-dot badge-dot-lg" />
                    <div className="avatar-icon avatar-icon-lg rounded">
                      <img src={avatar1} alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="chat-box">
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system.
                  </div>
                  <small className="opacity-6">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                    11:01 AM | Yesterday
                  </small>
                </div>
              </div>
              <div className="float-end">
                <div className="chat-box-wrapper chat-box-wrapper-right">
                  <div>
                    <div className="chat-box">
                      Expound the actual teachings of the great explorer of the
                      truth, the master-builder of human happiness.
                    </div>
                    <small className="opacity-6">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                      11:01 AM | Yesterday
                    </small>
                  </div>
                  <div>
                    <div className="avatar-icon-wrapper ms-1">
                      <div className="badge badge-bottom btn-shine bg-success badge-dot badge-dot-lg" />
                      <div className="avatar-icon avatar-icon-lg rounded">
                        <img src={avatar1} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-box-wrapper">
                <div>
                  <div className="avatar-icon-wrapper me-1">
                    <div className="badge badge-bottom btn-shine bg-success badge-dot badge-dot-lg" />
                    <div className="avatar-icon avatar-icon-lg rounded">
                      <img src={avatar1} alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="chat-box bg-primary text-white">
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system.
                  </div>
                  <small className="opacity-8 text-danger">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                    11:01 AM | Yesterday
                  </small>
                </div>
              </div>
              <div className="float-end">
                <div className="chat-box-wrapper chat-box-wrapper-right">
                  <div>
                    <div className="chat-box">
                      Denouncing pleasure and praising pain was born and I will
                      give you a complete account.
                    </div>
                    <small className="opacity-6">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                      11:01 AM | Yesterday
                    </small>
                  </div>
                  <div>
                    <div className="avatar-icon-wrapper ms-1">
                      <div className="badge badge-bottom btn-shine bg-success badge-dot badge-dot-lg" />
                      <div className="avatar-icon avatar-icon-lg rounded">
                        <img src={avatar2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <div className="chat-box-wrapper chat-box-wrapper-right">
                  <div>
                    <div className="chat-box">
                      The master-builder of human happiness.
                    </div>
                    <small className="opacity-6">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                      11:01 AM | Yesterday
                    </small>
                  </div>
                  <div>
                    <div className="avatar-icon-wrapper ms-1">
                      <div className="badge badge-bottom btn-shine bg-success badge-dot badge-dot-lg" />
                      <div className="avatar-icon avatar-icon-lg rounded">
                        <img src={avatar2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
      <CardFooter>
        <Input
          bsSize="sm"
          type="text"
          placeholder="Write here and hit enter to send..."
        />
      </CardFooter>
    </Card>
  );
};
