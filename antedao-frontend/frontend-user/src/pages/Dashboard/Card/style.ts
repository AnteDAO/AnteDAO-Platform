import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    boxCard: {
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        width: '100%',
        minWidth : '295px',
        marginBottom: 20,
      },
    },
    card: {
      borderRadius: 24,
      overflow: 'hidden',
      minHeight: '320px',
      width: '100%',
      background: '#1F242C',
    },

    cardHeader: {
      position: 'relative',

      '& > img': {
        width: '100%',
        maxHeight: 167,
        height: 167,
        objectFit: 'cover',

        [theme.breakpoints.down('sm')]: {
          height: 180,
        },
      },

      '& .time': {
        background: '#030925',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#FFFFFF',
        padding: '6px 15px',
        height: 34,
        marginLeft: 12,
        '&.tba': {
          backgroundColor: '#9E63FF'
        },
        '&.upcoming': {
          backgroundColor: theme.custom.colors.secondary
        },
        '&.joining': {
          backgroundColor: '#12A064'
        },
        '&.in-progress': {
          backgroundColor: '#FFDE30'
        },
        '&.filled': {
          backgroundColor: '#ff1493',
          color: '#fff'
        },
        '&.ended': {
          backgroundColor: '#D01F36',
          color: '#fff',
        },
        '&.closed': {
          backgroundColor: '#D01F36',
          color: '#fff'
        },
        '&.claimable': {
          backgroundColor: '#FF9330'
        },
        '&.none': {
          backgroundColor: '#FF9330',
          color: '#fff'
        },
      }
    },
    cardBodyHead: {
      display: 'Grid',
      placeContent: 'center',
      gridTemplateColumns: 'calc(100% - 24px - 5px) 24px',
      gap: 5,
    },

    network: {
      '& img': {
        width: 24,
        height: 24,
        borderRadius: '50%',
      }
    },

    btnApplied: {
      background: '#272E39',
      marginTop: 20,
      height: 42,
      width: '100%',
      border: 0,
      borderRadius: 24,
      cursor: 'pointer',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#D6D6D6',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      transition: '0.3s',
      fontWeight: 400,

      '& img': {
        marginRight: 7,
        height: 20,
      },

      '&:hover': {
        background: '#38383D',
        opacity: 0.8,
        color: '#D6D6D6',
      },

      '& > div': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 700,
        fontSize: 16,
        lineHeight: '24px',
        color: '#FFFFFF',
        marginLeft: 2,
      }
    },

    listStatus: {
      position: 'absolute',
      padding: '17px 16px',
      width: '100%',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    poolStatusWarning: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '23.8px',
      textAlign: 'center',
      color: '#3232DC',
      borderRadius: 4,
      background: '#FFFFFF',
      height: 27,
      width: 58,
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
      padding: 2,
    },

    tooltip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      padding: '5px 10px',
    },
    cardBody: {
      padding: '15px 20px 20px 20px',
      '& .card-content__title': {
        '& p': {
          font : 'normal normal 700 16px/24px var(--fontFamily)',
          color : '#CA22C6 !impotant',
        },
        
        '& img': {
          width: 50,
          height: 50,
          marginRight: 7,
          borderRadius: '50%',
        },

        '& > p': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          lineHeight: '24px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontWeight: 700,
          fontSize: 16,
          color: '#CA22C6',
        },

        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        },

        '& > div h3': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontWeight: 'bold',
          fontSize: 24,
          lineHeight: '24px',
          color: '#FFFFFF',
          textAlign: 'left',
          marginBottom: 2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          [theme.breakpoints.down('md')]: {
            fontSize: 14,
            marginBottom: 5,
          },
        },

        '& > div p': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 16,
          lineHeight: '20px',
          color: '#AEAEAE',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          [theme.breakpoints.down('md')]: {
            fontSize: 14,
          },
        }
      },

      '& .card-content__content': {
        display: 'flex',
        flexDirection: 'column',

        '& li': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '7px',

          '& span:first-child': {
            fontFamily: theme.custom.typography.fontFamilyDM,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: '21px',
            color: '#919AAE',
          },

          '& span:last-child': {
            fontFamily: theme.custom.typography.fontFamilyDM,
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 14,
            lineHeight: '23.8px',
            color: '#FFFFFF',
            textAlign: 'right',
          },
        },
      },

      '& .token-area': {
        marginTop: '30px',
        display: 'flex',
      },
      '& .token-area > div': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '5px 17px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '12px'
      },
      '& .token-area img': {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        marginRight: '10px'
      },
      '& .token-area span': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        color: '#999999',
      },

      '& .progress-area': {
        marginTop: '30px',

        '& p': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
          color: '#999999',
        },
        
        '& .progress': {
          display: 'block',
          width: '100%',
          height: '6px',
          background: '#C4C4C4',
          borderRadius: '20px',
          margin: '12px 0 8px 0',

          '& .current-progress': {
            height: '6px',
            background: '#12A064',
            borderRadius: '20px',
            display: 'block',
            transition: '2s',
            '&.inactive': {
              width: '0!important',
            }
          },
        },

        '& div': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        },

        '& div span': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
          color: '#999999',
        },

        '& div div span:first-child': {
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '18px',
          color: '#FFFFFF',
        },

        
      },
     
    },
  };
});

export default useStyles;
