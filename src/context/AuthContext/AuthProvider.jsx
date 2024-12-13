import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from '../../firebase/firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  const signInWithGoogle = () => {
    return signInWithPopup(auth,googleProvider);
  }

  const data = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signinUser,
    logout,
    signInWithGoogle
  };

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    })

    return () => {
      unsubscribe();
    }
  },[])


  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;