'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserPurchasedAndUserClaimedSchema extends Schema {
  up () {
    this.table('whitelist_submissions', (table) => {
      // alter table
      table.integer('user_purchased').nullable();
      table.integer('user_claimed').nullable();
    })
  }

  down () {
    this.table('whitelist_submissions', (table) => {
      // reverse alternations
      table.dropColumn('user_purchased');
      table.dropColumn('user_claimed')
    })
  }
}

module.exports = AddUserPurchasedAndUserClaimedSchema
