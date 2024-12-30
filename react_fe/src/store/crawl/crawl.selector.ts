import { crawlVieclam24h, crawlFacebook } from './crawl.action';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '..';

export const useCrawl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, actionType, logVieclam24h } = useSelector(
    (state: Types.IStoreState) => state.post,
    shallowEqual,
  );

  const onCrawlVieclam24h = useCallback(async () => {
    return await dispatch(crawlVieclam24h());
  }, [dispatch]);

  const onCrawlFacebook = useCallback(async () => {
    return await dispatch(crawlFacebook());
  }, [dispatch]);

  return {
    onCrawlVieclam24h,
    onCrawlFacebook,
    logVieclam24h,
    loading,
    actionType,
  };
};
