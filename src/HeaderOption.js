import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// here is where we gain access to the title and other props, must use the {} to destructure
function HeaderOption({ avatar, Icon, title, onClick }) {
  // get the user from the redux store
  const user = useSelector(selectUser);

  return (
    <div onClick={onClick} className="headerOption">
      {/* If we pass in an Icon, only then we will render an <Icon /> component, we use the && to do this */}
      {Icon && <Icon className="headerOption__icon" />}
      {/* If we get passed an avatar, then render the <Avatar /> component, which is from material UI -- basically just a pic */}
      {avatar && (
        //   the {user?.email[0]} is saying if there is a user, render the first character of the email as the pic
        // basically, make the Avatar picture the user's email address letter at position 0
        // user?. is optional chianing, "if there is a user..." it protects us incase the user is undefined
        <Avatar className="headerOption__icon">{user?.email[0]}</Avatar>
      )}
      {/* We can fetch the title info from the Header.js file, because we have destructured the prop in our function */}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
