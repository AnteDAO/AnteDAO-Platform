/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, InputLabel } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, utils } from "ethers";
import { BigNumber as Bignum } from "bignumber.js";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldInput from "../../components/Input";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Loader from "../../components/Loader";
import { ETH_CHAIN_ID } from "../../constants/network";
import useFetch from "../../hooks/useFetch";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import useTokenApprove from "../../hooks/useTokenApprove";
import useTokenBalance from "../../hooks/useTokenBalance";
import useTokenDetails from "../../hooks/useTokenDetails";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { alertFailure } from "../../store/actions/alert";
import { getBalance } from "../../store/actions/balance";
import { getUserInfo } from "../../store/actions/sota-tiers";
import {
  nFormatterMilion,
  numberWithCommas,
  roundShortNumberBuyDecimals,
} from "../../utils/formatNumber";
import nFormatter from "../../utils/nFormatter";
import useDetailListStakingPool from "./hook/useDetailListStaking";
import useLinearStake from "./hook/useLinearStake";
import useLinearUnstake from "./hook/useLinearUnstake";
import ModalStake from "./ModalStake";
import useStyles from "./style";
import _ from "lodash";
import useStakePoolDetail from "./hook/useStakePoolDetail";
import useStakeFee from "./hook/useStakeFee";
import TransactionSubmitModal from "../../components/Base/TransactionSubmitModal";
import { Helmet } from "react-helmet";
import { SEO_STAKING } from "../../utils/seoConfig";
// image
const logo = "/images/landing/logo-brand.svg";
const iconWarning = "/images/warning-red.svg";

// start mock
const listTiers = [
  { id: 0, tier: 1, value: "1x" },
  { id: 1, tier: 2, value: "2x" },
  { id: 2, tier: 3, value: "2x" },
  { id: 3, tier: 4, value: "2x" },
  { id: 4, tier: 5, value: "3x" },
  { id: 5, tier: 6, value: "6x" },
  { id: 6, tier: 7, value: "14x" },
  { id: 7, tier: 8, value: "22x" },
  { id: 8, tier: 9, value: "28x" },
];

const ONE_DAY_IN_SECONDS = 86400;
// end mock

