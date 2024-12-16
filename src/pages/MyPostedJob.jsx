import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Heading from "../components/Heading";
import NoData from "../components/NoData";
import { Link } from "react-router-dom";
import axios from "axios";

const MyPostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(()=> {
    axios.get(`https://job-portal-server-ochre.vercel.app/jobs?email=${user.email}`, {withCredentials: true})
    .then(({data}) => setJobs(data))
  }, [user.email])
  return (
    <section className="my-12">
      <Heading heading={`Your Posted Jobs (${jobs.length})`} />

      {jobs.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Job Title</th>
                <th>Deadline</th>
                <th>Applied People</th>
                <th>View Applications</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={job._id}>
                  <th>{idx + 1}</th>
                  <td>{job.title}</td>
                  <td>{job.applicationDeadline}</td>
                  <td>{job.applicationCount || 0}</td>
                  <td>
                    <Link
                      to={`/view-application/${job._id}`}
                      className="btn hover:btn-link"
                    >
                      View Application
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default MyPostedJob;