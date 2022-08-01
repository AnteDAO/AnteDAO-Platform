import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import STAKING_POOL_ABI from '../../../abi/StakingPool.json';
import { alertFailure, alertSuccess } from '../../../store/actions/alert';
import { getContract } from '../../../utils/contract';



const useLinearStake = (
  poolAddress: string | null | undefined,
  poolId: number | null | undefined,
  amount: string | null | undefined,
) => {
  const [tokenStakeLoading, setTokenStakeLoading] = useState<boolean>(false);
  const [stakeError, setStakeError] = useState<any>("");
  
  const [transactionHash, setTransactionHash] = useState("");
  const dispatch = useDispatch();

  const { library, account } = useWeb3React();

  const linearStakeToken = useCallback(async () => {
    setTransactionHash("");

    try {
      if (poolAddress && ethers.utils.isAddress(poolAddress)) {
        setTokenStakeLoading(true);

        const contract = getContract(poolAddress, STAKING_POOL_ABI, library, account as string);

        if (contract && amount) {
          const transaction = await contract.deposit(poolId, ethers.utils.parseEther(amount));
          console.log('Stake Token', transaction);

          setTransactionHash(transaction.hash);

          await transaction.wait(1);

          dispatch(alertSuccess('Transaction completed. It will need a couple of minutes for you Tier to upgrade'));
          setTokenStakeLoading(false);
          return true
        }
      }
    } catch (err: any) {
      console.log('[ERROR] - useLinearStake:', err);
      setStakeError(err)
      if (err?.code === -32603) {
        const errMessage = err?.data?.message.split(':')
        dispatch(alertFailure(errMessage[2] ? errMessage[2] : errMessage[1]));
        setTokenStakeLoading(false);
        return;
      }
      if (err.code === 4001) {
        dispatch(alertFailure('Transaction reject'));
        setTokenStakeLoading(false);
        return;
      }
    
      
      dispatch(alertFailure('Transaction rejected!'));
      setTokenStakeLoading(false);
      throw new Error(err.message);
    }
  }, [poolAddress, poolId, amount, library, account, dispatch]);

  return {
    tokenStakeLoading,
    linearStakeToken,
    setTokenStakeLoading,
    transactionHash,
    stakeError
  }
}

export default useLinearStake;
