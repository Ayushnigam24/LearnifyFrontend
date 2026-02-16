import React from 'react'
import {useNavigate} from 'react-router-dom'
import Testimonial from '../../components/testimonial/Testimonial'
import Counter from '../../components/counter/Counter'
import Courses from '../courses/Courses'
import About from '../about/About'

const Home = () => {
    const navigate = useNavigate()
  return (
   <>
 <section className="hero dark:bg-gray-900 px-4">
  <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight text-white leading-none md:text-5xl xl:text-6xl dark:text-white">
        Master Skills with Expert-Led Courses
      </h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        From checkout to global sales tax compliance, companies around the world
        use Flowbite to simplify their payment stack.
      </p>
      <a
        onClick={()=>navigate("/")}
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Get started
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a
        className="inline-flex items-center text-white justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:text-indigo-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        onClick={()=>navigate("/courses")}
      >
        Explore Courses
      </a>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="lmsHero.jpeg"
        alt="mockup"
      />
    </div>
  </div>
</section>

<Counter/>
<br />
<div className="justify-center  justify-items-center sm:block hidden">
<hr className="border-4 border-gray-200 w-5xl "/>
</div>

<Courses/>
<About/>
<Testimonial/>



   </>
  )
}


export default Home
