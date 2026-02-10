import React, { useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main';
import { useEffect } from 'react';
import Loding from '../loding/Loding';
import toast from 'react-hot-toast';
import { TiTickOutline } from "react-icons/ti";


const Lecture = ({ user }) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false)
    const params = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [video, setVideo] = useState("")
    const [videoPrev, setVideoPrev] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)

    if (user && user.userType !== 'admin' && !user.subscription.includes(params.id)) {
        return navigate('/')
    }

    async function fetchLectures() {
        try {
            const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setLectures(data.lectures)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }


    async function fetchLecture(id) {
        setLecLoading(true)
        try {
            const { data } = await axios.get(`${server}/api/lecture/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setLecture(data.lecture)
            setLecLoading(false)
        } catch (error) {
            console.log(error);
            setLecLoading(false)

        }
    }



    const changeVideoHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setVideoPrev(reader.result)
            setVideo(file);
        }
    }


    const submitHandler = async function (e) {
        setBtnLoading(true)
        e.preventDefault();
        const myFrom = new FormData()
        myFrom.append("title", title)
        myFrom.append("discription", discription)
        myFrom.append("file", video)

        try {
            const { data } = await axios.post(`${server}/admin/course/${params.id}`, myFrom, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            toast.success(data.message)
            setBtnLoading(false)
            setShow(false)
            fetchLectures()
            setTitle("")
            setDiscription("")
            setVideo("")
            setVideoPrev("")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }


    const deleteHandler = async (id) => {
        if (confirm("Are You Sure")) {
            try {
                const { data } = await axios.delete(`${server}/admin/lecture/${id}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                toast.success(data.message)
                fetchLectures()
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    const [completed, setCompleted] = useState("")
    const [completedLec, setCompletedLec] = useState("")
    const [lectureLength, setLectureLength] = useState("")
    const [progress, setProgress] = useState([])


    async function fetchProgress() {
        try {
            const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setCompleted(data.courseProgressPercentage);
            setCompletedLec(data.completedLectures);
            setLectureLength(data.allLectures);
            setProgress(data.progress)
        } catch (error) {
            console.log(error);

        }
    }


    const addProgress = async (id) => {
        try {
            const { data } = await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`, {}, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(data.message);
           fetchProgress()
        } catch (error) {
            console.log(error);

        }

    }
    

    useEffect(() => {
        fetchLectures()
        fetchProgress()
    }, [])
    return (
        <>
            {
                loading ? <Loding /> :
                    <>
                    <div className="progress justify-center justify-items-center p-3">
                        <p className='text-lg font-sans font-bold'>Lecture Completed - {completedLec} out of {lectureLength}</p>
                        <div className="progressBr flex gap-2">
                            <progress className='bg-blue-800 text-blue-800 rounded-lg' value={completed} max={100}></progress><p className='text-lg font-sans font-bold leading-3'>{completed}%</p>
                        </div>
                    </div>
                        <div className="lecturePage min-h-screen">
                            <div className="grid md:grid-cols-2">
                                <div className="left">
                                    {
                                        lecLoading ? <Loding /> : <>
                                            {
                                                lecture.video ? <>
                                                    <video className='p-2' src={`${server}/${lecture.video}`} controls controlsList='nodownload noremoteplayback' disablePictureInPicture disableRemotePlayback autoPlay onEnded={() => addProgress(lecture._id)} ></video>
                                                    <h1 className='text-blue-800 font-bold text-center text-2xl mt-4'>{lecture.title}</h1>
                                                    <p className='text-center text-gray-600'>{lecture.discription}</p>
                                                </> : <p className='text-2xl sm:text-5xl font-bold text-blue-800 p-4'>Plese Select a Lecture</p>
                                            }
                                        </>
                                    }
                                </div>
                                <div className="right">
                                    {
                                        user && user.userType === "admin" && <button onClick={() => setShow(!show)} className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white mt-3'>{show ? "Close" : "Add Lecture +"}</button>

                                    }
                                    {
                                        show && <div className="lecture-form">
                                            <h2 className='text-2xl font-bold p-2'>Add Lecture</h2>
                                            <form onSubmit={submitHandler}>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Title
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="text"
                                                        className="block text-sm/6 font-medium text-black"
                                                    >
                                                        Description
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            value={discription}
                                                            onChange={(e) => setDiscription(e.target.value)}
                                                            required
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="mt-2">
                                                        <input
                                                            type="file"
                                                            required
                                                            onChange={changeVideoHandler}
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />

                                                        {
                                                            videoPrev && <video src={videoPrev} alt="" className='h-40' controls></video>
                                                        }
                                                    </div>
                                                </div>
                                                <div>

                                                </div>

                                                <button disabled={btnLoading} type='submit' className='bg-blue-800 border text-white border-blue-800 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white mt-3'>
                                                    {btnLoading ? "Please Wait...." : "Add"}
                                                </button>
                                            </form>
                                        </div>
                                    }


                                    {
                                        lectures && lectures.length > 0 ? lectures.map((e, i) => (
                                            <>
                                                <div onClick={() => fetchLecture(e._id)} key={i} className={` m-5 lecture-number rounded hover:bg-blue-800 hover:text-white p-3 border border-blue-800 ${lecture._id === e._id && "m-5 lecture-number rounded bg-blue-800 text-white p-3 border border-blue-800"}`}>
                                                    {i + 1}. {e.title} {
                                                        progress[0]?.completedLectures?.includes(e._id) && <span><TiTickOutline/></span>
                                                    }
                                                </div>
                                                {
                                                    user && user.userType === "admin" && <button onClick={() => deleteHandler(e._id)} className='bg-red-600 border text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white'>Delete {e.title}</button>
                                                }
                                            </>
                                        )) : <p className='text-center text-2xl font-extrabold mt-5'>No  lecture yet!</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Lecture