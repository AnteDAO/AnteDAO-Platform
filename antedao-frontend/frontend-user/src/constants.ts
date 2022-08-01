export const TRANSACTION_ERROR = 'Transaction failed. Please check blockchain to know more error.';
export const API_URL_PREFIX = 'user';
export const ADMIN_URL_PREFIX = 'dashboard';
export const IMAGE_URL_PREFIX = 'image';
export const MAX_BUY_CAMPAIGN = 1000;
export const WHITELIST_LINK = 'https://forms.gle/HiQkhaRM8mujeryq8';
export const INSTRUCTION_WHITELIST_LINK = 'https://medium.com/polkafoundry/nftify-whitelist-on-red-kite-launchpad-on-june-4-2021-26cd4b8ebc8d';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const NFT_PLUS_AMOUNT_PRODUCTION = process.env.NFT_PLUS_AMOUNT_PRODUCTION || '0';
export const POOL_STATUS = {
  TBA: 0,
  UPCOMING: 1,
  JOINING: 2,
  IN_PROGRESS: 3,
  FILLED: 4,
  CLOSED: 5,
  CLAIMABLE: 6
};
export const POOL_STATUS_TEXT = {
  [POOL_STATUS.TBA]: 'TBA',
  [POOL_STATUS.UPCOMING]: 'Upcoming',
  [POOL_STATUS.FILLED]: 'Filled',
  [POOL_STATUS.IN_PROGRESS]: 'Swap',
  [POOL_STATUS.CLAIMABLE]: 'Claimable',
  [POOL_STATUS.CLOSED]: 'Ended',
};

export const NULL_AMOUNT = 'N/A';
export const POOL_STATUS_JOINED = {  // Pool Status for User Joined Pool (Version 3)
  NONE: 'NONE',
  APPLIED_WHITELIST: 'APPLIED_WHITELIST',
  WIN_WHITELIST: 'WIN_WHITELIST',
  NOT_WIN_WHITELIST: 'NOT_WIN_WHITELIST',
  CANCELED_WHITELIST: 'CANCELED_WHITELIST',
  SWAPPING: 'SWAPPING',
  CLAIMABLE: 'CLAIMABLE',
  COMPLETED: 'COMPLETED',
  NOT_WHITELIST_OR_BUY_YET: 'NOT_WHITELIST_OR_BUY_YET',
};

export const NETWORK = {
  ETHEREUM: 'eth',
  BSC: 'bsc',
  POLYGON: 'polygon'
};

export const ACCEPT_CURRENCY = {
  ETH: 'eth',
  USDT: 'usdt',
  USDC: 'usdc',
  BUSD: 'busd',
};

export const BUY_TYPE = {
  WHITELIST_LOTTERY: 'whitelist',
  FCFS: 'fcfs',
};

export const POOL_TYPE = {
  SWAP: 'swap',
  CLAIMABLE: 'claimable',
};

export const PUBLIC_WINNER_STATUS = {
  PUBLIC: 1,
  PRIVATE: 0,
};
export const POOL_IS_PRIVATE = {
  MARKET: 0,
  VC: 1,
  //Xóa đi các type còn lại nếu không sử dụng nữa
  PRIVATE: 1,
  SEED: 2,
  COMMUNITY: 3,
};

export const PICK_WINNER_RULE = {
  RULE_NORMAL: 'rule-normal',
  RULE_WITH_WEIGHT_RATE: 'rule-with-weight-rate',
  RULE_LUCKY_DOVE: 'rule-lucky-dove', // extend from RULE_WITH_WEIGHT_RATE
};

export const USER_STATUS = {
  UNVERIFIED: 0,
  ACTIVE: 1,
  BLOCKED: 2,
  DELETED: 3
};

export const TOKEN_STAKE_SYMBOLS = {
  ANTE: 'ANTE',
};

export const TOKEN_STAKE_NAMES = {
  ANTE: 'ANTE',
};



export const TIERS = [
  {
    name: 'None',
    icon: '/images/icons/rocket.svg',
    bg: '/images/icons/red-kite-bg.png',
    bgColor: '#B8B8FF',
  },
  {
    name: 'Tier 1',
    bg: '/images/icons/hawk-bg.png',
    bgColor: '#8181D8',
    icon: '/images/icons/dove.png'
  },
  {
    name: 'Tier 2',
    bg: '/images/icons/falcon-bg.png',
    bgColor: '#6F44E9',
    icon: '/images/icons/hawk.png'
  },
  {
    name: 'Tier 3',
    bg: '/images/icons/eagle-bg.png',
    bgColor: '#4646FF',
    icon: '/images/icons/eagle.png'
  },
  {
    name: 'Tier 4',
    bg: '/images/icons/phoenix-bg.png',
    bgColor: '#8181D8',
    icon: '/images/icons/pheonix.png'
  },
  {
    name: 'Tier 5',
    bg: '/images/icons/hawk-bg.png',
    bgColor: '#8181D8',
    icon: '/images/icons/dove.png'
  },
  {
    name: 'Tier 6',
    bg: '/images/icons/falcon-bg.png',
    bgColor: '#6F44E9',
    icon: '/images/icons/hawk.png'
  },
  {
    name: 'Tier 7',
    bg: '/images/icons/eagle-bg.png',
    bgColor: '#4646FF',
    icon: '/images/icons/eagle.png'
  },
  {
    name: 'Tier 8',
    bg: '/images/icons/phoenix-bg.png',
    bgColor: '#6F44E9',
    icon: '/images/icons/pheonix.png'
  },
  {
    name: 'Tier 9',
    bg: '/images/icons/phoenix-bg.png',
    bgColor: '#6F44E9',
    icon: '/images/icons/pheonix.png'
  },
];




export const KYC_STATUS = {
  INCOMPLETE: 0, // Blockpass verifications pending
  APPROVED: 1, // profile has been approved by Merchant
  RESUBMIT: 2, // Merchant has rejected one or more attributes
  WAITING: 3, // Merchant's review pending
  INREVIEW: 4, // in review by Merchant
};

export const GAS_LIMIT_CONFIGS = {
  APPROVE: '80000',  // 46483
  DEPOSIT: '250000',  // 195057
  CLAIM: '120000', // 81901
  APPROVE_SOTA_TOKEN: '200000',
  STAKE_SOTA_TIERS: '120000', // 79021
  UNSTAKE_SOTA_TIERS: '100000', // 72527
};

export const NETWORK_AVAILABLE = {
  ETH: 'eth',
  BSC: 'bsc',
  POLYGON: 'polygon'
};

export const ETHERSCAN_BASE_URL: any = {
  '1': 'https://etherscan.io',
  '4': 'https://rinkeby.etherscan.io',
  '5': 'https://goerli.etherscan.io',
  '56': 'https://bscscan.com',
  '97': 'https://testnet.bscscan.com',
  '137': 'https://polygonscan.com',
  '80001': 'https://mumbai.polygonscan.com/',
};
