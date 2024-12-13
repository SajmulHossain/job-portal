import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Signin from "../pages/Signin";
import JobDetails from "../pages/JobDetails";
import PrivetRoute from "./PrivetRoute";
import ProtectForm from "./ProtectForm";
import JobApply from "../pages/JobApply";
import MyApplication from "../pages/MyApplication";

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
        path: "/jobs/:id",
        element: (
          <PrivetRoute>
            <JobDetails />
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://job-portal-server-ochre.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/register",
        element: <ProtectForm>
          <Register />
        </ProtectForm>,
      },
      {
        path: '/apply/:id', 
        element: <PrivetRoute>
          <JobApply />
        </PrivetRoute>,
      },
      {
        path: "/login",
        element: <ProtectForm>
          <Signin />
        </ProtectForm>,
      },
      {
        path: '/applications',
        element: <PrivetRoute>
          <MyApplication />
        </PrivetRoute>
      }
    ],
  },
]);

export default routes;
