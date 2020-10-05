import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Bar from "./components/Bar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Rooms from "./components/Rooms";
import CreateRoom from "./components/CreateRoom";
import ChatRoom from './components/ChatRoom'

function App() {
  const userIsAuthorized = () => {
    return true;
  };
  return (
    <div className="container">
      
      <Router>
        <Header />
        <Bar />


        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Rooms} />

        <Route
          path="/create"
          render={() => {
            if (userIsAuthorized()) return <CreateRoom />;
            else return <Redirect to="/login" />;
          }}
        />

        <Route path="/room/:room_id" component= {ChatRoom} />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </Router>
    </div>
  );
}

export default App;
