import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import useAuth from './useAuth';
import useFetch from './useFetch';
import { TokenType } from './useTokenDetails';

export type PoolDetails = {
  id: number;
  website: string;
  amount: number;
  ethRate: number;
  method: string;
  type: string;
  tokenDetails: TokenType;
  title: string;
  buyLimit: number[],
  connectedAccountBuyLimit: number,
  poolAddress: string;
  joinTime: string;
  endJoinTime: string;
  startBuyTime: string;
  endBuyTime: string;
  releaseTime: string;
  purchasableCurrency: string;
  banner: string;
}

export type Pools = []

export type Pagination = {
  page: any,
  lastPage: any,
  perPage: any,
  total: any
}

export type PoolsReturnType ={
  pools: Pools | [],
  pagination: Pagination | undefined
  loading: boolean
}

const usePools = (): PoolsReturnType => {
  const { connectedAccount } = useAuth();
  const [poolsDone, setPoolsDone] = useState<boolean>(false);
  const { loading, error, data }  = useFetch<any>(connectedAccount ? `/pools?walletAddress=${connectedAccount}` : `/pools?limit=100`);
  const { data: connectedAccountTier } = useTypedSelector(state => state.userTier);

  const pools = useMemo(() => {
    if (data && !loading && !error && poolsDone)  {
      const result = data.data.map((p: any) => {

        return {
          ...p,
          // token_images: `${BASE_URL}/image/${p.token_images}`,
          // banner: `${BASE_URL}/image/${p.banner}`,
          decimals: (p.campaign_hash == null || p.campaign_hash === '' || p.campaign_hash === 'TBD') ? 18 : p.decimals,
          campaign_hash: (p.campaign_hash == null || p.campaign_hash === '' || p.campaign_hash === 'TBD') ? 'Token contract not available yet.' : p.campaign_hash
        }
      })
      return result
    }

    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error, poolsDone, connectedAccountTier]);

  const pagination = useMemo(() => {
    if (data && !loading && !error && poolsDone)  {
      return {
        page: data.page,
        lastPage: data.lastPage,
        perPage: data.perPage,
        total: data.total
      }
    }

    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error, poolsDone, connectedAccountTier]);

  useEffect(() => {
    data && setPoolsDone(true)
  }, [data])

  return  {
    pools,
    pagination,
    loading: !poolsDone
  }
}

export default usePools;
