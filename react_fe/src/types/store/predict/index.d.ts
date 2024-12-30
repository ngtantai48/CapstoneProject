declare namespace Types {
  interface IJobOpportunityResponse {
    historical: number[];
    prediction: number[];
  }

  interface IData {
    city: string;
    values: number[];
  }
  interface IJobHistory {
    labels: string[];
    data: IData[];
  }

  interface IPredictState {
    actionType: string;
    loading: boolean;
    jobOpportunity: number[];
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jobHistorical: IJobHistory;
  }
}
