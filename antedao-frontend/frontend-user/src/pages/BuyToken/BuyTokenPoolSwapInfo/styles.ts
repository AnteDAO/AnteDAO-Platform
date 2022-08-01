import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    sectionBuyTokenPoolSwapInfo: {
      background: theme.custom.colors.darkLightBg,
      borderRadius: 16,
      padding: '30px 40px',
      color: theme.custom.colors.white,
      fontFamily: theme.custom.typography.fontFamilyDM,

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 24,
        padding: '28px 20px',
      },
    },
    
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '32px',
      marginBottom: 24,
      color:theme.custom.colors.white02,
      letterSpacing:"-0.5px",
      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'left',
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    topSec: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 24,
    },

    leftTopSec: {
      width: '100%',
    },
    flex : {
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
    },
    Invidiual : {
      color: 'white',
      fontSize:14,
      [theme?.breakpoints?.down('sm')]: {
        fontSize: 12,
      },
      
    },


    valueLeftTopSec: {
      marginTop: 4,
      fontSize: 24,
      lineHeight: '32px',
      color: theme.custom.colors.secondary,
      fontWeight: 'bold',
      letterSpacing:"-0.75px",

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 18,
      },
    },

    rightTopSec: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.darkGrey,
      marginLeft: 'auto',
      fontWeight: 400,
      textAlign: 'right',
    },

    titleSub: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '18px',
      marginBottom: 10,
      display: 'flex',
      color:theme.custom.colors.darkGrey,
    },

    titleSub2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '18px',
      marginBottom: 24,
      display: 'flex',
      color: theme.custom.colors.darkGrey,
    },

    botSec: {

    },

    jubValue: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10,
    },

    leftBotSec: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '24px',
    },

    rightBotSec: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.darkGrey,
    },

    progress: {
      width: '100%',
      height: 8,
      backgroundColor: theme.custom.colors.grey8,
      position: 'relative',
      borderRadius: 20,
    },

    achieved: {
      width: '30%',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      background:  theme.custom.colors.gradientMainReverse,
      borderRadius: 20,
    },
  };
});

export default useStyles;