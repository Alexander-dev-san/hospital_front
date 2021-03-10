import React from "react";
import "./App.scss";
import Appointment from "./Components/appointments/Appointment";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Components/signIn/SignIn";
import Registration from "./Components/regestration/Registration";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/appointment" component={Appointment} />
        <Route path="/registration" component={Registration} />
        <Route path="/" component={SignIn} />
        <Redirect from="/" to="/" />
      </Switch>

      {localStorage.getItem("user") ? (
        <Switch>
          <Redirect to="/appointment" />
        </Switch>
      ) : (
        <Switch>
          <Redirect from="/" to="/" />
        </Switch>
      )}
    </div>
  );
}

export default App;
