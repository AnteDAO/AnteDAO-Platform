import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => {
  return {
    countdownPart: {
      display: 'inline-block',
      listStyleType: 'none',
      padding: '4px 8px',
      font: `normal normal bold 18px/24px ${theme.custom.typography.fontFamilyDM}`,
      background:`${theme.custom.colors.grey5}15`,
      borderRadius:8,

      '& span': {
        display: 'block',
        textAlign: 'center',
        color:theme.custom.colors.grey5,
        marginTop:'4px',
        [theme?.breakpoints?.down('sm')]: {
          '&:first-child': {
            fontSize:18,
          }
        },
      },

      '&.number': {
        display: 'inline-block',
        maxWidth: 68,
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '28px',
      }
    },
    countdownParts: {
      margin: '0px 8px',
      lineHeight:'60px',
      [theme?.breakpoints?.down('sm')]: {
        margin: '0px 8px',
      },
    },

    listCountDown: {
      display: 'flex', 
      alignItems: 'flex-start',

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        justifyContent: 'flex-start',
      },
      [theme?.breakpoints?.down('xs')]: {
        textAlign: 'center',
        justifyContent: 'space-betwwen ',
      },
    },

    countdownInfo: {
      color: '#999999',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      margin: '4px 0px',
    },
    [theme.breakpoints.down('xs')]: {
      countdownPart: {
        '&.number': {
          maxWidth:63,
        }
      },
      countdownInfo : {
      fontSize: 12,
      margin:0,
      }
    },
  };
});

export default useStyles;
