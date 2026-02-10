import React from 'react'
import Mission from './Mission'

const About = () => {
  return (
    <>
     <div className="bg-[#f5f8ff] text-gray-800">

      {/* ABOUT US */}
       <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">About Us</h2>
          <ul className="space-y-3 text-gray-600">
            <li>• Our platform helps students acquire new skills and advance careers.</li>
            <li>• High-quality courses taught by expert instructors.</li>
            <li>• Personalized learning paths, resources, and assessments.</li>
          </ul>
        </div>
      </section>

      {/* IMAGE CARDS */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 pb-16">
        <img
        data-aos="zoom-in"
          src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4766.jpg"
          className="rounded-xl shadow bg-white p-4"
          alt=""
        />
        <img
        data-aos="zoom-in-up"
          src="https://img.freepik.com/free-vector/online-education-concept_52683-37480.jpg"
          className="rounded-xl shadow bg-white p-4"
          alt=""
        />
        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To make education accessible, engaging, and impactful for everyone.
          </p>
        </div>
      </section>
      </div>

    </>
  )
}

export default About