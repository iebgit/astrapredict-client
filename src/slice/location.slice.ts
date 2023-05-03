import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface LocationState {
  location:  data
}

interface data {
  date: String,
  data: {region: String, city: String, country: String}
}

// Define the initial state using that type
const initialState: LocationState = {
  location: {date: '' , data: {region: "New York", city: "New York", country: "US" }},
}

export const LocationSlice = createSlice({
  name: 'location',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeLocation: (state, action: PayloadAction<data>) => {
      state.location = action.payload
    },
  },
})

export const { changeLocation } = LocationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const locationData = (state: RootState) => state.locationReducer

export default LocationSlice.reducer