import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Heading from "../components/Heading";


const MyApplication = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`https://job-portal-server-ochre.vercel.app/job-application?email=${user.email}`)
    .then(res => res.json())
    .then(data => {
      setJobs(data);
    })
  },[user.email])
  return (
    <section>
      <Heading heading={`Applied Jobs (${jobs.length})`} paragraph='Jobs that you have applied' />
    </section>
  );
};

export default MyApplication;