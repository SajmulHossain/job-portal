import { useLoaderData } from "react-router-dom";
import Heading from "../components/Heading";
import NoData from "../components/NoData";
import toast from '../utils/toast'

const ViewApplication = () => {
  const data = useLoaderData();

  const handleStatusUpdate = (e, id) => {
    const data = {
      status: e.target.value,
    };

    fetch(`http://localhost:3000/job-application/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.modifiedCount) {
          toast('success', 'Updated Successfully');
        } else {
          toast('error', 'Something went wrong!')
        }
      });
  };
  return (
    <section>
      <Heading heading={`Total Application Submitted (${data.length})`} />

      {data.length ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((job, idx) => (
                <tr key={job._id}>
                  <th>{idx + 1}</th>
                  <td>{job.applicant_email}</td>
                  <td>
                    <select
                      onChange={(e) => handleStatusUpdate(e, job._id)}
                      defaultValue={job.status || "Change Status"}
                      className="select select-bordered select-xs w-full max-w-xs"
                    >
                      <option disabled>Change Status</option>
                      <option>Under Review</option>
                      <option>Set Interview</option>
                      <option>Hired</option>
                    </select>
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

export default ViewApplication;
