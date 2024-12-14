import { useState } from "react";
import Swal from "sweetalert2";

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobType: "",
    category: "",
    applicationDeadline: "",
    salaryRange: { min: "", max: "", currency: "bdt" },
    description: "",
    company: "",
    requirements: "",
    responsibilities: "",
    status: "active",
    hr_email: "",
    hr_name: "",
    company_logo: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.jobType.trim()) newErrors.jobType = "Job type is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (
      !formData.applicationDeadline.trim() ||
      isNaN(Date.parse(formData.applicationDeadline))
    ) {
      newErrors.applicationDeadline = "Valid application deadline is required.";
    }
    if (
      !formData.salaryRange.min ||
      !formData.salaryRange.max ||
      isNaN(formData.salaryRange.min) ||
      isNaN(formData.salaryRange.max) ||
      Number(formData.salaryRange.min) > Number(formData.salaryRange.max)
    ) {
      newErrors.salaryRange =
        "Valid salary range is required (min should not exceed max).";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.company.trim())
      newErrors.company = "Company name is required.";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required.";
    if (!formData.responsibilities.trim())
      newErrors.responsibilities = "Responsibilities are required.";
    if (!formData.hr_email.trim() || !formData.hr_email.includes("@"))
      newErrors.hr_email = "Valid HR email is required.";
    if (!formData.hr_name.trim()) newErrors.hr_name = "HR name is required.";
    if (
      !formData.company_logo.trim() ||
      !formData.company_logo.startsWith("http")
    )
      newErrors.company_logo = "Valid company logo URL is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return true;
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salaryRange.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        salaryRange: { ...formData.salaryRange, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) return;

    const formattedData = {
      ...formData,
      requirements: formData.requirements.split(","),
      responsibilities: formData.responsibilities.split(","),
    };

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });

          setFormData({
            title: "",
            location: "",
            jobType: "",
            category: "",
            applicationDeadline: "",
            salaryRange: { min: "", max: "", currency: "bdt" },
            description: "",
            company: "",
            requirements: "",
            responsibilities: "",
            status: "active",
            hr_email: "",
            hr_name: "",
            company_logo: "",
          });
        }
      });
  };

  return (
    <div className="bg-gradient-to-br from-violet-900 to-violet-600 shadow-2xl rounded-xl p-10 max-w-4xl mx-auto">
      <h2 className="text-5xl font-extrabold text-white mb-8 text-center">
        Add New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-white mb-2"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 ${
              errors.title ? "border-red-600" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-xl font-medium text-white mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-2">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="jobType"
            className="block text-xl font-medium text-white mb-2"
          >
            Job Type
          </label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.jobType && (
            <p className="text-red-500 text-sm mt-2">{errors.jobType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xl font-medium text-white mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-2">{errors.category}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="applicationDeadline"
            className="block text-xl font-medium text-white mb-2"
          >
            Application Deadline
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.applicationDeadline && (
            <p className="text-red-500 text-sm mt-2">
              {errors.applicationDeadline}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="salaryRangeMin"
            className="block text-xl font-medium text-white mb-2"
          >
            Minimum Salary
          </label>
          <input
            type="number"
            id="salaryRangeMin"
            name="salaryRange.min"
            value={formData.salaryRange.min}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="salaryRangeMax"
            className="block text-xl font-medium text-white mb-2"
          >
            Maximum Salary
          </label>
          <input
            type="number"
            id="salaryRangeMax"
            name="salaryRange.max"
            value={formData.salaryRange.max}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.salaryRange && (
            <p className="text-red-500 text-sm mt-2">{errors.salaryRange}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xl font-medium text-white mb-2"
          >
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-xl font-medium text-white mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-2">{errors.company}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="requirements"
            className="block text-xl font-medium text-white mb-2"
          >
            Requirements (comma-separated)
          </label>
          <input
            type="text"
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.requirements && (
            <p className="text-red-500 text-sm mt-2">{errors.requirements}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="responsibilities"
            className="block text-xl font-medium text-white mb-2"
          >
            Responsibilities (comma-separated)
          </label>
          <input
            type="text"
            id="responsibilities"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.responsibilities && (
            <p className="text-red-500 text-sm mt-2">
              {errors.responsibilities}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hr_email"
            className="block text-xl font-medium text-white mb-2"
          >
            HR Email
          </label>
          <input
            type="email"
            id="hr_email"
            name="hr_email"
            value={formData.hr_email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.hr_email && (
            <p className="text-red-500 text-sm mt-2">{errors.hr_email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="hr_name"
            className="block text-xl font-medium text-white mb-2"
          >
            HR Name
          </label>
          <input
            type="text"
            id="hr_name"
            name="hr_name"
            value={formData.hr_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.hr_name && (
            <p className="text-red-500 text-sm mt-2">{errors.hr_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company_logo"
            className="block text-xl font-medium text-white mb-2"
          >
            Company Logo URL
          </label>
          <input
            type="url"
            id="company_logo"
            name="company_logo"
            value={formData.company_logo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300"
          />
          {errors.company_logo && (
            <p className="text-red-500 text-sm mt-2">{errors.company_logo}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-violet-700 text-white font-semibold rounded-md hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-400 transition-all duration-300"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
