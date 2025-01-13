import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import { getPredictJobOpportunity, getHistoricalJobOpportunity } from './predict.action';
const initialState: Types.IPredictState = {
  actionType: '',
  loading: false,
  jobOpportunity: [],
  label: '',
  jobHistorical: { labels: [], data: [] },
};

const PredictSlice = createSlice({
  name: 'app/predict',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // predict job opportunity data
    builder.addCase(getPredictJobOpportunity.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getPredictJobOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.jobOpportunity = [...action.payload.data.historical, ...action.payload.data.prediction];
      state.label = `Dự đoán tuyển dụng vị trí ${action.meta.arg.job} tại ${action.meta.arg.city}`;
    });
    builder.addCase(getPredictJobOpportunity.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    // history job opportunity data
    builder.addCase(getHistoricalJobOpportunity.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(getHistoricalJobOpportunity.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.jobHistorical = action.payload.data;
      state.label = `Số lượng tuyển dụng ngành CNTT hiện tại`;
    });
    builder.addCase(getHistoricalJobOpportunity.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default PredictSlice.reducer;
