declare namespace Types {
  interface IStoreState {
    auth: Reducer<IAuthState>;
    post: Reducer<IPostState>;
    user: Reducer<IUserState>;
    analyze: Reducer<IAnalyzeState>;
    predict: Reducer<IPredictState>;
  }
}
