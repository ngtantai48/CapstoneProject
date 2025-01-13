declare namespace Types {
  enum ECity {
    'Hà Nội',
    'Đà Nẵng',
    'Hồ Chí Minh',
  }
  interface IJobPredictRequest {
    job: string;
    city: string;
    future_periods?: number;
  }
}
