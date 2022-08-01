import { BigNumber } from 'bignumber.js';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useTypedSelector } from '../../../hooks/useTypedSelector';


import { getContractInstance, SmartContractMethod } from '../../../services/web3';

import STAKING_POOL_ABI from '../../../abi/StakingPool.json';

const useStakePoolDetail = (
  pool: any,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stakingPool, setStakingPool] = useState({});
  const [minimumStake, setMinimumStake] = useState("0");
  const [unStakeFee, setUnStakeFee] = useState<any>("0");
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const connector = useTypedSelector((state: any) => state.connector).data;
  const { account } = useWeb3React();

  const fetchStakingPoolDetail = useCallback(async () => {

    try {
      if (!pool && !pool.pool_id) {
        return;
      }

      setLoading(true);

      const contract = getContractInstance(STAKING_POOL_ABI, pool.pool_address, connector, appChainID, SmartContractMethod.Read, false);
      if (!contract) {
        return;
      }
      const poolDetail = pool.pool_id !== undefined && await contract.methods.linearPoolInfo(pool.pool_id.toString()).call();
      const stakingData = account && pool.pool_id !== undefined && await contract.methods.linearStakingData(pool.pool_id.toString(), account).call();

      const minStakeDefault = poolDetail.minInvestment ? new BigNumber(poolDetail.minInvestment.toString()).div(Math.pow(10, 18)).toString() : "0";
      const minStake = stakingData?.userMinInvestment ? new BigNumber(stakingData.userMinInvestment.toString()).div(Math.pow(10, 18)).toString() : "0";
      setStakingPool(poolDetail);
      new BigNumber(minStake).gt(0) ? setMinimumStake(minStake) : setMinimumStake(minStakeDefault);
      
      setUnStakeFee(new BigNumber(poolDetail?.unstakeFee).div(Math.pow(10, 2)) )
      setLoading(false);
    } catch (err: any) {
      console.log('[ERROR] - fetchStakingPoolDetail:', err);
      setLoading(false);
      throw new Error(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, account]);

  useEffect(() => {
    fetchStakingPoolDetail()
  }, [fetchStakingPoolDetail])

  return {
    loading,
    fetchStakingPoolDetail,
    stakingPool,
    minimumStake,
    unStakeFee

  }
}

export default useStakePoolDetail;
