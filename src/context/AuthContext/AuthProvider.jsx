import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const data = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signinUser,
    logout,
    signInWithGoogle,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post("https://job-portal-server-ochre.vercel.app/jwt", user, { withCredentials: true })
          .then(({ data }) => console.log(data));
          setLoading(false);
      } else {
        axios
          .post("https://job-portal-server-ochre.vercel.app/logout", {}, { withCredentials: true })
          .then(({ data }) => console.log(data));
          setLoading(false);
      }

    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
