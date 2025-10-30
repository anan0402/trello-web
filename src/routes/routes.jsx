import HomePage from '../pages/HomePage'
import BoardPage from '../pages/BoardPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFound from '../pages/NotFound'


const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/boards/:id',
    element: <BoardPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes


