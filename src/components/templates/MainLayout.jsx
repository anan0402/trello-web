import React from 'react'
import Header from '../organisms/Header'

function MainLayout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export default React.memo(MainLayout)


