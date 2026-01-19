// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './features/userSlice'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist:['user']
//   }
//   const persistedReducer = persistReducer(persistConfig, userReducer)

// export const store = configureStore({
//   reducer: {
//     user : persistedReducer
//   },
//   middleware :(getDefaultMiddleware)=>
//     getDefaultMiddleware({
//         serializableCheck: false
//     })
  
// })

// export const persistor=persistStore(store)



import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import adminReducer from './features/adminSlice'
import sellerReducer from './features/sellerSlice'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'admin']
}

const userPersisted = persistReducer(
  { key: "user", storage },
  userReducer
);

const adminPersisted = persistReducer(
  { key: "admin", storage },
  adminReducer
);

const sellerPersisted = persistReducer(
  { key: "seller", storage },
  sellerReducer
);
export const store = configureStore({
  reducer: {
    user: userPersisted,
    admin: adminPersisted,
    seller: sellerPersisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
