module.exports = {
  // WEB3_API_URL: 'https://rinkeby-rpc.sotatek.com',
  WEB3_API_URL: "https://goerli.infura.io/v3/f1464dc327c64a93a31220b50334bf78",
  // WEB3_API_URL: 'https://goerli.infura.io/v3/3a18fd787c2342c4915364de4955bcf5',
  WEB3_BSC_API_URL: "https://data-seed-prebsc-1-s1.binance.org:8545",
  WEB3_POLYGON_API_URL: "https://rpc-mumbai.matic.today/",
  AVERAGE_BLOCK_TIME: 15000,
  REQUIRED_CONFIRMATION: 3,
  CHAIN_ID: 80001,
  contracts: {
    CampaignFactory: {
      CONTRACT_DATA: require("./contracts/Normal/CapaignFactory.json"),
      CONTRACT_CLAIMABLE: require("./contracts/Claim/CapaignFactory.json"),
      CONTRACT_ADDRESS: "0x46D4624072B51486bccBe980D366F0aC37fF7011",
      FIRST_CRAWL_BLOCK: 10769935, // First Block: 4554016
      BLOCK_NUM_IN_ONE_GO: 1000,
      BREAK_TIME_AFTER_ONE_GO: 15000,
      NEED_NOTIFY_BY_WEBHOOK: true,
    },
    Campaign: {
      CONTRACT_DATA: require("./contracts/Normal/Campaign.json"),
      CONTRACT_CLAIMABLE: require("./contracts/Claim/Campaign.json"),
      CONTRACT_ADDRESS: "0xc498d7c54514B00F69e636be7826406dE4e31Fe0",
      FIRST_CRAWL_BLOCK: 4550016,
      BLOCK_NUM_IN_ONE_GO: 500,
      BREAK_TIME_AFTER_ONE_GO: 15000,
      NEED_NOTIFY_BY_WEBHOOK: true,
    },
    EthLink: {
      CONTRACT_DATA: require("./contracts/Normal/EthLink.json"),
      CONTRACT_ADDRESS: "0xdf7986c3C00A08967285382A3f1476Cbe7e91ba0",
      FIRST_CRAWL_BLOCK: 4550016,
      BLOCK_NUM_IN_ONE_GO: 500,
      BREAK_TIME_AFTER_ONE_GO: 15000,
      NEED_NOTIFY_BY_WEBHOOK: true,
    },
  //   EthLink: {
  //     CONTRACT_DATA: require('./contracts/Normal/EthLink.json'),
  //     CONTRACT_ADDRESS: '0xdf7986c3C00A08967285382A3f1476Cbe7e91ba0',
  //     FIRST_CRAWL_BLOCK: 4550016,
  //     BLOCK_NUM_IN_ONE_GO: 500,
  //     BREAK_TIME_AFTER_ONE_GO: 15000,
  //     NEED_NOTIFY_BY_WEBHOOK: true,
  //   },
    StakingPool: {
      CONTRACT_DATA: require("./contracts/StakingPool/StakingPool.json"),
    },
  },
};
