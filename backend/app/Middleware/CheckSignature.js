"use strict";

const ForbiddenException = use("App/Exceptions/ForbiddenException");
const sigUtil = require("eth-sig-util");
const Web3 = require("web3");
const Const = use("App/Common/Const");
const web3 = new Web3();

class CheckSignature {
  async handle({ request }, next) {
    try {
      // const type = request.params.type;
      // const isAdmin = type == Const.USER_TYPE_PREFIX.ICO_OWNER;
      // const message = isAdmin ? process.env.MESSAGE_SIGNATURE : process.env.MESSAGE_INVESTOR_SIGNATURE;
      const params = request.all();
      const headers = request.headers();
      const signature = params.signature;
      // console.log("signature paramss" ,signature)

      const message = headers.msgsignature;
      // console.log("signature paramss" ,signature)
      // console.log("params ----m ",params)
      // console.log("message header ",message)
      let recover = await web3.eth.accounts.recover(message, signature);
      // console.log(recover)
      const recoverConvert = Web3.utils.toChecksumAddress(recover);
      const wallet_address = Web3.utils.toChecksumAddress(
        params.wallet_address
      );
      if (recoverConvert && recoverConvert !== wallet_address) {
        throw new ForbiddenException("Invalid signature!");
      }
      headers.wallet_address = wallet_address;
      await next();
    } catch (e) {
      // console.log("ERROR: ", e);
      throw new ForbiddenException("Unauthorized!");
    }
  }
}

module.exports = CheckSignature;
