import { AnyAction } from 'redux';
import { settingStakingPoolActions } from '../constants/setting-staking-pool';

type StateType = {
  data: {};
  loading: boolean;
  error: string;
};

const initialState = {
  data: {},
  loading: false,
  error: ''
};

export const settingStakingPoolReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingStakingPoolActions.SETTING_STAKING_POOL_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case settingStakingPoolActions.SETTING_STAKING_POOL_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case settingStakingPoolActions.SETTING_STAKING_POOL_FAILURE: {
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
};