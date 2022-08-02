"use strict";

const Database = use("Database");
const CampaignModel = use("App/Models/Campaign");
const WalletAccountModel = use("App/Models/WalletAccount");
const WhitelistSubmissionModel = use("App/Models/WhitelistSubmission");
const WhitelistUserModel = use("App/Models/WhitelistUser");
const ReservedListModel = use("App/Models/ReservedList");
const WinnerModel = use("App/Models/WinnerListUser");

const WalletAccountService = use("App/Services/WalletAccountService");
const Const = use("App/Common/Const");
const PoolService = use("App/Services/PoolService");
const CampaignService = use("App/Services/CampaignService");
const WhitelistBannerSettingService = use(
  "App/Services/WhitelistBannerSettingService"
);
const WhitelistUserService = use("App/Services/WhitelistUserService");
const WhitelistSubmissionService = use(
  "App/Services/WhitelistSubmissionService"
);

const WinnerListService = use("App/Services/WinnerListUserService");
const ReservedListService = use("App/Services/ReservedListService");
const CanceledApplyWhitelistService = use(
  "App/Services/CanceledApplyWhitelistService"
);

const HelperUtils = use("App/Common/HelperUtils");
const RedisUtils = use("App/Common/RedisUtils");

const Redis = use("Redis");
const CONFIGS_FOLDER = "../../../blockchain_configs/";
const NETWORK_CONFIGS = require(`${CONFIGS_FOLDER}${process.env.NODE_ENV}`);
const CONTRACT_CONFIGS = NETWORK_CONFIGS.contracts[Const.CONTRACTS.CAMPAIGN];
const CONTRACT_FACTORY_CONFIGS =
  NETWORK_CONFIGS.contracts[Const.CONTRACTS.CAMPAIGNFACTORY];

const { abi: CONTRACT_ABI } = CONTRACT_CONFIGS.CONTRACT_DATA;
const { abi: CONTRACT_FACTORY_ABI } = CONTRACT_FACTORY_CONFIGS.CONTRACT_DATA;
const {
  abi: CONTRACT_ERC20_ABI,
} = require("../../../blockchain_configs/contracts/Normal/Erc20.json");
const {
  abi: CONTRACT_CAMPAIGN_ABI,
} = require("../../../blockchain_configs/contracts/Claim/Campaign.json");

const isDevelopment = process.env.NODE_ENV === "development";

const getWeb3PolygonProviderLink = () => {
  if (isDevelopment) {
    const WEB3_API_URLS = [
      process.env.RPC_ETH,
      // 'https://matic-mumbai.chainstacklabs.com',
      // 'https://rpc-mumbai.maticvigil.com',
      // 'https://matic-testnet-archive-rpc.bwarelabs.com'
    ];
    const randomElement =
      WEB3_API_URLS[Math.floor(Math.random() * WEB3_API_URLS.length)];
    return randomElement;
  } else {
    return NETWORK_CONFIGS.WEB3_POLYGON_API_URL;
  }
};

const Web3 = require("web3");
const web3 = new Web3(NETWORK_CONFIGS.WEB3_API_URL);
const web3Polygon = new Web3(getWeb3PolygonProviderLink());
const Config = use("Config");
const moment = require("moment");
const BigNumber = use("bignumber.js");
const { pick } = require("lodash");

const ethereumMulticall = require("ethereum-multicall");

class PoolController {
  
  /**
  * @swagger
  * /admin/pool/create:
  *   post:
  *     tags:
  *       - Campaign admin 
  *     summary: create pool in admin page 
  *     parameters:
  *       - name: registed_by
  *         description: registed_by admin ?
  *         in: query
  *         required: true
  *         type: string
  *       - name: title
  *         description: title of pool
  *         in: query
  *         required: true
  *         type: string
  *       - name: website
  *         description: website of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: banner
  *         description: banner of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: description
  *         description: description of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: address_receiver
  *         description: address receiver token of pool
  *         in: query
  *         required: true
  *         type: string
  *       - name: token
  *         description: token
  *         in: query
  *         required: true
  *         type: string
  *       - name: token_images
  *         description: token_images url
  *         in: query
  *         required: false
  *         type: string
  *       - name: total_sold_coin
  *         description: total_sold_coin of this campain
  *         in: query
  *         required: true
  *         type: number
  *       - name: token_by_eth
  *         description: ether_conversion_rate(if buy ido by eth)
  *         in: query
  *         required: true
  *         type: number
  *       - name: token_conversion_rate
  *         description: token_conversion_rate(if buy ido by other token)
  *         in: query
  *         required: true
  *         type: number
  *       - name: price_usdt
  *         description: price_usdt
  *         in: query
  *         required: true
  *         type: number
  *       - name: display_price_rate
  *         description: display_price_rate
  *         in: query
  *         required: true
  *         type: number
  *       - name: price_usdt
  *         description: price_usdt
  *         in: query
  *         required: true
  *         type: number
  *       - name: tokenInfo
  *         description: tokenInfo symbol name decimal address
  *         in: body
  *         required: true
  *         schema:
  *            type: object
  *            properties: 
  *                symbol: 
  *                  type: string
  *                name: 
  *                  type: string
  *                decimal: 
  *                  type: string
  *                address: 
  *                  type: string
  *       - name: start_time
  *         description: start buy time
  *         in: query
  *         required: false
  *         type: number
  *       - name: finish_time
  *         description: finish buy token time
  *         in: query
  *         required: false
  *         type: number
  *       - name: release_time
  *         description: release_time
  *         in: query
  *         required: false
  *         type: number
  *       - name: start_join_pool_time
  *         description: start time to join_pool(apply whitelist)
  *         in: query
  *         required: false
  *         type: number
  *       - name: end_join_pool_time
  *         description: end time to join_pool(apply whitelist)
  *         in: query
  *         required: false
  *         type: number
  *       - name: accept_currency
  *         description: accept_currency
  *         in: query
  *         required: true
  *         type: string
  *       - name: network_available
  *         description: network_available 
  *         in: query
  *         required: true
  *         type: string
  *       - name: buy_type
  *         description: buy_type (defaut whitelist)
  *         in: query
  *         required: false
  *         type: string
  *       - name: pool_type
  *         description: pool_type (defaut claimable)
  *         in: query
  *         required: false
  *         type: string
  *       - name: is_private
  *         description: is_private (defaut 0)
  *         in: query
  *         required: false
  *         type: number
  *       - name: kyc_bypass
  *         description: kyc_bypass (defaut 0)
  *         in: query
  *         required: false
  *         type: number
  *       - name: min_tier
  *         description: min_tier of user can buy ido( defaut 1)
  *         in: query
  *         required: false
  *         type: number
  *       - name: self_twitter
  *         description: self_twitter
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_group
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_channel
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_retweet_post
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_retweet_post_hashtag
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: token_sold_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: progress_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  * 
  *       - name: lock_schedule
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: medium_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: twitter_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: telegram_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: claim_policy
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: is_use_allocation_percent
  *         description: method to divide token to each tier
  *         in: query
  *         required: true
  *         type: number
  *       - name: progress_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: forbidden_countries
  *         description: list forbidden_countries
  *         in: query
  *         required: false
  *         type: string
  *       - name: freeBuyTimeSetting
  *         description: freeBuyTimeSetting( not used in Ante dao)
  *         in: body
  *         required: false 
  *         schema:
  *              type: object
  *              properties: 
  *                start_time_free_buy: 
  *                  type: number
  *                max_bonus_free_buy: 
  *                  type: number

  *       - name: fcfs_round
  *         description: fcfs_round
  *         in: body
  *         required: true
  *         schema:
  *            type: array
  *            items:
  *              type: object
  *              properties: 
  *                phase_number: 
  *                  type: number
  *                allocation_bonus: 
  *                  type: number
  *                before_buy_end_time: 
  *                  type: number
  *     responses:
  *       200:
  *         description: create pool
  *         example:
  */

