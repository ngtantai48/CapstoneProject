import moment from 'moment';

export const handleConvertTimestampToDate = (timestamp: string, type: string = 'MINI') => {
  if (!timestamp) return;
  if (type === 'MINI') return moment(Number(timestamp)).locale('vi').format('DD/MM/YYYY');
  return moment(Number(timestamp)).locale('vi').format('DD/MM/YYYY HH:mm');
};
