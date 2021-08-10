import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { logout, selectUser } from "./features/userSlice";

function Header() {
  // dispatch is the gun that shoots info to the redux store
  const dispatch = useDispatch();

  // logs us out of the app
  const logoutOfApp = () => {
    // logs us out of the front-end UI
    dispatch(logout());
    // logs us out of the back-end UI, in this case, tells us to logout of firebase as well
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src="https://logodix.com/logo/4344.png" alt="linkedin-logo" />
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>
      {/* By having the title inside the <HeaderOption />, we can pull that info while inside the HeaderOption.js file */}
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        {/* the onClick here logs us out of the app if we click the avatar */}
        {/* make avatar={true} b/c we don't always want to render it */}
        <HeaderOption avatar={true} title="You" onClick={logoutOfApp} />
      </div>
    </div>
  );
}

export default Header;
