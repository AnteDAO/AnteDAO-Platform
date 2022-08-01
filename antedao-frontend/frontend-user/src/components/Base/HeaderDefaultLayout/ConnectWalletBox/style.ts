import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    walletBox: {
      maxWidth: 170,
      height:53,
      minWidth: 130,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding:'0 13px',
      background:'#272E39',
      transition: '.1s all linear',
      boxSizing: 'border-box',
      borderRadius: 8,
      
      '&:hover': {
        backgroundColor: '#1B1F2D',
        borderRadius: 8,
        
        '& .activeText':{
          color:'#CA22C6 !important'
        }
      },
      
    },
    walletBoxWallet:{
      width:170
    },
    activeNetwork: {
      background: '#11152A',
      border: '2px solid #3C5EA2',
    },

   
    walletBoxTextDisable:{
      color: '#424959',
      font: 'normal normal 500 14px/21px var(--fontFamily)',
      textAlign: 'center',
    },
    walletBoxText: {
      color: '#919AAE',
      font: 'normal normal 500 14px/21px var(--fontFamily)',
      textAlign: 'center',
    },
    walletBoxIconWrap: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight:8
    },
    walletBoxIconWrapDisable:{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight:8,
    },
    walletBoxIcon: {

    },
    
    walletBoxCheck: {
      position: 'absolute',
      bottom: '17px',
      right: '-92px'
    },
    [theme.breakpoints.down('xs')]: {
      walletBox: {
        minWidth:'unset',
        maxWidth: 93,
        minHeight:83,
        flexDirection:'column',
        justifyContent:'center',
        '& p':{
          textAlign: 'center',
        }
      },
      walletBoxIconWrap:{
        marginRight:0,
        marginBottom:6,
      },
      walletBoxIconWrapDisable:{
        marginRight:0,
        marginBottom:6,
      }
    }
  };
});

export default useStyles;
