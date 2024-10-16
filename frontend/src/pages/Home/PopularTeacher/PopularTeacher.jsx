import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import img from "../../../assets/home/girl.jpg";
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const PopularTeacher = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get('/instructors')
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 // console.log(instructors); // Log instructors to see the data structure

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center'>
        <span className='dark:text-white'> Our</span> <span className='text-secondary'>Best</span > <span className='dark:text-white'>Instructors</span>
        </h1>
        <div className='w-[40%] text-center mx-auto my-4'>
          <p className='text-gray-500'>
            Explore Our Classes. Here are some popular classes based on how many
            students enrolled.
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-[80%] mx-auto'>
        {instructors.length > 0 ? (
          instructors.slice(0, 4).map((instructor) => (
            <div key={instructor._id} className='shadow-lg rounded-lg p-3 hover:-translate-y-2 duration-200 cursor-pointer dark:border'>
              <div className='flex justify-center items-center mb-4'>
                <img 
                  src={instructor?.photoUrl || img} // Use the instructor's photo
                  className='w-24 h-24 hover:-translate-y-2 duration-200 cursor-pointer shadow-md rounded-full'
                  alt={instructor?.name}
                />
              </div>
              <div className='flex flex-col text-center'>
                <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.name}</p>
                <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students: {instructor?.totalEnrolled || 0}</p>
                
                {/* Social Media Links */}
                <div className='flex justify-center space-x-4'>
                  {instructor.linkedin && (
                    <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className='text-blue-600 hover:text-blue-800 transition duration-200' />
                    </a>
                  )}
                  {instructor.instagram && (
                    <a href={instructor.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className='text-pink-600 hover:text-pink-800 transition duration-200' />
                    </a>
                  )}
                  {instructor.facebook && (
                    <a href={instructor.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className='text-blue-700 hover:text-blue-900 transition duration-200' />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No instructors found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularTeacher;
