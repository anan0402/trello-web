import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import './styles/global.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  // </StrictMode>,
)