  async createPool({ request, auth }) {
    const inputParams = request.only([
      "registed_by",
      "title",
      "website",
      "banner",
      "description",
      "address_receiver",
      "token",
      "token_images",
      "total_sold_coin",
      "token_by_eth",
      "token_conversion_rate",
      "price_usdt",
      "display_price_rate",
      "tokenInfo",
      "start_time",
      "finish_time",
      "release_time",
      "start_join_pool_time",
      "end_join_pool_time",
      "start_pre_order_time",
      "pre_order_min_tier",
      "accept_currency",
      "network_available",
      "buy_type",
      "pool_type",
      "is_private",
      "kyc_bypass",
      "min_tier",
      "tier_configuration",
      "claim_configuration",
      "self_twitter",
      "self_group",
      "self_channel",
      "self_retweet_post",
      "self_retweet_post_hashtag",
      "partner_twitter",
      "partner_group",
      "partner_channel",
      "partner_retweet_post",
      "partner_retweet_post_hashtag",
      "gleam_link",
      "guide_link",
      "whitelist_link",
      "announcement_time",
      "token_sold_display",
      "progress_display",
      "lock_schedule",
      "medium_link",
      "twitter_link",
      "telegram_link",
      "claim_policy",
      "forbidden_countries",
      "freeBuyTimeSetting",
      "fcfs_round",
      "is_use_allocation_percent",
    ]);

    const tokenInfo = inputParams.tokenInfo;
    const data = {
      registed_by: inputParams.registed_by,

      title: inputParams.title,
      website: inputParams.website,
      description: inputParams.description,
      // 'token': inputParams.token,
      start_time: inputParams.start_time,
      finish_time: inputParams.finish_time,
      ether_conversion_rate: inputParams.token_by_eth,
      token_conversion_rate: inputParams.token_conversion_rate,
      price_usdt: inputParams.price_usdt,
      display_price_rate: inputParams.display_price_rate,

      banner: inputParams.banner,
      address_receiver: inputParams.address_receiver,
      token_images: inputParams.token_images,
      total_sold_coin: inputParams.total_sold_coin,
      release_time: inputParams.release_time,
      start_join_pool_time: inputParams.start_join_pool_time,
      end_join_pool_time: inputParams.end_join_pool_time,
      start_pre_order_time: inputParams.start_pre_order_time,
      pre_order_min_tier: inputParams.pre_order_min_tier,
      accept_currency: inputParams.accept_currency,
      network_available: inputParams.network_available,
      buy_type: inputParams.buy_type,
      pool_type: inputParams.pool_type,
      kyc_bypass: inputParams.kyc_bypass,
      is_private: inputParams.is_private,
      min_tier: inputParams.min_tier,
      is_use_allocation_percent: inputParams.is_use_allocation_percent,

      is_display: false, // Default is hidden

      symbol: tokenInfo && tokenInfo.symbol,
      name: tokenInfo && tokenInfo.name,
      decimals: tokenInfo && tokenInfo.decimals,
      token: tokenInfo && tokenInfo.address,

      token_sold_display: inputParams.token_sold_display,
      progress_display: inputParams.progress_display,
      lock_schedule: inputParams.lock_schedule,
      claim_policy: inputParams.claim_policy,
      public_winner_status: Const.PUBLIC_WINNER_STATUS.PRIVATE,
      forbidden_countries: JSON.stringify(
        (inputParams && inputParams.forbidden_countries) || []
      ),
    };
    // console.log("[createPool] - Create Pool with data: ", data);

    try {
      // Create Pool
      const poolService = new PoolService();
      const campaign = new CampaignModel();
      campaign.fill(data);
      await campaign.save();

      // Update fcfs rounds setting
      let fcfsRoundsSetting = inputParams.fcfs_round || [];
      // console.log(
      //   "[createPool] - Update FCFS Rounds Setting - fcfsRoundsSetting",
      //   fcfsRoundsSetting
      // );
      await poolService.updateFcfsRoundsSetting(campaign, fcfsRoundsSetting);

      // Update Claim Config
      let claimConfigs = inputParams.claim_configuration || [];
      claimConfigs = poolService.addDefaultClaimConfig(
        claimConfigs,
        campaign.finish_time
      );
      // console.log(
      //   "[createPool] - Update Claim Config - claimConfigs",
      //   claimConfigs
      // );
      await poolService.updateClaimConfig(campaign, claimConfigs);

      // Update Tier Config
      // console.log(
      //   "[createPool] - Update Tier Config - inputParams.tier_configuration",
      //   inputParams.tier_configuration
      // );
      await poolService.updateTierConfig(
        campaign,
        inputParams.tier_configuration || []
      );

      // Update Whitelist Social Requirements
      await poolService.updateWhitelistSocialRequirement(campaign, {
        self_twitter: inputParams.self_twitter,
        self_group: inputParams.self_group,
        self_channel: inputParams.self_channel,
        self_retweet_post: inputParams.self_retweet_post,
        self_retweet_post_hashtag: inputParams.self_retweet_post_hashtag,
        partner_twitter: inputParams.partner_twitter,
        partner_group: inputParams.partner_group,
        partner_channel: inputParams.partner_channel,
        partner_retweet_post: inputParams.partner_retweet_post,
        partner_retweet_post_hashtag: inputParams.partner_retweet_post_hashtag,
        gleam_link: inputParams.gleam_link,
      });

      // Update Whitelist Banner Setting
      await poolService.updateWhitelistBannerSetting(campaign, {
        guide_link: inputParams.guide_link,
        whitelist_link: inputParams.whitelist_link,
        announcement_time: inputParams.announcement_time,
      });

      // Update Social Network Setting
      await poolService.updateSocialNetworkSetting(campaign, {
        twitter_link: inputParams.twitter_link,
        telegram_link: inputParams.telegram_link,
        medium_link: inputParams.medium_link,
      });

      // Update Social Network Setting
      // console.log("loggggggggggggggg",inputParams.freeBuyTimeSetting)
      // await poolService.updateFreeBuyTimeSetting(campaign, {
      //   start_buy_time: inputParams.freeBuyTimeSetting.start_time_free_buy,
      //   max_bonus:
      //     inputParams &&
      //     inputParams.freeBuyTimeSetting &&
      //     inputParams.freeBuyTimeSetting.max_bonus_free_buy,
      // });

      // Create Web3 Account
      const campaignId = campaign.id;
      const account = await new WalletAccountService().createWalletAddress(
        campaignId
      );
      // console.log(
      //   "[createPool] - Create Walllet Account:",
      //   account.wallet_address
      // );

      campaign.fcfsRoundsSetting = inputParams.fcfs_round || [];

      return HelperUtils.responseSuccess(campaign);
    } catch (e) {
      // console.log("[PoolController::createPool] - ERROR: ", e);
      return HelperUtils.responseErrorInternal();
    }
  }
  
