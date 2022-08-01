import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useTypedSelector } from '../../../hooks/useTypedSelector';


import { getContractInstance, SmartContractMethod } from '../../../services/web3';

import STAKING_POOL_ABI from '../../../abi/StakingPool.json';

const useDetailListStakingPool = (
  poolsList: Array<any> | null | undefined,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [linearPools, setLinearPools] = useState({});
  const { appChainID }  = useSelector((state: any) => state.appNetwork).data;
  const connector  = useTypedSelector((state: any) => state.connector).data;
  const { account,chainId } = useWeb3React();

  const fetchDetailList = useCallback(async() => {
    try {
      if(!poolsList || !poolsList?.length) {
        return;
      }
      
      setLoading(true);

      let linears = {};
      for (const pool of poolsList) {
        if (!pool?.pool_address || !ethers.utils.isAddress(pool?.pool_address)) {
          continue;
        }

        const contract = getContractInstance(STAKING_POOL_ABI, pool.pool_address, connector, appChainID, SmartContractMethod.Read, false);

        if (!contract) {
          continue;
        }

        // const linearAcceptedToken = await contract.methods.linearAcceptedToken().call();
        
        
        // const linearData = await contract.methods.linearPoolInfo(BigNumber.from(pool.pool_id)).call();
        let linearPendingReward = "0",
         linearUserInfo,linearAcceptedToken,linearData;
 
        if (account) {
          [linearUserInfo, linearPendingReward,linearAcceptedToken,linearData] = await Promise.all([
            contract.methods.linearStakingData(BigNumber.from(pool.pool_id), account).call(),
            contract.methods.linearPendingReward(BigNumber.from(pool.pool_id), account).call(),
            contract.methods.linearAcceptedToken().call(),
            contract.methods.linearPoolInfo(BigNumber.from(pool.pool_id)).call()
          ])
        }

        linears = {
          ...linears,
          [pool.id]: {
            ...pool,
            acceptedToken: linearAcceptedToken,
            totalStaked: linearData?.totalStaked, 
            minInvestment: linearData?.minInvestment, 
            APR: linearData?.APR, 
            lockDuration: linearData?.lockDuration, 
            delayDuration: linearData?.delayDuration, 
            startJoinTime: linearData?.startJoinTime, 
            endJoinTime: linearData?.endJoinTime,
            stakingAmount: linearUserInfo?.balance || "0",
            stakingJoinedTime: linearUserInfo?.joinTime || "0",
            pendingReward: linearPendingReward,
            pendingWithdrawal: {
              amount:  "0",
              applicableAt: "0",
            }
          }
        }
      }
      setLinearPools(linears);
      setLoading(false);
    } catch (err: any) {
      console.log('[ERROR] - useTokenAllowance:', err);
      setLoading(false);
      throw new Error(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolsList, account,chainId]);

  useEffect(()=>{
    fetchDetailList()
  }, [fetchDetailList])

  return {
    loading,
    fetchDetailList,
    linearPools,
  }
}

export default useDetailListStakingPool;
