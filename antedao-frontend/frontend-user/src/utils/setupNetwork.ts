import { APP_NETWORKS_SUPPORT } from '../constants/network';
import { Dispatch } from 'redux';
import { alertFailure } from '../store/actions/alert';
import { changeNetworkFailed, changeNetworkSuccess, updateWalletNetwork } from '../store/actions/appNetwork';


export const requestSupportNetwork = async (chainId: string, dispatch: Dispatch<any>) => {
  const provider = (window as any).ethereum;
  if (provider) {
    const networkInfo = APP_NETWORKS_SUPPORT[+chainId];
    if (networkInfo) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkInfo.details?.chainId }],
        });
        dispatch(changeNetworkSuccess());
        dispatch(updateWalletNetwork(chainId));
        return true;
      } catch (error: any) {
        // This error is user cancel request switch network
        if (error.code === 4001) {
          dispatch(changeNetworkFailed(error));
          dispatch(alertFailure(`Transaction rejected!`));
        }
        // This error code indicates that the chain has not been added to MetaMask.
        if (error.code === 4902 || error.code === -32603) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                ...(networkInfo.details || {})
              }]
            });
            dispatch(changeNetworkSuccess());
            dispatch(updateWalletNetwork(chainId));
            return true;
          } catch (addError) {
            dispatch(changeNetworkFailed(error));
            dispatch(alertFailure(`Transaction rejected!`));
          }
        }
        return false;
      }
    }
  } else {
    dispatch(alertFailure(`No wallet detected!`));
    return false
  }
  return false
}

export const requestSupportNetworkWalletConnect = async (provider: any, chainId: string, dispatch: Dispatch<any>) => {
  const networkInfo = APP_NETWORKS_SUPPORT[+chainId];
  if (networkInfo) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkInfo.details?.chainId }],
      });
      dispatch(changeNetworkSuccess());
      dispatch(updateWalletNetwork(chainId));
      return true
    } catch (error: any) {
      if (error.message === "User rejected the request.") {
        dispatch(changeNetworkFailed(error));
        dispatch(alertFailure(`Transaction rejected!`));
        return false;
      }
      else {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              ...(networkInfo.details || {})
            }]
          });
          dispatch(changeNetworkSuccess());
          dispatch(updateWalletNetwork(chainId));
          return true;
        } catch (addError) {
          dispatch(alertFailure(`Transaction rejected!`));
          dispatch(changeNetworkFailed(error));
          return false;
        }
      }
    }
  }
  else return false
}
