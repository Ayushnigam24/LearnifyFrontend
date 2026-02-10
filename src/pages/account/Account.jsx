import React, { useEffect } from 'react'
import { UserData } from '../../context/UserContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, setIsAuth, setUser, fetchUser } = UserData();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      fetchUser()
    }
  }, [])

  const logoutHandle = () => {
    localStorage.clear()
    setUser(null)
    setIsAuth(false)
    toast.success("Logged Out")
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 justify-center m-5 min-h-screen">
      <div className="main p-4 bg-gray-200 rounded-lg shadow-lg">
        <div className="about p-3">
          <h1 className='font-serif'>
            <b className='text-blue-800'>Name:</b> {user?.name}
          </h1>
          <p className='font-serif'>
            <b className='text-blue-800'>Email:</b> {user?.email}
          </p>
          <p className='font-serif'>
            <b className='text-blue-800'>Role:</b> {user?.userType}
          </p>
        </div>
        <div className="button flex flex-wrap gap-3 mt-4">
          <button
            className='px-4 py-2 bg-blue-800 text-white hover:bg-blue-600 rounded-lg'
            onClick={() => navigate(`/${user?._id}/dashboard`)}
          >
            Dashboard
          </button>

          {user?.userType === "admin" && (
            <button
              className='px-4 py-2 bg-blue-800 text-white hover:bg-blue-600 rounded-lg'
              onClick={() => navigate(`/admin/dashboard`)}
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate("/account/profile")}
            className="px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-600"
          >
            Update Profile
          </button>

          <button
            onClick={logoutHandle}
            className='px-4 py-2 bg-blue-800 text-white hover:bg-blue-600 rounded-lg'
          >
            LogOut
          </button>
        </div>

      </div>
    </div>
  )
}

export default Account