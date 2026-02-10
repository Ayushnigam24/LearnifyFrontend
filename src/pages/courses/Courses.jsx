import React from 'react'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main';
import CoursesCard from './CoursesCard';

const Courses = () => {
    const {courses} = CourseData()
    
  return (
    <>
    <div className="container mx-auto p-4 mt-4">
        <div className="title justify-center justify-items-center">
            <h1 className='text-2xl md:text-5xl font-extrabold'>Explore <span className='text-blue-800'>Courses</span></h1>
            
        </div>
        <div className="grid md:grid-cols-4 mt-5 gap-3">
            {
                courses  && courses.length>0 ? courses.map((e)=>(
                    <CoursesCard key={e._id} course={e}/>
                )) : <div className="justify-center justify-items-center"><p className='text-2xl md:text-4xl text-center mt-2 font-extrabold text-blue-800'>No Courses Yet</p></div> 
            }
        </div>
    </div>
    </>
  )
}

export default Courses