  /**
  * @swagger
  * /admin/pool/{campaignId}/update:
  *   post:
  *     tags:
  *       - Campaign admin 
  *     summary: create pool in admin page 
  *     parameters:
  *       - name: campaignId
  *         description: campaignId
  *         in: path
  *         required: true
  *         type: string
  *       - name: title
  *         description: title of pool
  *         in: query
  *         required: true
  *         type: string
  *       - name: website
  *         description: website of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: banner
  *         description: banner of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: description
  *         description: description of pool
  *         in: query
  *         required: false
  *         type: string
  *       - name: address_receiver
  *         description: address receiver token of pool
  *         in: query
  *         required: true
  *         type: string
  *       - name: token
  *         description: token
  *         in: query
  *         required: true
  *         type: string
  *       - name: token_images
  *         description: token_images url
  *         in: query
  *         required: false
  *         type: string
  *       - name: total_sold_coin
  *         description: total_sold_coin of this campain
  *         in: query
  *         required: true
  *         type: number
  *       - name: token_by_eth
  *         description: ether_conversion_rate(if buy ido by eth)
  *         in: query
  *         required: true
  *         type: number
  *       - name: token_conversion_rate
  *         description: token_conversion_rate(if buy ido by other token)
  *         in: query
  *         required: true
  *         type: number
  *       - name: price_usdt
  *         description: price_usdt
  *         in: query
  *         required: true
  *         type: number
  *       - name: display_price_rate
  *         description: display_price_rate
  *         in: query
  *         required: true
  *         type: number
  *       - name: price_usdt
  *         description: price_usdt
  *         in: query
  *         required: true
  *         type: number
  *       - name: tokenInfo
  *         description: tokenInfo symbol name decimal address
  *         in: body
  *         required: true
  *         schema:
  *            type: object
  *            properties: 
  *                symbol: 
  *                  type: string
  *                name: 
  *                  type: string
  *                decimal: 
  *                  type: string
  *                address: 
  *                  type: string
  *       - name: start_time
  *         description: start buy time
  *         in: query
  *         required: false
  *         type: number
  *       - name: finish_time
  *         description: finish buy token time
  *         in: query
  *         required: false
  *         type: number
  *       - name: release_time
  *         description: release_time
  *         in: query
  *         required: false
  *         type: number
  *       - name: start_join_pool_time
  *         description: start time to join_pool(apply whitelist)
  *         in: query
  *         required: false
  *         type: number
  *       - name: end_join_pool_time
  *         description: end time to join_pool(apply whitelist)
  *         in: query
  *         required: false
  *         type: number
  *       - name: accept_currency
  *         description: accept_currency
  *         in: query
  *         required: true
  *         type: string
  *       - name: network_available
  *         description: network_available 
  *         in: query
  *         required: true
  *         type: string
  *       - name: buy_type
  *         description: buy_type (defaut whitelist)
  *         in: query
  *         required: false
  *         type: string
  *       - name: pool_type
  *         description: pool_type (defaut claimable)
  *         in: query
  *         required: false
  *         type: string
  *       - name: is_private
  *         description: is_private (defaut 0)
  *         in: query
  *         required: false
  *         type: number
  *       - name: kyc_bypass
  *         description: kyc_bypass (defaut 0)
  *         in: query
  *         required: false
  *         type: number
  *       - name: min_tier
  *         description: min_tier of user can buy ido( defaut 1)
  *         in: query
  *         required: false
  *         type: number
  *       - name: self_twitter
  *         description: self_twitter
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_group
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_channel
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_retweet_post
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: self_retweet_post_hashtag
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: token_sold_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: progress_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  * 
  *       - name: lock_schedule
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: medium_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: twitter_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: telegram_link
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: claim_policy
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: is_use_allocation_percent
  *         description: method to divide token to each tier
  *         in: query
  *         required: true
  *         type: number
  *       - name: progress_display
  *         description: 
  *         in: query
  *         required: false
  *         type: string
  *       - name: forbidden_countries
  *         description: list forbidden_countries
  *         in: query
  *         required: false
  *         type: string
  *       - name: fcfs_round
  *         description: fcfs_round
  *         in: body
  *         required: true
  *         schema:
  *            type: array
  *            items:
  *              type: object
  *              properties: 
  *                phase_number: 
  *                  type: number
  *                allocation_bonus: 
  *                  type: number
  *                before_buy_end_time: 
  *                  type: number
  *     responses:
  *       200:
  *         description: create pool
  *         example:
  */

  async updatePool({ request, auth, params }) {
    const inputParams = request.only([
      "registed_by",
      "title",
      "website",
      "banner",
      "description",
      "address_receiver",
      "token",
      "token_images",
      "total_sold_coin",
      "token_by_eth",
      "token_conversion_rate",
      "price_usdt",
      "display_price_rate",
      "tokenInfo",
      "start_time",
      "finish_time",
      "release_time",
      "start_join_pool_time",
      "end_join_pool_time",
      "start_pre_order_time",
      "pre_order_min_tier",
      "accept_currency",
      "network_available",
      "buy_type",
      "pool_type",
      "is_private",
      "kyc_bypass",
      "min_tier",
      "tier_configuration",
      "claim_configuration",
      "self_twitter",
      "self_group",
      "self_channel",
      "self_retweet_post",
      "self_retweet_post_hashtag",
      "partner_twitter",
      "partner_group",
      "partner_channel",
      "partner_retweet_post",
      "partner_retweet_post_hashtag",
      "gleam_link",
      "guide_link",
      "whitelist_link",
      "announcement_time",
      "token_sold_display",
      "progress_display",
      "lock_schedule",
      "medium_link",
      "twitter_link",
      "telegram_link",
      "claim_policy",
      "forbidden_countries",
      "freeBuyTimeSetting",
      "fcfs_round",
      "is_use_allocation_percent",
    ]);

    const tokenInfo = inputParams.tokenInfo;
    const data = {
      // 'registed_by': inputParams.registed_by,

      title: inputParams.title,
      website: inputParams.website,
      description: inputParams.description,
      start_time: inputParams.start_time,
      finish_time: inputParams.finish_time,
      ether_conversion_rate: inputParams.token_by_eth,
      token_conversion_rate: inputParams.token_conversion_rate,
      price_usdt: inputParams.price_usdt,
      display_price_rate: inputParams.display_price_rate,

      banner: inputParams.banner,
      address_receiver: inputParams.address_receiver,
      token_images: inputParams.token_images,
      total_sold_coin: inputParams.total_sold_coin,
      release_time: inputParams.release_time,
      start_join_pool_time: inputParams.start_join_pool_time,
      end_join_pool_time: inputParams.end_join_pool_time,
      start_pre_order_time: inputParams.start_pre_order_time,
      pre_order_min_tier: inputParams.pre_order_min_tier,
      accept_currency: inputParams.accept_currency,
      network_available: inputParams.network_available,
      buy_type: inputParams.buy_type,
      pool_type: inputParams.pool_type,
      kyc_bypass: inputParams.kyc_bypass,
      is_private: inputParams.is_private,
      min_tier: inputParams.min_tier,
      is_use_allocation_percent: inputParams.is_use_allocation_percent,

      symbol: tokenInfo && tokenInfo.symbol,
      name: tokenInfo && tokenInfo.name,
      decimals: tokenInfo && tokenInfo.decimals,
      token: tokenInfo && tokenInfo.address,

      token_sold_display: inputParams.token_sold_display,
      progress_display: inputParams.progress_display,
      lock_schedule: inputParams.lock_schedule,
      claim_policy: inputParams.claim_policy,

      forbidden_countries: JSON.stringify(
        (inputParams && inputParams.forbidden_countries) || []
      ),
    };

    // console.log("[updatePool] - tokenInfo:", inputParams.tokenInfo);
    // console.log("[updatePool] - Update Pool with data: ", data, params);
    const campaignId = params.campaignId;
    try {
      const poolService = new PoolService();
      const campaign = await CampaignModel.query()
        .where("id", campaignId)
        .first();
      if (!campaign) {
        return HelperUtils.responseNotFound("Pool not found");
      }

      await CampaignModel.query().where("id", campaignId).update(data);

      if (!campaign.is_deploy) {
        // Update Claim Config
        await poolService.updateClaimConfig(
          campaign,
          inputParams.claim_configuration || []
        );

        // Update Fcfs Rounds Setting
        await poolService.updateFcfsRoundsSetting(
          campaign,
          inputParams.fcfs_round || []
        );

        // Update Tier Config
        await poolService.updateTierConfig(
          campaign,
          inputParams.tier_configuration || []
        );
      }

      // Update Whitelist Social Requirements
      await poolService.updateWhitelistSocialRequirement(campaign, {
        self_twitter: inputParams.self_twitter,
        self_group: inputParams.self_group,
        self_channel: inputParams.self_channel,
        self_retweet_post: inputParams.self_retweet_post,
        self_retweet_post_hashtag: inputParams.self_retweet_post_hashtag,
        partner_twitter: inputParams.partner_twitter,
        partner_group: inputParams.partner_group,
        partner_channel: inputParams.partner_channel,
        partner_retweet_post: inputParams.partner_retweet_post,
        partner_retweet_post_hashtag: inputParams.partner_retweet_post_hashtag,
        gleam_link: inputParams.gleam_link,
      });

      // Update Whitelist Banner Setting
      await poolService.updateWhitelistBannerSetting(campaign, {
        guide_link: inputParams.guide_link,
        whitelist_link: inputParams.whitelist_link,
        announcement_time: inputParams.announcement_time,
      });

      // Update Social Network Setting
      await poolService.updateSocialNetworkSetting(campaign, {
        twitter_link: inputParams.twitter_link,
        telegram_link: inputParams.telegram_link,
        medium_link: inputParams.medium_link,
      });

      // Update Social Network Setting
      await poolService.updateFreeBuyTimeSetting(campaign, {
        start_buy_time:
          inputParams &&
          inputParams.freeBuyTimeSetting &&
          inputParams.freeBuyTimeSetting.start_time_free_buy,
        max_bonus:
          inputParams &&
          inputParams.freeBuyTimeSetting &&
          inputParams.freeBuyTimeSetting.max_bonus_free_buy,
      });

      // Delete cache
      RedisUtils.deleteRedisPoolDetail(campaignId);
      RedisUtils.deleteRedisTierList(campaignId);

      return HelperUtils.responseSuccess(campaign);
    } catch (e) {
      console.log("[PoolController::updatePool] - ERROR: ", e);
      return HelperUtils.responseErrorInternal();
    }
  }

