import { BigNumber } from 'bignumber.js';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useTypedSelector } from '../../../hooks/useTypedSelector';


import { getContractInstance, SmartContractMethod } from '../../../services/web3';

import STAKING_POOL_ABI from '../../../abi/StakingPool.json';

const useStakeFee  = (
  pool: any,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feeValue, setFeeValue] = useState<any>('0');
  const [stakeStatus, setStakeStatus] = useState<boolean>(false);
  const [unstakeStatus, setUnstakeStatus] = useState<boolean>(false);
  const { appChainID }  = useSelector((state: any) => state.appNetwork).data;
  const connector  = useTypedSelector((state: any) => state.connector).data;
  const { account } = useWeb3React();

  const fetchStakeFee = useCallback(async() => {

    try {
      if(!pool && !pool.pool_id && !pool.pool_address) return;
      setLoading(true);

      const contract = pool.pool_address && getContractInstance(STAKING_POOL_ABI, pool.pool_address, connector, appChainID, SmartContractMethod.Read, false);
      if (!contract) {
        return;
      }
      const feeValueRaw =  await contract?.methods._treasuryFee().call();
      const feeDepositEnabled =  await contract?.methods.feeDepositEnabled().call();
      const feeUnstakeEnabled =  await contract?.methods.feeUnstakeEnabled().call();
      setFeeValue(new BigNumber(feeValueRaw).div(Math.pow(10, 2)).toString() );
      setStakeStatus(feeDepositEnabled)
      setUnstakeStatus(feeUnstakeEnabled)
      setLoading(false);
    } catch (err: any) {
      console.log('[ERROR] - fetchStakeFee:', err);
      setLoading(false);
      throw new Error(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, account]);

  useEffect(()=>{
    fetchStakeFee()
  }, [fetchStakeFee])

  return {
    loading,
    fetchStakeFee,
    feeValue,
    stakeStatus,
    unstakeStatus
  }
}

export default useStakeFee;
