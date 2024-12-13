import Lottie from "lottie-react";
import registerLottie from "../assets/lotties/registerLottie.json";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser,setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regex.test(password)) {
      setError(
        "Password must contain atleast one uppercase, one lowercase and at least 6 characters"
      );

      return;
    }

    createUser(email, password)
    .then(res => {
      setUser(res.user);
      navigate('/');
    })
    .catch(err => {
      setError(err.code);
    })

    
  };
  return (
    <section>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">
            <Lottie animationData={registerLottie}></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <h1 className="text-5xl font-bold">Register Now!</h1>
              {error && <p className="text-red-600">{error}</p>}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
