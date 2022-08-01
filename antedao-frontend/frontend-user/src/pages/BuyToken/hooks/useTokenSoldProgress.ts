import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getPoolContract } from '../../../services/web3';
import {getProgressWithPools} from "../../../utils/campaign";

const useTokenSoldProgress = (poolAddress: string | undefined, totalTokens: number | undefined, networkAvailable: string | undefined, poolDetails: any = {}) => {
  const [soldProgress, setSoldProgress] = useState<string>("0");
  const [tokenSold, setTokenSold] = useState<string>("0");

  const { appChainID }  = useTypedSelector(state  => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  useEffect(() => {
    const calSoldProgress = async () => {
      if (poolAddress && networkAvailable && totalTokens && ethers.utils.isAddress(poolAddress)) {
        // const poolContract = getContractInstance(
        //   Pool_ABI,
        //   poolAddress,
        //   connector,
        //   appChainID,
        //   SmartContractMethod.Read,
        //   networkAvailable === 'eth'
        // );

        const poolContract = getPoolContract({ networkAvailable, poolHash: poolAddress });

        if (poolContract) {
          const tokensSold = await poolContract.methods.tokenSold().call();
          let tokensSoldCal = new BigNumber(tokensSold).div(new BigNumber(10).pow(18)).toFixed();
          let { progress, tokenSold } = getProgressWithPools({
            ...poolDetails,
            token_sold: tokensSoldCal,
            tokenSold: tokensSoldCal,
            total_sold_coin: totalTokens,
            totalSoldCoin: totalTokens,
            finish_time: poolDetails.finish_time || poolDetails.endBuyTime,
          });

          setTokenSold(new BigNumber(tokenSold).decimalPlaces(2, BigNumber.ROUND_HALF_DOWN).toFixed(2, BigNumber.ROUND_HALF_DOWN));
          setSoldProgress(new BigNumber(progress).decimalPlaces(2, BigNumber.ROUND_HALF_DOWN).toFixed(2, BigNumber.ROUND_HALF_DOWN));
        }
      }
    };

    if (!poolAddress) {
      let { progress, tokenSold } = getProgressWithPools({
        ...poolDetails,
        token_sold: 0,
        total_sold_coin: totalTokens,
        finish_time: poolDetails.finish_time || poolDetails.endBuyTime,
      });
      setTokenSold(new BigNumber(tokenSold).decimalPlaces(2, BigNumber.ROUND_HALF_DOWN).toFixed(2, BigNumber.ROUND_HALF_DOWN));
      setSoldProgress(new BigNumber(progress).decimalPlaces(2, BigNumber.ROUND_HALF_DOWN).toFixed(2, BigNumber.ROUND_HALF_DOWN));
    }

    let soldProgressInterval: NodeJS.Timer | undefined = undefined;
    if (poolAddress && networkAvailable) {
      calSoldProgress();
      soldProgressInterval = setInterval(() => calSoldProgress(), 20000);
    }

    return () => {
      soldProgressInterval && clearInterval(soldProgressInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolAddress, appChainID, connector, networkAvailable, totalTokens]);

  return {
    tokenSold,
    soldProgress
  }
}


export default useTokenSoldProgress;
