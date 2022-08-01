import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';

import { TRANSACTION_ERROR_MESSAGE } from '../../../constants/alert';
import { alertSuccess, alertFailure } from '../../../store/actions/alert';
import { getContract } from '../../../utils/contract';

import STAKING_POOL_ABI from '../../../abi/StakingPool.json';


const useLinearUnstake = (
  poolAddress: string | null | undefined,
  poolId: number | null | undefined,
  amount: string | null | undefined,
) => {
  const [tokenUnstakeLoading, setTokenUnstakeLoading] = useState<boolean>(false);
  const [unStakeError, setUnStakeError] = useState<any>("");
  const [unStaketransactionHash, setTransactionHash] = useState("");
  const dispatch = useDispatch();

  const { library, account } = useWeb3React();

    const linearUnstakeToken = useCallback(async () => {
      setTransactionHash("");

      try {
        if (poolAddress && ethers.utils.isAddress(poolAddress)) {
            setTokenUnstakeLoading(true);

             const contract = getContract(poolAddress, STAKING_POOL_ABI, library, account as string);

             if (contract && amount) {
               
               const transaction = await contract.unstake(poolId, ethers.utils.parseEther(amount));
               console.log('Unstaked Token', transaction);

              setTransactionHash(transaction.hash);

               await transaction.wait(1);

              dispatch(alertSuccess("Transaction completed"));
              setTokenUnstakeLoading(false);
              return true
             }
           }
      } catch (err: any) {
        console.log('[ERROR] - useLinearUnstake:', err);
        setUnStakeError(err)
        if(err.code === 4001) {          
          dispatch(alertFailure("Transaction reject"));
          setTokenUnstakeLoading(false);
          return;
        }
        dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
        setTokenUnstakeLoading(false);
        throw new Error(err.message);
      }
  }, [poolAddress, poolId, amount, library, account, dispatch]);

  return {
    tokenUnstakeLoading,
    linearUnstakeToken,
    setTokenUnstakeLoading,
    unStaketransactionHash,
    unStakeError
  }
}

export default useLinearUnstake;
