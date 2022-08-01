import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        padding: '36px 44px 36px 24px ',
        borderRadius: 16,
        backgroundColor: '#191f2a',
        width:440,
        position:'relative'
      },
    },
    dialogContentTypo: {
      color: 'white',
      fontSize: 16,
      marginTop: 40,
      fontWeight: 700,

      '&:first-child': {
        marginTop: 0
      }
    },
    dialogContentBlock: {
      marginTop: 20,
    },
    dialogTitle: {
      '& .MuiTypography-h6': {
        font: 'normal normal bold 28px/32px var(--fontFamily)',
        paddingBottom: 16,
      },

      '& .MuiSvgIcon-root': {
        fontSize: '1rem'
      }
    },
    closeBtn:{
      position:'absolute',
      top:18,
      right:18,
      cursor:'pointer'
    },
    dialogPrivacy: {
      display: 'flex',
      alignItems: 'center'
    },
    dialogPrivacyText: {
     fontSize: 16 
    },
    dialogPrivacyHighlight: {
      color: '#3C5EA2'
    },
    dialogCheckbox: {
      padding: 0,
      marginRight: 8,

      '& .MuiSvgIcon-root': {
        fill: 'white'
      }
    },
    dialogNetworks: {
      display: 'flex'
    },
    dialogContent: {
      padding: '0 !important' as any,
      position: 'relative'
    },
    loadingIcon: {
      position: 'absolute',
      left: '50%',
      top: '30%',
      transform: 'translate(-50%, -50%)'
    },
    accountDetails: {
      width: '100%',
      padding: 10,
      borderRadius: 10,
      color: 'white',
      background:'transparent'
    },
    accountDetailBlocks: {
      width: '100%',
    },
    accountDetailBlock: {
      display: 'flex',
      justifyContent:'space-between',
      '&:not(:last-child)' : {
        marginBottom:12
      }
    },
    accountDetailBlockLabel: {
      font: 'normal normal 400 14px/21px var(--fontFamily)',
      color: '#919AAE',
    },
    accountDetailBlockText: {
      font: 'normal normal 400 14px/21px var(--fontFamily)',
      color: '#919AAE'
    },
    accountDetailsIcon: {
      width: 50
    },
    accountDetailAddress: {
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor: '#272E39',
      border: '1px solid #2C313D',
      padding: '20px 15px',
      borderRadius: 8
    },
    accountDetailAddressWrap:{
      display: 'flex',
      alignItems: 'center',
    },
    accountDetailAddressText: {
      marginLeft: 10,
      marginTop:3,
      color: 'white',
      font: 'normal normal normal 16px/24px var(--fontFamily)',
    },
    walletNameIcon: {
      width: 30,
      marginLeft: 10
    },
    accountDetailCta: {
      textAlign: 'right',
      marginTop: 20,
    },
    accountDetailCtaIcon: {
      marginRight: 8,
      display: 'inline-block'
    },
    accountDetailDisconnect: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      cursor: 'pointer',
      font: 'normal normal 500 16px/24px var(--fontFamily)',
      padding:'4px 16px',
      backgroundColor:'#424959',
      borderRadius:20
    },
    [theme.breakpoints.down('xs')]: {
      dialog: {
        '& .MuiPaper-root': {
          padding: '20px',
          minWidth: 'unset',
          maxWidth: '100%',
          width: '100%',
          margin: '20px',
          borderRadius: 15,
          backgroundColor: '#191f2a',
          border: '1px solid #273a55!important'
        }
      }
    }
  };
});

export default useStyles;
