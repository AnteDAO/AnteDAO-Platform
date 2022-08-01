import React, { useEffect, useState } from "react";
// import useFetch from "../../../hooks/useFetch";
import useStyles from "./style";
import { Grid } from "@material-ui/core";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";
import PoolDetai from "./PoolDetai";
import PoolDetailMobile from "./PoolDetailMobile";
import Empty from "../../../components/Empty";
import useFetch from "../../../hooks/useFetch";

type PoolData = {
  data: [];
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

const CompletedProject: React.FC<any> = (props: any) => {
  const styles = useStyles();

  const { data: completeSalePoolsV3, loading: loadingCompleteSalePoolsV3 } =
    useFetch<PoolData>(
      `/pools/v3/complete-sale-pools?is_private=1&page=1&limit=5`
    );

  const [completeSalePoolsV3Display, setCompleteSalePoolsV3Display] = useState<
    Array<any>
  >([]);

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
    <div className={styles.list_wrap}>
      <div className="wrapHeadTitle">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <h5 className="headTitle">Project name</h5>
          </Grid>
          <Grid item xs={2}>
            <h5 className="headTitle">Participants</h5>
          </Grid>
          <Grid item xs={2}>
            <h5 className="headTitle">Total Raised</h5>
          </Grid>
          <Grid item xs={1}>
            <h5 className="headTitle">Sale Price </h5>
          </Grid>
          <Grid item xs={2}>
            <h5 className="headTitle">Ended in (UTC)</h5>
          </Grid>
          <Grid item xs={1}>
            <h5 className="headTitle">Chains</h5>
          </Grid>
        </Grid>
      </div>
      <div className="wrapBody">
        {isWidthUp("sm", props.width) && (
          <>
            {(completeSalePoolsV3Display || []).map((pool: any, index: any) => {
              return <PoolDetai pool={pool} key={index} id={index} autoFetch={true} completeSalePoolsV3Display={completeSalePoolsV3Display}/>;
            })}
            {!completeSalePoolsV3Display ||
              (!completeSalePoolsV3Display?.length && <Empty />)}
          </>
        )}
        {isWidthDown("sm", props.width) && (
          <>
            {(completeSalePoolsV3Display || []).map((pool: any, index: any) => {
              return <PoolDetailMobile pool={pool} key={index} id={index} autoFetch={true} completeSalePoolsV3Display={completeSalePoolsV3Display}/>;
            })}
            {!completeSalePoolsV3Display ||
              (!completeSalePoolsV3Display?.length && <Empty />)}
          </>
        )}
      </div>
    </div>
  );
};

export default withWidth()(CompletedProject);
