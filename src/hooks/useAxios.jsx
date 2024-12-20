import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import toast from '../utils/toast'


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

const useAxios = () => {
  const { logout, setLoading } = useAuth();
  useEffect(() => {
    axiosInstance.interceptors.response.use(response => {
      return response;
    }, error => {
      if(error.status === 401 || error.status === 403) {
        logout()
        .then(() => {
          toast('warning', 'Unauthorized access denied')
          setLoading(false)
        })
        .catch(err => {
          toast('error', 'Something went wrong,' + err.code)
          setLoading(false)
        })
      }
      return Promise.reject(error);
    })
  },[])

  return axiosInstance;
};

export default useAxios;