import React from 'react'

const NewsEmail = () => {
  return (
    <div className="py-14">
    <div className="max-w-screen-lg mx-auto text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
        Want us to email you with the 
      </h1>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
      latest blockbuster news?
      </h1>
      
      {/* Input and Button Container */}
      <div className="flex justify-center">
        <input 
          type="email" 
          placeholder="example@company.com" 
          className="p-2 rounded-l-2xl border border-gray-300 w-64"
          required
        />
        <button className="bg-secondary text-white p-2 rounded-r-xl hover:bg-blue-600 transition duration-200">
          Subscribe
        </button>
      </div>
    </div>
  </div>
  )
}

export default NewsEmail