import React, { useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import useFetch from "../../../hooks/useFetch";
import Card from "../../Dashboard/Card";
import useStyles from "./style";

type PoolData = {
  data: [];
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

const TokenSlide: React.FC<any> = (props: any) => {
  const styles = useStyles();
  const [displayPools, setDisplayPools] = useState<Array<any>>([]);
  const [hover, setHover] = useState<boolean>(false);
  const { data: upcomingPoolsV3, loading: upcomingLoading } =
    useFetch<PoolData>(`/pools/v3/upcoming-pools`);
  const { data: activePoolsV3, loading: activeLoading } = useFetch<PoolData>(
    `/pools/v3/active-pools`
  );
  const { data: nextToLaunchPoolsV3, loading: nextLoading } =
    useFetch<PoolData>(`/pools/v3/next-to-launch-pools`);

  useEffect(() => {
    if (!activeLoading && !upcomingLoading && !nextLoading) {
      let totalPools: any[] = [];
      if (activePoolsV3?.data && activePoolsV3.data.length) {
        totalPools.push(...activePoolsV3.data);
      }
      if (upcomingPoolsV3?.data && upcomingPoolsV3.data.length) {
        totalPools.push(...upcomingPoolsV3.data);
      }
      if (nextToLaunchPoolsV3?.data && nextToLaunchPoolsV3.data.length) {
        totalPools.push(...nextToLaunchPoolsV3.data);
      }
      const pools = totalPools.slice(0, 3);
      pools.push(...pools); //dup for animation
      pools.length &&
        setDisplayPools(
          pools.map((p: any) => ({
            ...p,
            status: p?.campaign_status,
          }))
        );
    }
  }, [
    activePoolsV3,
    upcomingPoolsV3,
    nextToLaunchPoolsV3,
    activeLoading,
    upcomingLoading,
    nextLoading,
  ]);

  return (
    <div className={styles.container}>
      <div
        className={styles.slider + (hover ? " paused" : "")}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {displayPools.map((pool: any, index: number) => {
          return <Card pool={pool} key={`${pool.id}-${index}` } autoFetch={false} />;
        })}
      </div>
    </div>
  );
};

export default withWidth()(TokenSlide);
