'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Const = use('App/Common/Const');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => 'It\'s working')//ok
Route.get('/hello', () => 'Hello World')//ok
Route.get('image/:fileName', 'FileController.getImage'); //ok

// Webhook
Route.group(() => {
  Route.post('ico-campaign', 'CampaignController.icoCampaignCreate') // call Sc to create or update campain
  Route.post('edit-campaign', 'CampaignController.icoCampaignEdit') // not user 
  Route.post('campaign-status', 'CampaignController.CampaignEditStatus')//call Sc to update campain is_pause status
  Route.post('campaign-changed', 'CampaignController.CampaignChanged') // call Sc to update campain wwhen change data
  Route.post('transaction', 'TransactionController.transactionCreate')// not used
  Route.post('transaction-refund', 'TransactionController.transactionRefund')// not used
  Route.post('affiliate-campaign', 'AffiliateCampaignController.affiliateCreate') // not used
  Route.post('token-claimed', 'TransactionController.tokenClaimed')// not used

  Route.post('mantra-stake/index-stake-info', 'MantraStakeController.indexStakeInfo');//not used
  Route.post('reputation/index-stake-info', 'ReputationController.indexStakeInfo');//not used
}).prefix('webhook').middleware('checkJwtWebhook');

Route.post('block-pass/receive', 'UserController.kycUpdateStatus').middleware('checkBlockPassSignature');

// ICO Owner User (Admin Page)
Route.group(() => {
  Route.get('/contract/campaign-factories', 'ContractController.campaignFactories') // not user
  Route.get('/contract/campaigns', 'ContractController.campaigns') // not user
  // Route.post('campaign-create', 'CampaignController.campaignCreate')
  Route.get('campaigns', 'CampaignController.campaignList')//?? auth jwt 
  Route.get('campaign-new', 'CampaignController.campaignNew')//ok
  Route.get('campaigns/:campaign', 'CampaignController.campaignShow')//ok
  Route.get('campaign-delete/:walletAddress/:campaign', 'CampaignController.campaignDelete') // not used
  Route.get('transactions', 'TransactionController.transactionList') // not used

  Route.post('asset-tokens', 'AssetTokenController.create')//not used
  Route.get('asset-tokens/:contract', 'AssetTokenController.list')//not used
  Route.delete('asset-tokens/delete/:id', 'AssetTokenController.remove')//not used
  Route.get('affiliate-campaign/:token', 'AffiliateCampaignController.affiliateList')//not used

  Route.get('my-campaign', 'CampaignController.myCampaign')// not used
  Route.get('my-campaign/:status', 'CampaignController.myCampaign').middleware('checkStatus');//not used

  Route.put('/reputation/bonus/:walletAddress', 'ReputationController.setReputationBonus')//not used

  Route.get('/whitelist', 'CaptchaWhitelistController.get')//not used
  Route.post('/whitelist', 'CaptchaWhitelistController.set')//not used
  Route.delete('/whitelist', 'CaptchaWhitelistController.remove')//not used
}).middleware(['typeAdmin', 'auth:admin', 'checkAdminJwtSecret']);

