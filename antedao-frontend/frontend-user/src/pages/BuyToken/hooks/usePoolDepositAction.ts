import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Pool_ABI from '../../../abi/Pool.json';
import PreSalePool from '../../../abi/PreSalePool.json';
import { NETWORK } from '../../../constants';
import { TRANSACTION_ERROR_MESSAGE } from '../../../constants/alert';
import useWalletSignature from '../../../hooks/useWalletSignature';
import axios from "../../../services/axios";
import { alertFailure, alertSuccess } from '../../../store/actions/alert';
import { getContract } from '../../../utils/contract';
import useUserPurchaseSignature from '../hooks/useUserPurchaseSignature';


type PoolDepositActionParams = {
  poolAddress?: string;
  poolId?: number;
  purchasableCurrency: string;
  amount: string;
  isClaimable: boolean;
  networkAvailable: string;
  isInPreOrderTime: boolean;
  captchaToken: string;
}

const usePoolDepositAction = ({
  poolAddress,
  poolId,
  purchasableCurrency,
  amount,
  isClaimable,
  networkAvailable,
  isInPreOrderTime,
  captchaToken,
}: PoolDepositActionParams) => {
  const dispatch = useDispatch();

  const [depositError, setDepositError] = useState("");
  const [tokenDepositTransaction, setTokenDepositTransaction] = useState<string>("");
  const [tokenDepositLoading, setTokenDepositLoading] = useState<boolean>(false);
  const [tokenDepositSuccess, setTokenDepositSuccess] = useState<boolean>(false);

  const { account: connectedAccount, library } = useWeb3React();
  const { error, signMessage, signature: authSignature, setSignature } = useWalletSignature();
  const { signature, minBuy, maxBuy, error: buyError, setSignature: setUserPurchasedSignature } = useUserPurchaseSignature(connectedAccount, poolId, authSignature, captchaToken);

  // const { signature, minBuy, maxBuy, error: buyError, setSignature: setUserPurchasedSignature } =
  //   isInPreOrderTime
  //     ? useUserPreOrderSignature(connectedAccount, poolId, authSignature, isInPreOrderTime)
  //     : useUserPurchaseSignature(connectedAccount, poolId, authSignature);


  useEffect(() => {
    poolAddress &&
      purchasableCurrency &&
      signature &&
      minBuy &&
      maxBuy &&
      !depositError &&
      depositWithSignature(poolAddress, purchasableCurrency, amount, signature, `${minBuy}`, maxBuy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, poolAddress, purchasableCurrency, amount, minBuy, maxBuy, depositError]);


  useEffect(() => {
    if (error || buyError) {
      const errorMessage = error || buyError;
      setDepositError(errorMessage as string);
      setTokenDepositLoading(false);
      setSignature("");
      setUserPurchasedSignature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, buyError]);

  const depositWithSignature = useCallback(async (
    poolAddress: string,
    acceptCurrency: string,
    amount: string,
    signature: string,
    minBuy: string,
    maxBuy: string
  ) => {
    try {
      if (minBuy && maxBuy && signature && amount) {
        const abiUse = isClaimable ? PreSalePool : Pool_ABI;
        const poolContract = getContract(poolAddress, abiUse, library, connectedAccount as string);

        const method = acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission' : 'buyTokenByTokenWithPermission';
        let decimals = 6;
        const isBSC = networkAvailable === 'bsc';
        if (isBSC) {
          if (acceptCurrency === 'ETH') {
            decimals = 18;
          } else if (acceptCurrency === 'USDT') {
            decimals = 18;
          } else if (acceptCurrency === 'USDC') {
            decimals = 18;
          }else if (acceptCurrency === 'BUSD') {
            decimals = 18;
          }
          
        } else {
          if (acceptCurrency === 'ETH') {
            decimals = 18;
          } else if (acceptCurrency === 'USDT') {
            decimals = 6;
          } else if (acceptCurrency === 'USDC') {
            decimals = 6;
          }else if (acceptCurrency === 'BUSD') {
            decimals = 18;
          }
        }

        let buyCurr = 'ETH';
        switch (networkAvailable) {
          case NETWORK.BSC:
            if (acceptCurrency === "USDT") {
              buyCurr = process.env.REACT_APP_USDT_BSC_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "USDC") {
              buyCurr = process.env.REACT_APP_USDC_BSC_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "BUSD") {
              buyCurr = process.env.REACT_APP_BUSD_BSC_SMART_CONTRACT || '';
            }
            break;

          case NETWORK.POLYGON:
            if (acceptCurrency === "USDT") {
              buyCurr = process.env.REACT_APP_USDT_POLYGON_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "USDC") {
              buyCurr = process.env.REACT_APP_USDC_POLYGON_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "BUSD") {
              buyCurr = process.env.REACT_APP_BUSD_POLYGON_SMART_CONTRACT || '';
            }
            break;

          case NETWORK.ETHEREUM:
            if (acceptCurrency === "USDT") {
              buyCurr = process.env.REACT_APP_USDT_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "USDC") {
              buyCurr = process.env.REACT_APP_USDC_SMART_CONTRACT || '';
            }
            if (acceptCurrency === "BUSD") {
              buyCurr = process.env.REACT_APP_BUSD_SMART_CONTRACT || '';
            }
            break;
        }


        const params = acceptCurrency === 'ETH' ? [
          connectedAccount,
          connectedAccount,
          maxBuy,
          minBuy,
          signature,
          {
            value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
          }
        ]: [
          connectedAccount,
          // acceptCurrency === "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
          buyCurr,
          new BigNumber(amount).multipliedBy(10 ** decimals).toFixed(),
          connectedAccount,
          maxBuy,
          minBuy,
          signature
        ];

        // fake data for testing swap
        // const message = await poolContract.getMessageHash(
        //   connectedAccount,
        //   new BigNumber("6000").multipliedBy(10 ** 18).toFixed(),
        //   0
        // );
        
        // const sign = new Web3().eth.accounts.sign(message, "0x5bfd681d4e3f0beb5bc70ac8f2f58bf805e0a830c366118b1d350d4767a0e903").signature;

   
        // console.log('buyCurr',buyCurr);  
        // const params = acceptCurrency === 'ETH' ? [
        //   connectedAccount,
        //   connectedAccount,
        //   new BigNumber("6000").multipliedBy(10 ** 18).toFixed(),
        //   0,
        //   sign,
        //   {
        //     value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
        //   }
        // ] : [
        //   connectedAccount,
        //   // acceptCurrency === "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
        //   buyCurr,
        //   new BigNumber(amount).multipliedBy(10 ** decimals).toFixed(),
        //   connectedAccount,
        //   new BigNumber("6000").multipliedBy(10 ** 18).toFixed(),
        //   0,
        //   sign
        // ];

        console.log('params',params);
        
        // let overrides = fixGasLimitWithProvider(library, 'buy');
        const transaction = await poolContract[method](...params);

        setUserPurchasedSignature("");
        setSignature("");
        setTokenDepositTransaction(transaction.hash);

        if (isInPreOrderTime) {
          updatePreOrderAmount({ minBuy, maxBuy, signature, amount, connectedAccount });
        }

        await transaction.wait(1);

        dispatch(alertSuccess("Token Deposit Successful!"));
        setTokenDepositLoading(false);
        setTokenDepositSuccess(true);

      }
    } catch (err : any) {
      console.log('[ERROR] - depositWithSignature:', err);
      if(err?.code === -32603 && err?.data?.message.includes("transferFrom failed")){
        dispatch(alertFailure("Insufficient amount!"));
      }else{
        dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
      }
      
      setDepositError(TRANSACTION_ERROR_MESSAGE);
      setTokenDepositLoading(false);
      setSignature("");
      setUserPurchasedSignature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minBuy, maxBuy, poolAddress, isClaimable]);

  const updatePreOrderAmount = async (params: any) => {
    try {
      const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";
      const config = {
        headers: {
          msgSignature: MESSAGE_INVESTOR_SIGNATURE
        }
      }
      const response = await axios.post('/user/pre-order', {
        campaign_id: poolId,
        wallet_address: connectedAccount,
        signature: authSignature,
        amount,
      }, config);

      if (response.data && response.status && response.status === 200) {
        const { data, message, status } = response.data;
        if (data && status === 200) {
          console.log('Update PreOrder success.');
        }
        if (message && status !== 200) {
          console.log(message);
        }
      }
    } catch (e) {
      console.log('ERROR: Error when update PreOrder Amount: ', e)
    }
  };

  const deposit = useCallback(async () => {
    if (amount && new BigNumber(amount).gt(0) && poolAddress) {
      try {
        setTokenDepositTransaction("");
        setDepositError("");
        setTokenDepositLoading(true);
        setTokenDepositSuccess(false);

        await signMessage();
      } catch (err) {
        console.log('[ERROR] - deposit:', err);     
        dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
        setDepositError(TRANSACTION_ERROR_MESSAGE);
        setSignature("");
        setTokenDepositLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, library, poolAddress, amount])

  // const estimateFee = useCallback(async (amount: string, acceptCurrency: string) => {
  //   try {
  //     setEstimateFeeLoading(true);

  //     if (amount && new BigNumber(amount).gt(0) && poolAddress && acceptCurrency) {
  //       const gasPrice = await library.getGasPrice();
  //       const poolContract = getContract(poolAddress, Pool_ABI, library, connectedAccount as string);
  //       const gasPriceCal = new BigNumber(gasPrice._hex).div(new BigNumber(10).pow(18));

  //       const params = acceptCurrency === 'ETH' ? [
  //         connectedAccount,
  //         connectedAccount,
  //         "100000000000",
  //         "100000000000",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b",
  //         {
  //           value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
  //         }
  //       ]: [
  //         connectedAccount,
  //         acceptCurrency ===  "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
  //         new BigNumber(amount).multipliedBy(10 ** 18).toFixed(),
  //         connectedAccount,
  //         "100000000000",
  //         "299999999990",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b"
  //       ];

  //       const method = acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission': 'buyTokenByTokenWithPermission';

  //       const estimateFee = await poolContract.estimateGas[method](...params);

  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);

  //       return new BigNumber(estimateFee._hex).multipliedBy(gasPriceCal).toNumber();
  //     } else {
  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);
  //       return 0;
  //     }

  //   } catch(err) {
  //     console.error(err.message);
  //     setEstimateFeeLoading(false);
  //     setEstimateErr(err.message);
  //   }
  // }, [poolAddress, connectedAccount]);

  return {
    tokenDepositSuccess,
    deposit,
    tokenDepositLoading,
    tokenDepositTransaction,
    setTokenDepositTransaction,
    setTokenDepositLoading,
    depositError,
  };
}

export default usePoolDepositAction;
