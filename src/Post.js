import { Avatar } from "@material-ui/core";
import { ThumbUpAltOutlined } from "@material-ui/icons";
import React, { forwardRef } from "react";
import InputOption from "./InputOption";
import "./Post.css";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";

// forwardRef is related to react-flip-move
// ref is a reference for react, this is necessary to point react to the right place
// react needs a reference to the object that will be animated, that's why we wrap the entire component in forwardRef
const Post = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className="post">
      <div className="post__header">
        {/* show the pic of the person who posted it, otherwise show the character of their name at position 0 */}
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>

      <div className="post__buttons">
        {/* some more inline styling instead of CSS */}
        {/* These icons all come from Material UI, names are completely chosen by them */}
        <InputOption Icon={ThumbUpAltOutlined} title="Like" color="gray" />
        <InputOption Icon={ChatIcon} title="Comment" color="gray" />
        <InputOption Icon={ShareIcon} title="Share" color="gray" />
        <InputOption Icon={SendIcon} title="Send" color="gray" />
      </div>
    </div>
  );
});

export default Post;
