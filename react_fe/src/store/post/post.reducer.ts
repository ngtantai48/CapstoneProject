import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import {
  getAllPost,
  getAllPostSearch,
  getAllPostSearchMore,
  getAllCrawlPost,
  getPostById,
  updatePostStatus,
} from './post.action';
const initialState: Types.IPostState = {
  actionType: '',
  loading: false,
  postsList: [],
  postData: undefined,
  postDataSearch: [],
  postTotalSize: 0,
  postAdmin: [],
};

const PostSlice = createSlice({
  name: 'app/post',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // get all post
    builder.addCase(getAllPost.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postsList = action.payload.data.data;
      state.postTotalSize = action.payload.data.totalSize;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postsList = [];
    });

    // get all search
    builder.addCase(getAllPostSearch.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getAllPostSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postDataSearch = action.payload.data.data;
      state.postTotalSize = action.payload.data.totalSize;
    });
    builder.addCase(getAllPostSearch.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    builder.addCase(getAllCrawlPost.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getAllCrawlPost.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postAdmin = action.payload.data.data;
    });
    builder.addCase(getAllCrawlPost.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    // get all search more
    builder.addCase(getAllPostSearchMore.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getAllPostSearchMore.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postDataSearch = [...state.postDataSearch, ...action.payload.data.data];
      state.postTotalSize = action.payload.data.totalSize;
    });
    builder.addCase(getAllPostSearchMore.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    // get post by id
    builder.addCase(getPostById.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
      state.postData = undefined;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postData = action.payload.data.data;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.postData = undefined;
    });

    // update status post by id
    builder.addCase(updatePostStatus.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(updatePostStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(updatePostStatus.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default PostSlice.reducer;
