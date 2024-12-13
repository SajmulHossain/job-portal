import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";


const ProtectForm = ({children}) => {
  const { user } = useContext(AuthContext);

  if(user) {
    return <Navigate to='/' replace />
  }

  return children;
};

export default ProtectForm;