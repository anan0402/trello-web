import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice/userSlice";
import { sidebarReducer } from "./sidebarSlice/sidebarSlice";
import { socketReducer } from "./socketSlice/socketSlice";
import { chatReducer } from "./chatSlice/chatSlice";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], //Chỉ lưu vào localstorage thì mới cho vào
}

//Thêm reducer vào đây qua hàm combine
const reducers = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  socket: socketReducer,
  chat: chatReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});