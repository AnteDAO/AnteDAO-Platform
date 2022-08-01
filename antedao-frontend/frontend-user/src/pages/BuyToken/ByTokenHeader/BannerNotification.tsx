import BigNumber from 'bignumber.js';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import AppNetworkSwitch from '../../../components/Base/HeaderDefaultLayout/AppNetworkSwitch';
import { HeaderContext } from '../../../components/Base/HeaderDefaultLayout/context/HeaderContext';
import { TIERS } from "../../../constants";
import useTokenAllowance from "../../../hooks/useTokenAllowance";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { trimMiddlePartAddress } from "../../../utils/accountAddress";
import { convertTimeToStringFormat } from '../../../utils/convertDate';
import { numberWithCommas } from "../../../utils/formatNumber";
import { PoolStatus } from '../../../utils/getPoolStatus';
import { getTokenToApprove } from '../../../utils/pool';
import useDetectClaimConfigApplying from "../hooks/useDetectClaimConfigApplying";
import useStyles from "./styles";


const blankHref = undefined;

function BannerNotification(props: any) {
  const styles = useStyles();
  const {
    poolDetails,
    ableToFetchFromBlockchain,
    // winnersList,
    // verifiedEmail,
    currentUserTier,
    existedWinner,
    currencyName,
    userBuyLimit,
    // startBuyTimeInDate,
    // endBuyTimeInDate,
    isOverTimeApplyWhiteList,
    alreadyJoinPool,
    joinPoolSuccess,
    connectedAccount,
    isKYC,
    announcementTime,
    purchasableCurrency,
    // whitelistCompleted,
    // whitelistLoading,
    scrollToWinner,
    poolAddress,
    tokenDetails,
    // maximumBuy,
    whitelistPending,
    isCanceledWhitelist
  } = props;

  const { appChainID } = useTypedSelector(state => state.appNetwork).data;

  // Fet User Claim Info
  const userClaimInfo = useTypedSelector(state => state.claimUserInfo).data;
  const userPurchasedValue = userClaimInfo?.userPurchased || 0;
  const userClaimed = userClaimInfo?.userClaimed || 0;
  const {
    maximumTokenClaimUtilNow,
  } = useDetectClaimConfigApplying(
    poolDetails,
    userPurchasedValue,
    userClaimed
  );

  // Fetch Token Allow
  const getApproveToken = useCallback((appChainID: string) => {
    return getTokenToApprove(purchasableCurrency, appChainID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasableCurrency, appChainID]);
  const tokenToApprove = getApproveToken(appChainID);
  const [tokenAllowance, setTokenAllowance] = useState<number | undefined>(undefined);

  const { retrieveTokenAllowance } = useTokenAllowance();

  const fetchPoolDetails = useCallback(async () => {
    if (tokenDetails && poolAddress && connectedAccount && tokenToApprove) {
      setTokenAllowance(await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress) as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenDetails, connectedAccount, tokenToApprove, poolAddress]);

  useEffect(() => {
    const loadPool = async () => {
      await fetchPoolDetails();
    };
    loadPool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, ableToFetchFromBlockchain]);

  const {
    loginError,
  } = useContext(AppContext);
  const { data: message = "" } = useSelector((state: any) => state.messages);
  const [switchNetworkDialog, setSwitchNetworkDialog] = useState<boolean>(false);
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);

  const isAccountConnectedNotKYC = poolDetails && !isKYC && connectedAccount;
  const isAccountAchivedMinTier = isKYC && currentUserTier?.level < poolDetails?.minTier && !isOverTimeApplyWhiteList;
  const isClaimable = (new BigNumber(maximumTokenClaimUtilNow)).gt(0);
  const isApplyWhiteList = (alreadyJoinPool || joinPoolSuccess) && !isCanceledWhitelist;
  const isNotApplyWhiteList = !isCanceledWhitelist && !isApplyWhiteList;
  const isWinWhitelist = !!existedWinner;
  const isPenddingWhitelist = !isWinWhitelist && !isApplyWhiteList && whitelistPending;
  const isNetworkError = loginError || message;
  const isLostWhiteList = connectedAccount && !isWinWhitelist;
  const isApproved = (new BigNumber(tokenAllowance || 0)).gt(0);
  const isNeedApprove = connectedAccount && !isApproved;
  const isFilled = poolDetails?.campaignStatus === PoolStatus.Filled;
  const isEnd = poolDetails?.campaignStatus === PoolStatus.Closed;
  const isRequireKYC = !poolDetails?.kycBypass;

  const now = new Date();
  const startWhiteListTime = poolDetails?.joinTime ? new Date(Number(poolDetails?.joinTime) * 1000) : undefined;
  const endWhiteListTime = poolDetails?.endJoinTime ? new Date(Number(poolDetails?.endJoinTime) * 1000) : undefined;
  const startBuyTime = poolDetails?.startBuyTime ? new Date(Number(poolDetails?.startBuyTime) * 1000) : undefined;
  const endBuyTime = poolDetails?.endBuyTime ? new Date(Number(poolDetails?.endBuyTime) * 1000) : undefined;
  const startClaimTime = poolDetails?.releaseTime ? new Date(Number(poolDetails?.releaseTime) * 1000) : undefined;

  const currentFCFSRound = poolDetails?.fcfsRoundsSetting && [...poolDetails?.fcfsRoundsSetting].reverse().find((fcfs: any) => {
    if (endBuyTime) {
      const startBuyFCFSPhase = new Date(Number(poolDetails.endBuyTime) * 1000);
      startBuyFCFSPhase.setMinutes(endBuyTime.getMinutes() - Number(fcfs.before_buy_end_time));
      if (startBuyFCFSPhase <= now && now <= endBuyTime) return true;
    }
    return false;
  });

  const isBeforeWhiteListTime = startWhiteListTime && now < startWhiteListTime;
  const isWhiteListTime = startWhiteListTime && endWhiteListTime && startWhiteListTime <= now && now <= endWhiteListTime;
  const isBeforeSwapTime = endWhiteListTime && startBuyTime && endWhiteListTime < now && now < startBuyTime;
  const isSwapTime = startBuyTime && endBuyTime && startBuyTime <= now && now <= endBuyTime;
  const isFCFSRound123Time = [1, 2, 3].includes(currentFCFSRound?.phase_number)
  const isFCFSRound4Time = currentFCFSRound?.phase_number === 4;
  const isBeforeClaimTime = endBuyTime && startClaimTime && endBuyTime < now && now < startClaimTime;
  const isClaimTime = startClaimTime && now > startClaimTime && !isEnd;
  const isEndTime = startClaimTime && now > startClaimTime && isEnd;


  const canceledWhitelistMessage =
    <div className={styles.errroTier}>
      <img src="/images/warning-white.svg" alt="" />
      <span>You have cancelled your whitelist application.</span>
    </div>;
  const applyWhiteListMessage =
    <div className={styles.whitelistSuccess}>
      <img src="/images/fire-cracker.svg" alt="file-cracker" />
      <span>
        You have successfully applied the whitelist. Please stay tune for winner announcement on {momentTimezone.tz(announcementTime, moment.tz.guess()).format("dddd, MMMM DD, YYYY")}.
      </span>
    </div>;
  const penddingWhitelistMessage =
    <div className={styles.errroTier}>
      <img src="/images/warning-red.svg" alt="file-cracker" />
      <p>
        Your whitelist application is currently pending. Please stay tune for winner annoucement on {momentTimezone.tz(announcementTime, moment.tz.guess()).format("dddd, MMMM DD, YYYY")}.
      </p>
    </div>;
  const networkErrorMessage =
    <>
      <HeaderContext.Provider value={{ agreedTerms, setAgreedTerms }}>
        <AppNetworkSwitch
          opened={switchNetworkDialog}
          handleClose={() => setSwitchNetworkDialog(false)}
        />
      </HeaderContext.Provider>
      <div className={styles.alertVerifyEmail}>
        <img src="/images/warning-red.svg" alt="warning-red icon" />
        <span>
          Please switch to ({poolDetails?.networkAvailable.toLocaleUpperCase()}) to do Apply Whitelist, Approve/Buy tokens. <button
            className={styles.btnChangeAppNetwork}
            onClick={() => {
              setSwitchNetworkDialog(true);
            }}
          >
            Change App Network
          </button>
        </span>
      </div>
      {/* { 
    ((alreadyJoinPool || joinPoolSuccess) && !whitelistCompleted && !whitelistLoading && (currentUserTier && currentUserTier.level < 3) &&
    !((winnersList && winnersList.total > 0) && (poolDetails?.publicWinnerStatus === PUBLIC_WINNER_STATUS.PUBLIC)) &&
    !isOverTimeApplyWhiteList &&
    !isCanceledWhitelist) &&  // User must not canceled whitelist
    <div className={styles.whitelistPending}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.48578 0 0 4.48578 0 10C0 15.5142 4.48578 20 10 20C15.5142 20 20 15.5142 20 10C20 4.48578 15.5142 0 10 0ZM14.7559 15.1724C14.5934 15.3349 14.38 15.4167 14.1667 15.4167C13.9534 15.4167 13.7399 15.3349 13.5776 15.1724L9.41086 11.0059C9.25415 10.8501 9.16672 10.6383 9.16672 10.4167V5C9.16672 4.53918 9.53995 4.16672 10 4.16672C10.4601 4.16672 10.8333 4.53918 10.8333 5V10.0717L14.7559 13.9941C15.0816 14.3201 15.0816 14.8466 14.7559 15.1724Z" fill="#090B1B" />
      </svg>
      <p>
        We will verify your application WITHIN 1 DAY. We will send you an email at support@polkafoundry.com to explain why your application is pending approval. Please be patient and keep an eye on the email.
      </p>

    </div>
  } */}
    </>;
  const accountConnectedNotKYCMessage =
    <div className={styles.alertVerifyEmail}>
      <img src="/images/warning-red.svg" alt="" />
      <span>
        The connected wallet address ({trimMiddlePartAddress(connectedAccount || '', 5)}) is unverified.&nbsp;
        <a
          href="https://verify-with.blockpass.org/?clientId=AnteDAO_fi&serviceName=AnteDAO&env=prod"
          target="_blank"
          rel="noreferrer"
          style={{color:"#FD849C"}}
        >
          Please submit KYC now
        </a>
        &nbsp;or switch to a verified address.{" "}
        {/* <Link to="/staking-pools">Click here</Link>{" "}
        for more process details. */}
      </span>
    </div>;
  const accountAchivedMinTierMessage =
    <div className={styles.errroTier}>
      <img src="/images/warning-red.svg" alt="" />
      <span>
        You haven't achieved min tier (
        {TIERS[poolDetails?.minTier]?.name || ''}
        ) to apply for Whitelist yet. To upgrade your Tier, please&nbsp;
        <Link  style={{color:"#FD849C"}} to="/staking-pools">click here</Link>
      </span>
    </div>;
  const winWhitelistMessage =
    <div className={styles.whitelistSuccess}>
      <img src="/images/fire-cracker.svg" alt="file-cracker" /> &nbsp;
      <span>
        The whitelist winners are out! Congratulations on your&nbsp;
        <span style={{ color: '#3B82F6', fontWeight: 700 }}>{numberWithCommas(`${userBuyLimit}`)} {currencyName} </span>
        allocation for {poolDetails?.title}.
        You can view the list of winners&nbsp;
        <a
          href={blankHref}
          style={{ color: '#3B82F6', cursor: 'pointer', }}
          onClick={() => {
            scrollToWinner();
          }}
        >here</a>.
      </span>
    </div>;
  const lostWhiteListMessage =
    <div className={styles.errroTier}>
      <img src="/images/warning-red.svg" alt="" />
      <span>
        Sorry, you have not been chosen as a whitelist winner for {poolDetails.title} pool. See you in the upcoming pools.
      </span>
    </div>;
  const isNotApplyWhiteListMessage =
    <div className={styles.errroTier}>
      <img src="/images/warning-red.svg" alt="" />
      <span>
        Sorry, you didn't join whitelist for {poolDetails.title} Pool. See you in the upcomming pools
      </span>
    </div>;
  const swapFullMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>
        The pool is full. Thank you for your participation. You can claim your token on {startClaimTime && convertTimeToStringFormat(startClaimTime)}.
      </span>
    </div>;
  const isClaimableMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>
        You can claim your tokens now. Check Claim Policy and click Claim Tokens button.
      </span>
    </div>;
  const isEndMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>
        The pool is over. Thank you for your participation.
      </span>
    </div>;
  const needApproveMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>The pool is open now. You must first approve {currencyName} (one time only).</span>
    </div>;
  const approvedMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>You have approved successfully. Enter the {currencyName} amount to swap tokens.</span>
    </div>;
  const fcfsRoundMessage =
    <div className={styles.warningWhite}>
      <img src="/images/warning-white.svg" alt="" />
      <span>Pool has reached FCFS round. Check your individual cap!</span>
    </div>;

  if (isBeforeWhiteListTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isAccountConnectedNotKYC && isRequireKYC) return accountConnectedNotKYCMessage;
    if (isAccountAchivedMinTier) return accountAchivedMinTierMessage;
  }
  else if (isWhiteListTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isApplyWhiteList) return applyWhiteListMessage;
    if (isPenddingWhitelist) return penddingWhitelistMessage;
    if (isAccountConnectedNotKYC && isRequireKYC) return accountConnectedNotKYCMessage;
    if (isAccountAchivedMinTier) return accountAchivedMinTierMessage;
    if (isCanceledWhitelist) return canceledWhitelistMessage;
  }
  else if (isBeforeSwapTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isCanceledWhitelist) return canceledWhitelistMessage;
    if (isNotApplyWhiteList) return isNotApplyWhiteListMessage;
    if (poolDetails.isDeployed) {//chua check dc
      if (isWinWhitelist) return winWhitelistMessage;
      else return lostWhiteListMessage;
    }
    else {
      if (isPenddingWhitelist) return penddingWhitelistMessage;
      if (isApplyWhiteList) return applyWhiteListMessage;
    }
  }
  else if (isSwapTime) {
    if (isNetworkError) return networkErrorMessage;
    if ((isFCFSRound123Time && isApplyWhiteList) || isFCFSRound4Time) {
      if (isFilled) return swapFullMessage
      else if (connectedAccount) return fcfsRoundMessage;
    }
    if (isCanceledWhitelist) return canceledWhitelistMessage;
    if (isNotApplyWhiteList) return isNotApplyWhiteListMessage;
    if (isLostWhiteList) return lostWhiteListMessage;
    if (isNeedApprove) return needApproveMessage;
    if (isApproved) return approvedMessage;
  }
  else if (isBeforeClaimTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isCanceledWhitelist) return canceledWhitelistMessage;
    if (isNotApplyWhiteList) return isNotApplyWhiteListMessage;
    if (isLostWhiteList) return lostWhiteListMessage;
    return swapFullMessage;
  }
  else if (isClaimTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isCanceledWhitelist) return canceledWhitelistMessage;
    if (isNotApplyWhiteList) return isNotApplyWhiteListMessage;
    if (isLostWhiteList) return lostWhiteListMessage;
    if (isClaimable) return isClaimableMessage;
  }
  else if (isEndTime) {
    if (isNetworkError) return networkErrorMessage;
    if (isCanceledWhitelist) return canceledWhitelistMessage;
    if (isNotApplyWhiteList) return isNotApplyWhiteListMessage;
    if (isLostWhiteList) return lostWhiteListMessage;
    if (isEnd) return isEndMessage;
  }
  return null
}

export default BannerNotification;
