import { AnyAction } from 'redux';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ETH_CHAIN_ID } from '../../constants/network';
import { appNetworkActions } from '../constants/appNetwork';
export type AppNetworkData = {
  appChainID: string;
  walletChainID: string;
  currentConnector: string | undefined;
  requestChainID: string | undefined;
};
export type AppNetworkState = {
  data: AppNetworkData;
  loading: boolean;
  error: string;
};

export type ConnectorState = {
  connector: AbstractConnector | undefined;
  data: string | undefined;
  loading: boolean;
  error: string;
}

const initialState: AppNetworkState = {
  data: {
    appChainID: ETH_CHAIN_ID,
    walletChainID: '',
    currentConnector: undefined,
    requestChainID: undefined
  },
  loading: false,
  error: '',
};

const connectorInitialState = {
  connector: undefined,
  data: undefined,
  loading: false,
  error: '',
}

export const appNetworkReducer = (state: AppNetworkState = initialState, action: AnyAction) => {
  switch (action.type) {
    case appNetworkActions.UPDATE_WALLET_NETWORK: {
      const data: AppNetworkData = {
        ...state.data,
        walletChainID: action.payload
      }
      return {
        ...state,
        data,
      }
    }
    case appNetworkActions.SELECT_NETWORK: {
      const data: AppNetworkData = {
        ...state.data,
        appChainID: action.payload
      }
      return {
        ...state,
        data,
      }
    }
    case appNetworkActions.CHANGE_NETWORK: {
      const data: AppNetworkData = {
        ...state.data,
        requestChainID: action.payload
      }
      return {
        ...state,
        data,
        loading: true,
        error: ''
      }
    }
    case appNetworkActions.CHANGE_NETWORK_SUCCESS: {
      const data: AppNetworkData = {
        ...state.data,
        appChainID: state.data.requestChainID || state.data.appChainID,
        requestChainID: undefined
      }
      return {
        ...state,
        data,
        loading: false,
        error: ''
      }
    }
    case appNetworkActions.CHANGE_NETWORK_FAILED: {
      const data: AppNetworkData = {
        ...state.data,
        requestChainID: undefined
      }
      return {
        ...state,
        data,
        loading: false,
        error: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export const connectorReducer = (state: ConnectorState = connectorInitialState, action: AnyAction) => {
  switch (action.type) {
    case appNetworkActions.CONNECTOR_SETTING_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case appNetworkActions.CONNECTOR_SETTING_SUCCESS: {
      return {
        ...state,
        data: action.payload?.connectorName,
        connector: action.payload?.connector,
        loading: false
      }
    }

    case appNetworkActions.CONNECTOR_SETTING_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
}
