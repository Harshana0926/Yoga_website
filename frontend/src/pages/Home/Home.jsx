import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import Reachers from './Reachers/Reachers'
import NewsEmail from './NewsEmail/NewsEmail'

const Home = () => {

  console.log(import.meta.env.VITE_APIKEY)

  return (
    <section>
      <HeroContainer/>
      <div className='max-w-screen-xl mx-auto'>
        <Gallery/>
        <PopularClasses/>
        <PopularTeacher/>
      </div>
      <div>
      <Reachers/>
      </div>

      <div>
        <NewsEmail/>
      </div>
      
    </section>
  )
}

export default Home