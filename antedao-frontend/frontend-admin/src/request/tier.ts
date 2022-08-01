import { BaseRequest } from "./Request";

export const getTiers = async (campaignId: any) => {
  const baseRequest = new BaseRequest();

  let url = `/pool/${campaignId}/tiers`;
  const response = await baseRequest.get(url) as any;
  const resObject = await response.json();

  return resObject;
};

export const getTiersSetting = async () => {
  const baseRequest = new BaseRequest();

  let url = `/get-tiers`;
  const response = await baseRequest.get(url) as any;
  const resObject = await response.json();

  return resObject;
};

export const updateTiersSetting = async (data: any) => {
  const {tier,...otherData} = data
  const baseRequest = new BaseRequest();

  let url = `admin/tier-setting/${tier}`;
  const response = await baseRequest.put(url, otherData) as any;
  const resObject = await response.json();
  return resObject;
};