import { configureStore } from '@reduxjs/toolkit'
import { headerReducer, authReducer } from './slices'


const store = configureStore({
  reducer: {
    headerReducer,
    authReducer,
  },
})

export default store