'use strict'
const RateSetting = use('App/Models/RateSetting');
const HelperUtils = use('App/Common/HelperUtils');
const RedisUtils = use('App/Common/RedisUtils');
const TierSettingModel = use('App/Models/TierSetting');
const TierSettingService = use('App/Services/TierSettingService')

class TierSettingController {


  /**
  * @swagger
  * /get-tiers:
  *   get:
  *     tags:
  *       - Tier Setting
  *     summary: get tier seting 
  *     responses:
  *       200:
  *         description: get tier setting of admin
  */
  async getTierSetting({ request }) {
    try {
      const tierSettingService = new TierSettingService();
      const tierSettings = await tierSettingService.getTierSettings({});

      return HelperUtils.responseSuccess(tierSettings);
    } catch (e) {
      console.error(e);
      return HelperUtils.responseErrorInternal('ERROR: Get tiers setting fail !');
    }
  }
  
    /**
  * @swagger
  * /admin/tier-setting/{tier}:
  *   put:
  *     tags:
  *       - Tier Setting   
  *     summary: admin update how divide tier
  *     parameters:
  *       - name: token_amount
  *         description: token amount minimum to get this tier
  *         in: query
  *         required: true
  *         type: number
  *       - name: tier
  *         description: tier
  *         in: path
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: add user in whitelist to  winner
  *         example:
  */

  async updateTierSetting({ request, auth, params }) {
    try {
      const updateInfo = request.only(['token_amount']);
      const editTier = params.tier;
      const tierSettingService = new TierSettingService();

      await tierSettingService.updateTierSetting(updateInfo, editTier);
      return HelperUtils.responseSuccess();
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal('ERROR: Update tiers setting fail !');
    }
  }
}

module.exports = TierSettingController
