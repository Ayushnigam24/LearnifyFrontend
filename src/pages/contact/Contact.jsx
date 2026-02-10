import React, { useState } from 'react'
import { server } from '../../main'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${server}/api/user/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      toast.success(data.message)

      // form reset
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      alert('Something went wrong')
    }
  }

  return (
    <div className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold text-blue-700">
          Contact <span className="text-black">us</span>
        </h2>
        <p className="mt-2 text-gray-600">Contact with us</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-xl"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border  border-blue-800  px-3 py-2"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-md border  border-blue-800 px-3 py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-800 px-3 py-2"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-800 px-3 py-2"
            required
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="sm:col-span-2 w-full rounded-md border  border-blue-800 px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 py-2 text-white font-semibold"
        >
          Let's Talk
        </button>
      </form>
    </div>
  )
}

export default Contact