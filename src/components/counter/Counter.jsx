import React from 'react'

const Counter = () => {
  return (
<>
<div className="container mx-auto px-4 hidden sm:block mt-5 ">
  <div className="grid md:grid-cols-3 gap-2">
    <div  data-aos="fade-up-right"  className="card flex gap-3 p-5 rounded-lg shadow-lg bg-gray-200">
        <div className="img ">
            <img className='h-20 rounded-2xl' src="https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg?t=st=1770196403~exp=1770200003~hmac=8a8aceb568fa502853ba56f02f1c2fd7890ecbb08a21db082c5e47e3f322c725" alt="" />
        </div>
        <div className="content">
            <p className='text-xl font-bold'>100+ Courses</p>
            <p className='text-gray-400'>Learn From A wide Range Of topic</p>
        </div>
    </div>
     <div  data-aos="fade-up" className="card flex gap-3 p-5 rounded-lg shadow-lg bg-gray-200">
        <div className="img ">
            <img className='h-20 rounded-2xl' src="https://img.freepik.com/free-vector/business-concept-with-man-sitting-computer_23-2147783090.jpg?t=st=1770196195~exp=1770199795~hmac=1e157458d8dc0ded5f2023f5aeb6336f3a1459a3733345d89dcd55e546e68108" alt="" />
        </div>
        <div className="content">
            <p className='text-xl font-bold'>Track Your Progress</p>
            <p className='text-gray-400'>Monitor Your Achievemnets</p>
        </div>
    </div>
     <div  data-aos="fade-up-left"  className="card flex gap-3 p-5 rounded-lg shadow-lg bg-gray-200">
        <div className="img ">
            <img className='h-20 rounded-2xl' src="https://img.freepik.com/free-vector/computer-background-with-padlock_23-2147627249.jpg?t=st=1770196325~exp=1770199925~hmac=fad405d8ab7eab5d975ed5b5c76ab9ee5667e291f217e9b27614b1c77920ed50" alt="" />
        </div>
        <div className="content">
            <p className='text-xl font-bold'>Admin Managed</p>
            <p className='text-gray-400'>Courses created and managed by admins only.</p>
        </div>
    </div>
  </div>
</div>
</>
)
}

export default Counter