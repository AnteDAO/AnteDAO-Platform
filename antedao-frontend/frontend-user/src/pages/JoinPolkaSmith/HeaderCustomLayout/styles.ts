import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => {
  return {
    navBar: {
      gridArea: 'header',
      width: '100%',
      maxWidth: 'calc(100vw - 80px)',
      backgroundColor: '#020616',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      margin: 'auto',

      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 40px)',
        margin: '8px auto',
      }
    },
    navbarLink: {
      textAlign: 'center',
      display: 'inline-block'
    },
    navbarLogo: {

    },
    navbarBrand: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 300,
      marginTop: 5
    },
    navbarBrandBold: {
      color: '#D01F36'
    },
    rightBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    btn: {
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '1px',
      color: '#FFFFFF',
      mixBlendMode: 'normal',
      backgroundColor: 'none',
      border: 'none',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none'
      },
      '&.my-account img': {
        width: '20px',
        filter: 'brightness(0) invert(1)'
      }
    },
    btnNetwork: {
      fontFamily:theme.custom.typography.fontFamilyDM,
      fontSize:16,
      lineHeight:24,
      fontWeight:500,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height: '40px',
      padding:'0 16px',
      borderRadius: 20,
      color: '#FFFFFF',
      marginLeft: 20,
      background:  theme.custom.colors.primary,
      '& img': {
        width: '20px',
        height: '20px',
      },
      [theme.breakpoints.only('xs')]: {
        marginLeft: 0
      }
    },
    btnConnect: {
      background: theme.custom.colors.gradientMain,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      borderRadius: 20,
      marginLeft: 12,
      transition: '.2s all ease-out',
      font: 'normal normal 500 16px/24px var(--fontFamily)',

    },
    btnConnectText: {
      marginLeft: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font:  `normal normal 600 14px/24px ${theme.custom.typography.fontFamilyWork}`,
    },
    btnLogout: {
      background: '#3232DC',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      outline: 'none',
      padding: '0 15px',
      height: 42,
    },
    btnAccount: {
      font: 'normal normal 500 16px/24px var(--fontFamily)',
      display: 'inline-block',
      backgroundColor: '#FFFF',
      color:'#424959',
      padding: '4px 10px',
      borderRadius: 20,
      marginRight: '-9px',
    },
    btnChangeAppNetwork: {
      padding: '13px 11px',
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
        color: '#D01F36',
      }
    },
    loginErrorBanner: {
      top: '100%',
      width: '100%',
      backgroundColor: '#5b0712fa',
      fontSize: 15,
      color: 'white',
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 500,
      zIndex: 99999,
      minHeight: 42,

      [theme.breakpoints.down('sm')]: {
        '& button': {
          minWidth: '200px',
        },
      }
    },
    loginErrorBannerText: {
      font: 'normal normal 400 14px/24px var(--fontFamily)',
      marginLeft: 10,
      color: 'white',
      fontWeight: 500
    },
    loginErrorGuide: {
      color: 'white',
      textDecoration: 'underline',

      '&:hover': {
        color: 'white'
      }
    },

    [theme.breakpoints.only('xs')]: {
      rightBar: {
        position: 'fixed',
        backgroundColor: '#030926',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        margin: 0,
        padding: '113px 32px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        display: 'none',
        zIndex: 5,

        '&.active': {
          display: 'flex'
        }
      },
      btnConnect: {
        margin: '20px 0',
      },
      btn: {
        '&.start p': {
          padding: 0,
          marginBottom: '20px'
        },
      },
      sideBarLogo: {
        position: 'absolute',
        top: '10px',
        left: '32'
      },
      closeBtn: {
        position: 'absolute',
        top: '28px',
        right: '20px'
      },
      navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      navbarLink: {
        marginLeft: '12px'
      },
      btnChangeAppNetwork: {
        display: 'block',
        padding: '7px 15px',
        margin: '10px auto 0',
      },
      loginErrorBanner: {
        alignItems: 'flex-start',
        '& > img': {
          marginTop: '5px'
        }
      }
    }
  };
});

export default useStyles;
