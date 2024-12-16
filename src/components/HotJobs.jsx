import { useEffect, useState } from "react";
import Heading from "./Heading";
import HotJobCard from "./HotJobCard";
import NoData from "./NoData";


const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/jobs')
    .then(res => res.json())
    .then(data => {
      setJobs(data)
    })
  }, [])
  return (
    <section className="my-12">
      <Heading heading={'Hot Jobs'} paragraph={'Explore All new jobs'} />
      
      {
        jobs.length ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          jobs.map(job => <HotJobCard key={job._id} job={job} />)
        }
      </div> : <NoData />
      }
    </section>
  );
};

export default HotJobs;