Route.group(() => {
  Route.post('upload-avatar', 'FileController.uploadAvatar');//ok

  // KYC
  Route.put('active-kyc', 'UserController.activeKyc'); //ok

  // Pool
  Route.post('pool/create', 'PoolController.createPool');  //ok
  Route.post('pool/:campaignId/update', 'PoolController.updatePool');//ok
  Route.get('pool/:campaignId', 'PoolController.getPoolAdmin');//ok
  Route.post('pool/:campaignId/deploy-success', 'PoolController.updateDeploySuccess');//ok
  Route.post('pool/:campaignId/change-display', 'PoolController.changeDisplay');//ok
  Route.post('pool/:campaignId/change-public-winner-status', 'PoolController.changePublicWinnerStatus');//ok
  Route.get('test', 'WhiteListUserController.getWhiteList');//test api
  // Tier setting
  Route.put('tier-setting/:tier', 'TierSettingController.updateTierSetting');//ok

  // Participants
  Route.get('pool/:campaignId/participants', 'WhiteListSubmissionController.getRemainParticipants'); //ok
  Route.post('pool/:campaignId/whitelist-submission/batch/verify', 'WhiteListSubmissionController.verifyBatchWhitelistSubmission');//ok
  Route.post('pool/:campaignId/whitelist-submission/batch/approve', 'WhiteListSubmissionController.approveBatchWhitelistSubmission');//ok
  Route.post('pool/:campaignId/whitelist-submission/:walletAddress/verify', 'WhiteListSubmissionController.verifyWhitelistSubmission');//ok
  Route.put('pool/:campaignId/whitelist-submission/:walletAddress', 'WhiteListSubmissionController.updateWhitelistSubmission');//ok
  Route.delete('pool/:campaignId/participants/:walletAddress/delete', 'WhiteListUserController.deleteWhiteList');//ok
  Route.post('pool/winner-random/:campaignId/:tier', 'WhiteListUserController.getRandomWinners');//ok
  // Route.post('pool/winner-random-fake/:campaignId/:tier', 'WhiteListUserController.getRandomWinnersFake');

  // Winners
  Route.get('pool/:campaignId/winners', 'WinnerListUserController.getWinnerListAdmin');//ok
  Route.delete('pool/:campaignId/winners/:walletAddress/delete', 'WinnerListUserController.deleteWinner');//ok
  Route.post('pool/:campaignId/winners/add-to-winner', 'WinnerListUserController.addParticipantsToWinner');// ok

  // Reserve
  Route.get('pool/:campaignId/reserves', 'ReservedListController.getReservedList');//ok
  Route.post('pool/:campaignId/reserves/add', 'ReservedListController.addReserveUser');// not used 
  Route.delete('pool/:campaignId/reserves/:walletAddress/delete', 'ReservedListController.deleteReserve');//not used
  Route.post('pool/reserves/update-setting', 'ReservedListController.updateReserveSetting'); // not used
  Route.get('pool/reserves/setting', 'ReservedListController.reserveSetting');// not used

  // Staking pool
  Route.post('staking-pool/create', 'StakingPoolController.createPool');
  Route.post('staking-pool/:stakingPoolId/update', 'StakingPoolController.updatePool');
  Route.get('staking-pool', 'StakingPoolController.getPoolList');
  Route.get('staking-pool/:stakingPoolId', 'StakingPoolController.getPool');
  Route.post('staking-pool/:stakingPoolId/change-display', 'StakingPoolController.changeDisplay');

  //snapshot user balance
  Route.get('pool/:campaignId/user-snapshot-balance', 'CampaignController.userSnapShotBalance');

}).prefix(Const.USER_TYPE_PREFIX.ICO_OWNER)
//.middleware(['typeAdmin', 'checkPrefix', 'auth:admin', 'checkAdminJwtSecret']);

Route.group(() => {
  // Auth
  Route.post('/login', 'AuthAdminController.login').validator('Login').middleware('checkSignature'); //ok
  // Route.post('/register', 'AuthAdminController.adminRegister').validator('Register').middleware('checkSignature');
  // Route.get('confirm-email/:token', 'AdminController.confirmEmail'); // Confirm email when register
  // Route.post('forgot-password', 'AdminController.forgotPassword').validator('ForgotPassword').middleware('checkSignature');
  Route.get('check-wallet-address', 'AuthAdminController.checkWalletAddress');//ok
  Route.post('check-wallet-address', 'AuthAdminController.checkWalletAddress');//ok
  Route.get('check-token/:token', 'AdminController.checkToken');// not used
  Route.post('reset-password/:token', 'AdminController.resetPassword').validator('ResetPassword').middleware('checkSignature'); // not used

}).prefix(Const.USER_TYPE_PREFIX.ICO_OWNER).middleware(['typeAdmin', 'checkPrefix', 'formatEmailAndWallet']);

