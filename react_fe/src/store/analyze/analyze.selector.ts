import { getUserAnalyze, getCrawlAnalyze } from './analyze.action';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export const useAnalyze = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, actionType, userAnalyze, crawlAnalyze } = useSelector(
    (state: Types.IStoreState) => state.analyze,
    shallowEqual,
  );
  const onGetUserAnalyze = useCallback(async () => {
    return await dispatch(getUserAnalyze());
  }, [dispatch]);
  const onGetCrawlAnalyze = useCallback(async () => {
    return await dispatch(getCrawlAnalyze());
  }, [dispatch]);

  return {
    onGetUserAnalyze,
    onGetCrawlAnalyze,
    userAnalyze,
    crawlAnalyze,
    loading,
    actionType,
  };
};
