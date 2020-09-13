import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Story from "./pages/Story";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let token = localStorage.getItem("token");
        if (token !== null) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

function App(props) {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/stories/:id" component={Story} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
