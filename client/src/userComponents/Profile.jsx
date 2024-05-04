import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  
  const fetchPurchasedCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${token}`);

      const response = await fetch('http://localhost:3000/api/user/users/purchasedCourses', {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch purchased courses');
      }

      const responseData = await response.json();
      const fetchedPurchasedCourses = responseData.purchasedCourses;
      setPurchasedCourses(fetchedPurchasedCourses);
    } catch (error) {
      console.error('Error fetching purchased courses:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername)
    //  console.log(storedUsername);
    fetchPurchasedCourses();
  }, []);

  return (
    <div>
      <h1 className='font-bold text-4xl text-white bg-black p-8 mb-4'>Welcome, {username}</h1>
      {isLoading ? (
        <p>Loading purchased courses...</p>
      ) : (
        <div>
          <div className="course-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-20 pl-20 gap-y-28">
            {purchasedCourses.map(course => (
              <Card key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;





const Card = ({ course }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      
      <img
        src={course.imageLink}
        alt={course.title}
        className="w-full h-56 object-cover"
      />

      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
      </div>

      
      <div className="px-6 py-4 flex justify-center">
        <button
          className="px-4 py-2 rounded-lg text-xl bg-blue-500 text-white"
          onClick={() => console.log(`View course: ${course.title}`)} 
        >
          View
        </button>
      </div>
    </div>
  );
};


