import { useEffect, useState } from 'react';
import useStyles from "./style";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uniqBy } from 'lodash';

import { CircularProgress, Grid } from "@material-ui/core";
import { getTokenInfo, TokenType } from "../../utils/token";
import { isFactorySuspended } from "../../utils/campaignFactory";
import { createPool, updatePool } from "../../request/pool";
import { alertFailure, alertSuccess } from "../../store/actions/alert";
import { withRouter } from "react-router-dom";
import { deployPool, getOwnerWalletAddress } from "../../store/actions/campaign";
import { adminRoute } from "../../utils";
import { BUY_TYPE, POOL_TYPE } from "../../constants";

import PoolBanner from "./Components/PoolBanner";
import TokenAddress from "./Components/TokenAddress";
import TotalCoinSold from "./Components/TotalCoinSold";
import TokenLogo from "./Components/TokenLogo";
import TokenSymbol from "./Components/TokenSymbol";
import DurationTime from "./Components/DurationTimes";
import MinTier from "./Components/MinTier";
import TierTable from "./Components/Tier/TierTable";
import NetworkAvailable from "./Components/NetworkAvailable";
import AcceptCurrency from "./Components/AcceptCurrency";
import PoolDescription from "./Components/PoolDescription";
import AddressReceiveMoney from "./Components/AddressReceiveMoney";
import ExchangeRate from "./Components/ExchangeRate";
import DisplayPoolSwitch from "./Components/DisplayPoolSwitch";
import PoolHash from "./Components/PoolHash";
import PoolName from "./Components/PoolName";
import UserJoinPool from "./Components/UserJoinPool";
import PoolWebsite from "./Components/PoolWebsite";
import moment from "moment";
import ClaimConfigTable from "./Components/ClaimConfig/ClaimConfigTable";
import WhitelistSocialRequirement from "./Components/WhitelistSocialRequirement";
import { convertClaimConfigToTimeline } from "../../utils/campaign";
import PrivatePoolSetting from "./Components/PrivatePoolSetting";
import FCFSRound, { RoundItem } from "./Components/FCFSRound/FCFSRound";
import ProgressDisplaySetting from "./Components/ProgressDisplaySetting/ProgressDisplaySetting";
import LockSchedule from "./Components/LockSchedule/LockSchedule";
import SocialSetting from "./Components/SocialSetting/SocialSetting";
import KycRequired from './Components/KycRequired';

