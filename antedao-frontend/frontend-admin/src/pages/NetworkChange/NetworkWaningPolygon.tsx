import React from 'react';
import { useSelector } from 'react-redux';
import { ACCEPT_NETWORKS, CHAIN_ID_NAME_MAPPING, NETWORK_ETH_NAME } from '../../constants';
import useStyles from './style';

const NetworkWaningPolygon = (props: any) => {
  const classes = useStyles();
  const { currentNetworkId } = useSelector((state: any) => state.userCurrentNetwork)
  
  if (currentNetworkId === "" || !currentNetworkId) return null;
	if (ACCEPT_NETWORKS.ETH_CHAIN_ID === currentNetworkId) {
		return null;
	}
  return (
    <div className={classes.boxMessage}>
      <img src='/images/red-warning.svg' alt="red-warning icon" />
      <span className={classes.spanError}>
        Please change to correct network(Accepted network:{NETWORK_ETH_NAME}).{' '}
        Current Network: {CHAIN_ID_NAME_MAPPING[currentNetworkId]} ({currentNetworkId})
      </span>
    </div>
  );
};

export default NetworkWaningPolygon;
