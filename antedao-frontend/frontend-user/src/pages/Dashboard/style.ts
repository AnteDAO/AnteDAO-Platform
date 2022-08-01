import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    pageBg: {
      marginTop: '170px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      width: '100%',

      [theme.breakpoints.only('xs')]: {
        marginTop: 0,
      },
    },
    btnViewAllPools: {
      maxWidth: '100%',
      height: '32px',
      background: 'transparent;',
      borderRadius: 60,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '16px',
      color: '#FFFFFF',
      border: `1px solid ${theme.custom.colors.darkGrey}`,
      outline: 'none',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '16px',
      cursor: 'pointer',
    },
    btnViewAllPoolsNoBg: {
      maxWidth: '100%',
      height: '32px',
      background: 'transparent',
      borderRadius: 90,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '16px',
      color: '#FFFFFF',
      border: `1px solid ${theme.custom.colors.darkGrey}`,
      padding: '8px 12px',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    arrowRight : {
      marginLeft : 8,
    },
    project: {
      paddingTop: '90px',
      width: 'calc((1240 / 1440)* 100%)',
      margin: 'auto',
      marginBottom: '100px',
      maxWidth: 'calc(100vw - 100px)',
      [theme.breakpoints.only('xs')] : {
        paddingTop: '80px',
        margin : '0px 12px',
        maxWidth: 'calc(100vw - 24px)',
        width: '100%',
      },
      
    },
    textCompleted : {
      font: 'normal normal 700 24px/36px var(--fontFamily)',
      background: theme.custom.colors.gradientMainProgressBar,
      '-webkitBackgroundClip': 'text',
      '-webkitTextFillColor': 'transparent',
      [theme.breakpoints.only('xs')] : {
        font: 'normal normal 700 18px/24px var(--fontFamily)',
      }
    },
    projectHeader: {
      display: 'flex',
      // alignItems: 'center',
      marginTop: 60,
      justifyContent: 'space-between',
      flexWrap: 'wrap',

      [theme?.breakpoints?.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 0,
      },
      '& h1': {
        font: 'normal normal 600 36px/46px var(--fontFamily)',
        color: '#fff',
        [theme?.breakpoints?.down('xs')]: {
          font: 'normal normal 700 24px/36px var(--fontFamily)',
          marginBottom: '0px',
        },
      }
    },
      
    poolHeaderRight: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      [theme?.breakpoints?.down('xs')]: {
        marginTop : '-20px',
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 0,
      },
      '&.marginHearderRight' :{
        [theme?.breakpoints?.down('xs')]: {
          marginTop : 0,
        },
      },
    },

    listPools: {
      marginBottom: 100,

      '& .list-pool-header': {
        marginTop: 50,
        display: 'flex',
        [theme.breakpoints.only('xs')] : {
          marginBottom : '40px',
          marginTop : '60px',
          alignItems : 'center'
        }
      },
      '&.listPools2': {
        width: 820,
        maxWidht: '100%',
      },


      [theme.breakpoints.down('xs')]: {
        width : '100%',
        marginBottom: 20,
      },

      '& h2': {
        marginBottom: 50,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: '36px',
        background: theme.custom.colors.gradientMainProgressBar,
        '-webkitBackgroundClip': 'text',
        '-webkitTextFillColor': 'transparent',
        [theme.breakpoints.down('xs')]: {
         font: 'normal normal 700 16px/24px var(--fontFamily)',
         marginBottom : 0,  
        },
      },

      '& h3': {
        marginBottom: 20,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '36px',
        background: theme.custom.colors.gradientMainProgressBar,
        '-webkitBackgroundClip': 'text',
        '-webkitTextFillColor': 'transparent',
      },

      '& .active_pools': {
        marginTop: 10,
        display: 'Grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        margin: 'auto',
        placeContent: 'center',

        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      },

      '& .btn': {
        height: '42px',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        padding: '0 27px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '60px',
        backgroundColor: '#D01F36',
        margin: '40px auto 0',
        cursor: 'pointer'
      },
    },

    getAlert: {
      position: 'relative',
      backgroundImage: 'url(/images/bg_get_alert.svg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    },

    contentGetAlert: {
      width: 1120,
      margin: 'auto',
      maxWidth: 'calc(100vw - 80px)',
      minHeight: 480,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFFFFF',
    },

    titleGetAlert: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 40,
      lineHeight: '44px',
      textAlign: 'center',
      marginBottom: 30,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 40,
      }
    },

    desGetAlert: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '24px',
      marginBottom: 40,
    },

    btnGetAlert: {
      minWidth: 180,
      maxWidth: '100%',
      minHeight: 42,
      background: '#3232DC',
      borderRadius: 60,
      border: 'none',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
      cursor: 'pointer',
      padding: '10px 15px',
      [theme.breakpoints.down('sm')]: {
        width: 280,
      },

      '& img': {
        marginLeft: 8,
      }
    },

    upcoming: {
      width: "calc(100% + 30px)",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "92px",
        width: "calc((356 / 375)* 100%)",
      },
    },

    starBottom: {
      backgroundImage: 'url(/images/dashboard/starBgBottom.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      position: 'absolute',
      bottom: '-100px',
      left: '-200px',
      width: '600px',
      height: '400px',
      zIndex: 1,
    }
  };
});

export default useStyles;
