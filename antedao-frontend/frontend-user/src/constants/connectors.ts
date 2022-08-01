import { BscConnector } from '@binance-chain/bsc-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '../connectors/Fortmatic'
import { APP_NETWORKS_NAME, BSC_CHAIN_ID, ETH_CHAIN_ID, FORMATIC_KEY, NETWORK_BSC_URL, NETWORK_POLYGON_URL, NETWORK_URL, POLYGON_CHAIN_ID } from './network'

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEP_LINK;
const TRUS_WALLET_DEEPLINK = process.env.REACT_APP_TRUST_WALLET_DEEP_LINK;


export const bscConnector = new BscConnector({}) as any;
export const injected = new InjectedConnector({});

const originalChainIdChangeHandler = bscConnector.handleChainChanged;

//@ts-ignore
bscConnector.handleChainChanged = (chainId: string) => {
  const chainIdNum = Number(chainId);
  console.debug("Handling 'chainChanged' event with payload", chainId, isNaN(chainIdNum));
  if (isNaN(chainIdNum)) {
    bscConnector.emitError('NaN ChainId');
    return;
  }
  //@ts-ignore
  originalChainIdChangeHandler(chainId)
};

// mainnet only
export const walletLinkConnect = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL || '',
  appName: 'AnteDAO',
  appLogoUrl: 'https://antedao-user.sotatek.works/logo192.png',
  darkMode: true,
  // supportedChainIds: [1,4,5],
});

// mainnet only
export const createWalletConnect = (chainIds?: number[]) => {
  const RPCS = {
    [Number(ETH_CHAIN_ID)]: NETWORK_URL as string,
    [Number(POLYGON_CHAIN_ID)]: NETWORK_POLYGON_URL as string,
    [Number(BSC_CHAIN_ID)]: NETWORK_BSC_URL as string,
  };
  let rpc: { [key: number]: string } = {};
  if (chainIds?.length) {
    chainIds.map((chainId) => (rpc[chainId] = RPCS[chainId]))
  }
  else {
    rpc = RPCS;
  }
  return new WalletConnectConnector({
    rpc,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    // pollingInterval: 10000
  });
}
export const walletConnect = createWalletConnect()

export const walletConnectBsc = new WalletConnectConnector({
  // rpc: { 56: 'https://bsc-dataseed.binance.org/' },
  rpc: { [Number(BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // pollingInterval: 10000
});

export const walletConnectPolygon = new WalletConnectConnector({
  rpc: { [Number(POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  // pollingInterval: 10000
});


// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  // iconName: string
  description: string
  href: string | null
  // color: string
  primary?: true
  mobile?: true,
  desktop?: boolean,
  mobileOnly?: true,
  disableIcon: string;
  icon: string;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = "MetaMask",
  TrustWallet = 'Trust Wallet',
  BSC = "BSC Wallet",
  WalletConnect = "Wallet Connect",
  WalletConnectBsc = "WalletConnect",
  WalletConnectPolygon = "WalletConnect",
  WalletLinkConnect = "Trust Wallet",
  Fortmatic = 'Fortmatic'
}

export type connectorNames = Extract<ConnectorNames, ConnectorNames.MetaMask | ConnectorNames.TrustWallet | ConnectorNames.BSC | ConnectorNames.WalletConnect | ConnectorNames.WalletLinkConnect | ConnectorNames.Fortmatic>;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: '/images/metamask-wallet.svg',
    disableIcon: '/images/metamask-disabled.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    desktop: true,
    deepLink: METAMASK_DEEPLINK
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true,
    desktop: true,
  },
  WALLET_LINK: {
    connector: walletLinkConnect,
    name: ConnectorNames.WalletLinkConnect,
    icon: '/images/trust-wallet.svg',
    description: 'Connect to Trust Walle',
    disableIcon: '/images/trust-wallet-disabled.svg',
    href: null,
    mobile: true,
    desktop: false,
    deepLink: TRUS_WALLET_DEEPLINK
  },
  TRUST_WALLET: {
    connector: injected,
    name: ConnectorNames.TrustWallet,
    icon: '/images/trust-wallet.svg',
    description: 'Connect to Trust Walle',
    disableIcon: '/images/trust-wallet-disabled.svg',
    href: null,
    mobile: true,
    desktop: false,
    deepLink: TRUS_WALLET_DEEPLINK
  },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: ConnectorNames.Fortmatic,
  //   icon: '/images/fortmatic.svg',
  //   description: 'Login using Fortmatic hosted wallet',
  //   disableIcon: '/images/fortmatic-disabled.svg',
  //   href: null,
  //   mobile: true
  // },

};

export const SUPPORTED_WALLETS_BSC: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  WALLET_CONNECT: {
    connector: walletConnectBsc,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    desktop: true,
    mobile: true,
  },
  WALLET_LINK: SUPPORTED_WALLETS.TRUST_WALLET
}

export const SUPPORTED_WALLETS_POLYGON: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  WALLET_CONNECT: {
    connector: walletConnectPolygon,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true,
    desktop: true,
  },
  WALLET_LINK: SUPPORTED_WALLETS.TRUST_WALLET
}

export const connectorsByName: { [key in ConnectorNames]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.TrustWallet]: injected,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletConnectBsc]: walletConnectBsc,
  [ConnectorNames.WalletConnectPolygon]: walletConnectPolygon,
  [ConnectorNames.WalletLinkConnect]: walletLinkConnect,
}

export const connectorsSupportByNetwork: { [key: string]: { [key: string]: WalletInfo } } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
  [APP_NETWORKS_NAME.BSC]: SUPPORTED_WALLETS_BSC,
  [APP_NETWORKS_NAME.POLYGON]: SUPPORTED_WALLETS_POLYGON,
};

