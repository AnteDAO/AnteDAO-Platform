import { combineReducers } from 'redux';
import {
  campaignsReducer,
  campaignCreateReducer,
  campaignDetailReducer,
  campaignICORegisterReducer,
  campaignAffiliateCreateReducer,
  campaignErc20RateSetReducer,
  campaignLatestReducer,
  campaignEditReducer,
  campaignStatusToggleReducer,
  campaignRefundTokensReducer,
  campaignProcessingReducer,
  campaignLatestActiveReducer
} from './campaign'
import { transactionCampaignReducer } from './transaction'
import { affiliateCampaignReducer, affiliateLinkGenerateReducer } from './affiliate'
import { getTokensReducer, createTokenReducer } from './token'
import { alertReducer } from './alert'
import userReducer, {
  userConnectReducer,
  userRegisterReducer,
  investorReducer,
  investorRegisterReducer,
  userProfileReducer,
  userProfileUpdateReducer,
  userCurrentNetwork
} from './user';
import { buyTokenReducer, buyTokenPurchasableReducer } from './buy-token';
import {claimTokenReducer, stakedTokensClaimReducer } from "./claim-token"
import { usdtAllowanceReducer } from './usdt-allowance';
import { usdtApproveReducer } from './usdt-approve';
import { settingDetailReducer } from './setting-detail';
import { settingDeactivateReducer } from './setting-deactivate';
import { balanceReducer } from './balance';
import { usdtDetailReducer } from './usdt-detail';
import { whitelistReducer, whitelistCreateReducer, whitelistRemoveReducer } from './whitelist'

const rootReducer = combineReducers({
  user: userReducer,
  investor: investorReducer,
  investorRegister: investorRegisterReducer,
  userConnect: userConnectReducer,
  userCurrentNetwork: userCurrentNetwork,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  campaigns: campaignsReducer,
  campaignProcessing: campaignProcessingReducer,
  campaignCreate: campaignCreateReducer,
  campaignEdit: campaignEditReducer,
  campaignDetail: campaignDetailReducer,
  campaignICORegister: campaignICORegisterReducer,
  campaignAffiliateCreate: campaignAffiliateCreateReducer,
  campaignErc20RateSet: campaignErc20RateSetReducer,
  campaignLatest: campaignLatestReducer,
  campaignLatestActive: campaignLatestActiveReducer,
  campaignStatusToggle: campaignStatusToggleReducer,
  campaignRefundTokens: campaignRefundTokensReducer,
  transactionCampaign: transactionCampaignReducer,
  affiliateCampaign: affiliateCampaignReducer,
  affiliateLinkGenerate: affiliateLinkGenerateReducer,
  buyToken: buyTokenReducer,
  buyTokenPurchasable: buyTokenPurchasableReducer,
  claimToken: claimTokenReducer,
  stakedToken: stakedTokensClaimReducer,
  usdtAllowance: usdtAllowanceReducer,
  usdtApprove: usdtApproveReducer,
  settingDetail: settingDetailReducer,
  settingDeactivate: settingDeactivateReducer,
  tokensByUser:  getTokensReducer,
  tokenCreateByUser: createTokenReducer,
  balance: balanceReducer,
  usdtDetail: usdtDetailReducer,
  alert: alertReducer,
  whitelist: whitelistReducer,
  whitelistCreate: whitelistCreateReducer,
  whitelistRemoveReducer: whitelistRemoveReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
