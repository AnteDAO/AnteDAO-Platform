import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    leftLayout: {
      minWidth: '316px',
      minHeight: '100vh',
      background: '#002E58',
      color: '#8D8D8D',
      padding: '20px 14px',
      position: 'relative',
    },
    smallLeft: {
      minWidth: '100px',
      transition: 'min-width 0.5s',
    },
    headLeft: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24,
    },
    BoxInfoUser: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: 48,
      height: 48,
      border: '2px solid #FFCC00',
      borderRadius: '50%',
      marginRight: 10,
      objectFit: 'cover'
    },
    infoUser: {
      minWidth: 180,

      '& .name': {
        overflowWrap: 'anywhere',
        fontSize: 16,
        lineHeight: '26px',
        color: '#FFFFFF',
        whiteWpace: 'nowrap',
      },
      '& .status': {
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0.4,
        color: '#9A9A9A',
        whiteWpace: 'nowrap',

        '& .icon': {
          marginLeft: 7,
        }
      }
    },
    btnSmallBig: {
      marginLeft: 'auto',
      padding: 0,
      minWidth: 40,
      width: 40,
      height: 40,
      maskImage: `url('/images/icon-shrink.svg')`,
      backgroundColor: '#FFFFFF',
      maskPosition: 'center',
      maskRepeat: 'no-repeat',

      '&:hover': {
        backgroundColor: '#FFCC00',
      },
      '&.btnSmall' : {
        transform: 'rotate(180deg)',
      }
    },
    navLeft: {
      width: '100%',
    },
    itemNavLeft: {
      width: '100%',
      marginBottom: 5,
    },
    linkItemNavLeft: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 15,
      minHeight: 74,
      padding: 19,
      fontSize: 16,
      lineHeight: '20px',
      color: '#8D8D8D',
      transition: '0.3s',

      '&.active': {
        background: 'linear-gradient(90deg, #FF6363 0%, #002E58 100%)',
        color: '#FFCC00',
        boxShadow:'0px 2px 4px rgba(138, 146, 166, 0.2)',

        '& .icon': {
          backgroundColor: '#FFCC00',
        }
      },

      '&:hover': {
        background: 'linear-gradient(90deg, #FF6363 0%, #002E58 100%)',
        color: '#FFFFFF',
        transition: '0.3s',

        '& .icon': {
          backgroundColor: '#FFFFFF',
        }
      },

      '& .icon': {
        width: 30,
        height: 30,
        maskImage: `url('/images/icon_nav_left/icon-home.svg')`,
        backgroundColor: '#9A9A9A',
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        marginRight: 19,

        '&.icon-small': {
          margin: 'auto',
        },

        '&.user-group-solid': {
          maskImage: `url('/images/icon_nav_left/user-group-solid.svg')`,
        },

        '&.crown-solid': {
          maskImage: `url('/images/icon_nav_left/crown-solid.svg')`,
        },

        '&.user-tie-solid': {
          maskImage: `url('/images/icon_nav_left/user-tie-solid.svg')`,
        },

        '&.icon-setting': {
          maskImage: `url('/images/icon_nav_left/icon-setting.svg')`,
        }
      }
    },
    Copyright: {
      fontSize: 12,
      lineHeight: '16px',
      textAlign: 'center',
      letterSpacing: 0.4,
      color: '#8D8D8D',
      position: 'absolute',
      bottom: 16,
      left: 0,
      width: '100%',
    }
  };
});

export default useStyles;
