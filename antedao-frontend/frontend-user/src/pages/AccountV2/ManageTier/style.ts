import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    btn: {
      minWidth: 160,
      height: 42,
      borderRadius: 60,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#FFFFFF',
      textTransform: 'initial',
      boxShadow: 'none',
      border: 'none',
      cursor: 'pointer',

      [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
      },

      '&.btnStake': {
        background: '#3232DC',
        marginRight: 8,

        [theme.breakpoints.down('sm')]: {
          marginRight: 0,
          marginBottom: 12,
        },

        '&:hover': {
          opacity: 0.85,
        },

        '&:disabled': {
          backgroundColor: '#3232DC !important',
          color: '#FFFFFF',
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },

      '&.btnUnstake': {
        background: 'transparent',
        border: `2px solid ${theme.custom.colors.secondary}`,
        color: theme.custom.colors.secondary,

        '&:hover': {
          opacity: 0.85,
        },

        '&:disabled': {
          color: theme.custom.colors.secondary,
          cursor: 'not-allowed',
          opacity: 0.6,
        },
      },
    },

    content: {
      width: '100%',
      paddingTop: 24
    },

    buttonArea: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      }
    },

    title: {
      fontWeight: 700,
      marginTop: 20,
      marginBottom: 10,
    },

    walletBalance: {
      width: '100%',
      background: '#222228',
      border: '1px solid #44454B',
      borderRadius: '8px',
      [theme.breakpoints.down('sm')]: {
        width: 'auto'
      }
    },

    tableHead: {
      color: '#fff',
      font: 'normal normal bold 14px/18px var(--fontFamily)',
      padding: '16px 37px',
      background: '#191920',
      borderRadius: '8px 8px 0 0',

      [theme.breakpoints.down('sm')]: {
        padding: '16px 22px',
      },

      '& .group': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& span': {
          width: '25%',
          textAlign: 'center',

          '&:first-child': {
            textAlign: 'left'
          }
        }
      }
    },

    tableBody: {
      color: '#fff',

      '& .group': {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '44px',
        alignItems: 'center',
        padding: '12px 37px',

        [theme.breakpoints.down('sm')]: {
          padding: '12px 22px',
        },
      },

      '& .group span': {
        width: '25%',
        wordBreak: 'break-all',
        font: 'normal normal normal 14px/20px var(--fontFamily)',
        color: '#fff',
        textAlign: 'center',

        '&:first-child': {
          textAlign: 'left'
        }
      }
    },
    balance: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '32px',
      color: '#FFFFFF',
      marginTop: '8px',
      marginBottom: '13px',
    },
  };
});

export default useStyles;
