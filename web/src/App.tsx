import React from "react";
// import Routes from "./Routes";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Me } from "./pages/Me";
import { Register } from "./pages/Register";


interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Me />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
