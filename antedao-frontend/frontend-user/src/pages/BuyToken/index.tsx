import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HashLoader } from "react-spinners";
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//@ts-ignore';
import withWidth from '@material-ui/core/withWidth';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import usePoolDetailsMapping from './hooks/usePoolDetailsMapping';
import useAuth from '../../hooks/useAuth';
import usePoolDetails from '../../hooks/usePoolDetails';
import useTokenSoldProgress from './hooks/useTokenSoldProgress';
import usePoolJoinAction from './hooks/usePoolJoinAction';
import useWhitelistSubmissionDetail from './hooks/useWhitelistSubmissionDetail';
import useFetch from '../../hooks/useFetch';
import LotteryWinners from './LotteryWinners';
import ClaimToken from './ClaimToken';
import BuyTokenForm from './BuyTokenForm';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { ETH_CHAIN_ID, BSC_CHAIN_ID, POLYGON_CHAIN_ID } from '../../constants/network';
import { getPoolCountDown, getPoolCountDownPreOrder } from '../../utils/getPoolCountDown';
import { sotaTiersActions } from '../../store/constants/sota-tiers';
import useStyles from './style';
import { pushMessage } from '../../store/actions/message';
import { getIconCurrencyUsdt } from "../../utils/usdt";
import { POOL_TYPE, KYC_STATUS } from "../../constants";

// new component update ui
import ByTokenHeader from "./ByTokenHeader";
import BuyTokenPoolTimeLine from "./BuyTokenPoolTimeLine";
import BuyTokenPoolSwapInfo from "./BuyTokenPoolSwapInfo";
import BuyTokenPoolDetails from "./BuyTokenPoolDetails";
import BannerNotification from "./ByTokenHeader/BannerNotification";
import ApplyWhiteListButton from "./ByTokenHeader/ApplyWhiteListButton";
import HowToParticipant from "./HowToParticipant";
import ApplyWhitelistModal from "./ApplyWhitelistModal/ApplyWhitelistModal";

import {
  checkIsInPreOrderTime,
  checkIsPoolPreOrder,
  checkIsEnoughTierPreOrder,
  checkAllowUserBuyPreOrder
} from "../../utils/preOrder";
import { Helmet } from 'react-helmet';
import { SEO_IDO_DETAIL } from '../../utils/seoConfig';


enum HeaderType {
  Main = "Main",
  About = "About the project",
  Participants = "Winner",
  MyTier = "My Tier"
}