Route.group(() => {
  Route.get('profile', 'AdminController.profile').middleware(['auth:admin', 'checkRole']);//ok
  Route.post('change-password', 'AdminController.changePassword').middleware(['checkSignature', 'auth:admin', 'checkRole']);// not used
  Route.post('update-profile', 'AdminController.updateProfile').middleware(['auth:admin', 'checkRole']).validator('UpdateProfile');// not used
  Route.post('transaction-create', 'TransactionController.transactionAdd').middleware(['auth:admin']);// not used

  Route.get('users', 'UserController.userList')//ok
  //.middleware(['auth:admin']);
  Route.get('users/reload', 'UserController.reloadCachedUserData').middleware(['auth:admin']);

  Route.get('admins', 'AdminController.adminList').middleware(['auth:admin']);//ok
  Route.get('admins/:id', 'AdminController.adminDetail').middleware(['auth:admin']);//ok
  Route.post('admins', 'AdminController.create').middleware(['auth:admin']);//ok
  Route.put('admins/:id', 'AdminController.update').middleware(['auth:admin']);//ok


  Route.get('kyc-users', 'UserController.kycUserList').middleware(['auth:admin']);
  Route.get('kyc-users/:id', 'UserController.kycUserDetail').middleware(['auth:admin']);
  Route.post('kyc-users', 'UserController.kycUserCreate').middleware(['auth:admin']);
  Route.put('kyc-users/:id', 'UserController.kycUserUpdate').middleware(['auth:admin']);
  Route.put('kyc-users/:id/change-kyc', 'UserController.kycUserChangeIsKyc').middleware(['auth:admin']);

  Route.post('deposit-admin', 'CampaignController.depositAdmin').middleware(['auth:admin']);// not used
}).prefix(Const.USER_TYPE_PREFIX.ICO_OWNER).middleware(['typeAdmin', 'checkPrefix', 'checkAdminJwtSecret']); //user/public



// Investor User
Route.get('campaign-latest-active', 'CampaignController.campaignLatestActive')// ok

Route.group(() => {
  Route.post('/login', 'UserAuthController.login').validator('Login').middleware('checkSignature');//ok
  Route.post('/register', 'UserAuthController.register').validator('Register').middleware('checkSignature');// not used
  Route.post('/register-email', 'UserAuthController.registerVerifyEmail').middleware('checkSignature');// not used

  Route.get('confirm-email/:token', 'UserController.confirmEmail'); // Confirm email when register
  Route.get('check-wallet-address', 'UserAuthController.checkWalletAddress');//ok
  Route.post('check-wallet-address', 'UserAuthController.checkWalletAddress');//ok
  Route.get('check-token/:token', 'UserController.checkToken');// not used
  Route.post('reset-password/:token', 'UserController.resetPassword').validator('ResetPassword').middleware('checkSignature');// not used
  Route.get('profile', 'UserController.profile').middleware(['maskEmailAndWallet']);// not used
  Route.get('tier-info', 'UserController.tierInfo').middleware(['maskEmailAndWallet']);// ok
  Route.put('update-profile', 'UserController.updateProfile').middleware(['checkSignature']);// not used
  Route.post('check-active', 'UserController.checkUserActive');// not used

  Route.post('join-campaign', 'CampaignController.joinCampaign').middleware(['checkSignature']);//ok
  Route.post('unjoin-campaign', 'CampaignController.unJoinCampaign').middleware(['checkSignature']);//ok
  Route.get('check-canceled-campaign', 'CampaignController.checkCancelCampaign').middleware(['maskEmailAndWallet']);//ok
  Route.post('deposit', 'CampaignController.deposit').middleware(['checkSignature']);//ok
  Route.post('claim', 'CampaignController.claim').middleware(['checkSignature']);//ok
  Route.get('whitelist-search/:campaignId', 'WhiteListUserController.search');//ok
  Route.get('whitelist-apply/previous', 'WhiteListSubmissionController.getPreviousWhitelistSubmission');//ok
  Route.get('whitelist-apply/:campaignId', 'WhiteListSubmissionController.getWhitelistSubmission');//ok
  Route.post('whitelist-apply/:campaignId', 'WhiteListSubmissionController.addWhitelistSubmission').middleware(['checkSignature']);//ok
  Route.get('winner-list/:campaignId', 'WinnerListUserController.getWinnerListPublic').middleware(['maskEmailAndWallet']);//ok
  Route.get('winner-search/:campaignId', 'WinnerListUserController.search').middleware(['maskEmailAndWallet']);//ok
  Route.get('counting/:campaignId', 'CampaignController.countingJoinedCampaign');//ok
  Route.get('check-join-campaign/:campaignId', 'CampaignController.checkJoinedCampaign');//ok

  Route.get('test', 'WhiteListUserController.getWhiteList');// not used

  Route.get('get-airdrop/:campaignId/:walletAddress', 'CampaignController.getAirdrop');// not used
  Route.post('pre-order', 'CampaignController.preOrder').middleware(['checkSignature']);// not used

}).prefix(Const.USER_TYPE_PREFIX.PUBLIC_USER).middleware(['typeUser', 'checkPrefix', 'formatEmailAndWallet']);// , 'maskEmailAndWallet'

