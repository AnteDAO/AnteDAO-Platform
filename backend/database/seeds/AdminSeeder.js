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
const Admin = use('App/Models/Admin')

class AdminSeeder {
  async run () {
    const admins = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        signature: 'XNWHnjpn',
        isActive: 0,
        role: 1,
        type: 1,
        firstName: 'admin',
        lastName: 'admin'
      }
    ];

    for (let i = 0; i < admins.length; i++) {
      let adminObj = new Admin();
      adminObj.username = admins[i].username;
      adminObj.email = admins[i].email;
      adminObj.signature = admins[i].signature;
      adminObj.is_active = admins[i].isActive;
      adminObj.role = admins[i].role;
      adminObj.type = admins[i].type;
      adminObj.firstname = admins[i].firstName;
      adminObj.lastname = admins[i].lastName;
      await adminObj.save();
    }
  }
}

module.exports = AdminSeeder
