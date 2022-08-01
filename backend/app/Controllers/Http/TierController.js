'use strict'

const Tier = use('App/Models/Tier');
const HelperUtils = use('App/Common/HelperUtils');
const Redis = use('Redis');
const TierService = use('App/Services/TierService')
const RedisUtils = use('App/Common/RedisUtils');

class TierController {

  async testGetTier() {
    return HelperUtils.getManyUserTierSmart(["0xBA0cD74Fd953DA6eD6186CBe87DfAB0f9F6767f7"]);
  }

  
  /**
  * @swagger
  * /pool/{campaignId}/tiers:
  *   get:
  *     tags:
  *       - Public api
  *     summary: get tier seting in this pool campain(min tier , allocation of each tier )
  *     parameters:
  *       - name: campaignId
  *         description: campaignId of campain
  *         in: path
  *         required: yes
  *         type: number
  *     responses:
  *       200:
  */
  async getTiers({request, params}) {
    const campaignId = params.campaignId;
    try {
      if (await RedisUtils.checkExistRedisTierList(campaignId)) {
        const cachedTiers = await RedisUtils.getRedisTierList();
        if (cachedTiers) {
          return HelperUtils.responseSuccess(JSON.parse(cachedTiers));
        }
      }

      // console.log('Not exist Redis cache');
      const query = (new TierService).buildQueryBuilder({
        campaign_id: campaignId,
      }).orderBy('level', 'desc');
      const tiers = await query.fetch();

      // Cache data
      RedisUtils.createRedisTierList(campaignId, tiers);

      return HelperUtils.responseSuccess(tiers);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal('ERROR: Get tiers fail !');
    }
  }
}

module.exports = TierController;
