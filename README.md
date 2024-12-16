# Job Portal

Live Link: [Job Portal](https://job-portal-sajmul.web.app)

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contact](#contact)

## About the Project
The **Job Portal** is a platform designed to connect job seekers with potential employers. It provides functionalities for job seekers to explore and apply for job opportunities and for HR managers to manage and monitor job applications effectively.

## Features
### For Job Seekers:
- Browse job listings dynamically fetched from APIs or JSON data.
- Apply to jobs directly through the portal.
- Track all applied jobs in a user-specific dashboard.

### For HR Managers:
- Post new job openings easily.
- View a list of applicants for each job.
- Track the number of applicants for specific job postings.
- Access detailed information about each applicant.

### General Features:
- User-friendly and responsive design.
- Search and filter options to find relevant jobs quickly.
- Error handling and toast notifications for better user feedback.

## Technologies Used
- **Frontend**: ReactJS, TailwindCSS
- **Backend**: Firebase (for hosting and deployment)
- **Other Tools**: React Icons, React Toastify, SweetAlert2, Lottie React

## Setup and Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/sajmul/job-portal.git
    cd job-portal
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open the app in your browser at `http://localhost:5173`.

## Usage

### For Job Seekers:
1. Register or log in to your account.
2. Browse available job listings.
3. View detailed job descriptions.
4. Apply to jobs of interest and track applications.

### For HR Managers:
1. Log in with your HR account.
2. Post new job openings through the dashboard.
3. View the list of applicants for each job.
4. Manage job applications effectively.

## Folder Structure
```
job-portal/
├── public/         # Static files
├── src/            # Source files
│   ├── components/ # Reusable React components
│   ├── pages/      # Page-specific components
│   ├── assets/     # Images and other assets
│   ├── styles/     # Custom CSS or Tailwind configurations
│   ├── utils/      # Helper functions and constants
├── package.json    # Project dependencies
├── README.md       # Project documentation
```

## Dependencies in package.json

### Key Dependencies:
- **firebase**: Used for hosting and deployment.
- **lottie-react**: For animations to enhance user interface.
- **motion**: For smooth animations.
- **react-router-dom**: For routing functionalities.
- **react-icons**: For adding icons throughout the app.
- **sweetalert2**: For custom alerts and modals.

### Development Dependencies:
- **tailwindcss**: For styling the application.
- **daisyui**: For pre-designed components with TailwindCSS.
- **eslint**: To maintain code quality.
- **vite**: For fast development and build processes.

## Contact

For any inquiries or support, feel free to reach out:
- **Name**: Sajmul Hossain
- **Email**: [sajmul@example.com](mailto:sajmul@example.com)
- **Portfolio**: [sajmul.com](https://sajmul.com)

---
Feel free to contribute to the project by submitting pull requests or reporting issues!