  async addPendingUser(whitelistSubmission) {
    // const reservedList = await ReservedListModel.query().select('*').where('campaign_id', '=', whitelistSubmission[0].campaign_id).first();
    // const whitelistUser = await WhitelistUserModel.query().select('*').where('campaign_id', '=', whitelistSubmission[0].campaign_id).first();
    // pending status
    // console.log('whitelistSubmission: ',whitelistSubmission)

    for (let i = 0; i < whitelistSubmission.length; i++) {
      // console.log("whitelistSubmission[i]: ", whitelistSubmission[i]);

      // save to reserved_list_table
      const reservedListModel = new ReservedListModel();
      reservedListModel.wallet_address = whitelistSubmission[i].wallet_address;
      reservedListModel.campaign_id = whitelistSubmission[i].campaign_id;
      reservedListModel.level = whitelistSubmission[i].tier;
      reservedListModel.email = "abc";
      await reservedListModel.save();

      // save to whitelist_user_table
      const whitelistUserModel = new WhitelistUserModel();
      whitelistUserModel.wallet_address = whitelistSubmission[i].wallet_address;
      whitelistUserModel.campaign_id = whitelistSubmission[i].campaign_id;
      whitelistUserModel.tier = whitelistSubmission[i].tier;
      await whitelistUserModel.save();
    }
  }
  
  /**
  * @swagger
  * /admin/pool/{campaignId}/deploy-success:
  *   post:
  *     tags:
  *       - Campaign admin 
  *     summary: call to update  after FE deploy campaign to  Sc 
  *     parameters:
  *       - name: campaignId
  *         description: pool  id
  *         in: path
  *         required: false
  *         type: number
  *       - name: campaign_hash
  *         description: campaign_hash 
  *         in: query
  *         required: false
  *         type: string
  *       - name: token_symbol
  *         description: token_symbol
  *         in: query
  *         required: false
  *         type: string
  *       - name: token_decimals
  *         description: token_decimals
  *         in: query
  *         required: false
  *         type: number
  *       - name: token_address
  *         description: token_address
  *         in: query
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: get pool by id
  *         example:
  */

  async updateDeploySuccess({ request, auth, params }) {
    const inputParams = request.only([
      "campaign_hash",
      "token_symbol",
      "token_name",
      "token_decimals",
      "token_address",
    ]);
    // console.log("Update Deploy Success with params: ", inputParams);

    const campaignId = params.campaignId;
    try {
      const campaign = await CampaignModel.query()
        .where("id", campaignId)
        .first();
      if (!campaign) {
        return HelperUtils.responseNotFound("Pool not found");
      }

      const winnerLevelCountArr = [];
      const winnerLevelCount = await Database.table("winner_list")
        .select("level")
        .where("campaign_id", campaignId)
        .groupBy("level")
        .count("wallet_address as total");
      // console.log("winnerLevelCount", winnerLevelCount);

      for (let i = 0; i < winnerLevelCount.length; i++)
        winnerLevelCountArr[winnerLevelCount[i].level] =
          winnerLevelCount[i].total;
      // console.log('### TEST winnerLevelCountArr', winnerLevelCountArr)

      const participantsLevelCount = await Database.table(
        "whitelist_submissions"
      )
        .select("tier")
        .where("campaign_id", campaignId)
        .groupBy("tier")
        .count("wallet_address as total");
      // console.log("participantsLevelCount", participantsLevelCount);

      for (let i = 0; i < participantsLevelCount.length; i++) {
        if (
          !winnerLevelCountArr[participantsLevelCount[i].tier] ||
          winnerLevelCountArr[participantsLevelCount[i].tier] <= 0
        ) {
          return HelperUtils.responseBadRequest(
            "Please make sure that there is at least one person in each tier in the winner list"
          );
        }
      }

      campaign.is_deploy = Const.DEPLOY_STATUS.DEPLOYED;
      campaign.campaign_hash = inputParams.campaign_hash;
      campaign.token = inputParams.token_address;
      campaign.name = inputParams.token_name;
      campaign.symbol = inputParams.token_symbol;
      campaign.decimals = inputParams.token_decimals;
      campaign.save();

      const listWhitelistSubmission = await WhitelistSubmissionModel.query()
        .select("*")
        .where("campaign_id", "=", campaignId)
        .andWhere((q) => {
          q.where(
            "whitelist_submissions.self_twitter_status",
            "!=",
            Const.SOCIAL_SUBMISSION_STATUS.COMPLETED
          )
            .orWhere(
              "whitelist_submissions.self_channel_status",
              "!=",
              Const.SOCIAL_SUBMISSION_STATUS.COMPLETED
            )
            .orWhere(
              "whitelist_submissions.partner_twitter_status",
              "!=",
              Const.SOCIAL_SUBMISSION_STATUS.COMPLETED
            )
            .orWhere(
              "whitelist_submissions.partner_channel_status",
              "!=",
              Const.SOCIAL_SUBMISSION_STATUS.COMPLETED
            );
        })
        .fetch();
      await this.addPendingUser(listWhitelistSubmission.rows);

      // console.log('[updateDeploySuccess] - CAMPAIGN: ', campaign);
      // const camp = await CampaignModel.query().where('id', campaignId).update({
      //   is_deploy: true,
      //   campaign_hash: inputParams.campaign_hash,
      //   token: inputParams.token_address,
      //   name: inputParams.name,
      //   symbol: inputParams.symbol,
      //   decimals: inputParams.decimals,
      // });

      // Delete cache
      RedisUtils.deleteRedisPoolDetail(campaignId);

      const campaignService = new CampaignService();
      await campaignService.baseMaxBuy(campaignId);

      return HelperUtils.responseSuccess(campaign);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal();
    }
  }
  
