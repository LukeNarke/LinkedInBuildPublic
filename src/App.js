import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function App() {
  // pull the user from the redux data layer
  const user = useSelector(selectUser);
  // dispatch is the gun that fires info to the redux data layer
  const dispatch = useDispatch();

  useEffect(() => {
    // it listens to any authentication change, which means persistent login capability
    auth.onAuthStateChanged((userAuth) => {
      // if the userAuth is there, that means the user is logged in
      if (userAuth) {
        //user logged in, dispatch the user into the redux store
        dispatch(
          // dispatch a payload with the login
          login({
            // keys (left side) are connected to firebase
            // setting these keys, that are inside the redux store, to the given values
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
        // if the userAuth is not there, that means there is no user logged in
      } else {
        //user logged out
        dispatch(logout());
      }
    });
    // because we have the 2nd argument of [], this useEffect will only fire off when the component first loads
  }, []);

  return (
    <div className="app">
      <Header />

      {/* if there is no user, render a login page, otherwise render the rest of the app */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
