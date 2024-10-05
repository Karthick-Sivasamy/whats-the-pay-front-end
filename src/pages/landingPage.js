import React, { useEffect, useState } from 'react';
import { ApiService } from '../utils/apiService';

const LandingPage = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService().get('/user/all-users');
        setAllUsers(response.data.data);
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  return (
    <div className="w-full h-full grid place-items-center">
      {allUsers?.map((item, index) => (
        <div key={index}>
          <h1>{item?.email}</h1>
          <h1>{item?.name}</h1>
          <h1>{item?.role}</h1>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
