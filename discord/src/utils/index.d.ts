import { HeadersInit } from "node-fetch";

export enum RequestMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DEL = "DELETE"
}

export interface RequestConfig {
  url: string;
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: Object;
}

export interface EtherScan {
  status: string,
  message: string,
  result: Array<Contract>
}

export interface Contract {
  SourceCode: string,
  ABI:string,
  ContractName: string,
  CompilerVersion:string,
  OptimizationUsed:string,
  Runs:string,
  ConstructorArguments:string,
  EVMVersion:string,
  Library:string,
  LicenseType:string,
  Proxy:string,
  Implementation:string,
  SwarmSource:string
}