function PoolForm(props: any) {
  const classes = useStyles();
  // const commonStyle = useCommonStyle();
  const dispatch = useDispatch();
  const history = props.history;

  const { data: loginUser } = useSelector((state: any) => state.user);

  const { isEdit, poolDetail, getPoolDetailData } = props;
  const [, setIsSuspend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingDeploy, setLoadingDeploy] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [token, setToken] = useState<TokenType | null>(null);
  const [needValidate, setNeedValidate] = useState(false);

  useEffect(() => {
    const checkCampaignFactorySuspended = async () => {
      const isSuspended = await isFactorySuspended();
      setIsSuspend(isSuspended);
    }
    checkCampaignFactorySuspended();
  }, []);

  const { register, setValue, getValues, errors, handleSubmit, control, watch } = useForm({
    mode: "onChange",
    defaultValues: poolDetail,
    reValidateMode: 'onChange',
  });

  const createUpdatePool = async (data: any) => {
    // Format Tiers
    const { minTier, is_use_allocation_percent } = data;

    let tierConfiguration = data.tierConfiguration || '[]';
    tierConfiguration = JSON.parse(tierConfiguration);
    tierConfiguration = tierConfiguration.map((currency: any, index: number) => {
      const item = {
        ...currency,
        currency: data.acceptCurrency,
      };
      if (index < minTier) {
        item.percent = 0;
        item.multiple = 0;
      }
      else if (is_use_allocation_percent) item.multiple = 0;
      else item.percent = 0;

      item.startTime = item.startTime ? (moment(item.startTime).unix() || null) : null;
      item.endTime = item.endTime ? (moment(item.endTime).unix() || null) : null;
      return item;
    });

    tierConfiguration = uniqBy(tierConfiguration, 'name')

    // Format Claim Config
    let campaignClaimConfig = data.campaignClaimConfig || '[]';
    campaignClaimConfig = JSON.parse(campaignClaimConfig);
    campaignClaimConfig = convertClaimConfigToTimeline(campaignClaimConfig);
    campaignClaimConfig = campaignClaimConfig.map((item: any, index: number) => {
      const { start_time, end_time, max_percent_claim, min_percent_claim, ...otherDataItem } = item;
      otherDataItem.maxBuy = max_percent_claim;//Phải gửi là maxBuy thì backend mới nhận thay vì max_percent_claim
      otherDataItem.minBuy = min_percent_claim;
      otherDataItem.startTime = item.start_time ? (moment(item.start_time).unix() || null) : null;
      otherDataItem.endTime = item.endTime ? (moment(item.endTime).unix() || null) : null;
      return otherDataItem;
    });
    let tokenInfo: any = {
      symbol: data?.token_symbol,
    };

    if (data.token) {
      tokenInfo = await getTokenInforDetail(data.token);
      if (!tokenInfo?.symbol) {
        throw Error('Token Information has not been loaded !!!');
      }

      tokenInfo.symbol = data?.token_symbol
    }


    const fcfsRound = data.fcfsRound || '[]';
    const fcfsRoundParse: RoundItem[] = JSON.parse(fcfsRound);
    const fcfsRoundFilter = fcfsRoundParse.map(({ allocation_bonus, before_buy_end_time }) =>
      ({ allocation_bonus: allocation_bonus || 0, before_buy_end_time: before_buy_end_time || 0 })
    );

    const submitData = {
      registed_by: loginUser?.wallet_address,
      is_display: data.is_display,

      // Pool general
      title: data.title,
      website: data.website,
      banner: data.banner,
      description: data.description,
      address_receiver: data.addressReceiver,

      // Token
      token: data.token,
      token_images: data.tokenImages,
      total_sold_coin: data.totalSoldCoin,

      token_by_eth: data.tokenRate,
      token_conversion_rate: data.tokenRate,

      price_usdt: data.price_usdt,
      display_price_rate: data.display_price_rate,

      // TokenInfo
      tokenInfo,

      // Time
      start_time: data.start_time ? data.start_time.unix() : null,
      finish_time: data.finish_time ? data.finish_time.unix() : null,
      release_time: data.release_time ? data.release_time.unix() : null,
      start_join_pool_time: data.start_join_pool_time ? data.start_join_pool_time.unix() : null,
      end_join_pool_time: data.end_join_pool_time ? data.end_join_pool_time.unix() : null,
      pre_order_min_tier: data.pre_order_min_tier,
      start_pre_order_time: data.start_pre_order_time ? data.start_pre_order_time.unix() : null,

      // Types
      accept_currency: data.acceptCurrency,
      network_available: data.networkAvailable,
      buy_type: BUY_TYPE.WHITELIST_LOTTERY,
      pool_type: POOL_TYPE.CLAIMABLE,
      kyc_bypass: data.kyc_bypass,

      // Private Pool Setting
      is_private: data.isPrivate,

      // Tier
      min_tier: data.minTier,
      tier_configuration: tierConfiguration,

      // Claim Configuration
      claim_configuration: campaignClaimConfig,

      // Wallet
      wallet: isEdit ? poolDetail?.wallet : {},

      // Whitelist Social Requirement
      self_twitter: data.self_twitter,
      self_channel: data.self_channel,
      partner_twitter: data.partner_twitter,
      partner_channel: data.partner_channel,
      // self_group: data.self_group,
      // self_retweet_post: data.self_retweet_post,
      // self_retweet_post_hashtag: data.self_retweet_post_hashtag,
      // partner_group: data.partner_group, 
      // partner_retweet_post: data.partner_retweet_post,
      // partner_retweet_post_hashtag: data.partner_retweet_post_hashtag,
      // gleam_link: data.gleam_link,

      // Forbidden Countries Setting
      forbidden_countries: data.forbidden_countries,

      // Whitelist Banner Setting
      // guide_link: data.guide_link,
      // whitelist_link: data.whitelist_link,
      // announcement_time: data.announcement_time ? data.announcement_time.unix() : null,

      // Progress Display Setting
      token_sold_display: data.token_sold_display,
      progress_display: data.progress_display,

      // Lock Schedule Setting
      lock_schedule: data.lock_schedule,

      // Social Media
      medium_link: data.medium_link,
      twitter_link: data.twitter_link,
      telegram_link: data.telegram_link,

      // Claim Policy
      claim_policy: data.claim_policy,

      // Free Time Settings
      freeBuyTimeSetting: {
        start_time_free_buy: data.start_time_free_buy ? data.start_time_free_buy.unix() : null,
        max_bonus_free_buy: data.max_bonus_free_buy,
      },
      fcfs_round: fcfsRoundFilter,
      is_use_allocation_percent: is_use_allocation_percent ? 1 : 0
    };
    let response = {};
    if (isEdit) {
      response = await updatePool(submitData, poolDetail.id);
    } else {
      response = await createPool(submitData);
    }

    return response;
  };

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response: any = await createUpdatePool(data);
      if (response?.status === 200) {
        dispatch(alertSuccess(isEdit ? 'Updated successfully!' : 'Created successfully!'));
        if (isEdit) {
          // window.location.reload();
        } else {
          history.push(adminRoute('/campaigns'));
        }
      } else {
        dispatch(alertFailure(isEdit ? 'Updated failed' : 'Created failed'));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  // Update After Deploy
  const updatePoolAfterDeloy = async (data: any) => {
    // Format Claim Config
    let campaignClaimConfig = data.campaignClaimConfig || '[]';
    campaignClaimConfig = convertClaimConfigToTimeline(campaignClaimConfig);
    campaignClaimConfig = campaignClaimConfig.map((item: any, index: number) => {
      const { start_time, end_time, max_percent_claim, min_percent_claim, ...otherDataItem } = item;
      otherDataItem.maxBuy = max_percent_claim;//Phải gửi là maxBuy thì backend mới nhận thay vì max_percent_claim
      otherDataItem.minBuy = min_percent_claim;
      otherDataItem.startTime = item.start_time ? (moment(item.start_time).unix() || null) : null;
      otherDataItem.endTime = item.endTime ? (moment(item.endTime).unix() || null) : null;
      return otherDataItem;
    });

    const fcfsRound = data.fcfsRound || '[]';
    const fcfsRoundParse: RoundItem[] = JSON.parse(fcfsRound);
    const fcfsRoundFilter = fcfsRoundParse.map(({ allocation_bonus, before_buy_end_time }) =>
      ({ allocation_bonus: allocation_bonus || 0, before_buy_end_time: before_buy_end_time || 0 })
    );

    const submitData = {
      // Pool general
      title: data.title,
      website: data.website,
      banner: data.banner,
      description: data.description,

      // USDT Price
      price_usdt: data.price_usdt, // Do not check isAcceptEth
      display_price_rate: data.display_price_rate,

      // Token
      token_images: data.tokenImages,
      total_sold_coin: data.totalSoldCoin,

      // KYC required
      kyc_bypass: data.kyc_bypass,

      // Claim Configuration
      claim_configuration: campaignClaimConfig,
      // Time
      // Release time will auto fill from first record of Campaign Claim Config Table
      release_time: data.release_time ? data.release_time.unix() : null,

      // Whitelist Social Requirement
      self_twitter: data.self_twitter,
      self_channel: data.self_channel,
      partner_twitter: data.partner_twitter,
      partner_channel: data.partner_channel,
      // self_group: data.self_group,
      // self_retweet_post: data.self_retweet_post,
      // self_retweet_post_hashtag: data.self_retweet_post_hashtag,
      // partner_group: data.partner_group,
      // partner_retweet_post: data.partner_retweet_post,
      // partner_retweet_post_hashtag: data.partner_retweet_post_hashtag,

      // Forbidden Countries Setting
      forbidden_countries: data.forbidden_countries,

      // Whitelist Banner Setting
      // guide_link: data.guide_link,
      // whitelist_link: data.whitelist_link,
      // announcement_time: data.announcement_time ? data.announcement_time.unix() : null,

      // Progress Display Setting
      token_sold_display: data.token_sold_display,
      progress_display: data.progress_display,

      // Lock Schedule Setting
      lock_schedule: data.lock_schedule,

      // Social Media
      medium_link: data.medium_link,
      twitter_link: data.twitter_link,
      telegram_link: data.telegram_link,

      // Claim Policy
      claim_policy: data.claim_policy,

      // Free Time Settings
      freeBuyTimeSetting: {
        start_time_free_buy: data.start_time_free_buy ? data.start_time_free_buy.unix() : null,
        max_bonus_free_buy: data.max_bonus_free_buy,
      },
      fcfs_round: fcfsRoundFilter,
      is_use_allocation_percent: data.is_use_allocation_percent ? 1 : 0
    };
    let response = await updatePool(submitData, poolDetail.id);
    return response;
  };

  const handleUpdateAfterDeloy = async (data: any) => {
    setLoading(true);
    try {
      const response: any = await updatePoolAfterDeloy(data);
      if (response?.status === 200) {
        dispatch(alertSuccess('Updated successfully!'));
        // history.push(adminRoute('/campaigns'));
        // window.location.reload();
      } else {
        dispatch(alertFailure('Updated Failed!'));
      }
      setLoading(false);
    } catch (e) {
      dispatch(alertFailure('Updated Failed!'))
      setLoading(false);
    }
  };

  // Create / Update Pool (Before Pool Deployed to Smart Contract)
  const handleCampaignCreateUpdate = () => {
    setNeedValidate(false);
    setLoading(true);
   
    
    setTimeout(() => {
      if (poolDetail?.is_deploy) {
        handleSubmit(handleUpdateAfterDeloy, err => {
          dispatch(alertFailure('Updated Failed!'))
          setLoading(false)
        })();
      } else {
        handleSubmit(handleFormSubmit, err => setLoading(false))();
      }
    }, 200);
  };

  const getTokenInforDetail = async (token: string) => {
    const erc20Token = await getTokenInfo(token);
    let tokenInfo: any = {};
    if (erc20Token) {
      const { name, symbol, decimals, address } = erc20Token;
      tokenInfo = { name, symbol, decimals, address };
    }
    return tokenInfo;
  }

  // Deploy Pool And Update
  const handleDeloySubmit = async (dataSubmit: any) => {
    if (poolDetail.is_deploy || deployed) {
      alert('Pool is deployed !!!');
      setLoadingDeploy(false);
      return false;
    }
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('The system will store the latest pool information.\n' +
      'Are you sure you want to deploy?')) {
      setLoadingDeploy(false);
      setNeedValidate(false);
      return false;
    }

    setLoadingDeploy(true);
    const data = {
      ...dataSubmit,
      addressReceiver: dataSubmit.addressReceiver
    }
    if (!data.addressReceiver) {
      const ownerWalletAddress = (!dataSubmit.addressReceiver && await getOwnerWalletAddress(dataSubmit.networkAvailable));
      if (!ownerWalletAddress) {
        dispatch(alertSuccess("Can't get Owner Wallet Address"));
        setLoadingDeploy(false);
        return
      }
      data.addressReceiver = ownerWalletAddress;
    }
    try {
      // Save data before deploy
      // const response = await createUpdatePool(data);
      const tokenInfo = await getTokenInforDetail(data.token);

      // const history = props.history;
      const { minTier, is_use_allocation_percent } = data;

      let tierConfiguration = data.tierConfiguration || '[]';
      tierConfiguration = JSON.parse(tierConfiguration);
      tierConfiguration = tierConfiguration.map((currency: any, index: number) => {
        const item = {
          ...currency,
          currency: data.acceptCurrency,
        };
        if (index < minTier) {
          item.multiple = 0;
          item.percent = 0;
        }
        else if (is_use_allocation_percent) item.multiple = 0;
        else item.percent = 0;

        item.startTime = item.startTime ? (moment(item.startTime).unix() || null) : null;
        item.endTime = item.endTime ? (moment(item.endTime).unix() || null) : null;
        return item;
      });

      tierConfiguration = uniqBy(tierConfiguration, 'name')


      const fcfsRound = data.fcfsRound || '[]';
      const fcfsRoundParse: RoundItem[] = JSON.parse(fcfsRound);
      const fcfsRoundFilter = fcfsRoundParse.map(({ allocation_bonus, before_buy_end_time }) =>
        ({ allocation_bonus: allocation_bonus || 0, before_buy_end_time: before_buy_end_time || 0 })
      );

      const submitData = {
        id: poolDetail.id,
        registed_by: loginUser?.wallet_address,

        // Pool general
        title: data.title,
        website: data.website,
        banner: data.banner,
        description: data.description,
        address_receiver: data.addressReceiver,

        // Token
        token: data.token,
        token_images: data.tokenImages,
        total_sold_coin: data.totalSoldCoin,

        // Rate
        token_by_eth: data.tokenRate,
        token_conversion_rate: data.tokenRate,

        // USDT Price
        price_usdt: data.price_usdt,
        display_price_rate: data.display_price_rate,

        // TokenInfo
        tokenInfo,

        // Time
        start_time: data.start_time ? data.start_time.unix() : null,
        finish_time: data.finish_time ? data.finish_time.unix() : null,
        release_time: data.release_time ? data.release_time.unix() : null,
        start_join_pool_time: data.start_join_pool_time ? data.start_join_pool_time.unix() : null,
        end_join_pool_time: data.end_join_pool_time ? data.end_join_pool_time.unix() : null,
        pre_order_min_tier: data.pre_order_min_tier,
        start_pre_order_time: data.start_pre_order_time ? data.start_pre_order_time.unix() : null,

        // Types
        accept_currency: data.acceptCurrency,
        network_available: data.networkAvailable,
        buy_type: BUY_TYPE.WHITELIST_LOTTERY,
        pool_type: POOL_TYPE.CLAIMABLE,
        kyc_bypass: data.kyc_bypass,

        // Tier
        min_tier: data.minTier,
        tier_configuration: tierConfiguration,

        // Wallet
        wallet: isEdit ? poolDetail?.wallet : {},

        // Progress Display Setting
        token_sold_display: data.token_sold_display,
        progress_display: data.progress_display,

        // Lock Schedule Setting
        lock_schedule: data.lock_schedule,

        // Social Media
        medium_link: data.medium_link,
        twitter_link: data.twitter_link,
        telegram_link: data.telegram_link,

        // Claim Policy
        claim_policy: data.claim_policy,

        // Free Time Settings
        freeBuyTimeSetting: {
          start_time_free_buy: data.start_time_free_buy ? data.start_time_free_buy.unix() : null,
          max_bonus_free_buy: data.max_bonus_free_buy,
        },
        fcfs_round: fcfsRoundFilter,
        is_use_allocation_percent: is_use_allocation_percent ? 1 : 0
      };
      dispatch(deployPool(submitData, (deployed: boolean) => {
        getPoolDetailData?.();
        setLoadingDeploy(false);
        setDeployed(deployed);
      }));
      // window.location.reload();
    } catch (e) {

      setLoadingDeploy(false);
    }
  };
  const handlerDeploy = () => {
    setLoadingDeploy(true);
    setNeedValidate(true);
    setTimeout(() => {
      handleSubmit(handleDeloySubmit, err => setLoadingDeploy(false))();
    }, 100);
  };
  // const isDeployed = !!poolDetail?.is_deploy;
  return (
    <>
      <div className="contentPage">
        <Grid container spacing={2}>
          <Grid item xs={6}>

            <div className="">
              <div className={classes.exchangeRate}>
                <label className={classes.exchangeRateTitle}>Project general info</label>
                {!!poolDetail?.id &&
                  <DisplayPoolSwitch
                    poolDetail={poolDetail}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    control={control}
                  />
                }

                <PoolName
                  poolDetail={poolDetail}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />

                <PoolHash poolDetail={poolDetail} />
               
                <PoolBanner
                  poolDetail={poolDetail}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />

                <PoolWebsite
                  poolDetail={poolDetail}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />

              </div>

              <SocialSetting
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
                watch={watch}
                register={register}
              />

              <div className={classes.exchangeRate}>
                <WhitelistSocialRequirement
                  poolDetail={poolDetail}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  control={control}
                  watch={watch}
                />
              </div>
              <div className={classes.exchangeRate}>
                <ClaimConfigTable
                  poolDetail={poolDetail}
                  setValue={setValue}
                  register={register}
                  watch={watch}
                  errors={errors}
                  control={control}
                />
              </div>

              <ProgressDisplaySetting
                poolDetail={poolDetail}
                register={register}
                setValue={setValue}
                errors={errors}
                control={control}
                watch={watch}
              />

            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.exchangeRate}>
              <PrivatePoolSetting
                isEdit={isEdit}
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
              />
              <NetworkAvailable
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
                needValidate={needValidate}
              />

              <AcceptCurrency
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
                watch={watch}
              />

              <KycRequired
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
                watch={watch}
              />
            </div>

            <div className={classes.exchangeRate}>
              <TokenAddress
                poolDetail={poolDetail}
                register={register}
                token={token}
                setToken={setToken}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                watch={watch}
                needValidate={needValidate}
              />

              <TokenSymbol
                poolDetail={poolDetail}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                getTokenInforDetail={getTokenInforDetail}
              />

              <AddressReceiveMoney
                poolDetail={poolDetail}
                register={register}
                setValue={setValue}
                errors={errors}
                needValidate={needValidate}
              />

              <TotalCoinSold
                poolDetail={poolDetail}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              <TokenLogo
                poolDetail={poolDetail}
                register={register}
                errors={errors}
              />

            </div>

            <ExchangeRate
              poolDetail={poolDetail}
              register={register}
              token={token}
              setValue={setValue}
              errors={errors}
              control={control}
              watch={watch}
            />
            <DurationTime
              poolDetail={poolDetail}
              register={register}
              token={token}
              setToken={setToken}
              setValue={setValue}
              errors={errors}
              control={control}
              getValues={getValues}
              watch={watch}
              needValidate={needValidate}
            />
            <FCFSRound
              poolDetail={poolDetail}
              register={register}
              setValue={setValue}
              errors={errors}
              control={control}
              watch={watch}
              getValues={getValues}
              needValidate={needValidate}
            />
            <LockSchedule
              poolDetail={poolDetail}
              register={register}
              setValue={setValue}
              errors={errors}
              control={control}
              watch={watch}
            />
          </Grid>

        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.exchangeRate}>
              <PoolDescription
                poolDetail={poolDetail}
                register={register}
                setValue={setValue}
                errors={errors}
                watch={watch}
              />
            </div>
          </Grid>
        </Grid>



        <Grid container spacing={2}>
          <Grid item xs={12}>

            <div className={classes.exchangeRate}>
              <MinTier
                isEdit={isEdit}
                poolDetail={poolDetail}
                setValue={setValue}
                errors={errors}
                control={control}
              />

              <TierTable
                isEdit={isEdit}
                poolDetail={poolDetail}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                control={control}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {poolDetail?.id &&
              <div className={classes.exchangeRate}>
                <UserJoinPool
                  poolDetail={poolDetail}
                  setValue={setValue}
                  errors={errors}
                  control={control}
                />
              </div>
            }

            <button
              disabled={!isEdit || !poolDetail?.id || poolDetail?.is_deploy || loading || loadingDeploy || deployed}
              className={(!isEdit || poolDetail?.is_deploy || deployed) ? classes.formButtonDeployed : classes.formButtonDeploy}
              onClick={handlerDeploy}
            >
              {loadingDeploy && <CircularProgress size={25} />}
              {!loadingDeploy && 'Deploy'}
            </button>

            <button
              disabled={loading || loadingDeploy}
              className={classes.formButtonUpdatePool}
              onClick={handleCampaignCreateUpdate}
            >
              {
                (loading) ? <CircularProgress size={25} /> : (isEdit ? 'Update' : 'Create')
              }
            </button>
          </Grid>
        </Grid>
      </div >

    </>
  );
}

export default withRouter(PoolForm);
