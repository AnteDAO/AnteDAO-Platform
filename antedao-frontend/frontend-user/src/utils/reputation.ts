import axiosWithBaseUrl from "../services/axios";

export const getUserReputationHistories = async (connectedAccount: string) => {
  const responseReputations: any = await axiosWithBaseUrl.get(`/reputation/histories/${connectedAccount}?hideZeroTx=false&page=1&limit=1000000`)
    .catch((e) => {
      return {};
    });
  if (responseReputations?.status === 200) {
    if (responseReputations?.data?.status === 200) {
      return responseReputations?.data?.data || {};
    }
  }
  return {};
};

export const calculateTotalReputationPoint = async (connectedAccount: string) => {
  const reputationHistories: any = await getUserReputationHistories(connectedAccount);
  return reputationHistories?.rkpFromStaked || 0;
};
