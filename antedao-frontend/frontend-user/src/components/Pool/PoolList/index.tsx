import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import PoolCard from "./PoolCard";
import PoolCardMoblie from "./PoolCardMobile";
import Loader from "./../../Loader";

import useStyles from "./styles";
import Empty from "../../Empty";

const PoolList = (props: any) => {
  const styles = useStyles();
  const { data, title, headerRight, loading, completeSalePoolsV3Display } =
    props;

  const mobile = (
    <div>
      {(data || []).map((pool: any) => (
        <PoolCardMoblie key={pool.id} pool={pool} autoFetch={true} />
      ))}
    </div>
  );

  const web = (
    <div>
      <div className={styles.wrapHeadTitle}>
        <Grid container spacing={3}>
          <Grid item xs={completeSalePoolsV3Display ? 4 : 3}>
            <h5 className={styles.headTitle}>Project name</h5>
          </Grid>
          <Grid item xs={2}>
            <h5 className={styles.headTitle}>
              {completeSalePoolsV3Display ? "Total Raised" : "Access"}{" "}
            </h5>
          </Grid>
          <Grid item xs={2}>
            <h5 className={styles.headTitle}>
              {completeSalePoolsV3Display ? "Participants" : "IDO Price"}
            </h5>
          </Grid>
          <Grid item xs={completeSalePoolsV3Display ? 4 : 3}>
            <h5 className={styles.headTitle}>Progress</h5>
          </Grid>
          {completeSalePoolsV3Display ? (
            ""
          ) : (
            <Grid item xs={2}>
              <h5 className={styles.headTitle} style={{ textAlign: "center" }}>
                Status
              </h5>
            </Grid>
          )}
        </Grid>
      </div>
      <div className="pools_wrap">
        <div className="pools_wrap-scroll">
          {loading ? (
            <div style={{ margin: " 100px 0" }}>
              <Loader />
            </div>
          ) : (
            <div>
              {(data || []).map((pool: any, index: any) => {
                return (
                  <PoolCard
                    pool={pool}
                    key={pool.id}
                    id={index}
                    autoFetch={true}
                    completeSalePoolsV3Display={completeSalePoolsV3Display}
                  />
                );
              })}
              {!data || (!data?.length && <Empty />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.listPools}>
      <div
        className={`${styles.listPoolsHeader} ${
          completeSalePoolsV3Display ? "marginV3" : ""
        }`}
      >
        {title && title}
        <div
          className={`${styles.poolHeaderRight} ${
            completeSalePoolsV3Display ? "marginHearderRight" : ""
          }`}
        >
          {headerRight && headerRight}
        </div>
      </div>
      <Hidden smUp>{mobile}</Hidden>
      <Hidden xsDown>{web}</Hidden>
    </div>
  );
};

export default withRouter(PoolList);
