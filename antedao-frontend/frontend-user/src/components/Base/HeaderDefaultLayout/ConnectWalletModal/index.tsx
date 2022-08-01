import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../../../../AppContext';
import { connectorsSupportByNetwork, SUPPORTED_WALLETS } from '../../../../constants/connectors';
import { appNetworkType, APP_NETWORKS, APP_NETWORKS_NAME, BSC_CHAIN_ID, ETH_CHAIN_ID, POLYGON_CHAIN_ID } from '../../../../constants/network';
import ConnectWalletBox from '../ConnectWalletBox';
import { HeaderContext, HeaderContextType } from '../context/HeaderContext';
import useStyles from './style';

const closeIcon = '/images/icons/close.svg';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      background: '#020616',
      paddingTop: 0
    },
    closeButton: {
      position: 'absolute',
      right: 12,
      top: 12,
      color: '#919AAE',
      backgroundColor: 'transparent',
      padding: 4,
    },
    svgIcon: {
      fontSize: 5
    }
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
  width: any;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, customClass, onClose, ...other } = props;

  const customStyles = {
    color: 'white',
  }

  return (
    <MuiDialogTitle disableTypography className={`${classes.root} ${customClass}`} {...other} style={customStyles}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} >
          <img src={closeIcon} alt="close" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    color: '#999999'
  },
}))(MuiDialogContent);

const ConnectWalletModal: React.FC<ComponentProps> = (props: ComponentProps) => {
  const styles = useStyles();
  const { opened, handleClose } = props;
  const { walletName, handleProviderChosen, connectWalletLoading } = useContext(AppContext);
  const { setAgreedTerms, agreedTerms } = useContext<HeaderContextType>(HeaderContext);
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  
  
  const connectorsByNetwork = (()=>{
    switch (appChainID) {
      case BSC_CHAIN_ID: 
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.BSC];
      
      case POLYGON_CHAIN_ID: 
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.POLYGON];

      case ETH_CHAIN_ID:
      default:
        return SUPPORTED_WALLETS;
    }
  })()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target && setAgreedTerms(event.target.checked);
  };

  const pressClose = () => {
    setAgreedTerms(false);
    if(handleClose) handleClose();
  }

  return (
    <Dialog open={opened} onClose={pressClose} className={styles.dialog}>
      <DialogTitle id="customized-dialog-title" onClose={pressClose} customClass={styles.dialogTitle} >
        Connect Wallet
      </DialogTitle>
      <DialogContent dividers>
        <div className={`${styles.dialogContentBlock} ${styles.dialogPrivacy}`}>
          <Checkbox
            checked={agreedTerms}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            className={styles.dialogCheckbox}
          />
          <span className={styles.dialogPrivacyText}>
            I read and accept the
            <a className={styles.dialogPrivacyHighlight} href="/#" target="_blank" rel="noreferrer"> Terms of Service</a> and&nbsp;
            <a className={styles.dialogPrivacyHighlight} href="/#" target="_blank" rel="noreferrer"> Privacy Policy</a>
          </span>
        </div>
        <Typography gutterBottom className={styles.dialogContentTypo} >
          2. Choose Network
        </Typography>
        <div className={`${styles.dialogContentBlock} ${styles.dialogNetworks}`}>
          {
            Object.keys(APP_NETWORKS).map((key: string) => {
              const network = APP_NETWORKS[key as appNetworkType];
              return <ConnectWalletBox key={key} appNetwork={network} isAppNetwork/>
            })
          }
        </div>
        <Typography gutterBottom className={styles.dialogContentTypo}>
          3. Choose Wallet
        </Typography>
        <div className={`${styles.dialogContentBlock} ${styles.dialogNetworks}`}>
          {
            Object.keys(connectorsByNetwork).map((key: string) => {
              const network = connectorsByNetwork[key];
              const isMobile = isWidthDown('xs', props.width);
              const showConnectorInMobile = isMobile ? network.mobile: network.desktop;
              return showConnectorInMobile && <ConnectWalletBox 
                  key={key}
                  wallet={network} 
                  isAppNetwork={false} 
                  handleProviderChosen={handleProviderChosen} 
                  connectWalletLoading={connectWalletLoading}
                  walletName={walletName}
                />
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  )

}

export default withWidth()(ConnectWalletModal);
