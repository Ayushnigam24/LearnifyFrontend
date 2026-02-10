import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import { CourseContextProvider } from './context/CourseContext'


export const server = 'https://learnify-server-6dai.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <CourseContextProvider>
      <App />
    </CourseContextProvider>
  </UserContextProvider>
)