const Stake = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { account: connectedAccount, chainId } = useWeb3React() as any;
  const { appChainID, walletChainID } = useTypedSelector(
    (state) => state.appNetwork
  ).data;
  const [days, setDays] = useState([]) as any;
  const [poolList, setPoolList] = useState([]) as any;
  const [poolSelected, setPoolSelected] = useState({}) as any;
  const [tokenAllowance, setTokenAllowance] = useState(BigNumber.from("0"));
  const [stakeAmount, setStakeAmount] = useState<any>(null);
  const [unstakeAmount, setUnstakeAmount] = useState<any>(null);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [openSubmitModalUnstake, setOpenSubmitModalUnstake] = useState(false);

  const { data: poolsList } = useFetch<any>(`/staking-pool`);
  const { data: tierListData } = useFetch<any>(`/get-tiers`);
  const [tiersList, setTiersList] = useState([]) as any;
  const { data: userTier } = useSelector((state: any) => state.userTier);
  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const totalStakeAmount = userInfo?.totalStaked
    ? numberWithCommas(Number(userInfo?.totalStaked).toString() || "0")
    : "0";

  const {
    linearPools,
    fetchDetailList,
    loading: loadingDetailList,
  } = useDetailListStakingPool(poolsList);

  const {
    minimumStake,
    fetchStakingPoolDetail,
    loading: loadingDetailSakePool,
    unStakeFee,
  } = useStakePoolDetail(poolSelected);

  const { fetchStakeFee, feeValue, stakeStatus, unstakeStatus } =
    useStakeFee(poolSelected);
  const { retrieveTokenAllowance } = useTokenAllowance();
  const { tokenDetails } = useTokenDetails(
    poolSelected?.acceptedToken,
    "matic"
  );
  const {
    linearStakeToken,
    tokenStakeLoading,
    transactionHash: stakeHash,
    stakeError,
  } = useLinearStake(
    poolSelected?.pool_address,
    poolSelected?.pool_id,
    stakeAmount
  );
  const {
    linearUnstakeToken,
    tokenUnstakeLoading,
    unStaketransactionHash,
    unStakeError,
  } = useLinearUnstake(
    poolSelected?.pool_address,
    poolSelected?.pool_id,
    unstakeAmount
  );

  const { retrieveTokenRawBalance } = useTokenBalance(
    tokenDetails,
    connectedAccount
  );
  const { approveToken, tokenApproveLoading } = useTokenApprove(
    tokenDetails,
    connectedAccount,
    poolSelected.pool_address,
    false,
    false
  );

  const [confirmationText, setConfirmationText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [previousStep, setPreviousStep] = useState("");
  useEffect(() => {
    const initDays =
      poolsList &&
      poolsList.map((el: any, index: number) => {
        if (index === 0) return { ...el, active: true };
        return { ...el, active: false };
      });

    setDays(initDays);
  }, [poolsList]);

  useEffect(() => {
    const getTierList = () => {
      if (tierListData?.length) {
        const tierList = listTiers.map((tier, index) => {
          const am = tierListData.find(
            (el: any) => el?.tier === tier.tier
          )?.token_amount;
          return {
            ...tier,
            amount: Number(am).toLocaleString("us-US"),
          };
        });
        setTiersList(tierList);
      }
    };

    getTierList();
  }, [tierListData, poolSelected]);

  useEffect(() => {
    connectedAccount && dispatch(getUserInfo(connectedAccount));
  }, [connectedAccount, dispatch]);

  useEffect(() => {
    setStakeAmount(null);
    setUnstakeAmount(null);
  }, [connectedAccount, chainId]);

  const handleClickDays = (value: number) => {
    const newDays = days.map((el: any) => {
      if (el.pool_id === value) return { ...el, active: true };
      return { ...el, active: false };
    });
    setStakeAmount(null);
    setUnstakeAmount(null);
    setDays(newDays);
  };

  const reloadData = useCallback(async () => {
    if (connectedAccount) {
      dispatch(getBalance(connectedAccount));
    }
    fetchDetailList && fetchDetailList();
  }, [connectedAccount, fetchDetailList, dispatch]);

  const handleApprove = async () => {
    if (!navigator.onLine) return dispatch(alertFailure("Transaction error!"));
    try {
      await approveToken();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStake = async () => {
    if (!navigator.onLine) return dispatch(alertFailure("Transaction error!"));
    try {
      // if (
      // 	BigNumber.from(poolSelected?.stakingAmount || "0").eq(
      // 		BigNumber.from("0"),
      // 	) &&
      // 	parseFloat(stakeAmount) < 100
      // ) {
      // 	dispatch(alertFailure("User must stake higher than 100 ANTE"));
      // 	return;
      // }
      if (parseFloat(stakeAmount) > parseFloat(tokenBalance)) {
        dispatch(alertFailure("Insufficient amount!"));
        setStakeAmount(null);
        return;
      }
      if (parseFloat(stakeAmount) < parseFloat(minimumStake)) {
        dispatch(
          alertFailure("User must stake higher than (minstake amount) ANTE")
        );
        setStakeAmount(null);
        return;
      }
      if (!confirmed && stakeStatus) {
        setPreviousStep("stake");
        setModalTitle("Stake Confirmation");
        setConfirmationText(
          `You will have to pay ${feeValue}% of staking amount as staking fee. Do you want to continue?`
        );
        setShowConfirmModal(true);
        return;
      }
      setOpenSubmitModal(true);
      const linearStake = await linearStakeToken();

      setStakeAmount(null);
      reloadData && linearStake && reloadData();
    } catch (err: any) {
      setStakeAmount(null);
      setShowConfirmModal(false);
      setOpenSubmitModal(false);
    }
  };

  const handleUnstake = async () => {
    if (!navigator.onLine) return dispatch(alertFailure("Transaction error!"));
    try {
      if (
        utils.parseEther(poolSelected?.stakingAmount).lt(BigNumber.from("0"))
      ) {
        dispatch(alertFailure("Invalid amount"));
        return;
      }
      if (
        parseFloat(unstakeAmount) >
        Number(utils.formatEther(poolSelected?.stakingAmount))
      ) {
        dispatch(alertFailure("Insufficient amount!"));
        return;
      }

      if (!confirmed) {
        if (
          Number(poolSelected?.stakingJoinedTime) +
            Number(poolSelected?.lockDuration) >
          moment().unix()
        ) {
          setPreviousStep("unstake");
          setModalTitle("Unstake early");
          setConfirmationText(
            `Are you sure to unstake early? You will have to pay ${unStakeFee}% of your current unstake amount as unstake early fee ${
              unstakeStatus ? `plus ${feeValue}% unstake fee` : ""
            } and you won’t have reward`
          );
          setShowConfirmModal(true);
          return;
        } else if (unstakeStatus) {
          setPreviousStep("unstake");
          setModalTitle("Unstake Confirmation");
          setConfirmationText(
            `You will have to pay ${feeValue}% of unstake amount as unstake fee. Do you want to continue?`
          );
          setShowConfirmModal(true);
          return;
        }
      }

      setConfirmed(false);
      setPreviousStep("");
      setOpenSubmitModalUnstake(true);
      const linearUnstake = await linearUnstakeToken();
      setUnstakeAmount(null);
      reloadData && linearUnstake && reloadData();
    } catch (err) {
      setOpenSubmitModalUnstake(false);
      setShowConfirmModal(false);
      setUnstakeAmount(null);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!confirmed) {
      return;
    }
    setShowConfirmModal(false);
    switch (previousStep) {
      case "stake":
        handleStake();
        return;

      case "unstake":
        handleUnstake();
        return;

      default:
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed, previousStep]);

  useEffect(() => {
    (async () => {
      try {
        const balance = await retrieveTokenRawBalance(
          tokenDetails,
          connectedAccount
        );
        setTokenBalance(balance as string);
      } catch (err: any) {
        setTokenBalance("0");
        console.log(err);
      }
    })();
  }, [retrieveTokenRawBalance, connectedAccount, tokenDetails, linearPools]);

  useEffect(() => {
    let listLinear = Object.values(linearPools);

    setPoolList(listLinear);
  }, [linearPools]);

  useEffect(() => {
    const selectedPoolDay =
      days && days.length > 0 && days.find((day: any) => day.active);

    const selectedPool =
      poolList &&
      poolList.find((pool: any) => pool.pool_id === selectedPoolDay?.pool_id);
    selectedPool && setPoolSelected(selectedPool);
  }, [poolList, days]);

  const loadTokenAllowance = useCallback(async () => {
    setTokenAllowance(
      BigNumber.from(
        "0x" +
          ((
            await retrieveTokenAllowance(
              tokenDetails,
              connectedAccount,
              poolSelected.pool_address
            )
          )?.toString(16) || "0")
      )
    );
  }, [
    tokenDetails,
    connectedAccount,
    poolSelected.pool_address,
    retrieveTokenAllowance,
  ]);

  useEffect(() => {
    try {
      loadTokenAllowance();
    } catch (err) {
      console.log(err);
    }
  }, [poolSelected, connectedAccount, loadTokenAllowance, tokenApproveLoading]);

  const wrongChain = useMemo(() => {
    return appChainID !== ETH_CHAIN_ID || appChainID !== walletChainID;
  }, [appChainID, walletChainID]);

  const yourLevel = tiersList.find((el: any) => el?.tier === userTier);

  const unstakeEarlyConfirm = () => {
    setConfirmed(true);
  };

  const lottery = (elx: any) => {
    if (elx.tier === 1) return "(15% Lottery)";
    if (elx.tier === 2) return "(25% Lottery)";
    if (elx.tier === 3) return "(50% Lottery)";
    return "";
  };

  useEffect(() => {
    if (!_.isEmpty(poolSelected)) {
      fetchStakingPoolDetail();
      fetchStakeFee();
    }
  }, [poolSelected]);

  const getMinimumStake = () => {
    if (stakeStatus && new Bignum(minimumStake).gt(0)) {
      const minimum = new Bignum(minimumStake).dividedBy(
        new Bignum(100).minus(feeValue).dividedBy(100)
      );
      return minimum.toFixed(2, Bignum.ROUND_UP);
    } else {
      return new Bignum(minimumStake).toFixed(2, Bignum.ROUND_UP);
    }
  };

  useEffect(() => {
    if (stakeError) {
      setOpenSubmitModal(false);
      setConfirmed(false);
    }
  }, [stakeError]);
  useEffect(() => {
    if (unStakeError) {
      setOpenSubmitModalUnstake(false);
      setConfirmed(false);
    }
  }, [unStakeError]);
  return (
    <DefaultLayout>
      <Helmet>
        <title>{SEO_STAKING.TITLE}</title>
        <meta name="description" content={SEO_STAKING.DES} />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta item-prop="name" content={SEO_STAKING.GOOGLE_META_NAME} />
        <meta item-prop="description" content={SEO_STAKING.GOOGLE_META_DES} />
        <meta item-prop="image" content={SEO_STAKING.GOOGLE_META_IMAGE} />
      </Helmet>
      {loadingDetailList && (
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      )}
      <div className={styles.wrapper}>
        {wrongChain && connectedAccount && (
          <div className="message-container">
            <div className="message-body">
              <div className="message">
                <img src={iconWarning} style={{ margin: "auto 0" }} alt="" />
                <span style={{ marginLeft: ".5rem" }}>
                  Please switch to the Ethereum network to join these staking
                  pools
                </span>
              </div>
            </div>
          </div>
        )}
        <div
          className="content"
          style={{ paddingTop: `${wrongChain ? "49px" : "0px"}` }}
        >
          <div className="stake-area">
            <Grid container spacing={4}>
              <Grid item sm={12} md={6} style={{ width: "100%" }}>
                <div className="card-info">
                  <div className="d-flex">
                    <img src={logo} className="logo" alt="" />
                    {!wrongChain && connectedAccount && (
                      <>
                        <div>
                          <div className="label">Total Staked</div>
                          <span className="value">
                            {totalStakeAmount && `${totalStakeAmount} ANTE`}
                          </span>
                        </div>
                        <div>
                          <div className="label">Your Level</div>
                          <span className="value">
                            {!yourLevel?.tier || yourLevel?.tier === 0
                              ? "None [0x]"
                              : `Tier ${yourLevel?.tier} [${yourLevel?.value}]`}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="wraper-btn-container">
                  <div className="wraper-btn">
                    {days &&
                      days.length > 0 &&
                      days.map((el: any, index: number) => (
                        <Button
                          key={index}
                          variant="contained"
                          size="small"
                          className={`${el.active ? "btn-active" : "btn"}`}
                          onClick={() => handleClickDays(el.pool_id)}
                          disabled={loadingDetailList}
                        >
                          {Number(el.lock_duration) / ONE_DAY_IN_SECONDS > 1
                            ? `${
                                Number(el.lock_duration) / ONE_DAY_IN_SECONDS
                              } days`
                            : `${
                                Number(el.lock_duration) / ONE_DAY_IN_SECONDS
                              } day`}
                        </Button>
                      ))}
                  </div>
                </div>
                <div className="card-action">
                  <div className="label">
                    Lock period:{" "}
                    <span className="value">
                      {Number(poolSelected?.lockDuration) > 0
                        ? `${(
                            Number(poolSelected?.lockDuration) /
                            ONE_DAY_IN_SECONDS
                          ).toFixed(0)} days`
                        : "0 days"}
                    </span>
                  </div>
                  <div className="d-flex-end">
                    <div className="right">
                      <div className="percent">
                        {poolSelected.APR ? `${poolSelected.APR} %` : "0 %"}
                      </div>
                      <div className="unit">
                        APR<sup>*</sup>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="group-1">
                    <Grid container spacing={1}>
                      <Grid item md={9} xs={12}>
                        <div className="data-group">
                          <InputLabel>
                            <div className="stake-label">
                              <span>{`Balance: ${
                                tokenBalance ? nFormatter(tokenBalance, 1) : 0
                              } ANTE`}</span>
                              <span>{`Minimum Stake: ${
                                !loadingDetailSakePool
                                  ? nFormatterMilion(
                                      getMinimumStake().toString(),
                                      3
                                    )
                                  : 0
                              } ANTE`}</span>
                            </div>
                          </InputLabel>
                          <div
                            className="wrap-input"
                            style={{ display: "flex" }}
                          >
                            <FieldInput
                              min={0}
                              type="number"
                              placeholder="0"
                              InputLabelProps={{ shrink: true }}
                              onChange={setStakeAmount}
                              value={stakeAmount}
                              id="balance"
                            />
                            <div className="button-group">
                              <div>
                                <Button
                                  variant="contained"
                                  size="small"
                                  className={"btn-unit-active"}
                                  onClick={() => setStakeAmount(tokenBalance)}
                                >
                                  MAX
                                </Button>
                              </div>
                              <div>
                                <div className={"btn-unit1"}>ANTE</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item md={3} xs={12} className="m-auto">
                        <div className="wrap-btn-action">
                          {connectedAccount &&
                          tokenAllowance.gt(BigNumber.from("0")) ? (
                            <Button
                              variant="contained"
                              size="small"
                              className={`btn-aprove ${
                                tokenStakeLoading ? "is-loading" : ""
                              }`}
                              onClick={handleStake}
                              disabled={
                                !connectedAccount ||
                                Number(stakeAmount) <= 0 ||
                                wrongChain ||
                                tokenStakeLoading
                              }
                            >
                              {tokenStakeLoading && <CircularProgress />}
                              Stake
                            </Button>
                          ) : !loadingDetailList ? (
                            <Button
                              variant="contained"
                              size="small"
                              className={`btn-aprove ${
                                tokenApproveLoading ? "is-loading" : ""
                              }`}
                              onClick={handleApprove}
                              disabled={
                                !connectedAccount ||
                                wrongChain ||
                                tokenApproveLoading
                              }
                            >
                              {tokenApproveLoading && <CircularProgress />}
                              Approve
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              className="btn-aprove"
                              disabled={true}
                            >
                              Approve
                            </Button>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="group-2">
                    <Grid container spacing={1}>
                      <Grid item md={9} xs={12}>
                        <div className="data-group">
                          <InputLabel>
                            <div className="stake-label">
                              <span>{`Staked: ${
                                !BigNumber.from(
                                  poolSelected?.stakingAmount || "0"
                                ).eq(BigNumber.from("0"))
                                  ? nFormatter(
                                      utils.formatEther(
                                        poolSelected?.stakingAmount
                                      ),
                                      4
                                    )
                                  : 0
                              } ANTE`}</span>
                            </div>
                          </InputLabel>
                          <div
                            className="wrap-input"
                            style={{ display: "flex" }}
                          >
                            <FieldInput
                              min={0}
                              type="number"
                              placeholder="0"
                              InputLabelProps={{ shrink: true }}
                              id="staked"
                              value={unstakeAmount}
                              onChange={setUnstakeAmount}
                            />
                            <div className="button-group">
                              <div>
                                <Button
                                  variant="contained"
                                  size="small"
                                  className={"btn-unit-active"}
                                  onClick={() =>
                                    setUnstakeAmount(
                                      utils.formatEther(
                                        poolSelected?.stakingAmount
                                      )
                                    )
                                  }
                                >
                                  MAX
                                </Button>
                              </div>
                              <div>
                                <div className="btn-unit2">ANTE</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <div className="wrap-btn-action">
                          <Button
                            variant="contained"
                            size="small"
                            className={`btn-unstake ${
                              tokenUnstakeLoading ? "is-loading" : ""
                            }`}
                            onClick={handleUnstake}
                            disabled={
                              BigNumber.from(
                                poolSelected?.stakingAmount || "0"
                              ).eq(BigNumber.from("0")) ||
                              !connectedAccount ||
                              Number(unstakeAmount) <= 0 ||
                              wrongChain ||
                              tokenUnstakeLoading
                            }
                          >
                            {tokenUnstakeLoading && <CircularProgress />}
                            Unstake
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="label">
                    Reward:{" "}
                    {poolSelected.pendingReward
                      ? roundShortNumberBuyDecimals(
                          +utils.formatEther(poolSelected.pendingReward)
                        )
                      : "0"}{" "}
                    ANTE
                  </div>
                  <div className="description-1">
                    Once staked, your staked amount will be locked. If you
                    manually stake more ANTE into the pool, the time lock will
                    be extend and you will claim the current reward. Reward is viewable after a day.
                  </div>
                  <div className="description-1">
                    Reward is viewable after a day
                  </div>
                  <div className="description-2">
                    <sup>*</sup>APR is fixed
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} md={6} style={{ width: "100%" }}>
                <div className="title">AnteDAO Level</div>
                <div className="description">
                  To be eligible for any of the tiers you are required to stake
                  the following
                </div>
                <div className="data-result">
                  {tiersList.map((el: any, index: any) => {
                    return (
                      <div
                        className={`${index % 2 === 0 ? "item-1" : "item-2"} ${
                          yourLevel?.tier === el.tier ? "active" : ""
                        }`}
                        key={index}
                      >
                        {`${el.amount} ANTE for Tier ${el.tier} (${
                          el.value
                        }) ${lottery(el)}`}
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div>
        <ModalStake
          title={modalTitle}
          open={showConfirmModal}
          text={confirmationText}
          onConfirm={unstakeEarlyConfirm}
          onClose={() => setShowConfirmModal(false)}
        />
      </div>
      <TransactionSubmitModal
        opened={openSubmitModal}
        handleClose={() => {
          setOpenSubmitModal(false);
        }}
        transactionHash={stakeHash}
      />
      <TransactionSubmitModal
        opened={openSubmitModalUnstake}
        handleClose={() => {
          setOpenSubmitModalUnstake(false);
        }}
        transactionHash={unStaketransactionHash}
      />
    </DefaultLayout>
  );
};

export default Stake;
