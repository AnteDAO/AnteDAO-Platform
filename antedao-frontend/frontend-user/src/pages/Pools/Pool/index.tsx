import BigNumber from 'bignumber.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ACCEPT_CURRENCY } from '../../../constants';
import useCommonStyle from '../../../styles/CommonStyle';
import { getAccessPoolText, getProgressWithPools, getTokenSold } from "../../../utils/campaign";
import { numberWithCommas } from '../../../utils/formatNumber';
import { getIconCurrencyUsdt } from "../../../utils/usdt";
import useStyles from './style';

const Pool = (props: any): JSX.Element => {
  const styles = useStyles();
  const commonStyle = useCommonStyle();
  const [, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);

  const {
    pool
  } = props

  useEffect(() => {
    const getTokenSoldByPool = async () => {
      let resTokenSold = '0';
      if (pool && pool.is_deploy) {
        const tokenSold = await getTokenSold(pool);
        resTokenSold = tokenSold;
      }

      let { progress: progressPercent } = getProgressWithPools({
        ...pool,
        tokenSold: resTokenSold,
      });
      setProgress(parseFloat(progressPercent));
      console.log('Progress: ', progressPercent);
    };

    getTokenSoldByPool();
    const intervalProgress = setInterval(() => {
      getTokenSoldByPool();
    }, 20000);

    return () => {
      intervalProgress && clearInterval(intervalProgress);
    }

  }, [pool])

  useEffect(() => {
    const currentTime = moment().unix()
    var diffTime = parseInt(pool.start_time) - currentTime;
    let intervalCount: any;
    if (diffTime > 0) {
      let timeLeftToStart = diffTime * 1000
      const interval = 1000;

      intervalCount = setInterval(() => {
        timeLeftToStart -= interval;
        const timeLeftDuration = moment.duration(timeLeftToStart, 'milliseconds');
        let timeLeftString = '';
        if (timeLeftToStart >= 86400000) {
          timeLeftString = 'In ' + timeLeftDuration.days() + " days"
        } else {
          timeLeftString = 'In ' + timeLeftDuration.hours() + ":" + timeLeftDuration.minutes() + ":" + timeLeftDuration.seconds()
        }
        setTimeLeft(timeLeftString)
      }, interval);
    }

    return () => clearInterval(intervalCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { currencyName } = getIconCurrencyUsdt({ purchasableCurrency: pool?.accept_currency, networkAvailable: pool?.network_available });

  return (
    <td>
      <Link to={`/buy-token/${pool.id}`} className={styles.link}>
        <div className={styles.row}>
          <div className={styles.name}>
            <img alt="token" src={pool.token_images} />
            <span className={styles.ratio + ' ' + commonStyle.nnn1424h}>{pool.title}</span>
          </div>
          <div className={styles.ratio + ' ' + commonStyle.nnn1424h}>
            {pool.accept_currency === ACCEPT_CURRENCY.ETH &&
              <>
                {`${numberWithCommas(pool?.price_usdt, 4)} USD`}
              </>
            }
            {pool.accept_currency !== ACCEPT_CURRENCY.ETH &&
              <>
                {numberWithCommas(pool?.token_conversion_rate, 4)} {currencyName}
              </>
            }
          </div>
          <div className={styles.poolType + ' ' + commonStyle.nnn1424h}>
            {getAccessPoolText(pool)}
          </div>
          <div className={styles.progress}>
            <span className={styles.ratio + ' ' + commonStyle.nnn1424h}>{`${new BigNumber(progress).toFixed(2)}%`}</span>
            <div className="progress">
              <span
                className={`current-progress ${progress > 0 ? '' : 'inactive'}`}
                style={{ width: `${new BigNumber(progress).toFixed(2)}%` }}
              ></span>
            </div>
          </div>
          <div className={styles.status}>
            {pool.status}
          </div>
        </div>
      </Link>
    </td>
  );
};

export default Pool;
