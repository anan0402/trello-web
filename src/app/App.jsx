import { Navigate, createBrowserRouter, RouterProvider } from 'react-router'

import HomePage from '@/pages/HomePage/HomePage'
import LoginPage from '@/pages/LoginPage/LoginPage'
import ProblemDemoPage from '@/pages/ProblemDemoPage/ProblemDemoPage'
import SignupPage from '@/pages/SignupPage/SignupPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/problem-demo',
    element: <ProblemDemoPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

