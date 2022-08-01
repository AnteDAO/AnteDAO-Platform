import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
// import SearchGroup from "../../components/Base/SearchGroup";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import PoolList from "../../components/Pool/PoolList";
import useFetch from "../../hooks/useFetch";
import { SEO_IDO_DASHBOARD } from "../../utils/seoConfig";
import BackgroundComponent from "./BackgroundDashboard";
// import Card from "./Card";
import CardActive from "./CardActive";
import GuideStep from "./GuideStep";
import useStyles from "./style";
import SliderComponent from "../Landing/Upcoming";

type PoolData = {
  data: [];
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

const Dashboard = (props: any) => {
  const styles = useStyles();

  const [upcomingPoolsV3Display, setUpcomingPoolsV3Display] = useState<
    Array<any>
  >([]);
  const [upcomingCommunityPoolsV3Display, setUpcomingCommunityPoolsV3Display] =
    useState<Array<any>>([]);
  const [activePoolsV3Display, setActivePoolsV3Display] = useState<Array<any>>(
    []
  );
  // const [nextToLaunchPoolsV3Display, setNextToLaunchPoolsV3Display] = useState<
  //   Array<any>
  // >([]);
  const [completeSalePoolsV3Display, setCompleteSalePoolsV3Display] = useState<
    Array<any>
  >([]);
  const [privateVcPoolsV3Display, setPrivateVcPoolsV3Display] = useState<
    Array<any>
  >([]);

  const { data: upcomingPoolsV3, loading: loadingUpcomingPoolV3 } =
    useFetch<PoolData>(`/pools/v3/upcoming-pools?is_private=0&page=1`);
  const { data: activePoolsV3, loading: loadingActivePoolsV3 } =
    useFetch<PoolData>(`/pools/v3/active-pools?is_private=1&page=1&limit=2`);
  // const { data: nextToLaunchPoolsV3, loading: loadingNextToLaunchPoolsV3 } =
  //   useFetch<PoolData>(`/pools/v3/next-to-launch-pools`);
  const { data: completeSalePoolsV3, loading: loadingCompleteSalePoolsV3 } =
    useFetch<PoolData>(`/pools/v3/complete-sale-pools?is_private=1&page=1&limit=5`);
  const { data: privateVc, loading: loadingPrivateVc } =
    useFetch<PoolData>(`/pools/v3/upcoming-pools?is_private=1&page=1`);

  // const currentTime = Math.floor(new Date().getTime()/1000.0) 

  const setStatusPools = async (pools: Array<any>) => {
    await Promise.all(
      pools.map(async (pool: any) => {
        // const tokenSold = await getTokenSold(pool);
        // const status = await getPoolStatusByPoolDetail(pool, tokenSold);
        // console.log('Status Pool:', status);
        // pool.status = status;
        pool.status = pool.campaign_status;
      })
    );
  };
  //private vc
  useEffect(() => {
    if (!privateVc || !privateVc) return;
    if (privateVc?.data && privateVc.data.length) {
      let pools = privateVc.data;
      setStatusPools(pools).then(() => {
        setPrivateVcPoolsV3Display(
          pools.filter((p: any) => p?.is_private === 1)
        );
      });
    }
  }, [loadingPrivateVc, privateVc]);
  // upcoming pool
  useEffect(() => {
    if (!upcomingPoolsV3 || !loadingUpcomingPoolV3) return;
    if (upcomingPoolsV3?.data && upcomingPoolsV3.data.length) {
      let pools = upcomingPoolsV3.data;
      setStatusPools(pools).then(() => {
        setUpcomingCommunityPoolsV3Display(
          pools.filter((p: any) => p?.is_private === 3)
        );
        setUpcomingPoolsV3Display(
          pools.filter((p: any) => p?.is_private !== 3)
        );
      });
    }
  }, [loadingUpcomingPoolV3, upcomingPoolsV3]);
  //active pool
  useEffect(() => {
    if (!activePoolsV3 || !loadingActivePoolsV3) return;
    if (activePoolsV3?.data && activePoolsV3.data.length) {
      let pools = activePoolsV3.data;
      setStatusPools(pools).then(() => {
        setActivePoolsV3Display(pools);
      });
    }
  }, [activePoolsV3, loadingActivePoolsV3]);

  // useEffect(() => {
  //   if (!nextToLaunchPoolsV3 || !loadingNextToLaunchPoolsV3) return;
  //   if (nextToLaunchPoolsV3?.data && nextToLaunchPoolsV3.data.length) {
  //     let pools = nextToLaunchPoolsV3.data;
  //     setStatusPools(pools).then(() => {
  //       setNextToLaunchPoolsV3Display(pools);
  //     });
  //   }
  // }, [loadingNextToLaunchPoolsV3, nextToLaunchPoolsV3]);
  //complete sale
  useEffect(() => {
    if (!completeSalePoolsV3 || !loadingCompleteSalePoolsV3) return;
    if (completeSalePoolsV3?.data && completeSalePoolsV3.data.length) {
      let pools = completeSalePoolsV3.data;
      setStatusPools(pools).then(() => {
        // pools.sort(function (a, b) {
        //   const x = a["finish_time"];
        //   const y = b["finish_time"];
        //   return x > y ? 1 : x < y ? -1 : 0;
        // });
        setCompleteSalePoolsV3Display(pools);
      });
    }
  }, [completeSalePoolsV3, loadingCompleteSalePoolsV3]);


  return (
    <DefaultLayout isTransparentHeader>
      <Helmet>
				<title>{SEO_IDO_DASHBOARD.TITLE}</title>
				<meta name="description" content={SEO_IDO_DASHBOARD.DES}/>

				{/* <!-- Google / Search Engine Tags --> */}
				<meta item-prop="name" content={SEO_IDO_DASHBOARD.GOOGLE_META_NAME}/>
				<meta item-prop="description" content={SEO_IDO_DASHBOARD.GOOGLE_META_DES}/>
				<meta item-prop="image" content={SEO_IDO_DASHBOARD.GOOGLE_META_IMAGE}/>
			</Helmet>
      <BackgroundComponent />
      <div className={styles.pageBg}>
        <GuideStep />
        <div className={styles.project}>
          <div className={styles.projectHeader}>
            <h1>Project List</h1>
            {/* <SearchGroup></SearchGroup> */}
          </div>

          {activePoolsV3Display && activePoolsV3Display.length > 0 && (
            <div className={`${styles.listPools}`}>
              <div className="list-pool-header">
                <h3>Live Pools</h3>
                <div className={styles.poolHeaderRight}>
                    <button
                      className={styles.btnViewAllPoolsNoBg}
                      onClick={() => props.history.push("/pools")}
                    >
                      View More &nbsp;
                      <img src="/images/icons/arrow-right-bold.svg" alt="" />
                    </button>
                  </div>
              </div>
              <div className="active_pools">
                {activePoolsV3Display.map((pool: any, index) => {
                  return (
                    <CardActive pool={pool} key={pool.id} autoFetch={true} />
                  );
                })}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {((upcomingPoolsV3Display && upcomingPoolsV3Display.length > 0) ||
            (upcomingCommunityPoolsV3Display &&
              upcomingCommunityPoolsV3Display.length > 0)) && (
              <div className={styles.listPools}>
                {(upcomingPoolsV3Display && upcomingPoolsV3Display.length > 0) && (
                  <>
                    <div className="list-pool-header">
                      <h3>Upcoming</h3>
                      <div className={styles.poolHeaderRight}>
                        <button
                          className={styles.btnViewAllPoolsNoBg}
                          onClick={() => props.history.push("/pools")}
                        >
                          View More &nbsp;
                          <img src="/images/icons/arrow-right-bold.svg" alt="" />
                        </button>
                      </div>
                    </div>
                    <div className={styles.upcoming}>
                      <SliderComponent cardsInfo={upcomingPoolsV3Display}/>
                    </div>
                  </>
                )}
              </div>
            )}

          {/* Private VC */}
          {((privateVcPoolsV3Display && privateVcPoolsV3Display.length > 0) ||
            (privateVcPoolsV3Display &&
              privateVcPoolsV3Display.length > 0)) && (
              <div className={styles.listPools}>
                {privateVcPoolsV3Display && privateVcPoolsV3Display.length > 0 && (
                  <>
                    <div className="list-pool-header">
                      <h3>Private VC</h3>
                      <div className={styles.poolHeaderRight}>
                        <button
                          className={styles.btnViewAllPoolsNoBg}
                          onClick={() => props.history.push("/pools")}
                        >
                          View More &nbsp;
                          <img src="/images/icons/arrow-right-bold.svg" alt="" />
                        </button>
                      </div>
                    </div>
                    <div className={styles.upcoming}>
                      <SliderComponent cardsInfo={privateVcPoolsV3Display}/>
                    </div>
                  </>
                )}
              </div>
            )}

          {completeSalePoolsV3Display && completeSalePoolsV3Display.length > 0 && (
            <>
              <PoolList
                title={<h2 className={styles.textCompleted}>Completed Sales</h2>}
                data={completeSalePoolsV3Display}
                completeSalePoolsV3Display={true}
                headerRight={
                  <button
                    className={styles.btnViewAllPoolsNoBg}
                    onClick={() => props.history.push("/pools")}
                  >
                    View all Pools&nbsp;
                    <div className={styles.arrowRight}>
                      <img src="/images/icons/arrow-right-bold.svg" alt="" />
                    </div>

                  </button>
                }
              />
            </>
          )}
          <div className={styles.starBottom}>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(Dashboard);
