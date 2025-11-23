// src/store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  search: string
  lastSearch: string
}

const initialState: FilterState = {
  search: '',
  lastSearch: '' // последний search, по которому сделали fetch
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setLastSearch(state, action: PayloadAction<string>) {
      state.lastSearch = action.payload
    }
  }
})

export const { setSearch, setLastSearch } = filterSlice.actions
export default filterSlice.reducer
