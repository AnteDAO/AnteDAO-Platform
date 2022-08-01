import { getUserTier } from './../../../../store/actions/sota-tiers';
import OneSignal from 'react-onesignal';
/* eslint-disable react-hooks/exhaustive-deps */
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/walletconnect-connector';
import BigNumber from 'bignumber.js';
import { Dispatch as ReactDispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ConnectorNames, createWalletConnect } from '../../../../constants/connectors';
import {
  APP_NETWORKS_ID, APP_NETWORKS_SUPPORT, chainId, ChainIdNameMapping, NETWORK_NAME_MAPPINGS, POLYGON_CHAIN_ID
} from '../../../../constants/network';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { alertFailure } from "../../../../store/actions/alert";
import { settingCurrentConnector, changeNetworkRequest, changeNetworkSuccess, changeNetworkFailed, updateWalletNetwork, selectNetwork } from '../../../../store/actions/appNetwork';
import { connectWalletSuccess, disconnectWallet } from '../../../../store/actions/wallet';
import { AppNetworkState, ConnectorState } from '../../../../store/reducers/appNetwork';
import getAccountBalance from '../../../../utils/getAccountBalance';
import { getAppNetworkName } from '../../../../utils/network/getAppNetworkName';
import { requestSupportNetwork, requestSupportNetworkWalletConnect } from '../../../../utils/setupNetwork';
import useSubscription from './useSubscription';


