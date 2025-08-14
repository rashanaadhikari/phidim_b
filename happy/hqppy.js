// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // ---------- Async Thunks ----------
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const res = await axios.get('/api/products');
//     return res.data;
//   }
// );

// export const updateProduct = createAsyncThunk(
//   'products/updateProduct',
//   async ({ id, data }) => {
//     const res = await axios.put(`/api/products/${id}`, data);
//     return res.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   'products/deleteProduct',
//   async (id) => {
//     await axios.delete(`/api/products/${id}`);
//     return id;
//   }
// );

// // ---------- Slice ----------
// const productSlice = createSlice({
//   name: 'products',
//   initialState: { items: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {

//     // 1️⃣ Handle specific actions
//     builder
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.items.findIndex(p => p.id === action.payload.id);
//         if (index !== -1) state.items[index] = action.payload;
//         state.loading = false;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.items = state.items.filter(p => p.id !== action.payload);
//         state.loading = false;
//       });

//     // 2️⃣ Handle multiple actions matching a rule (all pending actions)
//     builder.addMatcher(
//       (action) => action.type.endsWith('/pending'),
//       (state) => {
//         state.loading = true;
//         state.error = null;
//       }
//     );

//     // 3️⃣ Handle multiple actions matching a rule (all rejected actions)
//     builder.addMatcher(
//       (action) => action.type.endsWith('/rejected'),
//       (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       }
//     );

//     // 4️⃣ Default case for unknown actions
//     builder.addDefaultCase((state, action) => {
//       console.log('Unhandled action:', action.type);
//     });
//   },
// });

// export default productSlice.reducer;
