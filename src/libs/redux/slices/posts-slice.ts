import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TPostsState = {
  count: number;
  pageNumber: number;
  itemsPerPage: number;
};

const initialState: TPostsState = {
  count: 0,
  pageNumber: 1,
  itemsPerPage: 10,
};

export const counterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.count = payload;
    },
    loadMore: (state) => {
      state.pageNumber += 1;
    },
    setItemsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.itemsPerPage = payload;
    },
  },
});

export const { setCount, loadMore, setItemsPerPage } = counterSlice.actions;

export default counterSlice.reducer;
