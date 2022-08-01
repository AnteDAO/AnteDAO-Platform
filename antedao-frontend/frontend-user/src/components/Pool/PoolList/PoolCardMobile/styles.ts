import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    boxCarMoblie : {
      display: "flex",
      flexDirection : "column",
      backgroundColor : '#1F242C',
      height: '100%',
      marginBottom: 20,
      borderRadius : 8,
      padding :"30px 20px",
      border: '1px solid #44454B',

      "&:last-child":{
        borderBottom: 0,
      }
    },
    introCard : {
      display : 'flex',
      width : 253,
      height : 48,
      marginTop : 11,
    },
    imgContainer : {
      display : 'flex',
      justifyContent : 'center',
      minWidth: '80px',
      maxWidth: '80px',
      height : 47,
      borderRadius:6,
      marginRight:16,
      overflow : 'hidden',
      backgroundColor : '#424959',
      position: 'relative',
      
      '& .title_kyc': {
        position: 'absolute',
        right:0,
        bottom:0,
        fontSize:8,
        padding:3,
        color: theme.custom.colors.white,
        background:theme.custom.colors.gradientMain,
        borderTopLeftRadius:10
      },
      '& img':{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    textLeft : {
      display : 'flex',
      flexDirection : 'column',
      font : 'normal normal 400 16px/24px var(--fontFamily)',
      '& p' : {
        color : '#FFFFFF',
        clear: 'both',
        display: 'inline-block',
        overflow:' hidden',
        whiteSpace: 'nowrap',
      }
    },
    infoMid : {
      display : 'flex',
      marginTop : 28
    },
    infoEnd : {
      display : 'flex',
      flexDirection : 'column',
      marginTop : 28
    },
    totalRaised : {
      marginRight : 57,
    },
    totalRaisedValue : {
      font : 'normal normal 700 16px/24px var(--fontFamily)',
      color : '#FFFFFF'
    },
    title : {
      font : 'normal normal 500 16px/24px var(--fontFamily)',
      color : '#919AAE',
    },
    progressArea: {
      marginTop : 12
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
      background: theme.custom.colors.gradientMain,
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
      font:'normal normal 400 16px/24px var(--fontFamily)',
      color: '#919AAE',

      '& span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
  };
});

export default useStyles;
