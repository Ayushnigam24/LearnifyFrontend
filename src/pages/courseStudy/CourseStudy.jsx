import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'

const CourseStudy = ({ user }) => {
    const params = useParams()


    const { fetchCourse ,course } = CourseData();
    const navigate = useNavigate()
    if (user && user.userType !== "admin" && !user.subscription.includes(params.id)) {
        return navigate("/")
    }
    useEffect(() => {
        fetchCourse(params.id)
    }, [])
    return (
        <>
        {
course && <div className="study justify-center justify-items-center min-h-screen">
    <img className='max-h-60' src={`${server}/${course.image}`} alt="" />
    <div className="content">
        <h2 className='text-2xl sm:text-4xl font-extrabold text-blue-800'>{course.title}</h2>
        <p className='text-center text-gray-700'>{course.discription}</p>
        <p className='text-center text-gray-700'> Created By : {course.createdBy}</p>
        <p className='text-center text-gray-700'>{course.duration}</p>
        <Link to={`/lectures/${course._id}`}><p className='text-center text-white rounded-2xl mt-2 hover:bg-blue-600 px-4 bg-blue-800 py-2 '>Lectures</p></Link>
    </div>
</div>
        }
        </>
    )
}

export default CourseStudy