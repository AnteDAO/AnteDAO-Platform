import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    alertVerifyEmail: {
      marginBottom: 15,
      position: 'relative',
      width: '100%',
      padding: '12px 20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: `${theme.custom.colors.error}15`,
      minHeight:39,

      '& .btn-close': {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)'
      },

      '& span': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '20px',
        color: theme.custom.colors.error,
      },

      '& a': {
        color: theme.custom.colors.error,
      },
      '& img': {
        marginRight: 8
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        marginTop: 15,
      },
    },

    errroTier: {
      width: '100%',
      display: 'flex',
      padding: '12px 20px',
      position: 'relative',
      background: `${theme.custom.colors.error}15`,
      alignItems: 'center',
      marginBottom: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: 1.5,
      color: theme.custom.colors.error,

      '& a': {
        color: theme.custom.colors.error,
      },
      '& img': {
        marginRight: 8,
      },
      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        marginTop: 15,
      },
    },

    warningWhite: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 20px',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 25,
      background: `${theme.custom.colors.tertiary}15`,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#CA22C6',
      minHeight: 42,
      '& img': {
        filter: ' invert(35%) sepia(98%) saturate(4998%) hue-rotate(286deg) brightness(88%) contrast(102%)',
        marginRight: 8,
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        marginTop: 15,
      },
    },

    whitelistPending: {
      width: '100%',
      display: 'flex',
      padding: '12px 20px',
      flexDirection: 'row',
      paddingLeft: '2rem',
      marginBottom: 25,
      background: '#D0AA4D',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: 1.5,
      color: '#070A1B',
      '& svg': {
        marginRight: '.5rem',
        minWidth: '20px'
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        paddingLeft: '1rem',
      },
    },

    whitelistSuccess: {
      width: '100%',
      display: 'flex',
      padding: '12px 20px',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '2rem',
      marginBottom: 25,
      background: 'rgba(42, 223, 158, 0.15);',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: 1.5,
      color: '#2ADF9E',
      '& img': {
        marginRight: 5,
        minWidth: 20,
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        paddingLeft: '1rem',
        marginTop: 15
      },
    },

    top: {
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,

      '&.is_address': {
        flexDirection: 'column',
        marginBottom: 8,
      }
    },

    iconToken: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      marginRight: 12,
      objectFit:"cover"
    },

    title: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '32px',
      letterSpacing:"-0.75px",
      color:theme.custom.colors.grey3,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 18,
        lineHeight: 1.5,
        textAlign: 'center',
      },
    },

    address: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '18px',
      marginBottom: 20,

      '& a': {
        color: theme.custom.colors.secondary,
        textDecoration: 'underline',
      },
      '& img': {
        marginLeft: 6,
      }
    },

    navHeaderComponent: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      wordBreak: 'break-word',
      marginBottom: 30
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
      padding: '0 16px',
      borderRight: '2px solid #2C313D',
      color: "#919AAE",

      '&:last-child': {
        borderRight: 0,
      },

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: 1.5,
        padding: '0 8px',
      },
    },

    iconItem: {
      height: 20,
      marginRight: 4,

      [theme?.breakpoints?.down('sm')]: {
        height: 16,
      },
    },
    tokenScanLink: {
      color:  theme.custom.colors.secondary,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.7,
      textDecorationLine: "underline",
      fontFamily: theme.custom.typography.fontFamilyDM,
      '&:hover': {
        color:  theme.custom.colors.secondary,
        textDecorationLine: "underline",
      }
    },
    copyAddress: {
      color:  theme.custom.colors.secondary,
      fontWeight: 500,
      marginLeft: 12,
      cursor: 'pointer',
    },
    btn: {
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: '14px',
      lineHeight: '18px',
      color: '#FFFFFF',
      mixBlendMode: 'normal',
      backgroundColor: 'none',
      border: 'none',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none'
      },
    },
    btnApply: {
      background: theme.custom.colors.gradientMain,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      borderRadius: 20,
      marginLeft: 12,
      transition: '.2s all ease-out',
      font: 'normal normal 500 16px/24px var(--fontFamily)',
      marginBottom: 30
    },
    btnApplyText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'normal normal 500 16px/24px var(--fontFamily)',
    },
    btnChangeAppNetwork: {
      padding: '6px 11px',
      border: '2px solid #FFFFFF',
      boxSizing: 'border-box',
      borderRadius: 30,
      background: 'transparent',
      fontWeight: 600,
      color: 'white',
      cursor: 'pointer',
      transition: '.2s all ease-in',
      font: 'normal normal 700 12px/14px var(--fontFamily)',

      '&:focus': {
        outline: 'none'
      },

      '&:hover': {
        backgroundColor: 'white',
        color: theme.custom.colors.error,
      }
    },
    btnApplyWhitelist:{
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      borderRadius: 20,
      transition: '.2s all ease-out',
      font: 'normal normal 500 16px/24px var(--fontFamily)',
      marginBottom: 30,
      justifyContent: 'center',
      background:theme.custom.colors.gradientMain
    }
  };
});

export default useStyles;
