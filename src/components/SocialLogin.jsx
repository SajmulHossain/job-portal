import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {navigate('/')})
      .catch((err) => console.log(err.code));
  };
  return (
    <div>
      <div className="divider">OR</div>

      <div>
        <button onClick={handleGoogleLogin} className="btn w-full">
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
