import React from "react";
import withWidth from "@material-ui/core/withWidth";
// import useFetch from "../../../hooks/useFetch";
import useStyles from "./style";
import { Grid } from "@material-ui/core";
// import { getIconCurrencyUsdt } from "../../../utils/usdt";
import useFetch from "../../../hooks/useFetch";
import {
  getAccessPoolText,
  showTotalRaisePrice,
} from "../../../utils/campaign";
import { convertTimeLocalWithTimezone } from "../../../utils/convertDate";
import { formatRoundUp } from "../../../utils/formatNumber";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";

const EthereumIcon = "/images/ethereum.svg";
const BSCIcon = "/images/bsc.svg";
const PolygonIcon = "/images/polygon-matic.svg";

const PoolDetail: React.FC<any> = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const styles = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pool, completeSalePoolsV3Display, id } = props;

  const releaseTimeInDate = pool?.finish_time
    ? new Date(Number(pool?.finish_time) * 1000)
    : undefined;

  const { data: participants } = useFetch<any>(`/user/counting/${pool.id}`);

  return (
    <Link to={`/buy-token/${pool.id}`} className="pool_detail">
      <Grid container spacing={3} className="item">
        <Grid item xs={4} className="item_info">
          {pool?.kyc_bypass === 1 ? (
            <div className="img-group">
              <div className="titles">KYC</div>
              <img className="border_img" src={pool.token_images} alt="" />
            </div>
          ) : (
            <img className="img" src={pool.token_images} alt="" />
          )}
          <div className="name-item">
            <p>{pool.title}</p>
            <span>{pool.accept_currency}</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p className="item_info">{participants}</p>
        </Grid>
        <Grid item xs={2}>
          <p className="item_info">
            {completeSalePoolsV3Display
              ? showTotalRaisePrice(pool)
              : getAccessPoolText(pool)}
          </p>
        </Grid>
        <Grid item xs={1}>
          <p className="item_info">
            ${formatRoundUp(new BigNumber(pool.price_usdt), 2)}
          </p>
        </Grid>
        <Grid item xs={2}>
          <p className="item_info">
            {releaseTimeInDate
              ? convertTimeLocalWithTimezone(releaseTimeInDate)
              : "TBA"}{" "}
          </p>
        </Grid>
        <Grid item xs={1}>
          {(() => {
            switch (pool?.network_available) {
              case "bsc":
                return (
                  <img src={BSCIcon} alt="" className="chain-ico" />
                );
              case "polygon":
                return (
                  <img
                    src={PolygonIcon}
                    alt=""
                    className="chain-ico"
                  />
                );
              case "eth":
              default:
                return (
                  <img
                    src={EthereumIcon}
                    alt=""
                    className="chain-ico"
                  />
                );
            }
          })()}
        </Grid>
      </Grid>
    </Link>
  );
};

export default withWidth()(PoolDetail);
