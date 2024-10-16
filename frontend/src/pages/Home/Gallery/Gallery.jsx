import React from 'react'
import image1 from "../../../assets/gallary/image1.png"; // Ensure the folder is 'gallery'
import image2 from "../../../assets/gallary/image2.png";



const Gallery = () => {
  return (
    <div className='md:w-[80%] mx-auto my-28'>
  <div className='mb-16'>
    <h1 className='text-5xl font-bold text-center dark:text-white'>Our Gallery</h1>
  </div>

  {/* Image container */}
  <div className='grid md:grid-cols-2 items-center justify-center gap-4'>
    {/* Main large image */}
    <div className='mb-4 md:mb-0'>
      <img src={image1} alt="Gallery Image 1" className='md:h-[720px] w-full mx-auto' />
    </div>

    {/* Grid of smaller images */}
    <div className='grid grid-cols-2 gap-4'>
      <img src={image2} alt="Gallery Image 2" className='md:h-[350px] w-full rounded-sm' />
      <img src={image2} alt="Gallery Image 3" className='md:h-[350px] w-full rounded-sm' />
      <img src={image2} alt="Gallery Image 4" className='md:h-[350px] w-full rounded-sm' />
      <img src={image2} alt="Gallery Image 5" className='md:h-[350px] w-full rounded-sm' />
    </div>
  </div>
</div>

  )
}

export default Gallery