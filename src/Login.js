import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  // the below variables are for the state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // dispatch is the gun that fires info to the redux data layer
  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    auth
      // creates user through firebase on the backend
      .createUserWithEmailAndPassword(email, password)
      //   if the user is successfully created
      .then((userAuth) => {
        //   go into the user
        userAuth.user
          // update the profile
          .updateProfile({
            //   the key names (on left side) shouldn't be changed b/c they refer to firebase, values (on the right side) are the names of our choice
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            //   push the user into the redux store
            dispatch(
              login({
                //   the key names (on left side) shouldn't be changed b/c they refer to firebase
                email: userAuth.user.email,
                // uid = user id
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      //   incase there are any erros, catch them and show them as an alert
      //   the error is through firebase
      .catch((error) => alert(error));
  };

  //   e = event, preventDefault stops the need to refresh
  const loginToApp = (e) => {
    e.preventDefault();

    auth
      // logs in with the email and password, this is through firebase
      .signInWithEmailAndPassword(email, password)
      //   if the user is there
      .then((userAuth) => {
        //   dispatch into the redux store the login
        dispatch(
          // login in the user with the object, aka payload, info
          login({
            //   keys (on the left) are connected to firebase, DON'T change
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      //   incase there are any erros, catch them and show them as an alert
      //   the error is through firebase
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        src="https://1000logos.net/wp-content/uploads/2017/03/Linkedin-Logo-640x400.png"
        alt="LinkedInLogo"
      />

      <form>
        {/* so the value={} are filled with the variables we set at the top of the Login function */}
        {/* the onChange function is how we change the state */}
        {/* e.target.value basically means use what the user has typed in that respective field */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
          type="text"
        />

        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        {/* type="submit" means clicking enter will fire off the onClick */}
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now!
        </span>
      </p>
    </div>
  );
}

export default Login;
