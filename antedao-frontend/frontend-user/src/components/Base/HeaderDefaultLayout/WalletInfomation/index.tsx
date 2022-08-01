import { isWidthDown, isWidthUp, withWidth } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { useWeb3React } from "@web3-react/core";
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../AppContext';
import { ConnectorNames } from '../../../../constants/connectors';
import { APP_NETWORKS_SUPPORT } from '../../../../constants/network';
import { checkIsWalletLink, disconnectWalletLink } from "../../../../utils";
import { trimMiddlePartAddress } from '../../../../utils/accountAddress';
import useStyles from './style';

const closeIcon = '/images/icons/close.svg';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      paddingTop: 0,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'space-between'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: 'black',
      backgroundColor: '#4B4B4B',
      padding: 4,

      "&:hover" : {
        backgroundColor: '#D4D4D4'
      }
    },
    svgIcon: {
      fontSize: 5
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  customClass: string
}

export interface ComponentProps {
  opened: boolean,
  handleClose: () => void;
  currentWallet: any;
}


const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    color: '#999999'
  },
}))(MuiDialogContent);

const WalletInfomation: React.FC<ComponentProps> = (props: any) => {
  const styles = useStyles();
  const { logout: disconnectWallet } = useContext(AppContext);
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const { opened, handleClose, currentWallet } = props;

  const walletName = currentWallet && currentWallet.title;
  const address = currentWallet ? currentWallet.addresses[0] : "";
  const balance = address ? currentWallet.balances[address] : 0;
  const networkInfo = APP_NETWORKS_SUPPORT[appChainID] || {};
  // const networkName = appChainID === ETH_CHAIN_ID ? 'Ethereum': 'Binance Smart Chain';
  // const currency = appChainID === ETH_CHAIN_ID ? 'ETH': 'BNB'
  const walletIconPath = currentWallet
    ? `/images/${currentWallet.typeId}.svg`
    : "";

  const { connector } = useWeb3React();

  const handleAccountLogout = () => {
    if(handleClose) handleClose();
    if (
      walletName === ConnectorNames.WalletConnect &&
      localStorage.getItem("walletconnect")
    ) {
      localStorage.removeItem("walletconnect");
    }
   
    // Disconnect WalletLink
    if (checkIsWalletLink(connector)) {
      connector && disconnectWalletLink(connector);
    }
    disconnectWallet && disconnectWallet();
  };

  return (
    <Dialog open={opened} className={styles.dialog}>
      <div className={styles.closeBtn} onClick={handleClose}>
        <img src={closeIcon} alt="" />
      </div>
    {/* <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle}>
      <span>
        Account&nbsp;&nbsp;
        <Link to="/account"><img alt="account link" src={linkIcon}/></Link>
      </span>
    </DialogTitle> */}
    <DialogContent className={styles.dialogContent}>
    <div className={styles.dialog}>
      <div className={styles.accountDetailAddress}>
        <Link to="/account" className={styles.accountDetailAddressWrap}>
          {walletIconPath && (
            <img
              src={walletIconPath}
              alt={walletName}
              className={styles.walletNameIcon}
            />
          )}
          <span className={styles.accountDetailAddressText}>
            {isWidthUp("sm", props.width) && trimMiddlePartAddress(address)}
            {isWidthDown("xs", props.width) && trimMiddlePartAddress(address)}
          </span>
        </Link>

        <div
          className={styles.accountDetailDisconnect}
          onClick={handleAccountLogout}
        >
          <span>Disconnect</span>
        </div>
      </div>
      <div className={styles.dialogContent}>
        <div className={styles.accountDetails}>
          <div className={styles.accountDetailBlocks}>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>Balance</span>
              <p className={styles.accountDetailBlockText}>
                {balance} {networkInfo.currency}
              </p>
            </div>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>Network</span>
              <p className={styles.accountDetailBlockText}>
                {networkInfo.networkName}
              </p>
            </div>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>Wallet</span>
              <p className={styles.accountDetailBlockText}>{walletName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DialogContent>
    </Dialog>
  );
};

export default withWidth()(WalletInfomation);
