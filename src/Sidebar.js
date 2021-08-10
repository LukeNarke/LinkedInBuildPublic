import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  // get the user from the redux store
  const user = useSelector(selectUser);

  //a function that takes in a topic and returns a p tag of the topic, which we use further down, don't always need a component, we can just make a function which renders an arguemnt based on what we pass in
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://i2.wp.com/geekcrunchhosting.com/wp-content/uploads/2018/06/blue-gradient-background.png?ssl=1"
          alt=""
        />
        {/* all of the JSX -- {} -- is info that we are pulling from the redux store, where we created the userSlice data layer... redux is awesome! */}
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {user.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,500</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">2,400</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {/* here we call the function and we add in whatever we want as the topic */}
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("software engineering")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  );
}

export default Sidebar;
