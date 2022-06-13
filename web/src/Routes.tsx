import React from "react";
import { BrowserRouter, Routes as Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Me } from "./pages/Me";
import { Register } from "./pages/Register";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">home</Link>
          </div>
          <div>
            <Link to="/register">register</Link>
          </div>
          <div>
            <Link to="/login">login</Link>
          </div>
          <div>
            <Link to="/me">me</Link>
          </div>
        </header>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Me />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
