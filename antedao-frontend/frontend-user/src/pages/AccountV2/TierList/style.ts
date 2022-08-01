import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    progressBar: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '6px',
      position: 'absolute',
      top: '12.5px',
      left: '2px',
      background: theme.custom.colors.gradientMainProgressBar,
      borderRadius: theme.custom.radius.medium
    },
    tierList: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      marginBottom: 48,

      '&::before': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '6px',
        position: 'absolute',
        top: '6.5px',
        left: '0',
        backgroundColor: theme.custom.colors.disable,
        borderRadius: theme.custom.radius.medium
      },

      '& li.process': {
        display: 'block',
        height: '12px',
        position: 'absolute',
        top: '11.5px',
        left: '0',
        backgroundColor: '#232394',
        zIndex: 1,
        transition: '1s',
        transitionDelay: '0.5s',
        transitionTimingFunction: 'linear',

        '&.inactive': {
          width: '0!important'
        }
      }
    },

    tierInfo: {
      width: '25%',
      position: 'relative',

      '&:last-child': {
        width: '0',
      },
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        width: '1px',
        whiteSpace: 'nowrap',
      },

      '& .icon': {
        top: '3px',
        height: '22px',
        position: 'relative',
        '& :first-child': {
          width:48,
          height: 48,
        }
      },

      '& .icon-tick': {
        position: 'absolute',
        right: '-15.5px',
        bottom: '-14.5px',
        zIndex: 2,
        [theme.breakpoints.down('xs')]: {
          right: '-7.5px',
        }
      },

      '& .info': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '15px',
        marginLeft: '30px',
      },


      '& span': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        color: theme.custom.colors.white02,
      },

      '& .tier-name': {
        font: 'normal normal bold 14px/18px var(--fontFamily)',
        opacity: '1',
        minHeight: '18px',
        fontSize: '14px',
        lineHeight: '23.8px',
        fontStyle: 'bold',
      },
      '& .tier-number': {
        fontSize: '14px',
        lineHeight: '21px',
        fontStyle: 'nomal',
        color: theme.custom.colors.darkGrey,
      }
    },

    [theme.breakpoints.down('xs')]: {

      tierList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',

        '&::before': {
          content: '""',
          width: '6px',
          height: '94%',
          position: 'absolute',
          left: '19px',
          top: '60px',
          backgroundColor: theme.custom.colors.disable,
        },
      },

      tierInfo: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        width: '147.91px',
        margin: '24px 0',
        '& .icon': {
          top: '3px',
          width: '38px',
          height: '22px',
          position: 'relative',
        },

        '&:nth-child(2) ': {
          marginTop: 0,
        },
        '&:nth-child(11) ': {
          marginBottom: 0,
        },
        '& :first-child': {
          marginTop: 0,
        },
        '& .info': {
          alignItems: 'flex-start',
          marginLeft: '10px',
          position: 'relative',
          bottom: -8,

        },
        '&:first-child > div': {
          alignItems: 'flex-end',
        },

        '&:first-child .info': {
          bottom: -16
        },
        '&:first-child .icon, &:first-child .info': {
          marginBottom: '0',
          marginTop: '0px',
        },

        '& span:last-child': {
          height: '18px',

        },
        '&:nth-child(2) span:last-child': {
          width: '100%',
          display: 'block',
        },
        '&:last-child span:last-child': {
          textAlign: 'right'
        },

        '&:last-child .info': {
          alignItems: 'flex-start!important',
        },

        '& > div': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'relative',
          width: 'auto',
        },
      },

      progressBar: {
        content: '""',
        display: 'none',
      },
      progressBarXs: {
        content: '""',
        width: '6px',
        top: '35px',
        marginTop: '25px',
        height: '100%',
        position: 'absolute',
        left: '19px',
        backgroundColor: theme.custom.colors.disable,
        background: theme.custom.colors.gradientMainProgressBar,

      },


    }
  };
});

export default useStyles;
