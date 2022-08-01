import { Tooltip } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TransactionSubmitModal from "../../../components/Base/TransactionSubmitModal";
import { TokenType } from "../../../hooks/useTokenDetails";
import { alertFailure } from "../../../store/actions/alert";
import { updateUserClaimInfo } from "../../../store/actions/claim-user-info";
import { convertTimeToStringFormat } from "../../../utils/convertDate";
import { numberWithCommas } from "../../../utils/formatNumber";
import Button from "../Button";
import useDetectClaimConfigApplying from "../hooks/useDetectClaimConfigApplying";
import useTokenClaim from "../hooks/useTokenClaim";
import useUserRemainTokensClaim from "../hooks/useUserRemainTokensClaim";
import ClaimInfo from "./ClaimInfo";
import useStyles from "./style";

type ClaimTokenProps = {
  releaseTime: Date | undefined;
  tokenDetails: TokenType | undefined;
  poolAddress: string | undefined;
  ableToFetchFromBlockchain: boolean | undefined;
  buyTokenSuccess: boolean | undefined;
  poolId: number | undefined;
  disableAllButton: boolean;
  poolDetails: any;
  currencyName: any;
  startBuyTimeInDate: any;
  width: any;
  isPreOrderPool?: boolean;
  allowUserBuyPreOrder?: boolean;
  startBuyTimeNormal: any;
};

const tickIcon = "/images/icons/tick_claim.svg";

