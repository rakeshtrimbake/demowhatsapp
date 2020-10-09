import React, { useState, useEffect } from "react";
import "../src/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentVerySatisfiedRoundedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded";
import image from "./image.jpg";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
function Chat(props) {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function roomChat() {
      const messages = await axios.get(
        `http://localhost:4000/messages/${roomId}`
      );

      setMessages(messages.data.messages);
      setName(messages.data.roomName.name);
    }
    roomChat();
  }, [roomId]);

  async function addMessage(e) {
    e.preventDefault();
    const messageData = await axios.post("http://localhost:4000/messages", {
      message,
      roomId,
      name:props.user.name
    });
    setMessages([...messages, messageData.data]);
    setMessage("");
  }

  console.log(messages[messages.length -1]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__info">
          <h2>{name}</h2>
  {/* <span>{new Date(messages[messages.length -1]?.createdAt).toLocaleString()}</span> */}
        </div>
        <div className="chat__right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => {
          return <Messages data={message} />;
        })}
        <div id="anchor"></div>
      </div>
      <div className="chat__footer">
        <SentimentVerySatisfiedRoundedIcon />
        <form>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={(e) => addMessage(e)} />
        </form>
        <MicNoneRoundedIcon />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Chat);
