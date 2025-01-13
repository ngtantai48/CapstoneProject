declare namespace Types {
  interface IImage {
    description: string;
    src: string;
  }
  interface IDataPostResponse {
    id: number;
    title: string;
    time: string;
    city: string;
    age: string;
    sexual: string;
    probationTime: string;
    workWay: string;
    right: string;
    company: string;
    job: string;
    place: string;
    numberEmployees: string;
    experience: string;
    level: string;
    salary: string;
    education: string;
    description: string;
    requirements: string;
    deadline: string;
    images: IImage[];
    link: string;
    type: string;
    contact: string;
    status: string;
  }
  interface IAllPostResponse {
    error?: boolean;
    message: string;
    data: IDataPostResponse[];
    code: number;
    result?: ILoginResultProperty;
    timestamp?: number;
    stack?: string;
    totalSize?: number;
  }
  interface IGetPostByIDRequest {
    id: string;
  }
  interface IGetPostByIdResponse {
    error?: boolean;
    message: string;
    data: IDataPostResponse;
    code: number;
    result?: ILoginResultProperty;
    timestamp?: number;
    stack?: string;
  }
  interface IGetAllPostRequest {
    page?: number;
    limit?: number;
    search?: string;
    address?: string;
    major_category_id?: number;
  }
  interface ISearchPost {
    search?: string;
    location?: string;
    major?: string;
    salary?: string;
    rank?: string;
  }
  interface IUpdateStatus {
    id: number;
    status: string;
  }
}
