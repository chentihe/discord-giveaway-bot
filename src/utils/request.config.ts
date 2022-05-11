export enum RequestMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DEL = "DELETE"
}

export interface RequestConfig {
  url: string;
  method?: RequestMethod;
  headers?: any;
  body?: Object;
}