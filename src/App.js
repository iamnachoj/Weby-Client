import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import Menu from "./components/Menu";

export default function App() {
  return (
    <BrowserRouter>
     <Menu/>
     <MainRouter/>
    </BrowserRouter>
  );
}