Route.post(':type/check-max-usd', 'UserBuyCampaignController.checkBuy')//not used
  .middleware(['checkPrefix', 'auth', 'checkJwtSecret']);

// Public API:
Route.group(() => {
  // Route.post('/login', 'UserAuthController.login');
  // Route.post('/logout', 'UserAuthController.logout');
  // subscribe notification
  Route.post('/subscribe-notification', 'UserDeviceController.subscribeNotification');// not used
  // Route.post('/register', 'UserAuthController.register');
  

  Route.get('pools', 'PoolController.getPoolList'); // ok 
  Route.get('pools/top-pools', 'PoolController.getTopPools');// not used
  Route.get('pools/user/:walletAddress/joined-pools', 'PoolController.getJoinedPools'); // ok
  Route.get('pools/user/:walletAddress/all-pools-status', 'PoolController.getAllPoolsStatus'); //ok

  // Pool List V2
  Route.get('pools/v2/upcoming-pools', 'PoolController.getUpcomingPools');// not used 
  Route.get('pools/v2/featured-pools', 'PoolController.getFeaturedPools');// not used 

  // Pool List V3
  Route.get('pools/v3/active-pools', 'PoolController.getActivePoolsV3'); //ok
  Route.get('pools/v3/next-to-launch-pools', 'PoolController.getNextToLaunchPoolsV3');//ok
  Route.get('pools/v3/upcoming-pools', 'PoolController.getUpcomingPoolsV3');//ok
  Route.get('pools/v3/complete-sale-pools', 'PoolController.getCompleteSalePoolsV3');//ok

  Route.get('pool/:campaignId', 'PoolController.getPoolPublic');//ok
  Route.get('pool/:campaignId/tiers', 'TierController.getTiers');//ok
  Route.get('pool/:campaignId/winners', 'WinnerListUserController.getWinnerAndReserveList');//ok
  Route.get('pool/:campaignId/user/:walletAddress/current-tier', 'UserController.getCurrentTier');//ok
  Route.post('user/check-email-verified', 'UserController.checkEmailVerified');//not used
  Route.get('pool/:campaignId/check-exist-winner', 'WinnerListUserController.checkExistWinner').validator('CheckUserWinnerExist');//ok
  Route.get('pool/:campaignId/check-picked-winner', 'WinnerListUserController.checkPickedWinner'); // not used

  // Staking Pool
  Route.get('staking-pool', 'StakingPoolController.getPublicPoolList'); //ok

  // Claim Config
  Route.get('pool/:campaignId/claim-configs', 'ClaimConfigController.getListClaimConfig');//ok
  Route.get('pool/:campaignId/user/:walletAddress/claimable-amount', 'ClaimConfigController.getClaimableAmount');//ok

  Route.get('reputation/points/:walletAddress', 'ReputationController.getReputationPoint');// not used
  Route.get('reputation/histories/:walletAddress', 'ReputationController.getReputationHistory');// not used
  Route.get('get-rate-setting', 'RateSettingController.getRateSetting');//not used
  Route.get('get-tiers', 'TierSettingController.getTierSetting');//ok

})
//.middleware(['maskEmailAndWallet']);

// Test API:
Route.get('api/v1/epkf/bonus', 'UserController.getEPkfBonusBalance');//test 
Route.post('add_fake_user/:campaign_id/:tier', 'FakeUserController.insertMany');//test 
Route.get('test/run-pool-status', 'PoolController.poolStatus');


// API V2
// Route.get('dashboard/graph/:campaign', 'RevenueController.getRevenue').middleware(['checkIcoOwner', 'checkJwtSecret', 'auth']);

// Route.get('latest-transaction', 'TransactionController.latestTransaction')
// Route.get('public-campaign', 'CampaignController.myCampaign')
// Route.get('public-campaign/:status', 'CampaignController.myCampaign').middleware('checkPublicStatus')
// Route.post('user/change-type', 'UserController.changeType').validator('ChangeUserType')
// Route.post('user/buy', 'UserBuyCampaignController.getUserBuy').validator('CheckUserBought')
// Route.get('coming-soon', 'ConfigController.getConfig')


