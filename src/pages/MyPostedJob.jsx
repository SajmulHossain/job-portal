import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Heading from "../components/Heading";
import NoData from "../components/NoData";
import HotJobCard from "../components/HotJobCard";

const MyPostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(()=> {
    fetch(`http://localhost:3000/jobs?email=${user.email}`)
    .then(res => res.json())
    .then(data => setJobs(data))
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
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={job._id}>
                  <th>{idx + 1}</th>
                  <td>{job.title}</td>
                  <td>{job.applicationDeadline}</td>
                  <td>{job.applicationCount || 0}</td>
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