"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserClient } from './components/client';
import { useOrigin } from '@/hooks/use-origin';

const UsersPage = () => {
  const [data, setData] = useState([]);

  const origin = useOrigin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${origin}/api`);
        setData(response.data);
      } catch (error) {
        // Handle fetch errors here
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array in case of error
      }
    };

    fetchData();
  }, [origin]); // Include 'origin' in the dependency array to refetch data when it changes

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={data} />
      </div>
    </div>
  );
};

export default UsersPage;
