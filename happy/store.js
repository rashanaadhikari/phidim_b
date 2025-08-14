// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import productReducer from '../features/products/productSlice';
// import cartReducer from '../features/cart/cartSlice';
// import userReducer from '../features/user/userSlice';

// import storage from 'redux-persist/lib/storage'; // localStorage
// import { persistStore, persistReducer } from 'redux-persist';

// // ---------- 1️⃣ Persist Config ----------
// const persistConfig = {
//   key: 'root',                   // key in localStorage
//   storage,                        // storage engine
//   whitelist: ['products', 'cart', 'user'] // slices to persist
// };

// // ---------- 2️⃣ Combine Reducers ----------
// const rootReducer = combineReducers({
//   products: productReducer,
//   cart: cartReducer,
//   user: userReducer
// });

// // ---------- 3️⃣ Persisted Reducer ----------
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // ---------- 4️⃣ Configure Store ----------
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // required for redux-persist
//     }),
// });

// // ---------- 5️⃣ Persistor ----------
// export const persistor = persistStore(store);
