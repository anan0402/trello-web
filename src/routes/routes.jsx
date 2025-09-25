import HomePage from '../pages/HomePage'
import BoardPage from '../pages/BoardPage'
import NotFound from '../pages/NotFound'


const routes = [
  {
    path: '/',
    element: <HomePage />,
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


