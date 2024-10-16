import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'

import Card from './card';

const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes,setClasses] =useState([]);

    useEffect(()=>{
        const fetchClasses = async ()=>{
            const response = await axiosFetch.get('/classes')
            //console.log(response.data);
            setClasses(response.data);
        }
        fetchClasses();
    },[])

    //console.log(classes)

  return (
    <div className='md:w-[80] mx-auto my-36'>
        <div>
            <h1 className='text-5xl font-bold text-center'>
            <span className='dark:text-white'> Our</span> <span className='text-secondary'>Popular</span > <span className='dark:text-white'>Classes</span>
                </h1>
            <div className='w-[40%] text-center mx-auto my-4'>
                <p className='text-gray-500'>Explore Our Classes . Here is some popular classes based on How many student enrolled</p>
            </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
                classes.slice(0,7).map((item,index) => <Card key={index} item={item}/>)
            }
        </div>

    </div>
  )
}

export default PopularClasses