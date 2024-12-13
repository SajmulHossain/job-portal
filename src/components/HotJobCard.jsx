import { ImProfile } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";


const HotJobCard = ({job}) => {
  console.log(job);
  const {_id:id,title, company, company_logo, requirements, description, location, salaryRange, jobType} = job || {};
  return (
    <div className="border p-4 rounded-lg flex flex-col">
      <div className="flex gap-2">
        <div>
          <img
            src={company_logo}
            className="h-12 w-12 object-cover"
            alt="company logo"
          />
        </div>

        <div>
          <h3>{company}</h3>
          <p className="flex items-center gap-1 text-gray-500">
            <IoLocationOutline />
            <span>{location}</span>
          </p>
        </div>
      </div>

      <div className="my-6">
        <h3 className="font-bold text-lg">{title}</h3>
        <div>
          <p className="flex items-center gap-1 text-gray-500">
            <ImProfile />
            <span>{jobType}</span>
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <p className="text-gray-500">{description}</p>
      </div>

      <div className="my-6 flex gap-2 flex-wrap flex-grow items-center">
        {requirements.map((req, idx) => (
          <p
            key={idx}
            className="px-4 py-2 flex-grow text-center hover:bg-violet-300 cursor-pointer bg-violet-200 rounded-md text-violet-900"
          >
            {req}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-end">
          <p className="flex items-center text-2xl font-semibold text-violet-900">
            <TbCoinTaka />
            {salaryRange.min}
          </p>
          <span>/month (min)</span>
        </div>

        <div>
          <Link to={`/jobs/${id}`} className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobCard;