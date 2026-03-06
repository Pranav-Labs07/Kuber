import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserDataContext)
  const [isLoading,setIsLoading]=useState(true)



  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setUser(response.data  || response.data);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, setUser]);

   if (isLoading){
    return(
      <div>Loading...</div>
    )
  }


  return <>{children}</>;
};

export default UserProtectWrapper;