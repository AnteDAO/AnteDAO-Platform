import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    wrapper: {
      borderRadius: theme.custom.radius.small8,
      color: '#919AAE !important',
      height: '450px',
      [theme.breakpoints.down('sm')]: {
        padding: '20px 20px',
        height: 'auto',
      },
    },

    headPage: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 42,

      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginBottom: 20,
      },
    },

    title: {
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '150%',
      color: theme.custom.colors.white02,

      [theme.breakpoints.down('sm')]: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    btnEditProfile: {
      minWidth: 175,
      borderRadius: theme.custom.radius.full,
      border: 'none',
      height: 48,
      background: theme.custom.colors.gradientMain,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '150%',
      textAlign: 'center',
      color: theme.custom.colors.white02,
      textTransform: 'initial',
      display: 'flex',
      alignContent: 'center',
      padding: '18px 22.5px',

      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        height: 43,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
      },

      '& img': {
        marginRight: 12,
      },

      '&:disabled': {
        border: `1.4px solid ${theme.custom.colors.secondary}`,
        background: 'transparent',
        color: theme.custom.colors.secondary,
        opacity: 0.5,
        cursor: 'not-allowed',
      },

      '&:hover': {
        background: theme.custom.colors.gradientMain,
        opacity: 0.6,
        transition: '0.5s',
      },
    },

    mainInfomation: {
    },

    inputGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '150%',
      color: theme.custom.colors.white02,
      fontWeight: 'normal',
      marginBottom: '18px',

      [theme.breakpoints.down('sm')]: {
        marginTop: 32,
      },


      '& .flex': {
        display: 'flex',
        alignItems: 'center',
        color: theme.custom.colors.white02
      },
      '& > span:first-child': {
        minWidth: 160,
        whiteSpace: 'nowrap',
        marginRight: 12,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: '150%',
        color: theme.custom.colors.darkGrey,
      },

      '& span.verify-email': {
        textDecoration: 'underline',
        cursor: 'pointer',
        width: 'auto',
      },

      '& span.unverified': {
        marginRight: 12,
        color: theme.custom.colors.error,
      },

      '& span.verified': {
        color: '#71FFAA',
      },

      '& button': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#FFF',
        mixBlendMode: 'normal',
        minWidth: '90px',
        height: '32px',
        border: 'none',
        boxSizing: 'border-box',
        borderRadius: theme.custom.radius.full,
        background:  theme.custom.colors.primary,
        cursor: 'pointer'
      }
    },
    spanError : {
        marginTop: 5
    },

    iconStatus: {
      marginLeft: 4,
      width:16,
    },

    groupInput: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& input::-webkit-input-placeholder': {
        color: '#424959 !important'
      },
    },

    errorInput: {
      color: 'red',
      fontSize: 14,
    },

    inputNewValue: {
      width: '100%',
      maxWidth: 400,

      '&>div:before, &>div:after': {
        display: 'none'
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: '100%',
      },

      '& input': {
        borderRadius: theme.custom.radius.small8,
        width: '100%',
        height: 25,
        padding: '8px 10px',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '21px',
        fontWeight:400,
        color: theme.custom.colors.grey6,
        border:'2px solid #2C313D',

        [theme.breakpoints.down('sm')]: {
          width: '100%',
          maxWidth: '100%',
          marginTop: 12,
        },

        '&::placeholder': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontSize: 14,
          lineHeight: '20px',
          color: 'gray !important',
        }
      }
    },

    nameSocial: {
      color: theme.custom.colors.white02,
      [theme.breakpoints.down('sm')]: {
        marginTop: 8,
      },
    },

    redKiteInfo: {
      marginTop: '25px',

      '& .kyc-info': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      '& .kyc-info span': {
        font: 'normal normal normal 14px/24px var(--fontFamily)',
        color: '#fff',
      },

      [theme.breakpoints.down('xs')]: {
        '& .kyc-info': {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
    },

    walletInfo: {
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: theme.custom.radius.small8,
      width: '100%',
      marginTop: '15px',
      padding: '26px 22px',

      '& p': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '24px',
        color: '#999999',
      },
      '& span': {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: '28px',
        lineHeight: '32px',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
      }
    },

    [theme.breakpoints.down('sm')]: {
      wrapper: {
        padding: '24px 20px'
      },
      inputGroup: {
        flexDirection: 'column',
        alignItems: 'flex-start',

        '& span': {
          fontWeight: 'normal !important'
        }
      }
    },

    footerPage: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: 32,
      borderTop: '1px solid #2C313D',
    },

    btnUpdateProfile: {
      minWidth: 175,
      borderRadius: theme.custom.radius.full,
      height: 48,
      background: theme.custom.colors.gradientMain,
      border: 0,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '18px',
      textAlign: 'center',
      color: theme.custom.colors.white02,
      textTransform: 'initial',
      padding: '18px 25px',

      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        height: 43,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
      },
      '&:hover': {
        background: theme.custom.colors.gradientMain,
        opacity: 0.6,
        transition:'0.5s',
      }
    },
  };
});

export default useStyles;
