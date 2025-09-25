import { Routes, Route } from 'react-router-dom'
import routes from './routes/routes'

function App() {
  return (
    <Routes>
      {routes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map((child) => (
            <Route key={`${path}-${child.path}`} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  )
}

export default App
