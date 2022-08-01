import { useWeb3React } from '@web3-react/core';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import usePrevious from '../../../../hooks/usePrevious';
import axios from '../../../../services/axios';
import { alertFailure } from '../../../../store/actions/alert';



const useSubscription = (playerId:string) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const {account} = useWeb3React()
    const prevAccount = usePrevious(account)
    const subcription = useCallback(async () => {
        
      if (account) {
        const config = {
            headers: {
              msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE
            }
          }
          try {
              setLoading(true)
            const response = await axios.post("/subscribe-notification", {
                subscribe_status:true,
                player_id:playerId,
                wallet_address:account
  
            }, config as any) as any;
            if (response.data) {
              if (response.data.status === 200) {
              
              }
              else {
                dispatch(alertFailure(response.data?.message));
  
              }
            }
          }
          catch (error: any) {
            dispatch(alertFailure(error?.message));
          }
          setLoading(false);
      }
      // eslint-disable-next-line
    }, [account]);
  
    const unSubcription = useCallback(async () => {
      if (prevAccount && playerId &&  (prevAccount !== account || !account)) {
        const config = {
            headers: {
              msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE
            }
          }
          try {
              setLoading(true)
            const response = await axios.post("/subscribe-notification", {
                subscribe_status:false,
                player_id:playerId,
                wallet_address:prevAccount
  
            }, config as any) as any;
            if (response.data) {
              if (response.data.status === 200) {
              
              }
              else {
                dispatch(alertFailure(response.data?.message));
  
              }
            }
          }
          catch (error: any) {
            dispatch(alertFailure(error?.message));
          }
          setLoading(false);
      }
      // eslint-disable-next-line
    }, [playerId, prevAccount,account]);
  
  
    return {
        subcription,
        unSubcription,
      loading,
      setLoading,
    }
  }
export default useSubscription