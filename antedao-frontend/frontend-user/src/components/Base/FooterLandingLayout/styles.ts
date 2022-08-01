import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    footer: {
      gridArea: 'footer',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '1px solid #24232F',
      padding: 0,
      backgroundColor: 'rgba(36, 35, 47, 0.3)',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        padding: '0px'
      },
    },

    bodyContent: {
      width: 'calc((1240 / 1440)* 100%)',
      margin: '0 auto',
    },

    mainContent: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '80px 0 24px',
      [theme.breakpoints.down('md')]: {
        gap: '0',
        padding: '24px 0 8px',
      },
    },
    infoBrand: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#999999',
      [theme.breakpoints.down('md')]: {
        borderBottom: '1px solid #24232F',
        paddingBottom: '12px',
        marginBottom: '32px',
      },

    },

    textContent: {
      margin: '20px 0',
      color: '#E6E8EC',
      opacity: '0.5',
      [theme.breakpoints.up('md')]: {
        marginRight: '80px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },

    logo: {
      width: 'auto',
      height: '40px',
      '& img': {
        width: '100%',
        height: '100%'
      }
    },
    shareLink: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0.5',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'start',
      },
      '& li': {
        marginRight: '26px'
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
    },
    companyLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    help: {
      paddingTop: '60px',
    },

    title: {
      font: 'normal normal 700 14px/20px var(--fontFamily)',
      color: '#FFFFFF',
      marginBottom: 24,
    },
    footerNavItem: {
      font: 'normal normal 700 14px/20px var(--fontFamily)',
      color: '#FFFFFF',
      opacity: '0.7',
    },

    footerComponent: {
      '& li': {
        marginBottom: '24px',
      },
    },
    copyRight: {
      textAlign: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#5E5D60',
      borderTop: '1px solid #302F33',
      padding: '32px',
    },

  };

});

export default useStyles;
