import React from 'react'
import { server } from '../../main'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import {toast} from 'react-hot-toast'
import axios from 'axios'

const CoursesCard = ({ course }) => {
    const navigate = useNavigate()
    const { user, isAuth } = UserData()
    const {fetchCourses,} = CourseData()


    const deleteHandler = async (id) => {
        if (confirm("Are you sure you want to delete this course")) {
            try {
                const { data } = await axios.delete(`${server}/admin/course/${id}`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    }
                });
                toast.success(data.message);
                fetchCourses();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

    }
    return (
        <>
            <div data-aos="fade-up" className="card  border sm:w-full justify-between justify-items-center border-blue-300 rounded-lg shadow-2xl">
                <div className="img">
                    <img className='w-fit rounded-lg' src={`${server}/${course.image}`} alt="" />
                </div>
                <div className="content px-4">
                    <p className='text-2xl'><span className='font-bold text-blue-800 justify-center'>{course.title}</span> </p>
                    <p className='text-sm'><span className='font-bold text-blue-800'>Duration : </span> {course.duration}</p>
                    <p className='text-2xl'><span className='font-bold text-blue-800'>₹ </span>{course.price}</p>

                </div>
                <div className="btn p-4 justify-center justify-items-center pt-4">
                    {
                        isAuth ?
                            <>

                                {user && user.userType !== 'admin' ?
                                    <>
                                        {
                                            user?.subscription?.includes(course._id) ? <button onClick={() => navigate((`/course/study/${course._id}`))} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                                                Study
                                            </button> : <button onClick={() => navigate(`/course/${course._id}`)} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                                                Get Started
                                            </button>
                                        }
                                    </> : <button onClick={() => navigate(`/course/study/${course._id}`)} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                                        Study
                                    </button>}

                            </>
                            : <button onClick={() => navigate('/login')} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>
                                Get Started
                            </button>
                    }
                    {
                        user && user.userType == 'admin' && <button onClick={()=> deleteHandler(course._id)} className='bg-red-600 border text-white px-3 py-1 rounded-lg hover:bg-red-400 hover:text-white'>
                            Delete
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default CoursesCard