const ClaimToken: React.FC<ClaimTokenProps> = (props: ClaimTokenProps) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [openClaimModal, setOpenClaimModal] = useState<boolean>(false);
  const [userPurchased, setUserPurchased] = useState<number>(0);
  const [userClaimInfo, setUserClaimInfo] = useState<any>();

  const { account: connectedAccount } = useWeb3React();
  const {
    releaseTime,
    poolDetails,
    tokenDetails,
    poolAddress,
    poolId,
    buyTokenSuccess,
    disableAllButton,
    currencyName,
    startBuyTimeInDate,
    isPreOrderPool,
    allowUserBuyPreOrder,
    startBuyTimeNormal,
  } = props;

  const nowTime = new Date();
  const {
    claimToken,
    setClaimTokenLoading,
    transactionHash,
    claimTokenSuccess,
    loading,
    error,
  } = useTokenClaim(poolAddress, poolId);
  const { retrieveClaimableTokens } = useUserRemainTokensClaim(
    tokenDetails,
    poolAddress,
    poolDetails?.networkAvailable || poolDetails?.network_available
  );
  const availableClaim = releaseTime ? nowTime >= releaseTime : false;

  useEffect(() => {
    const fetchUserPurchased = async () => {
      if (connectedAccount && poolAddress) {
        const userClaimInformations = await retrieveClaimableTokens(
          connectedAccount
        );
        // console.log("userClaimInformations", userClaimInformations);
        dispatch(updateUserClaimInfo(userClaimInformations));
        setUserClaimInfo(userClaimInformations);
        setUserPurchased(
          (userClaimInformations?.userPurchasedReturn || 0) as number
        );
      }
    };

    fetchUserPurchased();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, poolAddress, claimTokenSuccess, buyTokenSuccess]);

  useEffect(() => {
    if (error) {
      setOpenClaimModal(false);
      setClaimTokenLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const userPurchasedValue = userClaimInfo?.userPurchased || 0;
  const userClaimed = userClaimInfo?.userClaimed || 0;
  const {
    currentClaim,
    currentClaimIndex,
    nextClaim,
    nextClaimIndex,
    maximumTokenClaimUtilNow,
  } = useDetectClaimConfigApplying(
    poolDetails,
    userPurchasedValue,
    userClaimed
  );

  const validateClaimable = () => {
    if (new BigNumber(userPurchased).lte(0)) {
      dispatch(alertFailure("You not enough claimable token!"));
      return false;
    }

    if (!availableClaim) {
      dispatch(alertFailure("You can not claim token at current time!"));
      return false;
    }

    if (nextClaim && new BigNumber(maximumTokenClaimUtilNow).lte(0)) {
      dispatch(
        alertFailure(
          "Please wait until the next milestone to claim the tokens."
        )
      );
      return false;
    }

    if (
      !nextClaim &&
      new BigNumber(maximumTokenClaimUtilNow).lte(0) // maximumTokenClaimUtilNow <= 0
    ) {
      dispatch(alertFailure("You not enough claimable token!"));
      return false;
    }

    if (disableAllButton) {
      dispatch(alertFailure("Please switch to correct network before Claim!"));
      return false;
    }
    return true;
  };

  const handleTokenClaim = async () => {
    if (!validateClaimable()) {
      return;
    }
    try {
      setOpenClaimModal(true);
      await claimToken();
    } catch (err) {
      setOpenClaimModal(false);
    }
  };

  const [progress, setProgress] = useState([
    {},
    {
      percent: 100,
      marked: true,
      tokenAmount: 10000,
      date: new Date(),
      showInfo: true,
      currentPercent: 100,
    },
  ]);
  const [currentPercentClaim, setCurrentPercentClaim] = useState<number>(0);
  const [policy, setPolicy] = useState("");

  useEffect(() => {
    //calculate progress
    const userPurchased = userClaimInfo?.userPurchased || 0;
    const userClaimed = userClaimInfo?.userClaimed || 0;
    const percentClaimed =
      new BigNumber(userClaimed)
        .dividedBy(userPurchased)
        .multipliedBy(100)
        .toNumber() || 0;
        
    setCurrentPercentClaim(percentClaimed);
    let currentPercent = 0;
    let nextClaim = poolDetails.campaignClaimConfig.reduce(
      (next: number, cfg: any) => {
        return +cfg.max_percent_claim <= percentClaimed ? next + 1 : next;
      },
      0
    );
    const config = poolDetails.campaignClaimConfig.map(
      (cfg: any, index: number) => {
        let percent = +cfg.max_percent_claim,
          tokenAmount = new BigNumber(userPurchased)
            .multipliedBy(percent / 100)
            .toString(),
          date = new Date(cfg.start_time * 1000),
          marked = +cfg.max_percent_claim <= percentClaimed,
          showInfo =
            index === poolDetails.campaignClaimConfig.length - 1 ||
            index === nextClaim;
        const item = {
          percent,
          tokenAmount,
          date,
          marked,
          showInfo,
          currentPercent: cfg.max_percent_claim - currentPercent,
        };
        currentPercent = +cfg.max_percent_claim;
        return item;
      }
    );

    setProgress(config);
    //calculate policy
    //TODO: get policy from backend
    let policy =
      poolDetails?.claimPolicy ||
      "You can claim all tokens after " +
        convertTimeToStringFormat(
          new Date(
            poolDetails.campaignClaimConfig[
              poolDetails.campaignClaimConfig?.length - 1
            ]?.start_time * 1000
          )
        );
    setPolicy(policy);
  }, [poolDetails, userClaimInfo]);

  if (!startBuyTimeInDate || nowTime < startBuyTimeInDate) {
    return <></>;
  }

  // Check with PreOrder Pool
  if (isPreOrderPool && startBuyTimeNormal) {
    if (nowTime < startBuyTimeNormal) {
      if (!allowUserBuyPreOrder) {
        return <></>;
      }
    }
  }
  function pickColor(percent: any, currentPercentClaim: any) {
    const color1 = [253, 132, 156];
    const color2 = [105, 1, 252];
    const p = new BigNumber(percent).dividedBy(currentPercentClaim).toNumber();
    console.log("percent current", p);

    const w = p * 2 - 1;
    const w1 = (w / 1 + 1) / 2;
    const w2 = 1 - w1;
    const rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2),
    ];
    return "rgb(" + rgb.join() + ")";
  }

  if (new BigNumber(userPurchased).gt(0)) {
    return (
      <div className={styles.poolDetailClaim}>
        <div className={styles.poolDetailClaimTitle}>Token Claim</div>

        <ClaimInfo
          poolDetails={poolDetails}
          tokenDetails={tokenDetails}
          userClaimInfo={userClaimInfo}
          releaseTime={releaseTime}
          currentClaim={currentClaim}
          currentClaimIndex={currentClaimIndex}
          nextClaim={nextClaim}
          nextClaimIndex={nextClaimIndex}
          maximumTokenClaimUtilNow={maximumTokenClaimUtilNow}
          policy={policy}
          currencyName={currencyName}
          progress={progress}
        />

        <ul className={styles.poolDetailClaimProgress}>
          <div
            className="percentClaimed"
            style={
              isWidthDown("xs", props.width) ? { height: `${currentPercentClaim}%` } : { width: `${currentPercentClaim}%` }
            }
          ></div>
          <li className={`first-item ${progress[0]?.marked ? "active" : ""}`}>
            <div
              className="mark"
              style={
                progress[0]?.marked
                  ? { background: pickColor(0,currentPercentClaim) }
                  : { background: "#23262F" }
              }
            >
              {progress[0]?.marked && <img src={tickIcon} alt="" />}
            </div>
            <div className="info">
              <div>0%&nbsp;</div>
            </div>
          </li>
          {progress.map((item, index) => {
            return (
              <li
                key={index}
                style={
                  isWidthDown("xs", props.width)
                    ? { height: `${item?.currentPercent}%` }
                    : { width: `${item?.currentPercent}%` }
                }
                className={`item ${
                  item.marked || (index === 0 && progress[0]?.marked)
                    ? "active"
                    : ""
                } ${
                  progress.length === 1
                    ? "solo"
                    : index === progress.length - 1
                    ? "last-item"
                    : ""
                }`}
              >
                <div
                  className="mark"
                  style={
                    item.marked
                      ? {
                          background: pickColor(
                            item.percent,
                            currentPercentClaim
                          ),
                        }
                      : { background: "#23262F" }
                  }
                >
                  {item.marked && <img src={tickIcon} alt="" />}
                </div>
                <div
                  className={`info ${
                    item.showInfo &&
                    !isWidthDown("xs", props.width) &&
                    progress.length > 2
                      ? "show"
                      : ""
                  }`}
                >
                  {item.showInfo || isWidthDown("xs", props.width) ? (
                    <>
                      <div>
                        {numberWithCommas(item?.percent + "", 1)}% (
                        {numberWithCommas(`${item?.tokenAmount + ""}`, 1)}{" "}
                        {tokenDetails?.symbol})
                      </div>
                      <div>
                        {item.date && convertTimeToStringFormat(item.date)}
                      </div>
                    </>
                  ) : (
                    <Tooltip
                      title={
                        <div>
                          <p>
                            {numberWithCommas("" + item.tokenAmount)}{" "}
                            {tokenDetails?.symbol}
                          </p>
                          <p>
                            {item.date && convertTimeToStringFormat(item.date)}
                          </p>
                        </div>
                      }
                    >
                      <div>{numberWithCommas(item?.percent + "", 1)}%</div>
                    </Tooltip>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <Button
          style={{ marginTop: 16 }}
          text={"Claim Tokens"}
          disabled={
            !availableClaim ||
            userPurchased <= 0 ||
            disableAllButton ||
            loading ||
            (nextClaim && new BigNumber(maximumTokenClaimUtilNow).lte(0))
          }
          loading={loading}
          onClick={handleTokenClaim}
        />

        <TransactionSubmitModal
          opened={openClaimModal}
          handleClose={() => {
            setOpenClaimModal(false);
            // setClaimTokenLoading(false);
          }}
          transactionHash={transactionHash}
          networkAvailable={poolDetails?.networkAvailable}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default withWidth()(ClaimToken);
