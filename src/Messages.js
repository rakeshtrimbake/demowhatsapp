import React from "react";
import "./messages.css";
import { connect } from "react-redux";

function Messages(props) {
  return (
    <div className="messages">
      <p
        className={`messages__info ${
          props.data.name === props.user.name && "messages__receive"
        }`}
      >
        <h3>{props.data.name}</h3>
        <span className="messages__msg">{props.data.message}</span>
        <span className="messages__timestamp">
          {new Date(props.data.createdAt).toLocaleString()}
        </span>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Messages);
