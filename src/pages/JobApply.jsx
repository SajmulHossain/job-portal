import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import Swal from "sweetalert2";

const JobApply = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jobId: id,
    applicant_email: user.email,
    linkedin: "",
    resume: "",
    github: "",
  });

  const [errors, setErrors] = useState({});

  const validateURL = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateURL(formData.linkedin)) {
      newErrors.linkedin = "Invalid LinkedIn URL";
    }
    if (!validateURL(formData.resume)) {
      newErrors.resume = "Invalid Resume URL";
    }
    if (!validateURL(formData.github)) {
      newErrors.github = "Invalid GitHub URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }

    fetch(`https://job-portal-server-ochre.vercel.app/job-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
          navigate('/applications')
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "Something went wrong, try again",
          });
        }
      });
  };

  return (
    <div className="bg-gradient-to-br from-violet-900 via-violet-700 to-violet-500 shadow-xl rounded-xl my-8 p-10 max-w-lg mx-auto transform hover:scale-105 transition duration-500">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
        Apply for Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="linkedin"
            className="block text-lg font-semibold text-white mb-2"
          >
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-violet-300 ${
              errors.linkedin ? "border-red-500" : "border-transparent"
            }`}
          />
          {errors.linkedin && (
            <p className="text-red-400 text-sm mt-1">{errors.linkedin}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="resume"
            className="block text-lg font-semibold text-white mb-2"
          >
            Resume URL
          </label>
          <input
            type="url"
            id="resume"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-violet-300 ${
              errors.resume ? "border-red-500" : "border-transparent"
            }`}
          />
          {errors.resume && (
            <p className="text-red-400 text-sm mt-1">{errors.resume}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="github"
            className="block text-lg font-semibold text-white mb-2"
          >
            GitHub Profile URL
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-violet-300 ${
              errors.github ? "border-red-500" : "border-transparent"
            }`}
          />
          {errors.github && (
            <p className="text-red-400 text-sm mt-1">{errors.github}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-violet-800 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-violet-700 transform hover:-translate-y-1 transition-all duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApply;
