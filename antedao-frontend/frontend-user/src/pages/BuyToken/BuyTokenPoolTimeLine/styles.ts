import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    sectionBuyTokenPoolTimeLine: {
      background: theme.custom.colors.darkLightBg,
      borderRadius: 16,
      padding: '30px 40px',
      color: theme.custom.colors.white02,
      fontFamily: theme.custom.typography.fontFamilyDM,
      [theme?.breakpoints?.down('sm')]: {
        padding: '28px 20px',
      },
    },

    title: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '32px',
      marginBottom: 24,
      marginRight: 40,
      color: theme.custom.colors.white02,
      letterSpacing:"-0.5px",

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '24px',
      },
    },

    statusBarSteps: {
      display: 'flex',
      position: 'relative',
      width: 'calc(100% - 30px)',
      marginBottom: 30,

      [theme?.breakpoints?.down('sm')]: {
        width: 'calc(100%)',
      },

      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: 2,
        background: 'linear-gradient(90deg, #A855F7 2.62%, #CA22C6 97.71%)',
        borderRadius: 20,
        opacity:0.2,
        left: 20,
        top: 14,

        [theme?.breakpoints?.down('sm')]: {
          width: '80%',
          height: 2,
          top: 12,
          left: 68,
        },
        [theme?.breakpoints?.down('xs')]: {
          width: '80%',
          height: 1,
          top: 12,
          left: 40,
        },
      }
    },

    itemStatusBarSteps: {
      width: 'calc(100%/4)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '18px',
      color: '#AEAEAE',

      '&.active': {
        color: theme.custom.colors.secondary,
      },

      '&:nth-child(2)': {
        marginLeft:20,
      },

      '&:last-child': {
        width: 0,
        marginLeft:0,
      },

      '&:first-child .itemValue': {
        marginLeft: 20,
      },
      
      '&:first-child .itemName': {
        left: 0,
        textAlign: 'left',
      },

      '&:last-child .itemName': {
        left: 0,
        textAlign: 'right',
      },

      [theme?.breakpoints?.down('sm')]: {
        width: 'calc(100%)',
        paddingBottom: 24,
        alignItems:'center',

        '&:nth-child(2)': {
          marginLeft:0,
        },
  
        '&:last-child': {
          width: '100%',
          paddingBottom: 0,
        },
      },
    },

    itemValue: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: theme.custom.colors.grey8,
      color:theme.custom.colors.grey6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: 14,

      '&.active': {
        color: theme.custom.colors.white,
        background: theme.custom.colors.gradientMain,
      },
      

      [theme?.breakpoints?.down('sm')]: {
        width: 24,
        height: 24,
        fontSize: 12,
      },
    },

    itemName: {
      marginTop: 12,
      textAlign: 'center',
      fontWeight:400,
      color:'#919AAE',
      position: 'relative',
      left: 'calc(-50% + 14px)',
      
      '&.active': {
        fontWeight:700,
        color:'#CA22C6',
      },

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 0,
        fontSize: 12,
        lineHeight: '18px',
        left: '0',
        paddingTop: 3,
      },
    },

    title2: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSeight: 'bold',
      fontSize: 16,
      lineHeight: '18px',
      marginBottom: 15,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '18px',
      },
    },

    erroCountdown: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginTop: 100,
      // display: 'flex',
      flexWrap: 'wrap',

      [theme?.breakpoints?.down('md')]: {
        marginTop: 30,
        fontSize: 14,
        lineHeight: '18px',
        textAlign: 'center',
        justifyContent: 'center',
      },
    },

    customToolTip: {
      width: 280,
      background: '#44454B',
      boxShadow: `0px 12px 20px rgba(0, 0, 0, 0.07)`,
      borderRadius: 4,
      padding: 13,

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 10,
      },
    },

    nameToolTip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
      marginBottom: 4,
    },

    desToolTip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',

      '& span': {
        fontWeight: 'bold',
      }
    }
  };
});

export default useStyles;