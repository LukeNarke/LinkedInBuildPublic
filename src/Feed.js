import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  // get the user from the redux store
  const user = useSelector(selectUser);
  // to utilize state in react, every variable we create needs a setter function, the 2nd funciton in the []
  // the setter function is what is used to change first variable
  // the useState is a react hook, the "" and [] inside the useState() is the initial value for that variable
  // MUST import useState, as well

  // this useState is created so we can deal with the input
  const [input, setInput] = useState("");
  // this useState is created so we can deal with the posts
  const [posts, setPosts] = useState([]);

  // useEffect hook will help us fire off code when the Feed() funciton loads
  // this creates a real-time listener to firebase, so it will pushed a message into this database and it will be directly mapped to the post. So if the posts changes, this useEffect hook will directly update it
  useEffect(() => {
    // go to the db, go to collection of posts
    db.collection("posts")
      // order with timestamp in descending order to give us some sequencing
      .orderBy("timestamp", "desc")
      // onSnapshot gives us a real time listener connection to database
      // layman term: give me a snapshot of the posts collection
      // every time something happens to the posts collection, give us a snapshot of the database -- a real time listener
      .onSnapshot((snapshot) =>
        // every time the posts changes, update the posts piece of state using setPosts
        setPosts(
          // in the collection, there are many docs, map through the docs, and for every doc in that collection and return the object with the id and data
          // the ({ }) means an implicit return
          snapshot.docs.map((doc) => ({
            // the doc id inside the database
            id: doc.id,
            // the data that's store behind the posts itself in db
            data: doc.data(),
          }))
        )
      );

    // if there is no 2nd argument, the code will fire off every time it re-renders
    // by setting an empty dependency, the code will only render on the first time the component loads and it won't fire off again
    // if the 2nd argument is a variable, the useEffect hook will be fired off when that respective variable is changed
  }, []);

  // e stands for event in this arrow function
  const sendPost = (e) => {
    // preventDefault to stop the need for a refresh to update the info
    e.preventDefault();

    // we want to push into the posts that our useEffect is listening to
    // add the post, an object, to the db
    db.collection("posts").add({
      // keys (left side) are from firebase
      // values (right side) is info we are pulling from the userSlice
      name: user.displayName,
      description: user.email,
      message: input,
      // if there is no photoUrl, put an empty string there
      photoUrl: user.photoUrl || "",
      // the serverTimestamp lets all time stamps be through the same time zone
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setInput to an empty string so we essentially reset the input field after sending a post
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              // set the value to the input, which is a variable at the top of the Feed function
              value={input}
              // every time the user types in, it sets off an event (e)
              // use the setInput function to the event, target the input field, and get the value from it
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            {/* the onClick */}
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          {/* using some inline styling instead of CSS */}
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* FlipMove is a react tool for us to give animations! */}
      <FlipMove>
        {/* every time there is a post, will render out the Post on the screen */}
        {/* destructure the post with the ({ }), the id and data are from line 45 and 47 */}
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            // very important to have a key when you're making a list in React, b/c we need to have a unique key for each element
            // we only want React to render out the new element that was added to the list, that's what the key is for. It gives React the ability to only render out the data connected to the key that was added
            // otherwise, it would re render everything b/c it has no way to know
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
