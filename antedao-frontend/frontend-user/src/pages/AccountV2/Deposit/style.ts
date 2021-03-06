import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    wrapper: {
      backgroundImage: 'url(/images/bg_layout.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: '0px 80px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 145px)',
      color: '#FFF',
      fontFamily: theme.custom.typography.fontFamilyDM,
      position: 'relative',
      paddingTop: 90,

      '& .modal-content': {
        width: '600px',
        background: '#38383F',
        borderRadius: '12px',
        padding: '48px 56px',
        [theme.breakpoints.down('xs')]: {
          padding: '20px 24px',
          width: '90%'
        }
      },
      '& .modal-content__body': {
        padding: 0,
        marginTop: '30px',
        marginBottom: '20px',
        '& select': {
          backgroundColor: '#222228',
          width: '100%',
          height: '46px',
          border: '1px solid #44454B',
          outline: 'none',
          borderRadius: '4px',
          color: '#FFF',
          padding: '0 12px',
          position: 'relative',
        },
      },

      '& .modal-content .title': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: '28px',
        lineHeight: '32px',
        fontWeight: 'bold',
        marginBottom: '8px',
        textAlign: 'center',

        '& span': {
          color: theme.custom.colors.secondary
        }
      },

      '& .modal-content__foot': {
        marginTop: '36px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '16px',

        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'stretch'
        },

        '& .btn': {
          padding: '12px',
          flex: '0 0 49%',
          borderRadius: '60px',
          color: 'white',
          font: 'normal normal bold 14px/18px var(--fontFamily)',
          background: '#727272',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          [theme.breakpoints.down('sm')]: {
            margin: '4px !important'
          },

          '&:first-child': {
            background: '#3232DC'
          },

          '&.disabled': {
            opacity: '0.42',
            cursor: 'no-drop',
            pointerEvents: 'none'
          },

          '& p': {
            padding: 0,

            '& span': {
              margin: 0
            }
          }
        }
      }
    },
    description: {
      font: 'normal normal normal 14px/18px var(--fontFamily)',
      color: '#FFF',
      textAlign: 'center',
      marginTop: '16px',
      marginBottom: '32px'
    },
    group: {
      marginTop: '16px',

      '& .input-group': {
        background: '#222228',
        border: '1px solid #44454B',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
      },

      '& input': {
        color: '#fff',
        background: '#222228',
        border: 'none',
        outline: 'none',
        padding: '6px 8px',
        flex: 1,
        fontSize: '16px',
        lineHeight: '24px'
      },
      '& button#btn-max-deposit': {
        font: 'normal normal bold 12px/14px var(--fontFamily)',
        color: '#FFF',
        backgroundColor: theme.custom.colors.secondary,
        borderRadius: '4px',
        width: 'auto',
        padding: '4px 10px',
        marginRight: '6px',
        cursor: 'pointer'
      },
      '& .balance': {
        color: '#FFF',
        font: 'normal normal 500 16px/24px var(--fontFamily)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '4px',

        [theme.breakpoints.down('sm')]: {
          textAlign: 'left',
          flexDirection: 'column'
        },

        '& span:last-child': {
          fontWeight: 'bold',
          fontSize: '20px',
          lineHeight: '24px',
          color: theme.custom.colors.secondary,

          [theme.breakpoints.down('sm')]: {
            marginTop: 4
          },
        }
      },
      '& .subtitle': {
        color: '#FFF !important',
        font: 'normal normal 500 16px/24px var(--fontFamily)',
        margin: '19px 4px 6px'
      }
    },
    stages: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& .stage': {
        flex: '0 0 49%',
        padding: '6px',
        textAlign: 'center',
        borderBottom: '2px solid #C4C4C4',
        color: 'white',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& img': {
          marginRight: '8px'
        }
      },

      '& .stage.active': {
        color: theme.custom.colors.secondary,
        borderBottomColor: theme.custom.colors.secondary
      }
    },
    message: {
      color: 'white',
      fontSize: 14,
      position: 'absolute',
      top: 0,
      left: '50%',
      width: '1120px',
      maxWidth: 'calc(100vw - 80px)',
      transform: 'translateX(-50%)',
      padding: '12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#591425',
      marginBottom: 15,
      borderRadius: '8px',
    }
  };
});

export default useStyles;
