import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { useEffect, useState } from 'react';
import { TIERS } from '../../../constants';
import useAuth from '../../../hooks/useAuth';
import { numberWithCommas } from '../../../utils/formatNumber';
import useStyles from './style';

const tickIcon = '/images/tick1.svg';
const noTickIcon = '/images/no-tick.svg';
const badge = '/images/badge.png';
const badgeNone = '/images/badge-none.svg';

const TierList = (props: any) => {
  const styles = useStyles();
  const { connectedAccount } = useAuth();
  const [fillerRelativePercentage, setFillerRelativePercentage] = useState(0);
  const {
    tiersBuyLimit,
    tiers,
    userTier,
    showMoreInfomation,
    hideStatistics,
  } = props;
  useEffect(() => {
    switch (userTier) {
      case 1:
        setFillerRelativePercentage(0)
        break;
      case 2:
        setFillerRelativePercentage(12)
        break;
      case 3:
        setFillerRelativePercentage(24)
        break;
      case 4:
        setFillerRelativePercentage(36)
        break;
      case 5:
        setFillerRelativePercentage(48)
        break;
      case 6:
        setFillerRelativePercentage(60)
        break;
      case 7:
        isWidthDown("xs", props.width) ? setFillerRelativePercentage(72) : setFillerRelativePercentage(74)
        break;
      case 8:
        isWidthDown("xs", props.width) ? setFillerRelativePercentage(82) : setFillerRelativePercentage(86)
        break;
      case 9:
        isWidthDown("xs", props.width) ? setFillerRelativePercentage(93) : setFillerRelativePercentage(99)
        break;
    }
  }, [userTier, props.width])

  return (
    <ul className={styles.tierList}>
      {tiers.length > 0 && connectedAccount && <div className={styles.progressBar} style={{ width: `${Math.floor(fillerRelativePercentage)}%` }}></div>}
      {tiers.length > 0 && connectedAccount && !showMoreInfomation && isWidthDown('xs', props.width) &&
        <div className={styles.progressBarXs} style={{ height: `${Math.floor(fillerRelativePercentage)}%` }}></div>}
      {tiers.length > 0 && tiers.filter((tier: any) => tier !== 0).map((tier: any, idx: any) => {
        return <li key={idx}
          className={styles.tierInfo + (userTier > idx ? ' active ' : ' ') + TIERS[idx + 1].name}>
          <div>
            <div className="icon">
              <img className="icon-tick" src={userTier > idx ? badge : badgeNone} alt="" />
              <img className="icon-tick" src={userTier > idx ? tickIcon : noTickIcon} alt="" />
            </div>
            <div className="info">
              <span className={"tier-name"}>{TIERS[idx + 1].name}</span>
              {!showMoreInfomation && <span className={"tier-number"}>{numberWithCommas(tier)} ANTE</span>}
              {showMoreInfomation && !hideStatistics &&
                <span className={"tier-number"}>{numberWithCommas(tiersBuyLimit[idx + 1])} ANTE</span>}
            </div>
          </div>
        </li>
      })}
    </ul>
  );
};

export default withWidth()(TierList);