const useProviderConnect = (
  setOpenConnectWallet?: ReactDispatch<SetStateAction<boolean>>,
  openConnectWallet?: boolean,
  binanceAvailable?: boolean
) => {

  const dispatch: Dispatch<any> = useDispatch();
  const { data: appNetworkData } = useTypedSelector((state) => state.appNetwork) as AppNetworkState;
  const { appChainID, walletChainID, requestChainID } = appNetworkData;
  const { connector: currentConnector } = useTypedSelector((state) => state.connector) as ConnectorState;
  // eslint-disable-next-line
  const { activate, active, connector, chainId, error, account: connectedAccount, deactivate, library, } = useWeb3React();
  const [walletName, setWalletName] = useState<string>('');
  const [loginError, setLoginError] = useState('');
  const [connectWalletLoading, setConnectWalletLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>("");

  const {subcription,unSubcription} = useSubscription(playerId)


  useEffect(() => {
    //reqest chainID
    if (requestChainID && currentConnector && walletName) {
      setConnectWalletLoading(true);
      requestChangeNetwork(currentConnector, requestChainID);
    }
  }, [currentConnector, requestChainID, walletName]);

  useEffect(() => {
    if (library?.provider && requestChainID && requestChainID !== appChainID && walletName === ConnectorNames.WalletConnect && !walletChainID) {
      requestSupportNetworkWalletConnect(library.provider, requestChainID, dispatch);
    }
  }, [library?.provider, requestChainID, appChainID, walletName])

  const requestChangeNetwork = async (connector: AbstractConnector, newChainID: string, isTryAgain: boolean = true) => {
    setLoading(true);
    try {
      if (walletName === ConnectorNames.WalletConnect && library) {
        const result = await requestSupportNetworkWalletConnect(library.provider, newChainID, dispatch);
        setOpenConnectWallet?.(false);
        setLoading(false);
        if (result) {
          setWalletName(walletName);
          setLoginError('');
        }
        else {
          setOpenConnectWallet?.(false);
        }
      }
      else if (connector && walletName) {
        let result = true;
        if (walletName === ConnectorNames.MetaMask) {
          result = await requestSupportNetwork(newChainID, dispatch);
        }
        if (!result) {
          setLoading(false);
          setConnectWalletLoading(false);
        }
        else await activate(connector, undefined, true)
          .then(async (res) => {
            dispatch(settingCurrentConnector(connector, walletName));
            setWalletName(walletName);
            if (walletName === ConnectorNames.WalletConnect) {
              if (requestChainID && requestChainID === newChainID) {
                dispatch(changeNetworkSuccess());
                setOpenConnectWallet?.(false);
                dispatch(updateWalletNetwork(newChainID));
                setLoading(false);
                setLoginError('');
              }
              else if (requestChainID) {
                await requestChangeNetwork(connector, requestChainID, false);
              }
              else {
                setConnectWalletLoading?.(false)
                dispatch(changeNetworkFailed(''));
              }
              setLoading(false);
            }
            else {
              setOpenConnectWallet?.(false);
              dispatch(changeNetworkSuccess());
              dispatch(updateWalletNetwork(newChainID));
              setLoading(false);
              setLoginError('');
            }
          })
          .catch(async error => {
            // When change network only
            if (error instanceof UnsupportedChainIdError) {
              // Is try again (when first connect with wallet connect)
              if (walletName === ConnectorNames.WalletConnect && isTryAgain) {
                const currentChainId = await connector?.getChainId();
                if (currentChainId && APP_NETWORKS_SUPPORT[Number(currentChainId)]) {
                  await requestChangeNetwork(createWalletConnect(), currentChainId.toString(), false);
                }
                else {
                  dispatch(changeNetworkFailed(error));
                  dispatch(settingCurrentConnector(undefined, undefined));
                  dispatch(disconnectWallet());
                  setWalletName('');
                  setLoading(false);
                  setConnectWalletLoading(false);
                  localStorage.removeItem("walletconnect");
                  // eslint-disable-next-line
                  dispatch(alertFailure(`App network (${NETWORK_NAME_MAPPINGS[requestChainID || appChainID]}) doesn't match to network selected in wallet: ${walletChainID && NETWORK_NAME_MAPPINGS[walletChainID] || 'Unknown'}. Please change network in wallet or change app network.`));
                }
              }
              else {
                dispatch(changeNetworkFailed(error));
                dispatch(settingCurrentConnector(connector, walletName));
                setWalletName(walletName);
                setLoading(false);
                setConnectWalletLoading(false);
                // eslint-disable-next-line
                dispatch(alertFailure(`App network (${NETWORK_NAME_MAPPINGS[requestChainID || appChainID]}) doesn't match to network selected in wallet: ${walletChainID && NETWORK_NAME_MAPPINGS[walletChainID] || 'Unknown'}. Please change network in wallet or change app network.`));
              }
            }
            // When connect only
            else if (error instanceof UserRejectedRequestError) {
              dispatch(changeNetworkFailed(error));
              setLoading(false);
              setConnectWalletLoading(false);
              dispatch(alertFailure(`Transaction rejected!`));
            }
            else if (error?.code === -32002) {
              setLoading(false);
              setConnectWalletLoading(false);
              dispatch(alertFailure(`Request already pending on your metamask`));
              dispatch(changeNetworkFailed(error));
              dispatch(disconnectWallet());
              dispatch(settingCurrentConnector(undefined, undefined));
            }
            else {
              setLoading(false);
              setConnectWalletLoading(false);
              dispatch(alertFailure(`Connect error`));
              dispatch(changeNetworkFailed(error));
              dispatch(disconnectWallet());
              dispatch(settingCurrentConnector(undefined, undefined));
            }

          })
      }
      else {
        setConnectWalletLoading(false);
        setLoading(false);
      }
    }
    catch (err: any) {
      setLoginError(err?.message || 'Login error');
      setConnectWalletLoading(false);
      setWalletName('');
      setLoading(false);
    }
  }
  useEffect(() => {
    if (currentConnector && walletName) {
      const handleWeb3ReactUpdate = (updated: any) => {
        if (updated.account) {
          // if (updated.account) {
          //   setAccount(updated.account);
          // } else setAccount(undefined);
        }
        if (updated.chainId) {
          const chainId = Number(updated.chainId).toString();
          if (!APP_NETWORKS_ID.includes(chainId)) {
            if (walletName === ConnectorNames.WalletConnect) {
              setLoginError('');
              handleConnectorDisconnect();
            }
            else {
              switchNetwork(appChainID, chainId);
            }
          }
          else {
            setLoginError('');
            if (chainId !== appChainID) {
              dispatch(selectNetwork(chainId));
              dispatch(updateWalletNetwork(chainId));
            }
          }
        }
      }

      const handleWeb3ReactError = (err: any) => {
        if (err === 'NaN ChainId') {
          dispatch(changeNetworkFailed(err));
          setLoginError(`App network (${appChainID}) doesn't match to network selected in wallet: NaN. Learn how to change network in wallet or`);
        }
      }

      if (currentConnector?.on) {
        currentConnector.on('Web3ReactUpdate', handleWeb3ReactUpdate)
        currentConnector.on('Web3ReactError', handleWeb3ReactError);
        currentConnector.on('Web3ReactDeactivate', handleConnectorDisconnect);
      }
      return () => {
        if (currentConnector?.removeListener) {
          currentConnector.removeListener('Web3ReactUpdate', handleWeb3ReactUpdate);
          currentConnector.removeListener('Web3ReactError', handleWeb3ReactError);
          currentConnector.removeListener('Web3ReactDeactivate', handleConnectorDisconnect);
        }
      }
    }

    return;
  }, [currentConnector, connectedAccount, active, dispatch, appChainID, walletName]);


  useEffect(() => {
    const getAccountDetails = async () => {
      if (connectedAccount) {
        try {
          const accountBalance = await getAccountBalance(appChainID, walletChainID, connectedAccount as string, walletName);
          dispatch(
            connectWalletSuccess(
              walletName,
              [connectedAccount],
              { [connectedAccount]: new BigNumber(accountBalance._hex).div(new BigNumber(10).pow(18)).toFixed(5) }
            )
          );
          sessionStorage.removeItem('disconnected')
          setConnectWalletLoading(false);
        }
        catch (err) {
          setConnectWalletLoading(false);
        }
      }
    }
    if (appChainID && walletChainID && !requestChainID && appChainID === walletChainID && connectedAccount && walletName) {
      setConnectWalletLoading(true);
      getAccountDetails();
    }
  }, [walletName, connectedAccount, appChainID, walletChainID, requestChainID]);

  // Handle Provider choose
  const handleProviderChosen = (newWalletName: string, connector: AbstractConnector) => {
    if (newWalletName === ConnectorNames.WalletConnect && currentConnector && requestChainID) {
      setConnectWalletLoading(true);
      requestChangeNetwork(connector, requestChainID);
    }
    else {
      if (!requestChainID && !connectWalletLoading) dispatch(changeNetworkRequest(appChainID))
      dispatch(settingCurrentConnector(connector, newWalletName))
      setWalletName(newWalletName);
    }
  }

  const switchNetwork = (appChainID: string, walletChainID: string) => {
    if (appChainID && walletChainID) {
      Number(appChainID) !== Number(walletChainID) ?
        setLoginError(`App network (${getAppNetworkName(appChainID)}) doesn't match to network selected in wallet: ${ChainIdNameMapping[Number(walletChainID) as chainId] || "Unknown"}.`) : setLoginError('');
    }
    return;
  }
  const handleConnectorDisconnect = useCallback(async () => { 
    console.log("disconnect");
    console.log("disconnect 2");
    setConnectWalletLoading(true);
    deactivate();
    localStorage.removeItem("walletconnect");
    dispatch(settingCurrentConnector(undefined, undefined));
    dispatch(disconnectWallet());
    dispatch(updateWalletNetwork(''));
    dispatch(selectNetwork(POLYGON_CHAIN_ID))
    setWalletName('');
    setLoginError('');
    setConnectWalletLoading(false);
    sessionStorage.setItem('disconnected', "true")
  }, []);

  useEffect(()=>{
    subcription()
    unSubcription() 
  },[playerId,connectedAccount])

  useEffect(() => {
    const ONE_SIGNAL_APP_ID =  process.env.REACT_APP_ONE_SIGNAL_APP_ID || ""
    OneSignal.init(
      { appId: ONE_SIGNAL_APP_ID,
        safari_web_id: "web.onesignal.auto.5d451968-8243-4fe2-88cd-3c94a5f2a4fc",
        notifyButton: {
          enable: true
      }
    }
    )
  },[])
  useEffect(() => {

    if(connectedAccount){
      OneSignal.isPushNotificationsEnabled((isAllow: boolean) => {
        if (!isAllow) OneSignal.showHttpPermissionRequest({ force: true })
      });
      OneSignal.getUserId((player_id?:string | null) => {
        console.log('player_id 2',player_id);
        
        if(player_id)setPlayerId(player_id);
      })
      
      OneSignal.on('notificationDisplay', upgradeTier);
     
    };
   
    return () => {
      OneSignal.off('notificationDisplay', upgradeTier);
    }
  }, [connectedAccount]);
  
  const upgradeTier = useCallback(() => {
    if (connectedAccount) dispatch(getUserTier(connectedAccount));
  }, [connectedAccount])


  return {
    handleProviderChosen,
    setWalletName,
    walletName,
    connectWalletLoading: loading || connectWalletLoading,
    walletNameSuccess: walletName,
    loginError,
    currentConnector,
    appNetworkLoading: loading,
    handleConnectorDisconnect
  }
}

export default useProviderConnect;
