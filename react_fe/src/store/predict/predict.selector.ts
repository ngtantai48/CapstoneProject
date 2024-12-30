import { getPredictJobOpportunity, getHistoricalJobOpportunity } from './predict.action';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export const usePredict = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, actionType, jobOpportunity, label, jobHistorical } = useSelector(
    (state: Types.IStoreState) => state.predict,
    shallowEqual,
  );
  const onGetPredictJobOpportunity = useCallback(
    async (payload: Types.IJobPredictRequest) => {
      return await dispatch(getPredictJobOpportunity(payload));
    },
    [dispatch],
  );
  const onGetHistoricalJobOpportunity = useCallback(async () => {
    return await dispatch(getHistoricalJobOpportunity());
  }, [dispatch]);

  return {
    onGetPredictJobOpportunity,
    onGetHistoricalJobOpportunity,
    jobOpportunity,
    jobHistorical,
    label,
    loading,
    actionType,
  };
};
