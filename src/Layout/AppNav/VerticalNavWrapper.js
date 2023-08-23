import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import { dateTrackerNav } from "./NavItems";
import { GlobalContext } from "../../context/GlobalProvider";

function Nav(props) {
  const { countryAppointmentData } = useContext(GlobalContext);

  const [enableMobileMenu, setLocalEnableMobileMenu] = useState(false);
  const [navData, setNavData] = useState([]);
  const dispatch = useDispatch();
  const location = props.location;

  useEffect(() => {
    setNavData(getNavContent());
  }, [useContext(GlobalContext).countryAppointmentData]);
  useEffect(() => {
    setNavData(getNavContent());
  }, []);
  const toggleMobileSidebar = () => {
    setLocalEnableMobileMenu(!enableMobileMenu);
    dispatch(setEnableMobileMenu(!enableMobileMenu));
  };

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const getNavContent = () => {
    let nav = [];
    for (let a = 0; a < countryAppointmentData.length; a++) {
      nav.push({
        label: countryAppointmentData[a].name,
        to: "#/randevuTakibi/" + countryAppointmentData[a].name.toLowerCase(),
      });
    }
    let data = dateTrackerNav;
    data[0].content = nav;
    return data;
  };

  return (
    <>
      <h5 className="app-sidebar__heading">Randevu Takibi</h5>
      <MetisMenu
        content={navData}
        activeLinkFromLocation
        className="vertical-nav-menu"
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading"></h5>
    </>
  );
}

export default withRouter(Nav);
