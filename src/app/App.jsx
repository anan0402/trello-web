import { Navigate, createBrowserRouter, RouterProvider } from 'react-router'

import AccountVerification from '@/features/AccountVerification'
import NotFound404 from '@/features/404'
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
    path: '/account/verification/:userId/:verificationToken',
    element: <AccountVerification />,
  },
  {
    path: '/404',
    element: <NotFound404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

