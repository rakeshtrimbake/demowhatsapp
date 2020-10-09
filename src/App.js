import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route } from "react-router-dom";
import GoogleLogin from "react-google-login";
import * as action from "./action";
import { connect } from "react-redux";
function App(props) {
  const responseGoogle = (res) => {
    props.onLogin(res.profileObj);
  };
  return (
    <div className="app">
      {!props.user ? (
        <div className="app__google">
          <GoogleLogin className="app__google_button"
            clientId="1092020467746-sodhrr334ovfpurtk6ab8df2efqotv5h.apps.googleusercontent.com"
            buttonText="Login By Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      ) : (
        <div className="app__body">
          <Sidebar />
          <Route path="/room/:roomId" component={Chat} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch(action.loginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
