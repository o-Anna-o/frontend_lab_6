// src/store/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  search: string;
}

const initialState: FilterState = {
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Устанавливает строку поиска
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    // Сбрасывает поле поиска
    clearSearch(state) {
      state.search = '';
    },
  },
});

export const { setSearch, clearSearch } = filterSlice.actions;
export default filterSlice.reducer;
