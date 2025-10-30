import React from 'react'
import Link from '../components/atoms/Link'
import MainLayout from '../components/templates/MainLayout'

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">Welcome to Trello</h1>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-[var(--link)] text-white rounded-lg hover:bg-[var(--link-hover)]">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-[var(--link)] text-white rounded-lg hover:bg-[var(--link-hover)]">
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage


