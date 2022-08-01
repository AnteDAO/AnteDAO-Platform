import BigNumber from "bignumber.js";
import _ from "lodash";
import moment from "moment";
import {
  ACCEPT_CURRENCY,
  POOL_IS_PRIVATE, TOKEN_STAKE_SYMBOLS
} from "../constants";
import { getRateSettings } from "../request/rate";
import { BaseRequest } from '../request/Request';
import { convertFromWei, getPoolContract } from "../services/web3";
import { formatRoundUp, numberWithCommas } from "./formatNumber";
import { calculateTotalReputationPoint } from "./reputation";
import { getIconCurrencyUsdt } from "./usdt";

export const checkIsFinishTime = (campaignDetail: any): boolean => {
  const closeTime = _.get(campaignDetail, "closeTime", "");
  let isFinish = false;
  if (closeTime) {
    const closeTimeDate = moment.unix(parseInt(closeTime)).toDate();
    const currentDate = new Date();
    if (currentDate >= closeTimeDate) {
      isFinish = true;
    }
  }

  return isFinish;
};

export const getTokenRemainingCanBuy = (campaignDetail: any): string => {
  if (!campaignDetail) return "0";
  const tokenLeft = _.get(campaignDetail, "tokenLeft", 0);
  const tokenClaimed = _.get(campaignDetail, "tokenClaimed", 0);
  let remainTokenAvailable = new BigNumber(tokenLeft).plus(tokenClaimed);

  return remainTokenAvailable.toFixed();
};

export const checkIsBetweenCloseTimeAndReleaseTime = (
  campaignDetail: any
): boolean => {
  const closeTime = _.get(campaignDetail, "closeTime", "");
  const releaseTime = _.get(campaignDetail, "releaseTime", "");

  let isBetween = false;
  if (closeTime && releaseTime) {
    const closeTimeDate = moment.unix(parseInt(closeTime)).toDate();
    const releaseTimeDate = moment.unix(parseInt(releaseTime)).toDate();
    const currentDate = new Date();
    if (closeTimeDate <= currentDate && currentDate < releaseTimeDate) {
      isBetween = true;
    }
  }

  return isBetween;
};

export const getAccessPoolText = (pool: any) => {
  if (!pool) return "";
  if (Number(pool.is_private) === POOL_IS_PRIVATE.VC) {
    return "VC";
  }
  return "Market";
};

export const calculateTokenSoldWhenFinish = (
  totalSoldCoin: string | number
) => {
  const result = new BigNumber(totalSoldCoin)
    .toFixed();
  return result;
};

export const getProgressWithPools = (pool: any) => {
  if (!pool) {
    return {
      progress: "0",
      tokenSold: "0",
      totalSoldCoin: "0",
    };
  }
  const totalSoldCoin = Number(pool.total_sold_coin || pool.totalSoldCoin);
  const tokenSoldReal = Number(pool.token_sold || pool.tokenSold);
  const progressReal = tokenSoldReal / (totalSoldCoin || 1) * 100;
  const progressSetting = Number(pool.progress_display || pool.progressDisplay) || 0;
  const tokenSoldSetting = progressSetting / 100 * totalSoldCoin;

  const progress = Math.max(progressSetting, progressReal).toString();
  const tokenSold = Math.max(tokenSoldReal, tokenSoldSetting).toString();

  const isFinish = checkPoolIsFinish(pool);
  if (isFinish) {
    return {
      progress: "100",
      tokenSold: calculateTokenSoldWhenFinish(totalSoldCoin),
      totalSoldCoin: totalSoldCoin.toString(),
    };
  }
  return {
    progress,
    tokenSold,
    totalSoldCoin: totalSoldCoin.toString(),
  };
};

export const checkPoolIsFinish = (pool: any) => {
  const currentTime = moment().unix();
  return pool.finish_time && currentTime > pool.finish_time;
};

export const getTokenSold = async (pool: any) => {
  let result = "0";
  try {
    const networkAvailable = pool.network_available || pool.networkAvailable;
    const poolHash = pool.campaign_hash || pool.campaignHash;
    if (poolHash === "Token contract not available yet." || !poolHash) {
      return "0";
    }

    const contract = getPoolContract({ networkAvailable, poolHash });

    if (contract) {
      result = await contract.methods.tokenSold().call();
      result = convertFromWei(result.toString());
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};


export const getRateSettingAPI = async () => {
  const rateAPIResponse = await getRateSettings();
  let rateSettings: any = {};
  // @ts-ignore
  if (rateAPIResponse?.status === 200) {
    // @ts-ignore
    rateSettings = rateAPIResponse?.data || {};
  }
  return rateSettings;
};



export const mappingRateSettingArrayToObject = (rateSettings: any) => {
  const rateObject: any = {
    spkf_rate: 1,
    lp_pkf_rate: 1,
    epkf_rate: 1,
  };
  if (!rateSettings || rateSettings.length === 0) {
    return rateObject;
  }

  for (let i = 0; i < rateSettings.length; i++) {
    const rate = rateSettings[i];
    if (rate.symbol === TOKEN_STAKE_SYMBOLS.ANTE) {
      rateObject.spkf_rate = rate.rate || 1;
    }
  }

  return rateObject;
};

export const getTokenStakeAPIInfo = async (address: string) => {
  let result = {};
  const baseRequest = new BaseRequest();
  const response = await baseRequest.get(`/user/tier-info?wallet_address=${address}`) as any;
  const resObj = await response.json();

  let stakedInfo;
  let userTier = 0;
  if (resObj.status && resObj.status === 200 && resObj.data) {
    stakedInfo = resObj?.data?.stakedInfo || {};
    userTier = resObj?.data?.tier || 0;
  }

  const stakedPkf = convertFromWei(stakedInfo?.rawStakedPkf || '0');
  const stakedUni = convertFromWei(stakedInfo?.rawStakedUni || '0');
  const epkfStaked = convertFromWei(stakedInfo?.rawEPkf || '0');
  const reputation = convertFromWei(stakedInfo?.rawReputation || '0');

  result = {
    ...result,
    pkfStaked: stakedPkf,
    uniStaked: stakedUni,
    ePkf: epkfStaked,
    reputation: reputation,
  };

  // Calculate with Rate Setting:


  const totalStaked = convertFromWei(stakedInfo?.totalPoints || "0");

  result = {
    ...result,
    totalStaked: totalStaked,
  };

  return {
    tokenStakes: result,
    userTier: userTier
  };
};

export const getTokenStakeSmartContractInfo = async (
  contract: any,
  address: string
) => {
  let result = {};
  const resultPkf = await contract?.methods
    .userInfo(address, process.env.REACT_APP_ANTE)
    .call();
  const stakedPkf = convertFromWei(resultPkf.staked);



  result = {
    ...result,
    resultPkf: resultPkf,
    pkfStaked: stakedPkf,
    ePkf: 0,
  };

  // Calculate with Rate Setting:


  // Calculate total Reputation Point
  const totalReputationPoint = await calculateTotalReputationPoint(address);

  // Calculate totak stake balance
  const totalStaked = new BigNumber(stakedPkf)
    .plus(totalReputationPoint)
    .toFixed();

  result = {
    ...result,
    totalStaked: totalStaked,
  };

  return {
    tokenStakes: result,

  };
};

export const findUserTier = async (contract: any, address: string) => { };

/**
 * Functions: Total Raise
 */
export const getTotalRaiseByPool = (pool: any) => {
  let totalRaise = "0";
  let currencySymbol = "$";
  if (!pool) {
    return { totalRaise, currencySymbol }
  }

  let poolStatus = pool?.poolStatus || pool?.campaign_status;
  if (poolStatus === "TBA" || poolStatus === "Upcoming" || poolStatus === "Swap") {
    const rateUsdPrice = (pool.purchasableCurrency || pool.accept_currency) === ACCEPT_CURRENCY.ETH
      ? pool.priceUsdt || pool.price_usdt || 0
      : pool.ethRate || pool.token_conversion_rate || 0;

    currencySymbol = "$";
    totalRaise = new BigNumber(pool?.amount || pool?.total_sold_coin || 0)
      .multipliedBy(rateUsdPrice)
      .toFixed();

    totalRaise = formatRoundUp(new BigNumber(totalRaise), 2); // Round up with 0 decimal place

  } else if (poolStatus === "Filled" || poolStatus === "Claimable" || poolStatus === "Ended") {
    const totalSoldCoin = pool?.totalSoldCoin || pool?.total_sold_coin || 0;
    const networkAvailable = pool?.network_available || pool?.networkAvailable;

    // currencySymbol = ((pool.purchasableCurrency || pool.accept_currency) + "").toUpperCase();
    currencySymbol = "$";
    totalRaise = formatRoundUp(
      new BigNumber(totalSoldCoin).multipliedBy(pool.ethRate || pool.token_conversion_rate || 0)
    );
    // totalRaise = calculateTokenSoldWhenFinish(totalRaise);
    totalRaise = formatRoundUp(new BigNumber(totalRaise));

    const { currencyName } = getIconCurrencyUsdt({
      ...pool,
      purchasableCurrency: currencySymbol,
      networkAvailable,
    });
    currencySymbol = currencyName;
  }

  return {
    totalRaise,
    currencySymbol,
  };
};

export const showTotalRaisePrice = (pool: any) => {
  const { totalRaise, currencySymbol } = getTotalRaiseByPool(pool);
  return `${currencySymbol}${numberWithCommas(totalRaise)} `;
};
