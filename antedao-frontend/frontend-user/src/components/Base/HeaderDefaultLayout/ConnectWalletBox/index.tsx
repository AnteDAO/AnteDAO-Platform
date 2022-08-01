import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AbstractConnector } from "@web3-react/abstract-connector";
import mobile from "is-mobile";
import { changeNetworkRequest, selectNetwork, } from "../../../../store/actions/appNetwork";
import { ConnectorNames, createWalletConnect, WalletInfo } from "../../../../constants/connectors";
import { NetworkInfo } from "../../../../constants/network";
import { HeaderContext, HeaderContextType } from "../context/HeaderContext";
import useStyles from "./style";

interface ConnectWalletBoxPropsType {
  appNetwork?: NetworkInfo;
  wallet?: WalletInfo;
  isAppNetwork?: boolean;
  handleProviderChosen?: (name: string, connector: AbstractConnector) => void;
  connectWalletLoading?: boolean;
  walletName?: string;
  forceEnable?: boolean;
  handleClose?: () => void;
  changeDisplayOnly?: boolean;
}

const ConnectWalletBox: React.FC<ConnectWalletBoxPropsType> = (
  props: ConnectWalletBoxPropsType
) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    appNetwork,
    isAppNetwork = false,
    handleProviderChosen,
    wallet,
    walletName,
    connectWalletLoading,
    forceEnable,
    handleClose,
    changeDisplayOnly
  } = props;
  const { appChainID, requestChainID } = useSelector((state: any) => state.appNetwork).data;
  const { agreedTerms } = useContext<HeaderContextType>(HeaderContext);

  const handleNetworkChange = (
    appNetwork: boolean,
    updatedVal: string,
    agreedTerms: boolean = false
  ) => {
    if (agreedTerms || forceEnable) {
      if (appNetwork) {
        dispatch(changeDisplayOnly ? selectNetwork(updatedVal) : changeNetworkRequest(updatedVal));
        handleClose?.();
      }
      else if (wallet) {
        if (wallet.name === ConnectorNames.WalletConnect) {
          handleProviderChosen?.(wallet.name, createWalletConnect([requestChainID as number]));
        }
        else {
          handleProviderChosen?.(wallet.name, wallet.connector as AbstractConnector);
        }
      }
    }
  };

  const pointerStyle = {
    cursor: `${agreedTerms || forceEnable ? "pointer" : "not-allowed"}`,
  };

  const render = () => {
    if (appNetwork) {
      const { name, icon, id, disableIcon } = appNetwork;
      const temporaryDisable = false; //name === APP_NETWORKS_NAME.BSC;

      return (
        <div
          className={`${(requestChainID || appChainID) === id && styles.activeNetwork} ${styles.walletBox
            }`}
          onClick={() => {
            !temporaryDisable &&
              handleNetworkChange(isAppNetwork, id as string, agreedTerms);
          }}
          style={pointerStyle}
        >
          <div className={styles.walletBoxIconWrap}>
            {
              <img
                src={`${(agreedTerms || forceEnable) && !temporaryDisable
                  ? icon
                  : disableIcon
                  }`}
                alt={name}
                className={styles.walletBoxIcon}
              />
            }
            { }
          </div>
          <p
            style={requestChainID === id ? { color: '#3B82F6', fontWeight: 700 } : {}}
            className={
              (agreedTerms || forceEnable) && !temporaryDisable
                ? `${styles.walletBoxText} activeText`
                : styles.walletBoxTextDisable
            }
          >
            {name}
          </p>
        </div>
      );
    }

    if (wallet) {
      const { name, icon, disableIcon } = wallet;

      return (
        <div
          className={`${styles.walletBox} ${styles.walletBoxWallet}`}
          onClick={() => {
            if (mobile() && wallet?.deepLink) {
              const { ethereum } = window as any;
              if (ethereum && ethereum.isMetaMask && wallet.name !== ConnectorNames.TrustWallet) {
                handleNetworkChange(isAppNetwork, name, agreedTerms);
              } else {
                window.open(wallet.deepLink);
              }
              return
            }

            handleNetworkChange(isAppNetwork, name, agreedTerms);
          }}
          style={pointerStyle}
        >
          <div
            className={
              agreedTerms
                ? styles.walletBoxIconWrap
                : styles.walletBoxIconWrapDisable
            }
          >
            {connectWalletLoading &&
              walletName &&
              walletName.indexOf(name) >= 0 ? (
              <img alt="loading" src="/images/loading.png" />
            ) : (
              <img
                src={`${agreedTerms ? icon : disableIcon}`}
                alt={name}
                className={styles.walletBoxIcon}
              />
            )}
          </div>
          <p
            className={
              agreedTerms
                ? `${styles.walletBoxText} activeText`
                : styles.walletBoxTextWrapDisable
            }
          >
            {name}
          </p>
        </div>
      );
    }

    return null;
  };

  return render();
};

export default ConnectWalletBox;
