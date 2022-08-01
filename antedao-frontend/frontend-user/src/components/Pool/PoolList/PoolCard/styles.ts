import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    
    PoolCard: {
      overflow: 'hidden',
      height: '100%',
      background: 'transparent',
      margin: '26px 32px 20px',
      paddingBottom: '20px',
      paddingTop: '10px',
      gap: 15,
      borderBottom: "1px solid #2C313D",
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '100%',
        padding: '24px 20px',
      },
      '&.borderBottom' : {
        marginBottom: 0,
        borderBottom: "none !important",
      },
    },
    
    leftCard: {
      gap: 12,
      display: 'grid',
      gridTemplateColumns: '68px calc(100% - 68px - 12px)',
    },

    introCard: {
      display: 'flex',
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 6,
      marginRight: 16,
      overflow: 'hidden',
      position: 'relative',
      '& .groupImg' : {
         '& .title_KYC': {
          position: 'absolute',
          right:0,
          bottom:0,
          fontSize:10,
          padding:'3px 2px',
          color: theme.custom.colors.white,
          background:theme.custom.colors.gradientMain,
          borderRadius:'50%'
         }
      },
      '& img': {
        width: '45px',
        height: '45px',
        objectFit: 'cover',
        borderRadius: '999px',
      }
    },
    textLeft : {
      display : 'flex',
      flexDirection : 'column',
      font : 'normal normal 400 14px/20px var(--fontFamily)',
      color : '#FFFFFF',
      '& h5': {
        font : 'normal normal 400 18px/24px var(--fontFamily)',
      },
      '& p' : {
        opacity: '0.5',
        clear: 'both',
        display: 'inline-block',
        overflow:' hidden',
        whiteSpace: 'nowrap',
      }
    },
    cardActiveHeader: {
      display: 'Grid',
      gap: 20,
      gridTemplateColumns: '150px auto',
      marginBottom: 20,

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '100px auto',
      },
    },

    cardActiveHeaderLeft: {
      display: 'flex',
      flexDirection: 'column',
    },

    icon: {
      width: 68,
      height: 68,
      overflow: 'hidden',
      borderRadius: 12,
      marginRight: 12,

      [theme.breakpoints.down('md')]: {
        width: 68,
        height: 68,
      },
    },

    title: {
      font: 'normal normal 400 16px/24px var(--fontFamily)',
      color: '#919AAE',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    tooltip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      padding: '5px 10px',
    },
    name: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '20px',
      color: '#AEAEAE',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: 15,

      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },

    cardActiveHeaderRight: {

    },

    listStatus: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },

    listInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
    },

    itemInfo: {
      display: 'flex',
      flexDirection: 'column',
    },

    nameInfo: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#AEAEAE',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: 12,
    },

    valueInfo: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '24px',
      color: '#FFFFFF',
    },

    poolStatus: {

    },

    poolStatusWarning: {
      font: 'normal normal 400 18px/24px var(--fontFamily)',
      color: '#FFFFFF',
    },

    progressArea: {
    },

    titleProgressArea: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#AEAEAE',

      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },

    progress: {
      display: 'block',
      width: '100%',
      height: 4,
      background: '#44454B',
      borderRadius: 20,
      marginBottom: 12,
    },

    currentProgress: {
      height: 4,
      background: theme.custom.colors.gradientStep,
      boxShadow: '0px 2px 8px rgba(99, 152, 255, 0.2);',
      borderRadius: 20,
      display: 'block',
      transition: '2s',
      position: 'relative',

      '&.inactive': {
        width: '0 !important',
      }
    },

    progressInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      font: 'normal normal 400 18px/24px var(--fontFamily)',
      color: '#FFFFFF',

      '& span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },

    iconCoin: {
      width: 20,
      height: 20,
      borderRadius: '50%',
    },

    headProgressArea: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    claimTime: {
      border: '2px solid #D01F36',
      borderRadius: 60,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#D01F36',
      height: 32,
      padding: '4px 13px',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      position: 'relative',
      marginTop: -10,

      '& img': {
        marginRight: 10,
        position: 'relative',
        top: -1,
      }
    },

    iconCurrentProgress: {
      top: -10,
      right: -5,
      position: 'absolute',
      width: 23,
    }
  };
});

export default useStyles;
