import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CoinIdState {
  coinId: String
}

// Define the initial state using that type
const initialState: CoinIdState = {
  coinId: "bitcoin",
}

export const coinIdSlice = createSlice({
  name: 'coinId',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeCoinId: (state, action: PayloadAction<String>) => {
      state.coinId = action.payload
    },
  },
})

export const { changeCoinId } = coinIdSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const coinId = (state: RootState) => state.coinIdReducer

export default coinIdSlice.reducer