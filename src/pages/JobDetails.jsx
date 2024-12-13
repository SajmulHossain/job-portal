import { useLoaderData } from "react-router-dom";
import { motion } from "motion/react";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    responsibilities,
    status,
    hr_email,
    hr_name,
    company_logo,
  } = job;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-violet-800 to-violet-500 shadow-2xl rounded-2xl overflow-hidden max-w-4xl mx-auto p-8"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <motion.img
          src={company_logo}
          alt={company}
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          className="h-36 w-36 rounded-full border-4 border-violet-300 object-cover shadow-xl"
        />
        <div className="flex-1 text-center md:text-left">
          <motion.h2
            className="text-4xl font-extrabold text-white mb-4 drop-shadow-md"
            whileHover={{ scale: 1.1, color: "#d8b4fe" }}
          >
            {title}
          </motion.h2>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Company:</span> {company}
          </p>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Location:</span> {location}
          </p>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Job Type:</span> {jobType}
          </p>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Category:</span> {category}
          </p>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Deadline:</span> {applicationDeadline}
          </p>
          <p className="text-lg text-white mb-2">
            <span className="font-medium">Salary:</span>{" "}
            {`${salaryRange.min}-${
              salaryRange.max
            } ${salaryRange.currency.toUpperCase()}`}
          </p>
        </div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-white mb-4 underline decoration-violet-300">
          Job Description
        </h3>
        <p className="text-white text-lg leading-relaxed mb-6">{description}</p>

        <h3 className="text-3xl font-bold text-white mb-4 underline decoration-violet-300">
          Requirements
        </h3>
        <ul className="list-disc list-inside text-white text-lg mb-6">
          {requirements.map((req, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#d8b4fe" }}
            >
              {req}
            </motion.li>
          ))}
        </ul>

        <h3 className="text-3xl font-bold text-white mb-4 underline decoration-violet-300">
          Responsibilities
        </h3>
        <ul className="list-disc list-inside text-white text-lg mb-6">
          {responsibilities.map((resp, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#d8b4fe" }}
            >
              {resp}
            </motion.li>
          ))}
        </ul>

        <h3 className="text-3xl font-bold text-white mb-4 underline decoration-violet-300">
          HR Contact
        </h3>
        <p className="text-white text-lg mb-1">
          <span className="font-medium">HR Name:</span> {hr_name}
        </p>
        <p className="text-white text-lg">
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${hr_email}`}
            className="text-violet-200 underline hover:text-violet-300"
          >
            {hr_email}
          </a>
        </p>
      </motion.div>

      {status === "active" && (
        <motion.div
          className="bg-violet-300 p-4 mt-8 rounded-lg text-center shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <button className="btn btn-primary btn-lg bg-gradient-to-r from-violet-700 to-violet-500 hover:from-violet-600 hover:to-violet-400 text-white font-bold px-6 py-3 rounded-full shadow-lg">
            Apply Now
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobDetails;