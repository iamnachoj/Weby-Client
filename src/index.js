import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Signup from "./routes/signup";
import Signin from "./routes/signin";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);