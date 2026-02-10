import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ isAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setMobileOpen(false);
};

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img
              src="logo.png"
              alt=""
              className="h-10 w-auto"
            />
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/">Home</NavLink>
          <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/courses">Course</NavLink>
          <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/about">About</NavLink>
          <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/contact">Contact us</NavLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            isAuth
              ? <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/account">Account →</NavLink>
              : <NavLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm font-semibold text-gray-900" to="/login">Log in →</NavLink>
          }
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full bg-white p-6 sm:max-w-sm shadow">
            
            <div className="flex items-center justify-between">
              <img
                src="logo.png"
                alt=""
                className="h-8 w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50"
              >
                Home
              </NavLink>

              <NavLink
                to="/courses"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50"
              >
                Courses
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-50"
              >
                Contact us
              </NavLink>
              
            </div>

            <div className="mt-6">
              {
                isAuth
                  ? <NavLink onClick={() => setMobileOpen(false)} to="/account">Account →</NavLink>
                  : <NavLink onClick={() => setMobileOpen(false)} to="/login">Log in →</NavLink>
              }
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header