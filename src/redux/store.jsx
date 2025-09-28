import { configureStore } from '@reduxjs/toolkit'
import { headerReducer } from './slices'


const store = configureStore({
  reducer: {
    headerReducer,
  },
})

export default store