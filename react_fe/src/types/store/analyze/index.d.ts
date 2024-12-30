declare namespace Types {
  interface IAnalyzeData {
    total: number;
    month: string;
  }
  interface IAnalyzeState {
    actionType: string;
    loading: boolean;
    userAnalyze: Array<IAnalyzeData> | [];
    crawlAnalyze: Array<IAnalyzeData> | [];
  }
}
