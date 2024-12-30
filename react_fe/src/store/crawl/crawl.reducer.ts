import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import { crawlVieclam24h, crawlFacebook } from './crawl.action';
const initialState: Types.ICrawlState = {
  actionType: '',
  loading: false,
  log: [],
};

const CrawlSlice = createSlice({
  name: 'app/crawl',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // get all post
    builder.addCase(crawlVieclam24h.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(crawlVieclam24h.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(crawlVieclam24h.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(crawlFacebook.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(crawlFacebook.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(crawlFacebook.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default CrawlSlice.reducer;
