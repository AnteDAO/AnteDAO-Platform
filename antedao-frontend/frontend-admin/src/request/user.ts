import { apiRoute } from "../utils";
import { BaseRequest } from "./Request";
const queryString = require('query-string');

export const getUserList = async (queryParams: any) => {
  const baseRequest = new BaseRequest();
  let url = apiRoute(`/users`);
  url += '?' + queryString.stringify(queryParams);

  const response = await baseRequest.get(url) as any;
  const resObject = await response.json();

  return resObject;
};

export const reloadCachedUserList = async () => {
  const baseRequest = new BaseRequest();
  let url = apiRoute(`/users/reload`);

  const response = await baseRequest.get(url) as any;
  const resObject = await response.json();

  return resObject;
};

export const setBonusPointUser = async (param: {walletAddress: string, bonusPoint: number}) => {
  const baseRequest = new BaseRequest();
  let url = `/reputation/bonus/${param.walletAddress}`;

  const response = await baseRequest.put(url, {point: param.bonusPoint}) as any;
  const resObject = await response.json();

  return resObject;
};