const BuyToken: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [buyTokenSuccess, setBuyTokenSuccess] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState(HeaderType.About);
  const [disableAllButton, setDisableAllButton] = useState<boolean>(false);
  const [showWhitelistFormModal, setShowWhitelistFormModal] = useState<boolean>(false);

  const { pathname } = useLocation();
  const { id } = useParams() as any;
  /* const userTier = useTypedSelector(state => state.userTier).data; */
  const { appChainID } = useTypedSelector(state => state.appNetwork).data;
  const { poolDetails, loading: loadingPoolDetail } = usePoolDetails(id);
  const { connectedAccount, wrongChain } = useAuth();
  // Fetch token sold, total tokens sold
  const { tokenSold, soldProgress } = useTokenSoldProgress(
    poolDetails?.poolAddress,
    poolDetails?.amount,
    poolDetails?.networkAvailable,
    poolDetails,
  );
  const { joinPool, poolJoinLoading, joinPoolSuccess } = usePoolJoinAction({ poolId: poolDetails?.id, poolDetails });
  const { data: existedWinner } = useFetch<Array<any>>(
    (poolDetails && connectedAccount) ? `/pool/${poolDetails?.id}/check-exist-winner?wallet_address=${connectedAccount}` : undefined,
    poolDetails?.method !== "whitelist"
  );
  const { data: userCanceledWhiteList } = useFetch<any>(
    (poolDetails && connectedAccount) ? `/user/check-canceled-campaign?wallet_address=${connectedAccount}&campaign_id=${poolDetails?.id}` : undefined
  );

  const { data: dataUser } = useFetch<any>(connectedAccount ? `/user/profile?wallet_address=${connectedAccount}` : undefined);
  const { data: pickedWinner } = useFetch<Array<any>>(
    poolDetails?.isDeployed ? `/pool/${poolDetails.id}/check-picked-winner` : undefined,
  );

  const { data: alreadyJoinPool } = useFetch<boolean>(
    poolDetails && connectedAccount ?
      `/user/check-join-campaign/${poolDetails?.id}?wallet_address=${connectedAccount}`
      : undefined
  );

  const {
    submission: whitelistSubmission,
    completed: whitelistCompleted,
    loading: whitelistLoading,
    pending: whitelistPending
  } = useWhitelistSubmissionDetail(poolDetails?.id, connectedAccount, alreadyJoinPool, joinPoolSuccess)

  // const { data: verifiedEmail = true } = useFetch<boolean>(
  //   poolDetails && connectedAccount && isAuth ?
  //   `/user/check-wallet-address?wallet_address=${connectedAccount}`
  //   : undefined
  // );
  const verifiedEmail = true;
  const { data: currentUserTier } = useFetch<any>(
    id && connectedAccount ?
      `pool/${id}/user/${connectedAccount}/current-tier`
      : undefined,
  );
  const { data: winnersList } = useFetch<any>(`/user/winner-list/${id}?page=1&limit=10&`);

  const poolDetailsMapping = usePoolDetailsMapping(poolDetails);

  // Use for check whether pool exist in selected network or not
  const appNetwork = (() => {
    switch (appChainID) {
      case BSC_CHAIN_ID:
        return 'bsc';

      case POLYGON_CHAIN_ID:
        return 'polygon';

      case ETH_CHAIN_ID:
        return 'eth';
    }
  })();
  const ableToFetchFromBlockchain = appNetwork === poolDetails?.networkAvailable && !wrongChain;
  const userBuyLimit = currentUserTier?.max_buy || 0;
  const userBuyMinimum = currentUserTier?.min_buy || 0;
  const currentUserTierLevel = currentUserTier?.level || 0;

  // Detech PreOrder
  const isPreOrderPool = checkIsPoolPreOrder({ poolDetails, currentUserTierLevel });
  const isEnoughTierPreOrder = checkIsEnoughTierPreOrder({ poolDetails, currentUserTierLevel });
  const isInPreOrderTime = isPreOrderPool && checkIsInPreOrderTime({ poolDetails, currentUserTierLevel });
  const allowUserBuyPreOrder = isPreOrderPool && checkAllowUserBuyPreOrder({
    poolDetails,
    currentUserTierLevel,
    userJoined: (alreadyJoinPool || joinPoolSuccess),
    userIsWinner: existedWinner,
  });

  // With Whitelist situation, Enable when join time < current < end join time
  // With FCFS, always disable join button
  const joinTimeInDate = poolDetails?.joinTime ? new Date(Number(poolDetails?.joinTime) * 1000) : undefined;
  const endJoinTimeInDate = poolDetails?.endJoinTime ? new Date(Number(poolDetails?.endJoinTime) * 1000) : undefined;

  const startStartTimePreOrder = (poolDetails?.startPreOrderTime ? new Date(Number(poolDetails?.startPreOrderTime) * 1000) : undefined);
  const startBuyTimeNormal = (poolDetails?.startBuyTime ? new Date(Number(poolDetails?.startBuyTime) * 1000) : undefined);
  const startBuyTimeInDate = isInPreOrderTime ? startStartTimePreOrder : startBuyTimeNormal;

  const endStartTimePreOrder = (poolDetails?.startBuyTime ? new Date(Number(poolDetails?.startBuyTime) * 1000) : undefined);
  const endBuyTimeNormal = (poolDetails?.endBuyTime ? new Date(Number(poolDetails?.endBuyTime) * 1000) : undefined)
  const endBuyTimeInDate = isInPreOrderTime ? endStartTimePreOrder : endBuyTimeNormal;

  const announcementTime = poolDetails?.whitelistBannerSetting?.announcement_time ? new Date(Number(poolDetails?.whitelistBannerSetting?.announcement_time) * 1000) : undefined;
  /* const tierStartBuyInDate = new Date(Number(currentUserTier?.start_time) * 1000); */
  /* const tierEndBuyInDate = new Date(Number(currentUserTier?.end_time) * 1000); */
  const releaseTimeInDate = poolDetails?.releaseTime ? new Date(Number(poolDetails?.releaseTime) * 1000) : undefined;

  const [activeTabBottom, setActiveTabBottom] = useState('tab_pool_details')
  const [numberWiner, setNumberWiner] = useState(0);

  // Get Currency Info
  const { currencyName } = getIconCurrencyUsdt({
    purchasableCurrency: poolDetails?.purchasableCurrency,
    networkAvailable: poolDetails?.networkAvailable,
  });

  const today = new Date();

  const availablePurchase = startBuyTimeInDate && endBuyTimeInDate &&
    today >= startBuyTimeInDate &&
    today <= endBuyTimeInDate &&
    /* today >= tierStartBuyInDate && */
    /* today <= tierEndBuyInDate && */
    poolDetails?.isDeployed &&
    verifiedEmail;
  /* (poolDetails?.method === 'whitelist' ? alreadyJoinPool: true); */

  const currentFCFSRound = poolDetails?.fcfsRoundsSetting && [...poolDetails?.fcfsRoundsSetting].reverse().find((fcfs: any) => {
    if (endBuyTimeNormal) {
      const startBuyFCFSPhase = new Date(Number(poolDetails.endBuyTime) * 1000);
      startBuyFCFSPhase.setMinutes(endBuyTimeNormal.getMinutes() - Number(fcfs.before_buy_end_time));
      if (startBuyFCFSPhase <= today && today <= endBuyTimeNormal) return true;
    }
    return false;
  });

  // const poolStatus = getPoolStatusByPoolDetail(
  //   poolDetails,
  //   tokenSold
  // );

  
  const displayCountDownTime = useCallback((
    method: string | undefined,
    startJoinTime: Date | undefined,
    endJoinTime: Date | undefined,
    startBuyTime: Date | undefined,
    endBuyTime: Date | undefined
  ) => {
    if (isEnoughTierPreOrder && isInPreOrderTime) { // Pool is PreOrder Pool and Pool in PreOrder Time Actived
      return getPoolCountDownPreOrder({ endBuyTime });
    }
    return getPoolCountDown(
      startJoinTime,
      endJoinTime,
      startBuyTime,
      endBuyTime,
      releaseTimeInDate,
      method,
      poolDetails?.campaignStatus,
      poolDetails,
      soldProgress,
      poolDetails?.isPrivate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetails?.method, poolDetails?.isPrivate, joinTimeInDate, endJoinTimeInDate, startBuyTimeInDate, endBuyTimeInDate]);

  const { date: countDownDate, display } = (isEnoughTierPreOrder && isInPreOrderTime)
    ? displayCountDownTime(poolDetails?.method, joinTimeInDate, endJoinTimeInDate, startBuyTimeInDate, endBuyTimeInDate)
    : displayCountDownTime(poolDetails?.method, joinTimeInDate, endJoinTimeInDate, startBuyTimeNormal, endBuyTimeNormal);

  useEffect(() => {
    setActiveNav(HeaderType.Main);
    if (!poolDetails?.isDeployed) setActiveNav(HeaderType.About);
    if (availablePurchase) setActiveNav(HeaderType.Main);
  }, [availablePurchase, poolDetails]);

  // Auto Scroll To Top When redirect from other pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide main tab after end buy time
  useEffect(() => {
    if (
      endBuyTimeInDate && endBuyTimeInDate < new Date() &&
      activeNav === HeaderType.Main
    ) setActiveNav(HeaderType.About);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endBuyTimeInDate]);

  useEffect(() => {
    currentUserTier && dispatch({
      type: sotaTiersActions.USER_TIER_SUCCESS,
      payload: currentUserTier.level
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserTier]);

  useEffect(() => {
    const appNetwork = (() => {
      switch (appChainID) {
        case BSC_CHAIN_ID:
          return 'bsc';

        case POLYGON_CHAIN_ID:
          return 'polygon';

        case ETH_CHAIN_ID:
          return 'eth';
      }
    })();
    setDisableAllButton(appNetwork !== poolDetails?.networkAvailable);
    if (appNetwork !== poolDetails?.networkAvailable && poolDetails) {
      dispatch(pushMessage(`Please switch to (${poolDetails?.networkAvailable.toLocaleUpperCase()}) to do Apply Whitelist, Approve/Buy tokens`))
    } else {
      dispatch(pushMessage(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appChainID, poolDetails]);

  const winnerListRef = useRef(null);
  const scrollToWinner = () => {
    setActiveTabBottom('tab_winner');
    setTimeout(() => {
      // @ts-ignore
      winnerListRef && winnerListRef.current && winnerListRef.current.scrollIntoView({ behavior: "smooth" })
    }, 200);
  };
  const isOverTimeApplyWhiteList = endJoinTimeInDate && endJoinTimeInDate < today;


  const displaySwapTokenForm = () => {
    if (poolDetails?.isDeployed) {

      if (currentFCFSRound?.phase_number === 4) {
        return true
      }
      if (currentFCFSRound && [1, 2, 3].includes(currentFCFSRound?.phase_number) && (alreadyJoinPool || joinPoolSuccess)) {
        return true
      }
      if ((((alreadyJoinPool || joinPoolSuccess) &&
        startBuyTimeNormal && endBuyTimeNormal && startBuyTimeNormal < today && today < endBuyTimeNormal) && existedWinner)
      ) {
        return true
      }
    }
    return false
  }

  const displayClaimToken = () => {
    if (poolDetails?.isDeployed) {

      if (currentFCFSRound?.phase_number === 4) {
        return true
      }
      if (currentFCFSRound && [1, 2, 3].includes(currentFCFSRound?.phase_number) && (alreadyJoinPool || joinPoolSuccess)) {
        return true
      }
      if (((alreadyJoinPool || joinPoolSuccess) && existedWinner)
      ) {
        return true
      }
    }
    return false
  }

  const joinPoolFunc = async () => {

    if (poolDetails?.socialRequirement) {
      setShowWhitelistFormModal(true)
    } else {
      connectedAccount && joinPool({
        wallet_address: connectedAccount,
        user_twitter: '',
        user_telegram: '',
      })
    }
  }

  const render = () => {

    if (loadingPoolDetail) {
      return (
        <div className={styles.loader} style={{ marginTop: 70 }}>
          <HashLoader loading={true} color={'#3232DC'} />
          <p className={styles.loaderText}>
            <span style={{ marginRight: 10 }}>Loading Pool Details ...</span>
          </p>
        </div>
      )
    }

    if ((!poolDetails || !poolDetails?.isDisplay) && !loadingPoolDetail) {
      return (<p style={{
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        marginTop: 20
      }}>
        This pool does not exist. Try later! 🙂
      </p>)
    } else {
      const isVisibleApplyButton = joinTimeInDate && new Date() > joinTimeInDate && !(alreadyJoinPool || joinPoolSuccess) &&
        !(ableToFetchFromBlockchain && (winnersList && winnersList.total > 0)) && !isOverTimeApplyWhiteList;
      return (
        <>
          <Helmet>
            <title>{SEO_IDO_DETAIL.TITLE}</title>
            <meta name="description" content={SEO_IDO_DETAIL.DES}/>

            {/* <!-- Google / Search Engine Tags --> */}
            <meta item-prop="name" content={SEO_IDO_DETAIL.GOOGLE_META_NAME}/>
            <meta item-prop="description" content={SEO_IDO_DETAIL.GOOGLE_META_DES}/>
            <meta item-prop="image" content={SEO_IDO_DETAIL.GOOGLE_META_IMAGE}/>
          </Helmet>
          <BannerNotification
            poolDetails={poolDetails}
            ableToFetchFromBlockchain={ableToFetchFromBlockchain}
            winnersList={winnersList}
            verifiedEmail={verifiedEmail}
            currentUserTier={currentUserTier}
            existedWinner={existedWinner}
            currencyName={currencyName}
            userBuyLimit={userBuyLimit}

            startBuyTimeInDate={startBuyTimeNormal}
            endBuyTimeInDate={endBuyTimeNormal}

            alreadyJoinPool={alreadyJoinPool}
            joinPoolSuccess={joinPoolSuccess}
            isKYC={(dataUser?.user?.is_kyc === KYC_STATUS.APPROVED || poolDetails?.kycBypass) ? true : false}
            dataUser={dataUser}
            connectedAccount={connectedAccount}
            announcementTime={announcementTime}
            purchasableCurrency={poolDetails?.purchasableCurrency?.toUpperCase()}
            whitelistCompleted={whitelistCompleted}
            whitelistLoading={whitelistLoading}
            scrollToWinner={scrollToWinner}
            poolAddress={poolDetails?.poolAddress}
            tokenDetails={poolDetails?.tokenDetails}
            maximumBuy={userBuyLimit}
            isOverTimeApplyWhiteList={isOverTimeApplyWhiteList}
            countDownDate={countDownDate}
            isCanceledWhitelist={userCanceledWhiteList?.id}
            isPreOrderPool={isPreOrderPool}
            isInPreOrderTime={isInPreOrderTime}
            whitelistPending={whitelistPending}
          />
          <div className={styles.poolDetailContainer}>
            <section className={styles.headerComponent}>

              <ByTokenHeader
                poolDetailsMapping={poolDetailsMapping}
                poolDetails={poolDetails}
              />

              {isVisibleApplyButton && !userCanceledWhiteList?.id &&
                <ApplyWhiteListButton
                  poolDetails={poolDetails}
                  joinTimeInDate={joinTimeInDate}
                  endJoinTimeInDate={endJoinTimeInDate}
                  currentUserTier={currentUserTier}
                  connectedAccount={connectedAccount}
                  wrongChain={wrongChain}
                  verifiedEmail={verifiedEmail}

                  alreadyJoinPool={alreadyJoinPool}
                  joinPoolSuccess={joinPoolSuccess}
                  poolJoinLoading={poolJoinLoading}
                  joinPool={joinPoolFunc}
                  kycBypass= {poolDetails?.kycBypass}
                  isKYC={(dataUser?.user?.is_kyc === KYC_STATUS.APPROVED) ? true : false}
                  winnersList={winnersList}
                  ableToFetchFromBlockchain={ableToFetchFromBlockchain}
                />
              }
              {
                showWhitelistFormModal &&
                <ApplyWhitelistModal
                  poolDetails={poolDetails}
                  connectedAccount={connectedAccount}
                  joinPool={joinPool}
                  alreadyJoinPool={alreadyJoinPool}
                  joinPoolSuccess={joinPoolSuccess}
                  whitelistSubmission={whitelistSubmission}
                  handleClose={() => { setShowWhitelistFormModal(false) }}
                />
              }

            </section>

            <div className={styles.midPage}>
              <BuyTokenPoolTimeLine
                currentStatus={poolDetails?.campaignStatus}
                display={display}
                poolDetails={poolDetails}
                countDownDate={countDownDate}
              />
              <BuyTokenPoolSwapInfo
                currentUserTier={currentUserTier}
                alreadyJoinPool={alreadyJoinPool}
                poolDetails={poolDetails}
                currencyName={currencyName}
              />
            </div>

            {
              displaySwapTokenForm() &&
              <BuyTokenForm
                disableAllButton={disableAllButton}
                existedWinner={existedWinner}
                alreadyJoinPool={alreadyJoinPool}
                joinPoolSuccess={joinPoolSuccess}
                tokenDetails={poolDetails?.tokenDetails}
                networkAvailable={poolDetails?.networkAvailable || ''}
                rate={poolDetails?.ethRate}
                poolAddress={poolDetails?.poolAddress}
                maximumBuy={userBuyLimit}
                minimumBuy={userBuyMinimum}
                poolAmount={poolDetails?.amount}
                purchasableCurrency={poolDetails?.purchasableCurrency?.toUpperCase()}
                poolId={poolDetails?.id}
                joinTime={joinTimeInDate}
                method={poolDetails?.method}
                availablePurchase={availablePurchase}
                ableToFetchFromBlockchain={ableToFetchFromBlockchain}
                minTier={poolDetails?.minTier}
                isDeployed={poolDetails?.isDeployed}

                // Apply Normal Time
                startBuyTimeInDate={startBuyTimeNormal}
                endBuyTimeInDate={endBuyTimeNormal}

                endJoinTimeInDate={endJoinTimeInDate}
                tokenSold={tokenSold}
                setBuyTokenSuccess={setBuyTokenSuccess}
                isClaimable={poolDetails?.type === 'claimable'}
                currentUserTier={currentUserTier}
                poolDetailsMapping={poolDetailsMapping}
                poolDetails={poolDetails}

                // Setting Disable PreOrder
                isInPreOrderTime={false}
              />
            }

            {
              (alreadyJoinPool || joinPoolSuccess) &&
              isPreOrderPool &&      // Pre Order Pool
              isEnoughTierPreOrder &&
              allowUserBuyPreOrder &&
              startBuyTimeInDate &&
              endBuyTimeInDate &&
              startBuyTimeInDate < new Date() && new Date() < endBuyTimeInDate &&
              <BuyTokenForm
                disableAllButton={disableAllButton}
                existedWinner={existedWinner}
                alreadyJoinPool={alreadyJoinPool}
                joinPoolSuccess={joinPoolSuccess}
                tokenDetails={poolDetails?.tokenDetails}
                networkAvailable={poolDetails?.networkAvailable || ''}
                rate={poolDetails?.ethRate}
                poolAddress={poolDetails?.poolAddress}
                maximumBuy={userBuyLimit}
                minimumBuy={userBuyMinimum}
                poolAmount={poolDetails?.amount}
                purchasableCurrency={poolDetails?.purchasableCurrency?.toUpperCase()}
                poolId={poolDetails?.id}
                joinTime={joinTimeInDate}
                method={poolDetails?.method}
                availablePurchase={availablePurchase}
                ableToFetchFromBlockchain={ableToFetchFromBlockchain}
                minTier={poolDetails?.minTier}
                isDeployed={poolDetails?.isDeployed}

                // Apply PreOrder Time
                startBuyTimeInDate={startBuyTimeInDate}
                endBuyTimeInDate={endBuyTimeInDate}

                endJoinTimeInDate={endJoinTimeInDate}
                tokenSold={tokenSold}
                setBuyTokenSuccess={setBuyTokenSuccess}
                isClaimable={poolDetails?.type === 'claimable'}
                currentUserTier={currentUserTier}
                poolDetailsMapping={poolDetailsMapping}
                poolDetails={poolDetails}

                // Setting Enable PreOrder
                isInPreOrderTime={isInPreOrderTime}
              />
            }

            {
              poolDetails?.type === POOL_TYPE.CLAIMABLE &&
              displayClaimToken() && releaseTimeInDate && (new Date() > releaseTimeInDate) &&
              <ClaimToken
                releaseTime={poolDetails?.releaseTime ? releaseTimeInDate : undefined}
                ableToFetchFromBlockchain={ableToFetchFromBlockchain}
                poolAddress={poolDetails?.poolAddress}
                tokenDetails={poolDetails?.tokenDetails}
                buyTokenSuccess={buyTokenSuccess}
                poolId={poolDetails?.id}
                disableAllButton={disableAllButton}
                poolDetails={poolDetails}
                currencyName={currencyName}
                startBuyTimeInDate={startBuyTimeInDate}
                isPreOrderPool={isPreOrderPool}
                allowUserBuyPreOrder={allowUserBuyPreOrder}
                startBuyTimeNormal={startBuyTimeNormal}
              />
            }

            <div className={styles.boxBottom}>
              <ul className={`${!!pickedWinner && 'multilTabBottom'} ${styles.navBottom}`}>
                <li onClick={() => setActiveTabBottom('tab_pool_details')} className={activeTabBottom === 'tab_pool_details' ? 'active' : ''}>Pool Details</li>
                {
                  !!pickedWinner &&
                  <li onClick={() => setActiveTabBottom('tab_winner')} className={activeTabBottom === 'tab_winner' ? 'active' : ''}>
                    Winner ({numberWiner})
                  </li>
                }
              </ul>
              {
                activeTabBottom === 'tab_pool_details' &&
                <BuyTokenPoolDetails
                  poolDetails={poolDetails}
                />
              }

              <div className={`${activeTabBottom === 'tab_winner' && 'show'} ${styles.hiddenTabWinner}`}>
                <div ref={winnerListRef} />
                <LotteryWinners
                  handleWiners={(total) => setNumberWiner(total)}
                  poolId={poolDetails?.id}
                  userWinLottery={existedWinner ? true : false}
                  pickedWinner={!!pickedWinner}
                  maximumBuy={userBuyLimit}
                  purchasableCurrency={poolDetails?.purchasableCurrency.toUpperCase()}
                  verifiedEmail={verifiedEmail ? true : false}
                />
              </div>
            </div>

            <HowToParticipant
              poolDetails={poolDetails}
              joinTimeInDate={joinTimeInDate}
              endJoinTimeInDate={endJoinTimeInDate}
              currentUserTier={currentUserTier}
              alreadyJoinPool={alreadyJoinPool}
              joinPoolSuccess={joinPoolSuccess}
              whitelistCompleted={whitelistCompleted}
              isKYC={(dataUser?.user?.is_kyc === KYC_STATUS.APPROVED || poolDetails?.kycBypass) ? true : false}
            />

          </div>
        </>
      )
    }
  }

  return (
    <DefaultLayout>
      {render()}
    </DefaultLayout>
  )
}

export default withWidth()(BuyToken);
