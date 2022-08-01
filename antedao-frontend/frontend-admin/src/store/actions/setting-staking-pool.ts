import BigNumber from 'bignumber.js';
import StakingPoolABI from '../../abi/Staking/StakingPool.json';
import { getContractInstance } from '../../services/web3';
import { alertFailure, alertSuccess } from './alert';


interface SettingStakingPool {
  minStake: number,
  lockDuration:number,
  earnReward:boolean,
  unStakeFee:number
  error?: any,
}
export const getSettingStakingPool = async (poolId:string): Promise<SettingStakingPool> => {
  
  try {
    const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_STAKING_CONTRACT || "";
    const contract = getContractInstance(StakingPoolABI, CONTRACT_FACTORY_ADDRESS);
    if (contract) {
      const result  =await contract.methods.linearPoolInfo(Number(poolId)).call();
      const minStakes = new BigNumber(Number(result.minInvestment)).div(Math.pow(10, 18)).toString();
      const unstakeFee = new BigNumber(Number(result.unstakeFee)).div(Math.pow(10, 2)).toString();
       return ({
         minStake: Number(minStakes),
         earnReward: result.extendedPeriod,
         lockDuration:result.lockDuration,
         unStakeFee:Number(unstakeFee) || 25
       })
    }
  } catch (error) {
      return ({
        minStake:0,
        lockDuration:0,
        earnReward:false,
        unStakeFee:25,
        error:error,
      })
    }
return ({
  minStake:0,
  lockDuration:0,
  earnReward:false,
  unStakeFee:25,
  error:true,
})
} 

export const updateStakingPool = async ( poolId:string, minStake:string, earnReward:boolean, unstakeFee:string, wallet_address:any, dispatch:any, setLoadingUpdate:any) => {
  try {
    const unstakeFees = new BigNumber(unstakeFee).multipliedBy(100);
    const minStakes = new BigNumber(minStake).multipliedBy(Math.pow(10, 18));
    const CONTRACT_STAKING_POOL_ADDRESS = process.env.REACT_APP_STAKING_CONTRACT || "";
    const contract = getContractInstance(StakingPoolABI, CONTRACT_STAKING_POOL_ADDRESS);
    if (contract) {
      setLoadingUpdate(true);
      await contract.methods.linearSetPool(Number(poolId), unstakeFees.toFixed(0) , minStakes.toFixed(0) , earnReward).send({from:wallet_address})
      dispatch(alertSuccess('Updated successfully!'))
    }
    setLoadingUpdate(false);
  } catch (err:any) {
    setLoadingUpdate(false);
    console.log(err);
    if(err.code === 4001){
      dispatch(alertFailure('Transaction rejected!'))
    } else {
      dispatch(alertFailure(err.message))
    }
    }
} 
