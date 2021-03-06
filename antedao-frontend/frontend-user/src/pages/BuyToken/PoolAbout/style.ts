import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    PoolAbout: {
      marginTop: 30,
      width: '50%',
      marginRight: 120,

      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginRight: 0
      },
    },
    PoolAboutBlock: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',

      '&:not(:first-child)': {
        marginTop: 25
      }
    },
    PoolAboutLabel: {
      color: '#999999',
      font: 'normal normal normal 14px/24px var(--fontFamily)',
    },
    PoolAboutText: {
      display: 'flex',
      alignItems: 'center',
      font: 'normal normal bold 14px/18px var(--fontFamily)',
      [theme.breakpoints.down('xs')]: {
        lineHeight: '20px',
        wordBreak: 'break-word'
      }
    },
    PoolAboutIcon: {
      marginLeft: 10
    },
    PoolAboutDesc: {
      width: 580, 
      lineHeight: '1.6rem' ,
      color: '#999999', 
      font: 'normal normal normal 14px/24px var(--fontFamily)',

      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  };
});

export default useStyles;
