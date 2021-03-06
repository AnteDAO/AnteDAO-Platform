import axios from "axios";
import BigNumber from 'bignumber.js';
import _ from 'lodash';
import queryString from 'query-string';

import { ADMIN_URL_PREFIX, API_URL_PREFIX, ETHERSCAN_BASE_URL, IMAGE_URL_PREFIX, NETWORK_AVAILABLE } from "../constants";


export function formatPrecisionAmount(amount: any, precision: number = 18): string {
  const rawValue = new BigNumber(`${amount}`).toFixed(precision);
  return (amount && parseFloat(amount) !== Infinity) ? new BigNumber(rawValue).toFormat() : '0';
}

export const routeWithPrefix = (prefix = ADMIN_URL_PREFIX, url = '') => {
  const truncateUrl = _.trim(url, '/');
  return `/${prefix}/${truncateUrl}`;
};

export const adminRoute = (url = '') => {
  const truncateUrl = _.trim(url, '/');
  const resUrl = `/${ADMIN_URL_PREFIX}/${truncateUrl}`;
  return resUrl;
};

export const publicRoute = (url = '') => {
  const truncateUrl = _.trim(url, '/');
  const resUrl = `/${truncateUrl}`;
  return resUrl;
};

export const checkIsAdminRoute = (pathname: string) => {
  return (pathname.indexOf(`/${ADMIN_URL_PREFIX}`) !== -1) || (pathname === '/dashboard/login');
};

export const checkIsLoginRoute = (pathname: string) => {
  return pathname.indexOf(`/login`) !== -1;
};

export const checkIsInvestorRoute = (pathname: string) => {
  return (pathname.indexOf(`/buy-token`) !== -1) || (pathname === '/login');
};

export const apiRoute = (url = '') => {
  const truncateUrl = _.trim(url, '/');
  const resUrl = `/${API_URL_PREFIX}/${truncateUrl}`;
  return resUrl;
};

export const imageRoute = (url = '') => {
  const truncateUrl = _.trim(url, '/');
  const resUrl = `${process.env.REACT_APP_API_BASE_URL || ''}/${IMAGE_URL_PREFIX}/${truncateUrl}`;
  return resUrl;
};

export const etherscanRoute = (address = '', poolDetail: any = null) => {
  let network = '';
  if (poolDetail) {
    switch (poolDetail.network_available) {
      case NETWORK_AVAILABLE.BSC:
        network = process.env.REACT_APP_BSC_CHAIN_ID + '';
        break;

      case NETWORK_AVAILABLE.POLYGON:
        network = process.env.REACT_APP_POLYGON_CHAIN_ID + '';
        break;

      case NETWORK_AVAILABLE.ETH:
        network = process.env.REACT_APP_ETH_CHAIN_ID + '';
        break;
    }
  }

  const networkId = network || localStorage.getItem('NETWORK_ID') || process.env.REACT_APP_NETWORK_ID || '1';
  const baseUrl = ETHERSCAN_BASE_URL[networkId];
  const truncateUrl = _.trim(address, '/');
  const resUrl = `${baseUrl}/${truncateUrl}`;
  return resUrl;
};

export const etherscanAddressRoute = (address = '', poolDetail: any = null) => {
  return etherscanRoute(`address/${address}`, poolDetail);
};

export const etherscanTransactionRoute = (address = '', poolDetail: any = null) => {
  return etherscanRoute(`tx/${address}`, poolDetail);
};

export const getTransactionRowType = (transaction: any) => {
  if (transaction?.type === 'Refund') {
    return 'Refund';
  }
  if (transaction?.type === 'TokenClaimed') {
    return 'Claim';
  }
  return 'Buy';
};

export const getETHPrices = async () => {
  // To use:
  // useEffect(() => {
  //   getPrices().then((resPrices: any) => {
  //     setPrices(resPrices);
  //   });
  // }, []);

  return await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(function (response) {
      let resData = JSON.parse(JSON.stringify(response));
      resData = (resData && resData.data) || {};
      return (resData && resData.ethereum && resData.ethereum.usd) || 0;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const fixGasLimit = (type = 'deposit') => {
  let overrides = {};
  if (process.env.NODE_ENV !== 'production') {
    if (type === 'deposit') {
      overrides = {
        gasLimit: 200000,
        gasPrice: 10000000000,
      };
    } else if (type === 'approve') {
      overrides = {
        gasLimit: 500000,
        gasPrice: 50000000000,
      };
    } else if (type === 'claim') {
      overrides = {
        gasLimit: 200000,
        gasPrice: 10000000000,
      };
    } else if (type === 'buy') {
      overrides = {
        gasLimit: 500000,
        gasPrice: 10000000000,
      };
    }
  }

  return overrides;
};

export const fixGasLimitWithProvider = (library: any, type = 'deposit') => {
  let overrides = {};
  return overrides;

  // const provider = (library?.provider as any);
  // if (provider?.isWalletLink) {
  //   overrides = fixGasLimit(type);
  //   console.log('Provider is WalletLink:', provider);
  //   console.log('Gas Limit: ', overrides);
  // }

  // return overrides;
};

export const checkIsWalletLink = (library: any) => {
  const provider = (library?.provider as any);
  if (provider?.isWalletLink) {
    console.log('Provider is WalletLink:', provider);
  }
  return !!provider?.isWalletLink;
};

export const disconnectWalletLink = (library: any) => {
  const provider = (library?.provider as any);
  provider?.close && provider?.close();
};

export const paginationArray = (array: any, page_number: any, page_size: any) => {
  const newData = JSON.parse(JSON.stringify(array));
  const pageData = newData.slice((page_number - 1) * page_size, page_number * page_size);
  const dataLength = newData.length;
  return {
    data: pageData,
    total: dataLength,
    perPage: page_size,
    lastPage: Math.ceil(dataLength / page_size),
    page: page_number,
  };
};

export const shortenAddress = (address: string, digits: number = 4) => {
  return `${address.substring(0, digits + 2)}...${address.substring(42 - digits)}`
};

export const getUrl = (baseUrl: string, params?: Record<string, any>, options?: queryString.StringifyOptions) => {
  return baseUrl + (params ? "?" + queryString.stringify(params, options || { skipEmptyString: true }) : '')
}