  /**
  * @swagger
  * /admin/pool/{campaignId}/change-display:
  *   post:
  *     tags:
  *       - Campaign admin 
  *     summary: change-display or not 
  *     parameters:
  *       - name: campaignId
  *         description: pool  id
  *         in: path
  *         required: false
  *         type: number
  *       - name: is_display
  *         description: is_display or not 
  *         in: query
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: change-display or not
  *         example:
  */

  async changeDisplay({ request, auth, params }) {
    const inputParams = request.only(["is_display"]);
    // console.log("Update Change Display with data: ", inputParams);
    const campaignId = params.campaignId;
    try {
      const campaign = await CampaignModel.query()
        .where("id", campaignId)
        .first();
      if (!campaign) {
        return HelperUtils.responseNotFound("Pool not found");
      }
      await CampaignModel.query().where("id", campaignId).update({
        is_display: inputParams.is_display,
      });

      // Delete cache
      RedisUtils.deleteRedisPoolDetail(campaignId);

      return HelperUtils.responseSuccess();
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal();
    }
  }
    
  /**
  * @swagger
  * /admin/pool/{campaignId}/change-public-winner-status:
  *   post:
  *     tags:
  *       - Campaign admin 
  *     summary: change-display or not 
  *     parameters:
  *       - name: campaignId
  *         description: pool  id
  *         in: path
  *         required: false
  *         type: number
  *       - name: public_winner_status
  *         description: public_winner_status or not 
  *         in: query
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: change public_winner_status 
  *         example:
  */

  async changePublicWinnerStatus({ request, auth, params }) {
    const inputParams = request.only(["public_winner_status"]);
    // console.log(
    //   "[changePublicWinnerStatus] - Update Public Winner Status with data: ",
    //   inputParams
    // );
    const campaignId = params.campaignId;
    try {
      const campaign = await CampaignModel.query()
        .where("id", campaignId)
        .first();
      if (!campaign) {
        return HelperUtils.responseNotFound("Pool not found");
      }
      const res = await CampaignModel.query().where("id", campaignId).update({
        public_winner_status: inputParams.public_winner_status,
      });
      // console.log(
      //   "[changePublicWinnerStatus] - Update Success campaign ID: ",
      //   res
      // );

      // Delete cache
      RedisUtils.deleteRedisPoolDetail(campaignId);

      return HelperUtils.responseSuccess();
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal();
    }
  }
  
  /**
  * @swagger
  * /admin/pool/{campaignId}:
  *   get:
  *     tags:
  *       - Campaign admin 
  *     summary: get pool with id(admin size)
  *     parameters:
  *       - name: campaignId
  *         description: pool  id
  *         in: path
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: get pool by id
  *         example:
  */

  async getPoolAdmin({ request, auth, params }) {
    const poolId = params.campaignId;
    // console.log("[getPoolAdmin] - Start getPool (Admin) with poolId: ", poolId);
    try {
      let pool = await CampaignModel.query()
        .with("tiers")
        .with("campaignClaimConfig")
        .with("fcfsRoundsSetting")
        .with("socialRequirement")
        .with("whitelistBannerSetting")
        .with("socialNetworkSetting")
        .with("freeBuyTimeSetting")
        .where("id", poolId)
        .first();
      if (!pool) {
        return HelperUtils.responseNotFound("Pool not found");
      }
      pool = JSON.parse(JSON.stringify(pool));
      try {
        pool.forbidden_countries = JSON.parse(pool.forbidden_countries);
      } catch (_) {
        pool.forbidden_countries = [];
      }
      // console.log("[getPool] - pool.tiers: ", JSON.stringify(pool.tiers));
      if (pool.tiers && pool.tiers.length > 0) {
        pool.tiers = pool.tiers.map((item, index) => {
          return {
            ...item,
            min_buy: new BigNumber(item.min_buy).toNumber(),
            max_buy: new BigNumber(item.max_buy).toNumber(),
          };
        });
      }

      const walletAccount = await WalletAccountModel.query()
        .where("campaign_id", poolId)
        .first();
      if (walletAccount) {
        pool.wallet = {
          id: walletAccount.id,
          wallet_address: walletAccount.wallet_address,
        };
      }

      // Cache data
      RedisUtils.createRedisPoolDetail(poolId, pool);

      return HelperUtils.responseSuccess(pool);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal();
    }
  }

  /**
  * @swagger
  * /pool/{campaignId}:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get pool with id
  *     parameters:
  *       - name: campaignId
  *         description: pool  id
  *         in: path
  *         required: false
  *         type: number
  *       - name: walletAddress
  *         description: wallet address
  *         in: query
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: get pool by id
  *         example:
  */

