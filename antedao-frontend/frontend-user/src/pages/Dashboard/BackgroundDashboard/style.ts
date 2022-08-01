import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    backgroundComponent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundSize: 'cover',
      width: '100%',
      padding: '336px 0 100px',
      // backgroundImage: 'url(/images/dashboard/background.svg)',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: '-1px 0',
      // height: '100vh',
      maxHeight: '640px',
      [theme.breakpoints.only('sm')]: {
        height: '70vh',
        padding: '110px 0 100px',
      },
      // [theme.breakpoints.only('xs')]: {
      //   height: '50vh'
      // },
      '& > img': {
        width: '100%',
        objectFit: 'cover',
      },

      '& .btn': {
        flex: '0 0 280px',
        margin: '8px',
        height: '42px',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: theme.custom.colors.secondary,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '60px',
        border: `2px solid ${theme.custom.colors.secondary}`,

        '&:hover': {
          cursor: 'pointer'
        },

        [theme.breakpoints.down('xs')]: {
          flex: '0 0 42px',
          width: '280px'
        }
      },

      [theme.breakpoints.down('sm')]: {
        '& > img': {
          height: '400px'
        },
      },

      [theme.breakpoints.down('xs')]: {
        padding: '0',
      }
    },
    backgroundStar: {
      backgroundImage: 'url(/images/dashboard/starBg.svg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      position: 'absolute',
      top: '120px',
      right: '200px',
      width: '515px',
      height: '505px',
    },
    backgroundCircle: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '80px',

      '& .circle': {
        backgroundImage: 'url(/images/dashboard/background.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        width: '985px',
        height: '830px',
      }
    },
    wrongNetwork: {
      position: 'absolute',
      width: '100%',
      height: '44px',
      background: 'rgba(208, 31, 54, 0.4)',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      '& .btn-close': {
        position: 'absolute',
        top: '10px',
        right: '20px',
        height: 'unset',
        padding: '0'
      },

      '& .btn-change-network': {
        background: 'none',
        border: '1px solid #FFFFFF',
        borderRadius: '30px',
        height: '28px',
        padding: '0 14px',
      },

      '& p, & p a': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '24px',
        color: '#FFFFFF',
      },

      '& p a': {
        TextDecoration: 'underline'
      }
    },
    mainContent: {
      maxWidth: '800px',
      zIndex: 1,
      '& h1': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '64px',
        lineHeight: '72px',
        color: '#FFFFFF',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
          fontSize: '28px',
          lineHeight: '32px',
        }
      },
      '& h1 img': {
        [theme.breakpoints.down('xs')]: {
          height: '20px'
        }
      },
      '& h1 br': {
        [theme.breakpoints.down('xs')]: {
          display: 'none'
        }
      },

      '& p': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '18px',
        lineHeight: '24px',
        color: '#ffff',
        marginTop: '20px',
        textAlign: 'center',
        opacity: '0.5',
        letterSpacing: '-0.25px',
        [theme.breakpoints.down('xs')]: {
          fontSize: '14px',
          lineHeight: '20px',
          marginTop: '12px'
        }
      },

      [theme.breakpoints.down('sm')]: {
        margin: '10% 40px',
        width: 'calc(100vw - 80px)'
      },

      [theme.breakpoints.down('xs')]: {
        margin: '27% 16px 40px 16px',
        width: 'calc(100vw - 40px)',
        '& h1': {
          fontSize: '36px',
          lineHeight: '48px'
        },
      }
    },
    info: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '28px',

      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        marginTop: '16px',
      }
    },
    infoDetail: {
      padding: '0 32px',

      '&:nth-child(2)': {
        borderLeft: '1px solid #fff2',
        borderRight: '1px solid #fff2',
      },

      '& p': {
        margin: '2px'
      },

      '& p:last-child': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#FFF'
      },

      [theme.breakpoints.down('xs')]: {
        marginBottom: '12px',
        border: 'none !important',
      }
    },
    buttonArea: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '55px',

      '& .btn-crowdloan': {
        cursor: 'pointer',
        font: 'normal normal 700 16px/22px var(--fontFamily)',
        padding: '12px 16px',
        borderRadius: '90px',
        border: 'none',
        zIndex: 60,
        background: theme.custom.colors.gradientMain,
        color: theme.custom.colors.white02,

        [theme.breakpoints.up('md')]: {
          width: '230px',
          height: '60px',
        }
      },

      [theme.breakpoints.down('xs')]: {
        marginTop: '20px',
        flexDirection: 'column',
        alignItems: 'center',
        '& .btn-crowdloan': {
          marginTop: '16px'
        },
      }
    },
    shareLink: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      '& li': {
        margin: '0 8px 0 8px'
      },
      '& i': {
        fontSize: '20px',
        '&::before': {
          color: '#9F9F9F'
        },

        '&:hover::before': {
          color: '#D01F37'
        }
      }
    }
  };
});

export default useStyles;
