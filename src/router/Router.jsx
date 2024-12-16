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
import AddJobs from "../pages/AddJobs";
import MyPostedJob from "../pages/MyPostedJob";
import ViewApplication from "../pages/ViewApplication";

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
          fetch(`http://localhost:3000/jobs/${params.id}`),
      },
      {
        path: "/register",
        element: (
          <ProtectForm>
            <Register />
          </ProtectForm>
        ),
      },
      {
        path: "/apply/:id",
        element: (
          <PrivetRoute>
            <JobApply />
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectForm>
            <Signin />
          </ProtectForm>
        ),
      },
      {
        path: "/applications",
        element: (
          <PrivetRoute>
            <MyApplication />
          </PrivetRoute>
        ),
      },
      {
        path: "/add-job",
        element: (
          <PrivetRoute>
            <AddJobs />
          </PrivetRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivetRoute>
            <MyPostedJob />
          </PrivetRoute>
        ),
      },
      {
        path: "/view-application/:job_id",
        element: (
          <PrivetRoute>
            <ViewApplication />
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/job-application/jobs/${params.job_id}`
          ),
      },
    ],
  },
]);

export default routes;
