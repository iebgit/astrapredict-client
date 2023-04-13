import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CoinIdState {
  value: String
}

// Define the initial state using that type
const initialState: CoinIdState = {
  value: "bitcoin",
}

export const coinIdSlice = createSlice({
  name: 'value',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeCoinId: (state, action: PayloadAction<String>) => {
      state.value = action.payload
    },
  },
})

export const { changeCoinId } = coinIdSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const coinId = (state: RootState) => state.value

export default coinIdSlice.reducer