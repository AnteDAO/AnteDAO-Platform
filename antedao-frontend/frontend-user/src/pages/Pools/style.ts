
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    poolsContainer: {
      width: 'calc((1240 / 1440)* 100%)',
      margin: '0 auto',
    },
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    btnTab: {
      height: '28px',
      position: 'relative',
      border: 'none',
      background: 'none',
      outline: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      marginRight: '60px',
      padding: '12px 0',

      '&.active': {
        color: theme.custom.colors.secondary,
      },
      '&.active:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '3px',
        borderRadius: '20px',
        backgroundColor: theme.custom.colors.secondary,
        position: 'absolute',
        bottom: '0',
        left: '0',
      }
    },
    tabContent: {
      '& h2': {
        font: 'normal normal bold 28px/32px var(--fontFamily)',
        color: '#fff',
        margin: '20px 0 24px 0'
      }
    },
    topTitle: {
      '& h2': {
        font: 'normal normal bold 24px/36px var(--fontFamily)',
        color: '#fff',
        [theme.breakpoints.only('xs')] : {
          font: 'normal normal 700 18px/27px var(--fontFamily)',
        }
      }
    },
    searchGroup: {
      position: 'relative',
      width: '295px',
      height: '40px',
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'center',

      '& input': {
        background: '#171B22',
        border: '1px solid #2C313D',
        boxSizing: 'border-box',
        borderRadius: '32px',
        outline: 'none',
        color: '#FFFFFF;',
        width: '100%',
        height: '40px',
        padding: '10px 10px 10px 38px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& input:placeholder-show': {
        textOverflow: 'ellipsis',
      },
      '& ::-webkit-input-placeholder': {
        color: '#424959 !important',
      },
      '& input:focus': {
        color: '#FFFFFF'
      },
      '& img': {
        position: 'absolute',
        left: 12,
        transform: 'translateY(-50%)',
        top: '50%',
      }
    },
    listPools: {
      background: '#1F242C',
      border: 'none',
      borderRadius: '16px',
      marginBottom: '30px'
    },
    poolsHead: {
      padding: '50px 0 52px 35px',
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      width: '100%',
      borderRadius: '4px 4px 0px 0px',
      font: 'normal normal bold 14px/18px var(--fontFamily)',
      color: '#FFF',
      '& th': {
        textAlign: 'left',
        width: '100%',
        size: '16px',
        wight: 'Bold',
      },
      '& tr': {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      },
    },
    poolsBody: {
      // minHeight: '460px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '96%',
      '& tr:last-child': {
        borderBottom: 'none',
      },

      '&.loading': {
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },

      '& tr': {
        width: '100%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginLeft: '3%',
      },
      '& td': {
        width: '100%',
        display: 'block'
      },

      '& .loading td': {
        display: 'flex',
        align: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    [theme.breakpoints.down('xs')]: {
      searchGroup: {
        width: '100%',
      },
      poolsContainer: {
        padding: 16,
        width: '100%'
      },
      poolsHead: {
        padding: '0 15px'
      },
      btnTab: {
        width: 'auto',
        marginRight: '0'
      },
      tabs: {
        justifyContent: 'space-between'
      }
    },
    pagination: {
      marginBottom: 80,
      '& *': {
        color: 'white',
        display: 'flex',
        justifyContent: 'center',

      },
      '& .MuiPaginationItem-root': {
        backgroundColor: '#1F242C',
        border: '1px solid #2C313D',
        borderRadius: 4,
        '&:disabled': {
          opacity: 1
        },
        '&:disabled svg': {
          opacity: '0.38'
        },
      },
      '& .MuiPaginationItem-textPrimary.Mui-selected': {
        background: 'linear-gradient(to bottom, #A855F7, #CA22C6)',
        position: 'relative',
        zIndex: 1,
        border:"none",

        '& .MuiTouchRipple-root': {
          display: 'block',
          background: '#1F242C',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: 2,
          zIndex: -1,
          width: '93%',
          height: '93%'
        }
      }
    }
  };
});

export default useStyles;
