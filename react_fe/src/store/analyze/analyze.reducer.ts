import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import { getUserAnalyze, getCrawlAnalyze } from './analyze.action';
const initialState: Types.IAnalyzeState = {
  actionType: '',
  loading: false,
  userAnalyze: [],
  crawlAnalyze: [],
};

const AnalyzeSlice = createSlice({
  name: 'app/analyze',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // analyze user data
    builder.addCase(getUserAnalyze.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getUserAnalyze.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.userAnalyze = action.payload.data;
    });
    builder.addCase(getUserAnalyze.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });

    // analyze crawl data
    builder.addCase(getCrawlAnalyze.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getCrawlAnalyze.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.crawlAnalyze = action.payload.data;
    });
    builder.addCase(getCrawlAnalyze.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default AnalyzeSlice.reducer;
