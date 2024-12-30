declare namespace Types {
  interface IPostState {
    actionType: string;
    loading: boolean;
    postsList: IDataPostResponse[];
    postData: IDataPostResponse | undefined;
    postDataSearch: IDataPostResponse[] | [];
    postTotalSize: number | undefined;
    postAdmin: IDataPostResponse[] | [];
  }
}
