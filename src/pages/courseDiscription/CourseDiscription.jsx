import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import { useState } from 'react';
import Loading from '../loding/Loding.jsx'
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';

const CourseDiscription = ({ user }) => {
    const params = useParams();
    const { fetchCourse, course, fetchCourses ,fetchMyCourse} = CourseData()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {fetchUser} = UserData()

    useEffect(() => {
        fetchCourse(params.id)
    }, [])

    const checkoutHandler = async () => {
  try {
    const token = localStorage.getItem("token");
    setLoading(true);

    const { data } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      { headers: { token } }
    );

    const { order } = data;

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_S9kwgEIGFYzwbS",
      currency: "INR",
      order_id: order.id,
      name: "LMS",
      description: "Learn with us",

      handler: async function (response) {
        try {
          const res = await axios.post(
            `${server}/api/verification/${params.id}`,
            response,
            { headers: { token } }
          );
          await fetchMyCourse();  
          toast.success(res.data.message);
          setLoading(false);
          navigate(`/payment-success/${response.razorpay_payment_id}`);
        } catch (err) {
          toast.error(err.response?.data?.message);
          setLoading(false);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    console.log(error);
    
    setLoading(false);
  }
};

    return (
        <>
        {
            loading ? <Loading/> : 

<>
            {course && <div className='min-h-screen'>
                <div className="grid md:grid-cols-2">
                    <div className="img justify-center justify-items-center">
                        <img className='h-80' src={`${server}/${course.image}`} alt="" />
                    </div>
                    <div className="info pt-10 px-4">
                        <h2 className='text-4xl text-blue-800 font-extrabold'>{course.title}</h2>
                        <p><span className='font-bold'>Instructor :</span> {course.createdBy}</p>
                        <p><span className='font-bold'>Duration : </span>{course.duration}</p>
                        <p><span className='font-bold'>About this Course : </span>{course.discription}</p>
                        <p className='text-2xl mb-3'>Lets get Started with course At <span className='text-blue-800 font-bold'>₹ {course.price}</span> </p>
                        {
                            user && user?.subscription?.includes(course._id) ? <button className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white' onClick={() => { navigate(`/course/study/${course._id}`) }}>Study</button> : <button onClick={checkoutHandler} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white'>Buy Now</button>
                        }
                    </div>
                </div>
            </div>}
        </>

        }</>
    )
}

export default CourseDiscription