import {useEffect, useMemo, useState} from 'react';
import useFetch from './useFetch';

const useGetAirdrop = (payload: any) => {
  const campaignId = payload.campaignId;
  const connectedAccount = payload.connectedAccount;
  const [fetchDone, setFetchDone] = useState<boolean>(false);
  const { loading, error, data }  = useFetch<any>(`/user/get-airdrop/${campaignId}/${connectedAccount}`, false, {});

  const airdrop = useMemo(() => {
    // if (connectedAccount && data && !loading && !error && fetchDone)  {
    //   return data;
    // }
    return data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error, fetchDone, connectedAccount]);

  useEffect(() => {
    data && setFetchDone(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount]);

  return  {
    airdrop,
    loading: !fetchDone
  }
};

export default useGetAirdrop;
