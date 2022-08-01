'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const TierSetting = use('App/Models/TierSetting')

class TierSettingSeeder {
  async run () {
    const tierSetting = [
      {
        tier: 1,
        tokenAmount: 2000
      },
      {
        tier: 2,
        tokenAmount: 10000
      },
      {
        tier: 3,
        tokenAmount: 17000
      },
      {
        tier: 4,
        tokenAmount: 30000
      },
      {
        tier: 5,
        tokenAmount: 50000
      },
      {
        tier: 6,
        tokenAmount: 80000
      },
      {
        tier: 7,
        tokenAmount: 170000
      },
      {
        tier: 8,
        tokenAmount: 260000
      },
      {
        tier: 9,
        tokenAmount: 350000
      }
    ];

    for (let i = 0; i < tierSetting.length; i++) {
      let tierSettingObj = new TierSetting();
      tierSettingObj.tier = tierSetting[i].tier;
      tierSettingObj.token_amount = tierSetting[i].tokenAmount;
      await tierSettingObj.save();
    }
  }
}

module.exports = TierSettingSeeder
