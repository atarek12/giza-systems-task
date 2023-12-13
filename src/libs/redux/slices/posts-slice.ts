import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TPost } from "../../../shared/types";

type TPostsState = {
  items: TPost[];
  count: number;
  pageNumber: number;
  itemsPerPage: number;
};

const initialState: TPostsState = {
  items: [],
  count: 0,
  pageNumber: 1,
  itemsPerPage: 10,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<TPost[]>) => {
      state.items = payload;
      state.count = payload.length;
    },
    addPost: (state, { payload }: PayloadAction<TPost>) => {
      state.items.unshift(payload);
      state.count = state.count + 1;
    },
    loadMore: (state) => {
      state.pageNumber += 1;
    },
    setItemsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.itemsPerPage = payload;
    },
  },
});

export const { setPosts, addPost, loadMore, setItemsPerPage } =
  postsSlice.actions;

export default postsSlice.reducer;
