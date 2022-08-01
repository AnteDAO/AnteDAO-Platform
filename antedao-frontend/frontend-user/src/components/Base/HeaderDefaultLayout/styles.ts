import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme:any) => {
  return {
    "@keyframes rightBarEffect": {
      "0%": {
        opacity: 0,
        transform: "translateX(100%)"
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)"
      }
    },
    myAccount : {
      // marginLeft:-20,
      // '& > .MuiAccordion-root': {
      //   float: 'right',
      // },
      borderTop: '1px solid #FFFFFF1A',
    },

    AccordionSummary: {
      display:'inline-flex !important',
      padding:'0px !important',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding:'0px !important',
        '& .MuiAccordionSummary-content': {
          marginTop: '20px',
          marginBottom: '18px !important',
        },
      },
    },
    ExpandMore: {
      color: 'white',
    },
    Accordion : {
      backgroundColor: 'initial !important',
      boxShadow:'none',
      // marginTop:-10,
      fontSize:14,
    },
    AccordionDetails : {
      display: 'block !important',
      padding:'0px !important', 
      marginTop:-10,
      fontSize:14,
    },
    itemTabAccount: {
      [theme.breakpoints.down('sm')]: {
      
        color: theme.custom.colors.darkGrey,
        cursor: 'pointer',
        display: 'flex',
        paddingBottom: '15px',
        flexWrap: 'wrap',
        fontSize: 14,
        alignItems: 'center',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        lineHeight: '24px',
        justifyContent: 'start',

        '&.active': {
          color: theme.custom.colors.secondary,
          cursor: 'inherit',
          
        }
        },
      // '&:hover' : {
      //   background: theme.custom.colors.gradientMain,
      // }
    },
    textTabAccount: {
      fontSize: 14,
      lineHeight: '20px',
    },
    btnFontCustom: {
      font: `normal normal 700 16px/24px ${theme.custom.typography.fontFamilyWork}`,
    },

    wrapHeaderStyle:{
      position:'absolute',
      background:'#141416',
      boxShadow:`0px 1px 0px ${theme.custom.colors.grey7}`,
      top:'0',
      left:'0',
      height:80,
      width:'100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex:99,
      '&.transparent':{
        background:'transparent'
      },
      [theme.breakpoints.down('md')]: {
        height:70,
        '&.active':{
          position:'fixed',
          background:'#171B22',
        }
      },
    },
    navBar: {
      gridArea: 'header',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: 'normal normal 400 14px/27px var(--fontFamily)',
      width: 'calc((1240 / 1440)* 100%)',
      maxWidth: 'calc(100vw - 100px)',
      margin:'0 auto',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        margin: '0',
        maxWidth: '100%',
        width:'100%',
        padding: '20px 15px'
      },

    },
    imgLogo: {
      height: '40px',
      width: 'auto'
    },
    navbarLink: {
      textAlign: 'center',
      display: 'inline-block'
    },
    navbarLogo: {
      // position: 'absolute',
      // left: '50%',
      // transform: 'translateY(-10%)',
      marginRight: 60
    },
    navbarBrand: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      fontWeight: 300,
      marginTop: 5
    },
    navbarMenu: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      '& > .narbarMenu-item': {
        '& p': {
          padding: 0,
          marginRight: 40,
          marginBottom: '0 !important',
        },
        '& span': {
          marginLeft: 0
        }
      },
      '& .narbarMenu-item:last-child': {
        '& p': {
          marginRight: 0,
        },
      },
    },
    navbarMenuDefault: {
      justifyContent: 'center',
    },
    navbarMenuLanding: {
      justifyContent: 'right',
    },
    navbarAction: {
      display: 'flex',
      alignItems: 'center'
    },
    navbarBrandBold: {
      color: '#D01F36'
    },
    rightBar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    btnBalance: {
      color: '#FFFFFF',
    },
    btnMarginRight0: {
      marginRight: '0px !important',
    },
    btn: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
      color: theme.custom.colors.textNavBar,
      mixBlendMode: 'normal',
      backgroundColor: 'none',
      border: 'none',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none'
      },
      '&.AnteDAOLink': {
        font: 'normal normal 400 18px/27px var(--fontFamily) !important',
        '&:hover': {
          color: '#fff'
        }
      },
      '&.isExpanded': {
        color:'#FFFFFF4D',
      },
      '&.isCloseExpand': {
        color:theme.custom.colors.white,
      },
      '&.my-account': {
        display: 'flex',
        alignItems: 'center',
        // marginLeft: 10,
        font:  `normal normal 600 16px/24px ${theme.custom.typography.fontFamilyWork}`,

        '& img': {
          marginRight: 4,
        },

        '& .icon': {
          width: 20,
          filter: 'brightness(0) invert(1)'
        },

        '& span': {
          display: 'inline-flex',
          alignItems: 'center',
        },

        [theme.breakpoints.down('sm')]: {
          marginTop: 0,
          font:  `normal normal 600 14px/20px ${theme.custom.typography.fontFamilyDM}`,
          // fontSize: '14px !important',
          // padding:'0px 0px 0px 0px',
        }
      }
    },
    btnRouterActive: {
      color: '#FD849C',
    },
    btnNetwork: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      padding: '0 16px',
      borderRadius: 20,
      color: '#FFFFFF',
      marginLeft: 20,
      background:  theme.custom.colors.primary,
      '& img': {
        width: '20px',
        height: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
        marginTop: 20
      }
    },
    btnConnect: {
      background: theme.custom.colors.gradientMain,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 11px',
      borderRadius: 20,
      marginLeft: 12,
      transition: '.2s all ease-out',
      font: 'normal normal 700 16px/22px var(--fontFamily)',
      position: 'relative',
      '& span:first-child' :{
        marginRight:5,
      },
      color: '#FCFCFD',
      [theme.breakpoints.down('sm')] : {
        font: 'normal normal 700 16px/22px var(--fontFamily)',
      }
    },
    btnWalletConnect: {
      background: 'transparent',
      width: '100% !important',
      font: 'normal normal 700 14px/16px var(--fontFamily)',
      color: theme.custom.colors.error,
      border: `2px solid ${theme.custom.colors.error}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnBoxConnect: {
      width: '100% !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnWalletConnected: {
    },
    btnConnectText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: `normal normal 600 16px/24px ${theme.custom.typography.fontFamilyWork}`,
      [theme.breakpoints.down('sm')] : {
        font: `normal normal 600 16px/24px ${theme.custom.typography.fontFamilyWork}`,
      }
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
      font: `normal normal 500 16px/22px ${theme.custom.typography.fontFamilyDM}`,
      display: 'inline-block',
      backgroundColor: '#FFFF',
      color: '#424959',
      padding: '6px 10px',
      borderRadius: 20,
      marginRight: '-9px',
      [theme.breakpoints.down('sm')] : {
        font: `normal normal 500 16px/22px ${theme.custom.typography.fontFamilyDM}`,
      }
    },
    btnConnectWallet: {
      color: '#FFF',
      font: `normal normal 500 16px/16px ${theme.custom.typography.fontFamilyDM}`,
      [theme.breakpoints.down('sm')] : {
        font: `normal normal 500 14px/16px ${theme.custom.typography.fontFamilyDM}`,
      }
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
    loginErrorBanner: {
      top: '100%',
      width: '100%',
      margin: '8px auto',
      background: `${theme.custom.colors.error}15`,
      fontSize: 14,
      color: theme.custom.colors.error,
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 500,
      zIndex: 99999,
      minHeight: 42,
      lineHeight: 1.5,
      marginBottom: 25,
      fontFamily: theme.custom.typography.fontFamilyDM,

      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
      },
      '& a': {
        color: theme.custom.colors.error,
      },
    },

    iconWarning: {
      marginRight: 8,
      marginBottom: 3
    },

    loginErrorBannerText: {
      font: 'normal normal 400 14px/24px var(--fontFamily)',
      color: theme.custom.colors.error,
      fontWeight: 500
    },
    loginErrorGuide: {
      color: 'white',
      textDecoration: 'underline',

      '&:hover': {
        color: 'white'
      }
    },
    spacer: {
      flex: '1 0 0'
    },

    rightHeadMobile: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        height:70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&.active':{
          background:theme.custom.colors.gradientMain,
        },
        '& .startMobile': {
          marginRight: 5,
        }
      }
    },

    [theme.breakpoints.down('md')]: {
      rightBar: {
        position: 'fixed',
        backgroundColor: theme.custom.colors.darkLight,
        width: 300,
        height: '100%',
        top: 0,
        right: 0,
        margin: 0,
        paddingTop: 27,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 37,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        display: 'none',
        zIndex: 100,
        animation: `$rightBarEffect 500ms ${theme.transitions.easing.easeInOut}`,
        '&.active': {
          display: 'flex'
        },
      },
      containerNavigation: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        '& > .wrap-btn-rightbar': {
          backgroundColor: theme.custom.colors.darkLight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'absolute', 
          bottom: '0px',
          justifyContent: 'center',
        },
        '& > .wrap-menu': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        },
      },
      navigationClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 0,
        padding: 0,
      },
      boxWalletText: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingBottom: '20px',
      },
      rowWalletText: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: '8px',

        '&:last-child': {
          paddingBottom: '0px',
          paddingTop: '8px',
        },
      },
      borderHeaderTextWallet: {
        borderTop: '1px solid #FFFFFF1A',
      },
      labelWallet: {
        color: '#FFFFFF4D',
        fontSize: '14px',
        lineHeight: '20px',
      },
      valueWallet: {
        color: '#FFFFFFB3',
        fontSize: '14px',
        lineHeight: '20px',
      },
      btn: {
        width: 'fit-content',
        '&.start p': {
          padding: 0,
          marginBottom: '15px'
        },
        '&.start p:last-child': {
          padding: 0,
          marginBottom: '20px'
        },
      },
      btnLink: {
        '& p': {
          color: 'white',
          display: 'flex',
          padding: '12px 15px',
          fontSize: '14px',
          alignItems: 'center',
          fontWeight: 500,
          paddingLeft: 0,
        }
      },
      sideBarLogo: {
        position: 'absolute',
        top: '10px',
        left: '32',
        height: '38px',
        width: 'auto'
      },
      closeBtn: {
        position: 'absolute',
        top: '28px',
        right: '20px'
      },
      navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      },
      navbarLink: {

        '& img': {
          height: 35,
        }
      },
      loginErrorBanner: {
        alignItems: 'flex-start',
        '& > img': {
          marginTop: 3
        }
      }
    },
    [theme.breakpoints.down('sm')]:{
      btnNetwork:{
        width: '100%',
        margin:0,
        marginBottom:10,
        marginRight:10,
      },
      btnConnect: {
        marginTop: 0,
        marginLeft:0
      },
    }
  };
});

export default useStyles;
