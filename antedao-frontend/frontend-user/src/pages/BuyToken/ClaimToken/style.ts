import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    poolDetailClaim: {
      background: theme.custom.colors.darkLightBg,
      borderRadius: 16,
      padding: '30px 40px',
      marginTop:24,
      color: theme.custom.colors.white02,
      fontFamily: theme.custom.typography.fontFamilyDM,

      [theme?.breakpoints?.down('sm')]: {
        padding: '30px 16px',
      },
      
      '& button': {
        color: '#FFFFFF',
        height: 40,
        padding: 8,
        fontSize: 16,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        lineHeight: '24px',
        borderRadius: 60,
        width: 256,
        maxWidth: '100%',
        background: `${theme.custom.colors.gradientMain} !important`,

        [theme.breakpoints.down('sm')]: {
          marginTop: '60px !important',
        },

        '&:disabled': {
          cursor: 'not-allowed',
          color: theme.custom.colors.grey5,
          background: `${theme.custom.colors.grey8} !important`,
        }
      },

      [theme.breakpoints.down('sm')]: {
        padding: '36px 20px',

        '& #countdown': {
          marginTop: 30
        },

        '& ul': {
          height:400,
          textAlign: 'center',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        },

        '& button': {
          width: '100% !important',
          padding: '0 60px',
          height: '42px',
          font: 'normal normal bold 14px/18px var(--fontFamily)',
        }
      }
    },
    poolDetailClaimTitle: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '32px',
      marginBottom: 24,
      color:theme.custom.colors.white02,
      letterSpacing:"-0.5px",

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    poolDetailClaimInfo: {
      marginBottom: 40,
    },

    poolDetailClaimInfoBlock: {
      display: 'grid',
      gridTemplateColumns: '140px 2fr',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.white02,
      gridColumnGap: 12,

      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        wordBreak: 'break-word',
      },
      
      '& span:first-child': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 340,
        color:  theme.custom.colors.grey6,
      },

      '&:not(:first-child)': {
        marginTop: 13,
      },

      '& .text-blue': {
        color:  theme.custom.colors.secondary,
      }
    },

    poolDetailClaimProgress: {
      display: 'flex',
      position: 'relative',
      '& .percentClaimed':{
        content: '""',
        position: 'absolute',
        top: -11,
        left: 0,
        right: 0,
        height: 6,
        background:theme.custom.colors.gradientMainReverse,
        zIndex:1,
        [theme.breakpoints.down('sm')]: {
          top: 9,
          left: 6,
          width: 5,
          background:theme.custom.colors.gradientMainReverseColumn,
        },
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: -11,
        left: 0,
        right: 0,
        height: 6,
        background: theme.custom.colors.grey8,

        [theme.breakpoints.down('sm')]: {
          top: 0,
          left: 6,
          right: 'auto',
          height: '100%',
          width: 5,
        },
      },

      '& li .mark': {
        position: 'absolute',
        top: -17,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: theme.custom.colors.grey8,
        zIndex: 2,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

        [theme.breakpoints.down('sm')]: {
          top: 0,
          left: 0,
          right: 'auto',
        },
      },

      '& li .info': {
        fontSize: 14,
        lineHeight: '20px',
        marginTop: 12,

        [theme.breakpoints.down('sm')]: {
          textAlign: 'left',
          marginTop: 0,
        },

        '& > div:nth-child(2)': {
          color: theme.custom.colors.grey6,
          lineHeight: '20px',
          marginTop: 4,
        },

        '&.show': {
          whiteSpace: 'nowrap',
          transform: 'translateX(50%) !important'
        }
      },

      '& .first-item': {
        color: 'white',

        [theme.breakpoints.down('sm')]: {
          position: 'relative',
          width: '100%',
          textAlign: 'left',
          paddingLeft: 25,
        },

        '&.active': {
          color:theme.custom.colors.white02,
          position: 'relative',

          '&.solo:before': {
            [theme.breakpoints.down('sm')]: {
              top: -12,
              left: 6,
              height: '99%',
              width: 5,
              right: 'auto',
            },
          }
        }
      },

      '& .item.last-item': {

        '& .info.show': {
          transform: 'none !important',
        },
      },

      '& .item': {
        position: 'relative',

        [theme.breakpoints.down('sm')]: {
          width: '100%',
          paddingLeft: 25,
        },

        '& .mark': {
          left: 'unset',
          right: 0,

          [theme.breakpoints.down('sm')]: {
            bottom: 0,
            left: 0,
            right: 'auto',
            top: 'auto'
          },
        },

        '& .info': {
          textAlign: 'right',

          [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            position: 'absolute',
            left: 24,
            bottom: -24
          },
        },

        '&:not(:last-child):not(:first-child) .info': {
          position: 'absolute',
          right: 0,
          textAlign: 'center',
          transform: 'translateX(4px)',

          [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            transform: 'none',
          },
        },

        '&.active': {
          '&.solo:before': {
            [theme.breakpoints.down('sm')]: {
              top: -12,
              left: 6,
              height: '99%',
              width: 5,
              right: 'auto',
            },
          }
        }
      }
    }
  };
});

export default useStyles;
