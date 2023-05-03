import { configureStore } from '@reduxjs/toolkit'
import coinIdReducer from './slice/coinId.slice'
import locationReducer from './slice/location.slice'

const store = configureStore({
  reducer: {
    coinIdReducer,
    locationReducer
  },
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch