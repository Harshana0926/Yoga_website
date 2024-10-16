import React from 'react'

const Reachers = () => {
  return (
    <div className="bg-blue-900 dark:bg-blue-800 text-gray-300 py-10 w-full">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 text-center px-30">
        {/* Visitors */}
        <div>
          <h1 className="md:text-7xl text-5xl font-bold text-white">35M+</h1>
          <h2 className="text-xl mt-2 text-gray-200">Visitors</h2>
        </div>

        {/* Subscribers */}
        <div>
          <h1 className="md:text-7xl text-5xl font-bold text-white">5M+</h1>
          <h2 className="text-xl mt-2 text-gray-200">Subscribers</h2>
        </div>

        {/* Students */}
        <div>
          <h1 className="md:text-7xl text-5xl font-bold text-white">950k+</h1>
          <h2 className="text-xl mt-2 text-gray-200">Students</h2>
        </div>

        {/* Success Stories */}
        <div>
          <h1 className="md:text-7xl text-5xl font-bold text-white">90%</h1>
          <h2 className="text-xl mt-2 text-gray-200">Success Stories</h2>
        </div>
      </div>
    </div>
  )
}

export default Reachers;

