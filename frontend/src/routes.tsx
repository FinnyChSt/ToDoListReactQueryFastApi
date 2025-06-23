import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Overview from "./pages/Overview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
    ],
  },
]);
