import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "@material-ui/core";
import { getPoolCountDown } from "../../../utils/getPoolCountDown";
import useStyles from "./style";
import { Link } from "react-router-dom";
import {
  getAccessPoolText,
  getProgressWithPools,
  getTokenSold,
  showTotalRaisePrice,
} from "../../../utils/campaign";
import CountdownSort from "../../../components/Base/CountdownSort";
import useTokenSoldProgress from "../../BuyToken/hooks/useTokenSoldProgress";
import { getPoolStatusByPoolDetail } from "../../../utils/getPoolStatusByPoolDetail";

const EthereumIcon = "/images/ethereum.svg";
const BSCIcon = "/images/bsc.svg";
const PolygonIcon = "/images/polygon-matic.svg";
const Card = (props: any): JSX.Element => {
  const styles = useStyles();
  const { pool, autoFetch } = props;

  const [, setProgress] = useState("0");
  const [tokenSold, setTokenSold] = useState("0");
  const [, setTotalSoldCoin] = useState("0");
  useEffect(() => {
    const getTokenProgressInfoByPool = async () => {
      if (autoFetch && pool) {
        pool.tokenSold = await getTokenSold(pool);
      }
      let {
        progress: progressPercent,
        tokenSold: totalTokenSold,
        totalSoldCoin: totalToken,
      } = getProgressWithPools(pool);

      setProgress(progressPercent);
      setTokenSold(totalTokenSold);
      setTotalSoldCoin(totalToken);
    };

    getTokenProgressInfoByPool();
    if (autoFetch) {
      const intervalProgress = setInterval(() => {
        getTokenProgressInfoByPool();
      }, 10000);

      return () => {
        intervalProgress && clearInterval(intervalProgress);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);


  const tokenDetails =
    pool.token === "TBD"
      ? {
        symbol: "TBA",
        name: "TBA",
        decimals: 18,
        address: "Token contract not available yet.",
      }
      : {
        symbol: pool.symbol,
        name: pool.name,
        decimals: pool.decimals,
        address: pool.token,
      };

  const poolStatus = getPoolStatusByPoolDetail(pool, tokenSold);

  const { soldProgress } = useTokenSoldProgress(
    pool?.poolAddress,
    pool?.amount,
    pool?.networkAvailable,
    pool
  );

  const joinTimeInDate = pool?.start_join_pool_time
    ? new Date(Number(pool?.start_join_pool_time) * 1000)
    : undefined;
  const endJoinTimeInDate = pool?.end_join_pool_time
    ? new Date(Number(pool?.end_join_pool_time) * 1000)
    : undefined;
  const startBuyTimeInDate = pool?.start_time
    ? new Date(Number(pool?.start_time) * 1000)
    : undefined;
  const endBuyTimeInDate = pool?.finish_time
    ? new Date(Number(pool?.finish_time) * 1000)
    : undefined;
  const releaseTimeInDate = pool?.releaseTime
    ? new Date(Number(pool?.releaseTime) * 1000)
    : undefined;

  const isPrivate = pool?.is_private || 0;

  const displayCountDownTime = useCallback(
    (
      method: string | undefined,
      startJoinTime: Date | undefined,
      endJoinTime: Date | undefined,
      startBuyTime: Date | undefined,
      endBuyTime: Date | undefined
    ) => {
      return getPoolCountDown(
        startJoinTime,
        endJoinTime,
        startBuyTime,
        endBuyTime,
        releaseTimeInDate,
        method,
        poolStatus,
        pool,
        soldProgress,
        isPrivate
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { date: countDownDate, displayShort } = displayCountDownTime(
    pool?.buy_type,
    joinTimeInDate,
    endJoinTimeInDate,
    startBuyTimeInDate,
    endBuyTimeInDate
  );

  return (
    <Link to={`/buy-token/${pool.id}`} className={styles.boxCard}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={pool.banner} alt="" onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/images/no-img.jpg"
          }} />
          <div className={styles.listStatus}>
            <div className={`${styles.poolStatusWarning}`}>
              {getAccessPoolText(pool)}
            </div>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyHead}>
            <div className="card-content__title">
              <Tooltip
                classes={{ tooltip: styles.tooltip }}
                title={`${pool.title} (${pool.symbol})`}
                arrow
                placement="top"
              >
                <p>
                  {pool.title}
                  {` (${pool.symbol})`}
                </p>
              </Tooltip>
            </div>
            <div className={styles.network}>
              {
                (() => {
                  switch (pool?.network_available) {
                    case 'bsc':
                      return <img src={BSCIcon} alt="" />;
                    case 'polygon':
                      return <img src={PolygonIcon} alt="" />;
                    case 'eth':
                    default:
                      return <img src={EthereumIcon} alt="" />;
                  }
                })()
              }
            </div>
          </div>
          <ul className="card-content__content">
            <li>
              <span>Total Raise</span>
              <span className="total">
                {showTotalRaisePrice(pool)}
              </span>
            </li>
            <li>
              <span>Rate</span>
              <span className="total">
                1&nbsp;{tokenDetails?.symbol}
                &nbsp;=&nbsp;
                {pool?.ether_conversion_rate} &nbsp;{pool.accept_currency.toUpperCase()}
              </span>
            </li>
            <li>
              <span>Supported</span>
              <span className="total">{pool.accept_currency.toUpperCase()}</span>
            </li>
          </ul>

          <div className={styles.btnApplied}>
            {displayShort ? (
              <>
                <img src="/images/icons/icon_btn_pool.svg" alt="" />
                {displayShort}&nbsp;
                <CountdownSort startDate={countDownDate} />
              </>
            ) : (
              <>
                <div style={{ font: 'normal normal 700 16px/24px var(--fontFamily)', }}>TBA</div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
