import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Heading from "../components/Heading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyApplication = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const handleDeleteApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://job-portal-server-ochre.vercel.app/job-applications/${id}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          if(data.deletedCount) {

            const remainingJobs = jobs.filter(job => job._id !== id);
            setJobs(remainingJobs);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        })
        
      }
    });
  }

  useEffect(() => {
    fetch(`https://job-portal-server-ochre.vercel.app/job-application?email=${user.email}`)
    .then(res => res.json())
    .then(data => {
      setJobs(data);
    })
  },[user.email])
  return (
    <section>
      <Heading
        heading={`Applied Jobs (${jobs.length})`}
        paragraph="Jobs that you have applied"
      />

      {jobs.length ? <div className="overflow-x-auto my-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={job.company_logo} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{job.company}</div>
                        <div className="text-sm opacity-50">{job.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {job.category}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {job.title}
                    </span>
                  </td>
                  <th>
                    <button onClick={() => handleDeleteApplication(job._id)} className="btn btn-ghost text-xl" title="Delete Job">X</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <div className="h-screen flex flex-col gap-4 justify-center items-center">
              <p className="text-red-600 font-bold text-3xl">You didn&lsquo;t applied for any job yet</p>
              <Link to='/' className="btn btn-primary">Apply for Jobs</Link>
          </div>}
    </section>
  );
};

export default MyApplication;