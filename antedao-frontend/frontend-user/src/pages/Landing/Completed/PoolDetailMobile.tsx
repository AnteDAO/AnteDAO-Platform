import React from "react";
import withWidth from "@material-ui/core/withWidth";
// import useFetch from "../../../hooks/useFetch";
import useStyles from "./style";
import { Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { getAccessPoolText, showTotalRaisePrice } from "../../../utils/campaign";
import { formatRoundUp } from "../../../utils/formatNumber";
import BigNumber from "bignumber.js";
import { convertTimeLocalWithTimezone } from "../../../utils/convertDate";

const EthereumIcon = "/images/ethereum.svg";
const BSCIcon = "/images/bsc.svg";
const PolygonIcon = "/images/polygon-matic.svg";

const PoolDetailMobile: React.FC<any> = (props: any) => {
  const styles = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pool, completeSalePoolsV3Display, id } = props;

  // const { idPool } = useParams() as any;

  const releaseTimeInDate = pool?.finish_time
    ? new Date(Number(pool?.finish_time) * 1000)
    : undefined;

  const { data: participants } = useFetch<any>(`/user/counting/${pool.id}`);

  return (
    <Link to={`/buy-token/${pool.id}`} className="pool_detail pool_detail_mb">
      <Grid container spacing={3} className="item">
        <Grid item xs={12} className="item_info">
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
        <Grid item xs={6}>
          <p className={styles.headTit}>Participants</p>
          <p className="item_info">{participants}</p>
        </Grid>
        <Grid item xs={6} className="text_right">
          <p className={styles.headTit}>Total Raised</p>
          <p className="item_info">
            {completeSalePoolsV3Display
              ? showTotalRaisePrice(pool)
              : getAccessPoolText(pool)}
          </p>
        </Grid>
        <Grid item xs={6}>
          <p className={styles.headTit}>Sale Price </p>
          <p className="item_info">${formatRoundUp(new BigNumber(pool.price_usdt), 2)}</p>
        </Grid>
        <Grid item xs={6} className="text_right">
          <p className={styles.headTit}>End in (UTC)</p>
          <p className="item_info">{releaseTimeInDate
              ? convertTimeLocalWithTimezone(releaseTimeInDate)
              : "TBA"}{" "}</p>
        </Grid>
      </Grid>
    </Link>
  );
};

export default withWidth()(PoolDetailMobile);
