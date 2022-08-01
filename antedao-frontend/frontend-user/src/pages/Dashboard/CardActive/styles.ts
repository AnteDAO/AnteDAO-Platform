import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    cardActive: {
      overflow: 'hidden',
      height: '100%',
      background: '#1F242C',
      borderRadius: 24,
      boxShadow: ' 0px 4px 20px rgba(0, 0, 0, 0.6)',
      display: 'flex',

      [theme.breakpoints.down('sm')]: {
        flexDirection : 'column',
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.only('md')]: {
        flexDirection : 'column',
        gridTemplateColumns: '1fr',
      },
    },

    cardActiveBanner: {
      overflow: 'hidden',
      position: 'relative',
      width:248,
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },

      [theme.breakpoints.down('sm')]: {
        width : '100%',
        height: '180px',
        maxHeight: '180px',
      },
      [theme.breakpoints.only('md')]: {
        width : '100%',
        maxHeight: '220px',
        height: '220px',
      },
    },

    cardActiveRight: {
      padding: '32px 24px 24px',
      paddingBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex:1,
      [theme.breakpoints.down('sm')]: {
        padding: 20,
        paddingBottom: 20,
      },
      
    },
    cardActiveTop : {

    },
    tooltip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      padding: '5px 10px',
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
      marginBottom: 8,
      display: 'grid',
      gridTemplateColumns: '1fr 28px',
    },

    icon: {
      width: 110,
      height: 110,
      overflow: 'hidden',
      borderRadius: '50%',
      marginBottom: 18,

      [theme.breakpoints.down('md')]: {
        width: 70,
        height: 70,
      },
    },

    title: {
      font: 'normal normal 700 16px/24px var(--fontFamily)',
      color: '#FFFFFF',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: '150%',
      },
    },
    iconCurrency: {
      width: 28,
      height: 28,
      [theme.breakpoints.down('sm')]: {
        width: 21,
        height: 21,
      },
    },
    name: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 22,
      lineHeight: '20px',
      color: '#AEAEAE',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },

    cardActiveHeaderRight: {

    },

    listStatus: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      position: 'absolute',
      top: 16,
      left: 16,
    },

    listInfo: {
      marginTop: 8,
    },

    itemInfo: {
      display: 'grid',
      placeContent: 'center',
      gridTemplateColumns: 'repeat(2, 1fr)',
      marginTop: 11,
      gap: 10,
      '& .is': {
        background: theme.custom.colors.gradientMainProgressBar,
        '-webkitBackgroundClip': 'text',
        '-webkitTextFillColor': 'transparent',
      }
    },

    nameInfo: {
      font: 'normal normal 400 14px/20px var(--fontFamily)',
      color: theme.custom.colors.grey6,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    valueInfo: {
      font: 'normal normal 700 14px/24px var(--fontFamily)',
      textAlign: 'right',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      justifyContent: 'flex-end',
    },

    poolStatus: {
      marginLeft: 12,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#FFFFFF',
      padding: '5px 17px',
      border: '1px solid #44454B',
      borderRadius: 12,
      height: 34,

      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },

      '&:first-child': {
        marginLeft: 0,
      },

      '&.joining': {
        background: '#956AF6',
      },

      '&.filled': {
        backgroundColor: 'deeppink'
      },

      '&.in-progress': {
        backgroundColor: '#FFDE30'
      },

      '&.ended': {
        backgroundColor: '#D01F36'
      },

      '&.claimable': {
        backgroundColor: '#FF9330'
      },

      '&.upcoming': {
        backgroundColor: theme.custom.colors.secondary
      },

      '&.tba': {
        backgroundColor: '#9E63FF'
      }
    },

    poolStatusWarning: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      color: '#FFF',
      padding: '2px 10px',
      borderRadius: 8,
      background: theme.custom.colors.green,
      height: 28,
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
    },

    progressArea: {
      marginTop: 11,
    },

    progressAreaHeader: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    titleProgressArea: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '24px',
      color: '#AEAEAE',

      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },

    progress: {
      display: 'block',
      width: '100%',
      height: 8,
      background: '#44454B',
      borderRadius: 20,
      marginTop: 24,
      marginBottom: 9,
      [theme.breakpoints.only('xs')] : {
        marginTop: 35,
        marginBottom: 39,
      }
    },

    iconCurrentProgress: {
      position: 'absolute',
      top: -14,
      right: -14,
    },

    currentProgress: {
      position: 'relative',
      height: 8,
      background: 'linear-gradient(270deg, #A855F7 6.7%, #CA22C6 100%)',
      borderRadius: 20,
      display: 'block',
      transition: '2s',
      boxShadow: '0px 4px 8px rgba(123, 97, 255, 0.3)',

      '&.inactive': {
        width: '0 !important',
      }
    },

    progressValue: {
      display: 'flex',
      flexDirection: 'row',
      font: 'normal normal 400 14px/20px var(--fontFamily)',
      color: theme.custom.colors.darkGrey,
      alignItems: 'center',

      
    },
    progressValueNumber :{
      maxWidth : '20vw',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('md')] : {
        maxWidth : '40vw',
      }
    },
    btnSwapNow: {
      width: '100%',
      minWidth:148,
      height: 40,
      background: theme.custom.colors.gradientMain,
      borderRadius: 60,
      display: 'flex',
      alignItems: 'center',
      padding: '0px 18px',
      alignContent: 'center',
      font: 'normal normal 500 16px/24px var(--fontFamily)',
      color: '#FFFFFF',
      overflow: 'hidden',
      justifyContent: 'center',
      '&:hover': {
        color: '#FFFFFF',
        opacity: 0.8
      },

      '& img': {
        width: 20,
        marginLeft: 8,
      }
    },

    btnDetail: {
      border: `2px solid ${theme.custom.colors.secondary}`,
      color: theme.custom.colors.secondary,
      background: 'transparent',

      '&:hover': {
        color: theme.custom.colors.secondary,
        opacity: 0.8
      },
    },

    iconCoin: {
      width: 28,
      height: 28,
      borderRadius: '50%',

      [theme.breakpoints.down('sm')]: {
        width: 24,
        height: 24,
      },
    },

    groupBtnBottom: {
      display: 'grid',
      gap: 16,
      gridTemplateColumns: '1fr 1fr',
      marginTop: 25,

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginTop: 0,
      },
    },
    buttonDetail: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color : '#8d4cd0',
      borderRadius: 60,
      border: 'solid 1px transparent',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(180deg, #a855f7, #CA22C6)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      boxShadow: '2px 1000px 1px #1F242C inset',

      '&:hover': {
        color: '#FFFFFF',
        opacity: 0.8
      },

      '& img': {
        color: '#FFFFFF',
        width: 20,
        marginLeft: 8,
      }
    },
    endIn: {
      display: 'flex',
      width: '100%',
      height: 40,
      minWidth:148,
      background: '#171B22',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      // padding: '8px 16px',
      flexWrap: 'wrap',
    },

    endInText: {
      font: 'normal normal 500 14px/21px var(--fontFamily)',
      color: '#919AAE',
      marginRight: 6,
    },

    endInTextClaimable: {
      font : 'normal normal 500 14px/18x var(--fontFamily)',
      color: '#FFD058',
      textTransform: 'uppercase',
    },

    endInCountdown: {
      font: 'normal normal 500 14px/21px var(--fontFamily)',
      color: '#424959',
    },
  };
});

export default useStyles;
