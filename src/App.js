import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Appointment from "./Components/appointments/Appointment";
import SignIn from "./Components/signIn/SignIn";
import Registration from "./Components/regestration/Registration";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/appointment" component={Appointment} />
        <Route path="/registration" component={Registration} />
        <Route path="/" component={SignIn} />
      </Switch>

      {localStorage.getItem("user") ? (
        <Switch>
          <Redirect to="/appointment" />
        </Switch>
      ) : (
        <Switch>
          <Redirect to="/" />
        </Switch>
      )}
    </div>
  );
}

export default App;
