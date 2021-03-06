import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    tierInfomation: {
      marginTop: 12,
    },

    iconT: {
      marginLeft: 12,
      marginRight: 12,
    },

    textRate: {},
    
    conversionRate: {
      display: 'flex',
      maxWidth: '100%',
      flexWrap: 'wrap',
      alignItems: 'top',
      
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },

    group: {
      display: 'flex',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
    },

    title: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
      marginRight: 12,
      fontWeight: 'normal',
      
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: 4,
      },
    }
  };
});

export default useStyles;