  async getPoolPublic({ request, auth, params }) {
    const poolId = params.campaignId;
    const inputParams = request.all();
    const address = inputParams.walletAddress
    try {
      let pool = await CampaignModel.query()
        .with("tiers")
        .with("campaignClaimConfig")
        .with("fcfsRoundsSetting")
        .with("whitelistBannerSetting")
        .with("socialNetworkSetting")
        .with("socialRequirement")
        .with("freeBuyTimeSetting")
        .with("preOrderUsers", (builder) => {
          builder.select("id"); // select only User ID
        })
        .where("id", poolId)
        .first();
      if (!pool) {
        return HelperUtils.responseNotFound("Pool not found");
      }
      pool = JSON.parse(JSON.stringify(pool));
      const publicPool = pick(pool, [
        // Pool Info
        "id",
        "title",
        "website",
        "banner",
        "updated_at",
        "created_at",
        "campaign_hash",
        "campaign_id",
        "description",
        "registed_by",
        "register_by",
        "campaign_status",

        // Types
        "buy_type",
        "accept_currency",
        "min_tier",
        "network_available",
        "pool_type",
        "is_deploy",
        "is_display",
        "is_pause",
        "is_private",
        "public_winner_status",

        // KYC required
        "kyc_bypass",

        // Time
        "release_time",
        "start_join_pool_time",
        "start_time",
        "end_join_pool_time",
        "finish_time",
        // Pre-Order
        "start_pre_order_time", // Time Pre-Order
        "pre_order_min_tier",
        "preOrderUsers", // Relationship PreOrder Table

        // Token Info
        "name",
        "symbol",
        "decimals",
        "token",
        "token_images",
        "total_sold_coin",
        "token_conversion_rate",
        "ether_conversion_rate",
        "price_usdt",
        "display_price_rate",
        "token_sold",

        // Claim Config
        "campaignClaimConfig",

        // Fcfs rounds settings
        "fcfsRoundsSetting",

        // Whitelist Social Requirement
        "socialRequirement",

        // Whitelist Banner Setting
        "whitelistBannerSetting",

        // Progress Display Setting
        "token_sold_display",
        "progress_display",

        // Lock Schedule Setting
        "lock_schedule",
        "whitelist_country",

        // Social Network Setting
        "socialNetworkSetting",

        // Claim Policy
        "claim_policy",

        // Free Buy Time Setting
        "freeBuyTimeSetting",
      ]);
      // console.log('publicPool==============: ',publicPool)
      if (pool.tiers && pool.tiers.length > 0) {
        publicPool.tiers = pool.tiers.map((item, index) => {
          return {
            ...item,
            min_buy: new BigNumber(item.min_buy).toNumber(),
            max_buy:
              item.max_buy < 0 ? 0 : new BigNumber(item.max_buy).toNumber(),
          };
        });
      }
      let checkReplacedStatus = false;
      const now = new Date().getTime();
      // console.log("now: ", now);
      let isApllyWhitelist;
      if(address) {
          isApllyWhitelist = await new WhitelistSubmissionService().findSubmission({
            wallet_address: address,
            campaign_id: poolId,
          });
          
          // user is not apply whitelist and passed swap time
          if(!isApllyWhitelist && now > Number(publicPool.finish_time)*1000) {
            publicPool.campaign_status = Const.POOL_STATUS.ENDED;
            checkReplacedStatus = true;
          }

          
      }
      
      const checkFilled =
        Number(pool.token_sold) ===
        Number(Number(publicPool.total_sold_coin).toFixed(2));
      if (
        !publicPool.start_time ||
        !publicPool.finish_time ||
        !publicPool.start_join_pool_time ||
        !publicPool.end_join_pool_time
      ) {
        // console.log("-------------------------------Upcoming");
        publicPool.campaign_status = Const.POOL_STATUS.UPCOMING;
        checkReplacedStatus = true;
      } else if (now < Number(publicPool.start_time) * 1000) {
        // console.log("-------------------------------Upcoming");
        publicPool.campaign_status = Const.POOL_STATUS.UPCOMING;
        checkReplacedStatus = true;
      } else if (
        now >= Number(publicPool.start_time) * 1000 &&
        now < Number(publicPool.finish_time) * 1000
      ) {
        publicPool.campaign_status = Const.POOL_STATUS.SWAP;
        checkReplacedStatus = true;
        if (checkFilled) {
          publicPool.campaign_status = Const.POOL_STATUS.FILLED;
        }
      } else if (
        now >= Number(publicPool.finish_time) * 1000 &&
        now < Number(publicPool.campaignClaimConfig[0].start_time) * 1000
      ) {
        publicPool.campaign_status = Const.POOL_STATUS.FILLED;
        checkReplacedStatus = true;
      }
      
      else if (address && !checkReplacedStatus) {
        // console.log("check claimed --------------------------");
        // check user is claimed all token
        publicPool.campaign_status = await this.checkIsClaimed(
          publicPool,
          address,
          isApllyWhitelist
        );
      } else if (now > Number(publicPool.finish_time) * 1000) {
        // not connect metamask and pass swap time => END
        // console.log("check END --------------------------");
        publicPool.campaign_status = Const.POOL_STATUS.ENDED;
      }
      
      // Cache data
      RedisUtils.createRedisPoolDetail(poolId, publicPool);
      return HelperUtils.responseSuccess(publicPool);
    } catch (e) {
      console.log('e: ',e)
      return HelperUtils.responseErrorInternal("ERROR: Get public pool fail !");
    }
  }

  async checkFilled(item) {
    let CampaignContract = "";
    if (item.campaign_hash) {
      CampaignContract = await HelperUtils.getCampaignContract(
        item.network_available,
        item.campaign_hash
      );
    }

    let isFilled = false;

    if (CampaignContract) {
      // console.log('CampaignContract: ',CampaignContract)
      const tokenSold = await CampaignContract.methods.tokenSold().call();

      // console.log('tokenSold: ',web3.utils.fromWei(tokenSold))
      const tokenSoldNumber = web3.utils.fromWei(tokenSold);
      isFilled =
        Number(tokenSoldNumber) ===
        Number(Number(item.total_sold_coin).toFixed(2));
    }
    return isFilled;
  }

  async checkIsClaimed(item, walletAddress, isApllyWhitelist) {
    let CampaignContract = "";
    const now = new Date().getTime();
    if (item.campaign_hash) {
      CampaignContract = await HelperUtils.getCampaignContract(
        item.network_available,
        item.campaign_hash
      );
    }
    let campaign_status = item.campaign_status;
    if (CampaignContract && walletAddress) {
      const userPurchased = await CampaignContract.methods
        .userPurchased(walletAddress)
        .call();
      const userClaimed = await CampaignContract.methods
        .userClaimed(walletAddress)
        .call();

      // user is apply whitelist but not swap although passed swap time
      if (isApllyWhitelist && now > Number(item.finish_time)*1000 && userPurchased === 0) {
        campaign_status = Const.POOL_STATUS.ENDED;
      }

      if (BigNumber(userClaimed).lt(BigNumber(userPurchased))) {
        campaign_status = Const.POOL_STATUS.CLAIMABLE;
      } else {
        campaign_status = Const.POOL_STATUS.ENDED;
      }
    }
    return campaign_status;
  }

  // async getCampaignStatus() {
  //   if (now < Number(item.start_time) * 1000) {
  //     listData.rows[i].campaign_status = Const.POOL_STATUS.UPCOMING;
  //     continue;
  //   }
  //   else if (now >= Number(item.start_time) * 1000 && now < Number(item.finish_time) * 1000) {
  //     listData.rows[i].campaign_status = Const.POOL_STATUS.SWAP;
  //     const checkFilled = await checkFilled(item);
  //     if(checkFilled) {
  //       listData.rows[i].campaign_status = Const.POOL_STATUS.FILLED;
  //     }
  //     continue;
  //   }
  //   else if (now >= Number(item.finish_time) * 1000 && now < Number(item.campaignClaimConfig[0].start_time) * 1000) {
  //     listData.rows[i].campaign_status = Const.POOL_STATUS.FILLED;
  //     continue;
  //   }

  //   if(address) {
  //     listData.rows[i].campaign_status = await checkIsClaimed(item, address);
  //   }else {
  //     listData.rows[i].campaign_status = Const.POOL_STATUS.ENDED;
  //   }
  // }
  
  /**
  * @swagger
  * /pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get list pool 
  *     parameters:
  *       - name: limit
  *         description: limit element in one page
  *         in: query
  *         required: false
  *         type: number
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: Attention! swagger cant display big limit in one page
  *         example:
  */

  async getPoolList({ request }) {
    const param = request.all();
    const limit = param.limit ? param.limit : Config.get("const.limit_default");
    const page = param.page ? param.page : Config.get("const.page_default");
    param.limit = limit;
    param.page = page;
    param.is_search = true;
    const address = param.wallet_address;
    // console.log("Start Pool List with params: ", param);

    try {
      // if (await RedisUtils.checkExistRedisPoolList(param)) {
      //   const cachedPoolDetail = await RedisUtils.getRedisPoolList(param);
      //   console.log('Exist cache data Public Pool List: ', cachedPoolDetail);
      //   return HelperUtils.responseSuccess(JSON.parse(cachedPoolDetail));
      // }

      let listData = new PoolService()
        .buildSearchQuery(param)
        .with("campaignClaimConfig")
        .with("fcfsRoundsSetting")
        .with("socialNetworkSetting");
      if (process.env.NODE_ENV == "development") {
        listData = listData.orderBy("id", "DESC");
      }
      if (process.env.NODE_ENV == "production") {
        listData = listData.orderBy("id", "DESC");
      } else {
        listData = listData.orderBy("id", "ASC");
      }
      listData = await listData.paginate(page, limit);
      const listItem = listData.toJSON().data;
      const now = new Date().getTime();
      // for (let i = 0; i < listItem.length; i++) {
      //   const item = listItem[i];
      //   console.log("-------------item: ", item);
      //   if (
      //     !item.start_time ||
      //     !item.finish_time ||
      //     !item.start_join_pool_time ||
      //     !item.end_join_pool_time
      //   ) {
      //     console.log("--------------------TBA");
      //     listData.rows[i].campaign_status = Const.POOL_STATUS.TBA;
      //   }

      //   // if (now < Number(item.start_time) * 1000) {
      //   //   listData.rows[i].campaign_status = Const.POOL_STATUS.UPCOMING;
      //   // }
      //   // else if (now >= Number(item.start_time) * 1000 && now < Number(item.finish_time) * 1000) {
      //   //   listData.rows[i].campaign_status = Const.POOL_STATUS.SWAP;
      //   //   const isFilled = await this.checkFilled(item);
      //   //   if(isFilled) {
      //   //     listData.rows[i].campaign_status = Const.POOL_STATUS.FILLED;
      //   //   }

      //   // }
      //   // else if (now >= Number(item.finish_time) * 1000 && now < Number(item.campaignClaimConfig[0].start_time) * 1000) {
      //   //   listData.rows[i].campaign_status = Const.POOL_STATUS.FILLED;
      //   // }

      //   // else if(address) {
      //   //   listData.rows[i].campaign_status = await this.checkIsClaimed(item, address);
      //   // } else {
      //   //   listData.rows[i].campaign_status = Const.POOL_STATUS.ENDED;
      //   // }
      // }
      // const data =(listData.toJSON());
      // console.log('data: ',data.data[0].campaignClaimConfig)
      //  console.log(data[0].campaignClaimConfig);

      // Cache data
      // RedisUtils.createRedisPoolList(param, listData);

      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Pools Fail !!!");
    }
  }

