import React, { useContext, useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { AuthContext } from '../../utilities/AuthProvider';


const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();

  const {user} = useContext(AuthContext)
  console.log("The current user: ",  user)

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch
      .get('/classes')
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="mt-20 pt-3">
        <h1 className="text-4xl font-bold text-center text-secondary">Classes</h1>
      </div>

      <div className="my-16 w-[80%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {classes.map((cls, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-81 h-[400px] mx-auto gap-4 ${
              cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'
            } dark:bg-slate-600 rounded-lg overflow-hidden cursor-pointer`}
          >
            {/* Image with Select Button */}  {/*flex items-center justify-center border-2 border-white */}
            <div className="relative h-48">
              <img src={cls.image} alt={cls.name} className="object-cover w-full h-full" />
              {hoveredCard === index && (
                <button className="absolute inset-0 bg-black bg-opacity-60 text-white font-bold py-2 px-4 rounded-0 hover:bg-opacity-80 transition-opacity duration-300 ">
                 <span className='bg-red-600 text-white px-12 py-2 rounded-lg hover:bg-secondary-dark transition'> Select</span>
                </button>

              )}
            </div>

            {/* Class Information */}
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">{cls.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">Instructor: {cls.instructorName}</p>
              <div className="grid grid-cols-2 gap-4 items-center">
              {/* Available Seats */}
              <p className={`mt-2 text-center ${cls.availableSeats < 1 ? 'text-red-500' : 'text-blue-500'}`}>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Available Seats:</span> {cls.availableSeats < 1 ? 'No seats available' : `${cls.availableSeats}`}
              </p>
  
             {/* Price */}
            <p className="text-green-500 font-bold mt-1 text-center">
            ${cls.price}
            </p>
</div>
            </div>

            {/* View Button */}
            <div className="p-4 text-center">
              <button className="bg-secondary text-white px-12 py-2 rounded-lg hover:bg-secondary-dark transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
