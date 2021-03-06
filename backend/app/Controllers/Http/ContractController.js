'use strict'

const ContractLogModel = use('App/Models/ContractLog');
const Config = use('Config');
const HelperUtils = use('App/Common/HelperUtils');

class ContractController {
  
  /**
  * @swagger
  * /contract/campaign-factories:
  *   get:
  *     tags:
  *       - ContractLog 
  *     summary: get  ContractLog of campain 
  *     parameters:
  *       - name: page
  *         description: page number
  *         in: query
  *         required: false
  *         type: number
  *       - name: limit
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number
  * 
  *       - name: from
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number
  * 
  *       - name: to
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number
  * 
  *       - name: transaction_hash
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number
  * 
  *       - name: transaction_from
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number
  *       - name: transaction_to
  *         description: limit of each page
  *         in: query
  *         required: false
  *         type: number

  *     responses:
  *       200:
  *         description: check user is winner  in this pool
  *         example:
  */

  async campaigns({request}) {
    try {
      const param = request.all();
      const limit = param.limit ? param.limit : Config.get('const.limit_default')
      const page = param.page ? param.page : Config.get('const.page_default')
      let dataList = ContractLogModel.query().where('contract_name', '=', 'campaign')
      if (param.from) {
        dataList = dataList.where('from', 'like', '%' + param.from + '%')
      }
      if (param.to) {
        dataList = dataList.where('to', 'like', '%' + param.to + '%')
      }
      if (param.transaction_hash) {
        dataList = dataList.where('transaction_hash', 'like', '%' + param.transaction_hash + '%')
      }
      if (param.transaction_from) {
        dataList = dataList.where('transaction_fromm', 'like', '%' + param.transaction_from + '%')
      }
      if (param.transaction_to) {
        dataList = dataList.where('transaction_to', 'like', '%' + param.transaction_to + '%')
      }

      dataList = await dataList.orderBy('id', 'DECS').paginate(page, limit);
      return HelperUtils.responseSuccess(dataList);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal('ERROR: Get all campaign fail !');
    }
  }

  async campaignFactories({request}) {
    try {
      const param = request.all();
      const limit = param.limit ? param.limit : Config.get('const.limit_default')
      const page = param.page ? param.page : Config.get('const.page_default')
      const dataList = await ContractLogModel.query().where('contract_name', '=', 'CampaignFactory').paginate(page, limit);
      return HelperUtils.responseSuccess(dataList);
    } catch (e) {
      console.log(e);
      return HelperUtils.responseErrorInternal('ERROR: Campaign factories fail !');
    }
  }
}

module.exports = ContractController