  async getTopPools({ request }) {
    const inputParams = request.all();
    const limit = inputParams.limit
      ? inputParams.limit
      : Config.get("const.limit_default");
    const page = inputParams.page
      ? inputParams.page
      : Config.get("const.page_default");
    inputParams.limit = limit;
    inputParams.page = page;
    inputParams.is_search = true;
    // console.log("[getTopPools] - inputParams: ", inputParams);
    try {
      let listData = new PoolService().buildSearchQuery(inputParams);
      listData = listData.orderBy("created_at", "DESC");
      listData = await listData.paginate(page, limit);

      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Top Pools Fail !!!");
    }
  }

  /**
  * @swagger
  * /pools/user/{walletAddress}/joined-pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get user  joined  pool 
  *     parameters:
  *       - name: walletAddress
  *         description: walletAddress of user
  *         in: path
  *         required: yes
  *         type: string
  *     responses:
  *       200:
  *         description: get user  joined  pool 
  *         example:
  */

  async getJoinedPools({ request, params }) {
    const inputParams = request.all();
    const limit = inputParams.limit
      ? inputParams.limit
      : Config.get("const.limit_default");
    const page = inputParams.page
      ? inputParams.page
      : Config.get("const.page_default");
    inputParams.limit = limit;
    inputParams.page = page;
    inputParams.is_search = true;
    // console.log("[getJoinedPools] - inputParams: ", inputParams);
    const address = params.walletAddress;
    try {
      let listData = await new PoolService().getJoinedPools(
        address,
        inputParams
      );
      // console.log("listData: ", listData);
      const listItem = listData.data;
      const now = new Date().getTime();
      for (let i = 0; i < listItem.length; i++) {
        const item = listItem[i];

        if (now < Number(item.start_time) * 1000) {
          listItem[i].campaign_status = Const.POOL_STATUS.UPCOMING;
        } else if (
          now >= Number(item.start_time) * 1000 &&
          now < Number(item.finish_time) * 1000
        ) {
          listItem[i].campaign_status = Const.POOL_STATUS.SWAP;
          const isFilled = await this.checkFilled(item);
          if (isFilled) {
            listItem[i].campaign_status = Const.POOL_STATUS.FILLED;
          }
        } else if (
          now >= Number(item.finish_time) * 1000 &&
          now < Number(item.campaignClaimConfig[0].start_time) * 1000
        ) {
          listItem[i].campaign_status = Const.POOL_STATUS.FILLED;
        } else if (address) {
          listItem[i].campaign_status = await this.checkIsClaimed(
            item,
            address
          );
        } else {
          listItem[i].campaign_status = Const.POOL_STATUS.ENDED;
        }
      }
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Joined Pool Fail !!!");
    }
  }
  

  /**
  * @swagger
  * /pools/user/{walletAddress}/all-pools-status:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get joined_status of user to campain pool (interactive of user with all pool)
  *     parameters:
  *       - name: walletAddress
  *         description: walletAddress of user
  *         in: path
  *         required: yes
  *         type: string
  *     responses:
  *       200:
  *         description: get interactive of user with all pool 
  */

