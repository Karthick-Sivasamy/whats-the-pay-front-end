import React, { useEffect, useState } from 'react';
import { ApiService } from '../utils/apiService';

import MockData from '../dummy/Applications.json';

const LandingPage = () => {
  const [allUsers, setAllUsers] = useState([]);

  return (
    <div className="w-full h-full grid place-items-center bg-slate-100">
      <div className="flex w-[95%] md:w-[90%] lg:w-[75%] m-2 gap-4">
        <div className="w-[66%] flex flex-col gap-2">
          {MockData?.map((item, index) => (
            <div key={index} className="p-8 bg-white border">
              <p className="font-semibold text-lg">{item?.title}</p>
              <p className="italic font-semibold text-base">{item?.price}</p>
              <p className="text-base">{item?.description}</p>
            </div>
          ))}
        </div>
        <div className="w-auto">Filters</div>
      </div>
    </div>
  );
};

export default LandingPage;
