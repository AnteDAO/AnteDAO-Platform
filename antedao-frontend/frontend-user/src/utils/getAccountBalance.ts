import { ethers } from 'ethers';
import { ETH_CHAIN_ID, BSC_CHAIN_ID, POLYGON_CHAIN_ID } from '../constants/network';

const ETH_RPC_URL = process.env.REACT_APP_NETWORK_URL || "";
const BSC_RPC_URL = process.env.REACT_APP_BSC_RPC_URL || "";
const POLYGON_RPC_URL = process.env.REACT_APP_POLYGON_RPC_URL || "";

const getAccountBalance = async (appChainID: string, walletChainID: string, connectedAccount: string, connector: string) => {
if (appChainID && connectedAccount && connector) {
  const exactNetwork = appChainID === walletChainID;

  const provider = (()=>{
    switch (appChainID) {
      case BSC_CHAIN_ID:
        return new ethers.providers.JsonRpcProvider(BSC_RPC_URL);
      case POLYGON_CHAIN_ID:
        return new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
      case ETH_CHAIN_ID:
      default:
        return new ethers.providers.JsonRpcProvider(ETH_RPC_URL);
    }
  })();

  const accountBalance = exactNetwork 
    ? await provider.getBalance(connectedAccount)
    : { _hex: '0x00' }

    return accountBalance; 
  }
  
  return { _hex: '0x00' };
}

export default getAccountBalance;