  async getAllPoolsStatus({ request, params }) {
    const inputParams = request.all();
    // console.log("[getAllPoolsStatus] - inputParams: ", inputParams);

    const limit = inputParams.limit
      ? inputParams.limit
      : Config.get("const.limit_default");
    const page = inputParams.page
      ? inputParams.page
      : Config.get("const.page_default");
    inputParams.limit = limit;
    inputParams.page = page;
    inputParams.is_search = true;

    const address = params.walletAddress;

    try {
      // let listData = await new PoolService().getAllPools(address, inputParams);
      // var listItem = listData.data;

      let listData = await new PoolService().getPoolsUserAppliedWhitelist(address, inputParams);
      
      // const now = new Date().getTime();
      // const deployedPool = [];
      // for (let i = 0; i < listItem.length; i++) {
      //   const item = listItem[i];
      //   const isApllyWhitelist =
      //     await new WhitelistSubmissionService().findSubmission({
      //       wallet_address: address,
      //       campaign_id: item.id,
      //     });
      //   // const is_Whitelist= await (new WhitelistUserService()).checkExisted( address,item.id );
      //   // const is_Winner = await new WinnerListService().findOneByFilters({
      //   //   wallet_address: address,
      //   //   campaign_id: item.id,
      //   // });
      //   // const is_Reserved = await new ReservedListService().findOneByFilter({
      //   //   wallet_address: address,
      //   //   campaign_id: item.id,
      //   // });
      //   var userAllocation = await new CampaignService().getUserMaxBuy(
      //     address,
      //     item.id
      //   );
      //   const canceledApplyWhitelist = new CanceledApplyWhitelistService();
      //   const is_Cancel =
      //     await canceledApplyWhitelist.findCanceledApplyWhitelist({
      //       wallet_address: address,
      //       campaign_id: item.id,
      //     });

      //   item.joined_status = Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET;
      //   if (!item.is_deploy) {
      //     if (isApllyWhitelist) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.APPLIED_WHITELIST;
      //     }
      //     if (is_Cancel) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.CANCELED_WHITELIST;
      //     }
      //   } else {
      //     deployedPool.push(i);
      //   }

      //   if (
      //     item.joined_status ===
      //     Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET
      //   )
      //     userAllocation = 0;
      //   item.allowcation_amount = userAllocation;
      //   item.allowcation_pre_order_amount = 0;
      // }

      // const multicall = new ethereumMulticall.Multicall({
      //   web3Instance: web3Polygon,
      //   tryAggregate: true,
      // });
      // const contractCallContext = [];

      // deployedPool.map((el, index) => {
      //   const item = listItem[el];

      //   contractCallContext.push({
      //     reference: `userClaimed_${index}`,
      //     contractAddress: item.campaign_hash,
      //     abi: CONTRACT_CAMPAIGN_ABI,
      //     calls: [
      //       {
      //         reference: "userClaimedCall",
      //         methodName: "userClaimed",
      //         methodParameters: [address],
      //       },
      //     ],
      //   });

      //   contractCallContext.push({
      //     reference: `userPurchased_${index}`,
      //     contractAddress: item.campaign_hash,
      //     abi: CONTRACT_CAMPAIGN_ABI,
      //     calls: [
      //       {
      //         reference: "userPurchasedCall",
      //         methodName: "userPurchased",
      //         methodParameters: [address],
      //       },
      //     ],
      //   });
      // });

      // console.log("========> Multicall");
      // console.log(contractCallContext);

      // const result = await multicall.call(contractCallContext);
      // const userInfo_DepoyedPool = [];
      // for (const [key, value] of Object.entries(result.results)) {
      //   const userInfoKey = key.split("_");
      //   if (userInfoKey[0] === "userClaimed")
      //     userInfo_DepoyedPool[userInfoKey[1]] = {
      //       ...userInfo_DepoyedPool[userInfoKey[1]],
      //       userClaimed: value.callsReturnContext[0].returnValues[0],
      //     };
      //   if (userInfoKey[0] === "userPurchased")
      //     userInfo_DepoyedPool[userInfoKey[1]] = {
      //       ...userInfo_DepoyedPool[userInfoKey[1]],
      //       userPurchased: value.callsReturnContext[0].returnValues[0],
      //     };
      // }

      // for (let i = 0; i < deployedPool.length; i++) {
      //   const item = listItem[deployedPool[i]];
      //   const isApllyWhitelist =
      //     await new WhitelistSubmissionService().findSubmission({
      //       wallet_address: address,
      //       campaign_id: item.id,
      //     });
      //   const is_Winner = await new WinnerListService().findOneByFilters({
      //     wallet_address: address,
      //     campaign_id: item.id,
      //   });
      //   // not start swap time
      //   if (now < Number(item.start_time) * 1000) {
      //     if (isApllyWhitelist && is_Winner) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.WIN_WHITELIST;
      //     }
      //     if (isApllyWhitelist && !is_Winner) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.NOT_WIN_WHITELIST;
      //     }
      //     if (!isApllyWhitelist) {
      //       item.joined_status =
      //         Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET;
      //     }
      //   } else if (now >= Number(item.start_time) * 1000) {
      //     //in swaping time and user have allocate
      //     if (userAllocation !== 0) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.SWAPPING;
      //     } else {
      //       if (isApllyWhitelist && !is_Winner) {
      //         item.joined_status = Const.POOL_STATUS_JOINED.NOT_WIN_WHITELIST;
      //       } else
      //         item.joined_status =
      //           Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET;
      //     }
      //   }

      //   //after buy time
      //   const userPurchased = userInfo_DepoyedPool[i].userPurchased;
      //   const userClaimed = userInfo_DepoyedPool[i].userClaimed;
      //   console.log("Pool " + item.id + " ===========>");
      //   console.log("userPurchased", userPurchased);
      //   console.log("userClaimed", userClaimed);

      //   // check clamable time or end time ( end time just clamable +12 h)
      //   if (
      //     item.campaign_status === Const.POOL_STATUS.CLAIMABLE ||
      //     item.campaign_status === Const.POOL_STATUS.ENDED
      //   ) {
      //     if (userPurchased === 0) {
      //       if (isApllyWhitelist) {
      //         item.campaign_status = Const.POOL_STATUS_JOINED.COMPLETED;
      //       } else {
      //         item.joined_status =
      //           Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET;
      //       }
      //     }
      //     // console.log("pool is claimable ")

      //     // still have token to claim
      //     if (BigNumber(userClaimed).lt(BigNumber(userPurchased))) {
      //       item.joined_status = Const.POOL_STATUS_JOINED.CLAIMABLE;
      //     } else {
      //       item.joined_status = Const.POOL_STATUS_JOINED.COMPLETED;
      //     }
      //   }

      //   if (
      //     item.joined_status ===
      //     Const.POOL_STATUS_JOINED.NOT_WHITELIST_OR_BUY_YET
      //   )
      //     userAllocation = 0;
      //   item.allowcation_amount = userAllocation;
      //   item.allowcation_pre_order_amount = 0;
      // }

      // // listItem = listData.data.filter(item => item.joined_status !== "null");
      // // console.log(listItem)
      // // listData.data=listItem
      // // console.log(listData)

      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Joined Pool Fail !!!");
    }
  }

  async getUpcomingPools({ request }) {
    const inputParams = request.all();
    // console.log("[getUpcomingPools] - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getUpcomingPools(inputParams);
      // console.log("listData", listData);
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Upcoming Pools Fail !!!");
    }
  }

  async getFeaturedPools({ request }) {
    const inputParams = request.all();
    // console.log("[getFeaturedPools] - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getFeaturedPools(inputParams);
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("Get Featured Pools Fail !!!");
    }
  }

  /**
  * @swagger
  * /pools/v3/active-pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get pool  in Active
  *     parameters:
  *       - name: limit
  *         description: limit element in one page
  *         in: query
  *         required: false
  *         type: number
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: get pool in Active 
  *         example:
  *           message: Success
  *           data: Array 
  */

  async getActivePoolsV3({ request }) {
    const inputParams = request.all();
    // console.log("[getActivePoolsV3] - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getActivePoolsV3(inputParams);
      // const dataJson = listData.toJSON();
      // console.log('listData: ', listData.toJSON());

      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("getActivePoolsV3 Fail !!!");
    }
  }
    /**
  * @swagger
  * /pools/v3/next-to-launch-pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get pool ready to launch
  *     parameters:
  *       - name: limit
  *         description: limit element in one page
  *         in: query
  *         required: false
  *         type: number
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: get pool ready to launch 
  *         example:
  *           message: Success
  *           data: Array 
  */

  async getNextToLaunchPoolsV3({ request }) {
    const inputParams = request.all();
    // console.log("[getNextToLaunchPoolsV3] - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getNextToLaunchPoolsV3(
        inputParams
      );
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal(
        "getNextToLaunchPoolsV3 Fail !!!"
      );
    }
  }
  
  /**
  * @swagger
  * /pools/v3/upcoming-pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get pool  upcoming
  *     parameters:
  *       - name: limit
  *         description: limit element in one page
  *         in: query
  *         required: false
  *         type: number
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: get pool upcoming 
  *         example:
  */
  async getUpcomingPoolsV3({ request }) {
    const inputParams = request.all();
    // console.log("[getUpcomingPoolsV3] - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getUpcomingPoolsV3(inputParams);
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("getUpcomingPoolsV3 Fail !!!");
    }
  }

  async getPrivateVC({ request }) {
    const inputParams = request.all();
    // console.log("getPrivateVC - inputParams: ", inputParams);
    try {
      let listData = await new PoolService().getUpcomingPoolsV3(inputParams);
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal("getUpcomingPoolsV3 Fail !!!");
    }
  }
  
  /**
  * @swagger
  * /pools/v3/complete-sale-pools:
  *   get:
  *     tags:
  *       - Public api 
  *     summary: get pool complete sale
  *     parameters:
  *       - name: limit
  *         description: limit element in one page
  *         in: query
  *         required: false
  *         type: number
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *     responses:
  *       200:
  *         description: get pool complete sale
  *         example:
  */

  async getCompleteSalePoolsV3({ request }) {
    const inputParams = request.all();
    // console.log("[getCompleteSalePoolsV3] - inputParams: ", inputParams);

    try {
      let listData = await new PoolService().getCompleteSalePoolsV3(
        inputParams
      );
      return HelperUtils.responseSuccess(listData);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal(
        "getCompleteSalePoolsV3 Fail !!!"
      );
    }
  }

  async poolStatus({ request, params }) {
    // console.log("[poolStatus] - runUpdatePoolStatus: ");
    const poolService = new PoolService();
    const pools = await poolService.runUpdatePoolStatus();

    return pools;
  }
}

module.exports = PoolController;
