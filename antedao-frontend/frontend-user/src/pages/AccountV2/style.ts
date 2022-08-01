import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    messageUpdateSuccess: {
      position: 'relative',
      width: '100%',
      padding: '11px 9px 10px 9px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(42, 223, 158, 0.15);',
      marginBottom: 15,
      borderRadius: theme.custom.radius.small8,
      minHeight: 42,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#2ADF9E',


      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
      },

      '& img': {
        marginRight: 6,
      },
    },

    alertVerifyEmail: {
      position: 'relative',
      width: '100%',
      padding: 9,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: `${theme.custom.colors.error}15`,
      marginBottom: 15,
      borderRadius: theme.custom.radius.small8,
      minHeight: 42,

      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
      },

      '& img': {
        marginTop: 3,
        [theme.breakpoints.down('sm')]: {
          marginTop: 6,
        },
      },

      '& .btn-close': {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)'
      },

      '& span': {
        font: 'normal normal 400 14px/24px var(--fontFamily)',
        color: theme.custom.colors.error,
      },

      '& a': {
        color: theme.custom.colors.error,
      },
    },

    errorSwich: {
      marginBottom: 20,
    },

    errorBanner: {
      color: theme.custom.colors.white,
      backgroundColor: '#FF4C00',
      textAlign: 'center',
      padding: 12,
      marginBottom: 0,
      flex: 1,
    },
    title: {
      font: 'normal normal bold 28px/32px var(--fontFamily)',
      color: theme.custom.colors.white,
      position: 'relative',

      '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        bottom: '-10px',
      }
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '5fr 4fr',
      gap: '100px',
      marginTop: '10px',
      marginBottom: '120px',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        padding: '40px',
        paddingTop: '150px',
      },
      [theme.breakpoints.only('xs')]: {
        gridTemplateColumns: '1fr',
        padding: '20px',
        paddingTop: '100px',
      },
    },
    leftPanel: {
    },
    rightPanel: {
      maxWidth: '100%',
      width: '100%',
    },
    accountContainer: {
      padding: '10px 0 80px 0',
      width: 'calc((1240 / 1440)* 100%)',
      minHeight: 'calc(100vh - 400px)',
      maxWidth: 'calc(100vw - 80px)',
      margin: 'auto',

      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 30px)',
        maxWidth: 'calc(100vw - 30px)',
        margin: 'auto',
      }
    },
    [theme.breakpoints.down('xs')]: {
      mainContent: {
        padding: '20px 0',
        marginBottom: '80px',
        gap: '60px'
      },
    },

    tier: {
      borderRadius: theme.custom.radius.small8,
    },


    // styles v3
    bodyContentMyAccount: {
      display: 'flex',
      flexWrap: 'wrap',
      color: theme.custom.colors.white,
      marginTop: '75px',

      [theme.breakpoints.down('sm')]: {
        marginTop: '20px',
      },
    },

    leftAccount: {
      background: theme.custom.colors.darkLightBg,
      borderRadius: theme.custom.radius.small8,
      marginRight: '30px',
      width: 'calc((260 / 1240)* 100%)',

      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    titlLeft: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginBottom: 27,

      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    tabAccount: {
      display: 'flex',
      flexDirection: 'column',
      marginTop:25,

      '& li:first-child': {
        borderRadius: '16px 16px 0px 0px',
        paddingTop: '12px',
      },

      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
    },

    itemTabAccount: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.darkGrey,
      cursor: 'pointer',
      padding: '13px 26px',

      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: 15,

        '&:last-child': {
          marginRight: 0,
        }
      },

      '&.active': {
        color: theme.custom.colors.secondary,
        cursor: 'inherit',
        fontWeight: 700,
      }
    },

    iconItemTabAccount: {
      marginRight: 10,
      width: 20,
      height: 20,
      maskPositionX: 'center',
      maskPositionY: 'center',
      maskSize: 'contain',
      maskRepeatX: 'no-repeat',
      maskRepeatY: 'no-repeat',
      maskOrigin: 'initial',
      maskClip: 'initial',
      background: theme.custom.colors.darkGrey,

      '&.active': {
        background: theme.custom.colors.secondary,
      },
    },

    rightAccount: {
      width: 'calc((950 / 1240)* 100%)',
      background: theme.custom.colors.darkLightBg,
      borderRadius: theme.custom.radius.small8,
      padding: '32px 30px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
        padding: '30px 10px',
      },

    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  };
});

export default useStyles;
