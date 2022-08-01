import { FC } from 'react';
import BigNumber from 'bignumber.js';
import useTokenSoldProgress from '../hooks/useTokenSoldProgress';
import { numberWithCommas } from '../../../utils/formatNumber';
import useStyles from './styles';

type Props = {
  poolDetails: any,
  currencyName: any,
  alreadyJoinPool: any,
  currentUserTier: any,
};

const BuyTokenPoolSwapInfo: FC<Props> = ({ poolDetails, currencyName, alreadyJoinPool, currentUserTier }) => {
  const styles = useStyles();
  const { tokenSold, soldProgress } = useTokenSoldProgress(
    poolDetails?.poolAddress,
    poolDetails?.amount,
    poolDetails?.networkAvailable,
    poolDetails,
  );

  const soldProgressShow = new Date() < new Date(poolDetails.startBuyTime * 1000) ? '0' : soldProgress
  const tokenSoldShow = new Date() < new Date(poolDetails.startBuyTime * 1000) ? '0' : tokenSold


  return (
    <section className={styles.sectionBuyTokenPoolSwapInfo}>
      <h2 className={styles.title}>Swap Info</h2>

      <div className={styles.topSec}>
        <div className={styles.leftTopSec}>
          <h3 className={styles.titleSub}>
            Swap Amount
            <div className={styles.rightTopSec}>
              {
                poolDetails.purchasableCurrency === 'eth'
                  ?
                  <>
                    {
                      poolDetails?.displayPriceRate
                        ?
                        <>
                          1&nbsp;{poolDetails?.tokenDetails?.symbol}
                          &nbsp;=&nbsp;
                          {poolDetails?.priceUsdt}&nbsp;USD
                          <br />
                          1&nbsp;{poolDetails?.tokenDetails?.symbol}
                          &nbsp;=&nbsp;
                          {poolDetails?.ethRate} &nbsp;{currencyName}
                        </>
                        :
                        <>
                          1&nbsp;{poolDetails?.tokenDetails?.symbol}
                          &nbsp;=&nbsp;
                          {poolDetails?.priceUsdt}&nbsp;USD
                        </>
                    }
                  </>
                  :
                  <>
                    1&nbsp;{poolDetails?.tokenDetails?.symbol}
                    &nbsp;=&nbsp;
                    {poolDetails?.ethRate} &nbsp;{currencyName}
                  </>
              }
            </div>
          </h3>
          <div className={styles.flex}>
            <div className={styles.valueLeftTopSec}>
              {numberWithCommas(poolDetails?.amount.toString())} {poolDetails?.tokenDetails?.symbol}
            </div>
            {(alreadyJoinPool && currentUserTier && poolDetails?.isDeployed) ? (
              <div className={styles.Invidiual}>
                Individual cap&nbsp;:&nbsp;<span style={{ color: 'red' }}>{currentUserTier.max_buy}&nbsp;{currencyName}</span>
              </div>
            ) : ('')}
          </div>
        </div>
      </div>

      <div className={styles.botSec}>
        <h3 className={styles.titleSub2}>Swap Progress</h3>

        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>
            {numberWithCommas(new BigNumber(soldProgressShow).lt(100) ? soldProgressShow : '100')}%
          </div>
          <div className={styles.rightBotSec}>
            {
              numberWithCommas(new BigNumber(tokenSoldShow).gt(`${poolDetails?.amount}`) ? `${poolDetails?.amount}` : tokenSoldShow, 2)}&nbsp;
            / {numberWithCommas(`${poolDetails?.amount}` || "0", 2)
            }
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.achieved} style={{ width: `${new BigNumber(soldProgressShow).gt(100) ? '100' : soldProgressShow}%` }}></div>
        </div>
      </div>
    </section>
  );
};

export default BuyTokenPoolSwapInfo;
