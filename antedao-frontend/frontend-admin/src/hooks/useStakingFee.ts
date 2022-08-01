/* eslint-disable react-hooks/exhaustive-deps */
import { BigNumber } from 'bignumber.js';
import { ContractCallContext, Multicall } from "ethereum-multicall";
import { useCallback, useEffect, useState } from 'react';
import { convertHexToDecimal } from '../utils/converHex';
import stakingPoolABI from './../abi/Staking/StakingPool.json';
import { getWeb3Instance } from './../services/web3';

const SP_ADDRESS = process.env.REACT_APP_STAKING_CONTRACT

const useStakingFee = () => {
  const multicall = new Multicall({
    web3Instance: getWeb3Instance(),
    tryAggregate: true,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [stakeStatus, setStakeStatus] = useState<boolean>(false);
  const [unstakeStatus, setUnstakeStatus] = useState<boolean>(false);
  const [feeValue, setFeeValue] = useState<any>('0');
  const [treasuryAddress, setTreasuryAddress] = useState<any>('');

  const fetchStakingFee = useCallback(async () => {

    try {
      setLoading(true)
      const contractCallcontext: ContractCallContext[] = [
        {
          reference: "feeDepositEnabled",
          contractAddress: SP_ADDRESS as string,
          abi: stakingPoolABI,
          calls: [
            {
              reference: "feeDepositEnabled",
              methodName: "feeDepositEnabled",
              methodParameters: [],
            },
          ],
        },
        {
          reference: "feeUnstakeEnabled",
          contractAddress: SP_ADDRESS as string,
          abi: stakingPoolABI,
          calls: [
            {
              reference: "feeUnstakeEnabled",
              methodName: "feeUnstakeEnabled",
              methodParameters: [],
            },
          ],
        },
        {
          reference: "feeVAlueRaw",
          contractAddress: SP_ADDRESS as string,
          abi: stakingPoolABI,
          calls: [
            {
              reference: "feeVAlueRaw",
              methodName: "_treasuryFee",
              methodParameters: [],
            },
          ],
        },
        {
          reference: "_treasuryAddress",
          contractAddress: SP_ADDRESS as string,
          abi: stakingPoolABI,
          calls: [
            {
              reference: "_treasuryAddress",
              methodName: "_treasury",
              methodParameters: [],
            },
          ],
        },
      ];
      const result = await multicall.call(contractCallcontext);
      const feeVAlueRaw = convertHexToDecimal(result.results.feeVAlueRaw.callsReturnContext[0].returnValues[0].hex).toString()
      setStakeStatus(result.results.feeDepositEnabled.callsReturnContext[0].returnValues[0]);
      setUnstakeStatus(result.results.feeUnstakeEnabled.callsReturnContext[0].returnValues[0]);
      setFeeValue(new BigNumber(feeVAlueRaw).multipliedBy(10 ** 18));
      setTreasuryAddress(result.results._treasuryAddress.callsReturnContext[0].returnValues[0])
      setLoading(false)
      return {
        stakeFeeStatus: result.results.feeDepositEnabled.callsReturnContext[0].returnValues[0],
        unstakeFeeStatus: result.results.feeUnstakeEnabled.callsReturnContext[0].returnValues[0],
        feeVAlueRaw: new BigNumber(feeVAlueRaw).multipliedBy(10 ** 18),
        treasuryAddress: result.results._treasuryAddress.callsReturnContext[0].returnValues[0]
      }
    } catch (err: any) {
      console.log('ERROR: ', err);
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchStakingFee()
  }, [fetchStakingFee])

  return {
    loading,
    fetchStakingFee,
    stakeStatus,
    unstakeStatus,
    feeValue,
    treasuryAddress
  }
}

export default useStakingFee;