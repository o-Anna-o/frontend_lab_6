// src/store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  search: string         // то, что в input
  lastSearch: string     // то, по чему делался fetch
}

const initialState: FilterState = {
  search: '',
  lastSearch: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setLastSearch: (state, action: PayloadAction<string>) => {
      state.lastSearch = action.payload
    }
  }
})

export const { setSearch, setLastSearch } = filterSlice.actions
export default filterSlice.reducer
