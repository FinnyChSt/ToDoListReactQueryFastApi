import { useLayoutEffect } from "react";
import "./App.css";

import DefaultLayout from "./Layouts/DefaultLaout";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate("overview");
  });
  return <DefaultLayout />;
}

export default App;
