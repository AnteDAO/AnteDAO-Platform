import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import axios from '../../../services/axios';
import { alertFailure } from '../../../store/actions/alert';
import useWalletSignature from '../../../hooks/useWalletSignature';
import { apiRoute } from '../../../utils';

type PoolDepositActionParams = {
  poolId?: number;
  connectedAccount?: string;
  poolDetails?: any;
}
export type ApplyData = {
  wallet_address: string;
  user_twitter: string;
  user_telegram: string;
}
export type CallbackFC = (isError: boolean, error?: any) => void;

const usePoolJoinAction = ({ poolId, poolDetails }: PoolDepositActionParams) => {
  const dispatch = useDispatch();
  const { account, library } = useWeb3React();
  const [joinPoolSuccess, setJoinPoolSuccess] = useState<boolean>(false);
  const [poolJoinLoading, setPoolJoinLoading] = useState<boolean>(false);
  const { signature, signMessage, setSignature, error } = useWalletSignature();
  const [data, setData] = useState<ApplyData | undefined>();
  const [callback, setCallback] = useState<undefined | CallbackFC>();

  useEffect(() => {
    setJoinPoolSuccess(false);
  }, [account]);

  const joinPool = useCallback(async (applyData: ApplyData, callbackFC?: CallbackFC) => {
    if (account && poolId && library) {
      try {
        setPoolJoinLoading(true);
        setData(applyData);
        setCallback(() => callbackFC)

        await signMessage();
      } catch (err: any) {
        ;

        setPoolJoinLoading(false);
      }
    }
  }, [poolId, account, library, signMessage]);

  useEffect(() => {
    if (error && poolJoinLoading) {
      setPoolJoinLoading(false);
      callback?.(!!error, null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    const poolJoinRequestWithSignature = async () => {
      if (signature && poolJoinLoading) {
        const config = {
          headers: {
            msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE
          }
        }
        try {
          const response = await axios.post(apiRoute(`/whitelist-apply/${poolDetails?.id}`), {
            signature,
            wallet_address: data?.wallet_address,
            user_twitter: data?.user_twitter,
            user_telegram: data?.user_telegram,

          }, config as any) as any;
          if (response.data) {
            if (response.data.status === 200) {
              setJoinPoolSuccess(true);
              const listStatuses = [
                response.data.data?.partner_twitter_status,
                response.data.data?.partner_channel_status,
                response.data.data?.self_twitter_status,
                response.data.data?.self_channel_status,
              ];
              const error =  listStatuses.includes(0) || listStatuses.includes(2) || listStatuses.includes(3)  
              callback?.(error, response.data.data);
            }
            else {
              callback?.(true, response.data.data);
              dispatch(alertFailure(response.data?.message));

            }
          }
        }
        catch (error: any) {
          dispatch(alertFailure(error?.message));
          setJoinPoolSuccess(false);
          callback?.(true);
        }
        setSignature("");
        setPoolJoinLoading(false);
      }
    }

    poolJoinRequestWithSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, poolJoinLoading]);

  return {
    joinPool,
    poolJoinLoading,
    setPoolJoinLoading,
    joinPoolSuccess
  }
}

export default usePoolJoinAction;
