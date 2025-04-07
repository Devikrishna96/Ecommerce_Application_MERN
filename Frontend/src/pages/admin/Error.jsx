import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h1 className="text-6xl font-bold">404 Not Found</h1>
      <p className="text-gray-500 mt-2">Your visited page not found. You may go home page.</p>
      <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><Link to="home">
        Back to home page</Link>
      </button>
    
    </div>
  )
}
