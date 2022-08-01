import { AbstractConnector } from '@web3-react/abstract-connector';
import { appNetworkActions } from '../constants/appNetwork';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export enum NetworkUpdateType {
  Wallet = "Wallet",
  App = "App",
  Connector = "Connector"
}

export const selectNetwork = (appChainID: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: appNetworkActions.SELECT_NETWORK,
      payload: appChainID
    });
  }
};
export const updateWalletNetwork = (walletChainID: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: appNetworkActions.UPDATE_WALLET_NETWORK,
      payload: walletChainID
    });
  }
};

export const changeNetworkRequest = (requestChainID: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: appNetworkActions.CHANGE_NETWORK,
      payload: requestChainID
    });
  }
};

export const changeNetworkSuccess = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: appNetworkActions.CHANGE_NETWORK_SUCCESS,
      payload: ''
    });
  }
};

export const changeNetworkFailed = (error: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
      type: appNetworkActions.CHANGE_NETWORK_FAILED,
      payload: error
    });
  }
};

export const settingAppNetwork = (networkType: string, updatedVal: string | undefined, noRequest?: boolean) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const payload: {
      appChainID?: string | undefined;
      walletChainID?: string | undefined;
      currentConnector?: string | undefined;
      requestChainID?: string | undefined;
    } = {};
    if (networkType === NetworkUpdateType.App) {
      if (noRequest) {
        payload.appChainID = updatedVal;
        payload.requestChainID = updatedVal;
      }
      else payload.requestChainID = updatedVal;
    }
    else if (networkType === NetworkUpdateType.Wallet) payload.walletChainID = updatedVal;

    dispatch({
      type: appNetworkActions.APP_NETWORKS_SETTING,
      payload
    });
  }
};  

export const settingCurrentConnector = (connector: AbstractConnector | undefined, connectorName: string | undefined) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: appNetworkActions.CONNECTOR_SETTING_SUCCESS,
        payload: { connector, connectorName }
      })
    } catch (error) {
      dispatch({
        type: appNetworkActions.CONNECTOR_SETTING_ERROR,
        payload: error
      });
    }
  }
};
