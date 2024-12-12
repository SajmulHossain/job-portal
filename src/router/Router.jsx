import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Signin from "../pages/Signin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Signin />
      }
    ],
  },
]);

export default routes;
