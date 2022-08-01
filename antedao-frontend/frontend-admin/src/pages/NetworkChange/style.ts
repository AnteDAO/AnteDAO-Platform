import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    networkChange: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&__wrap': {
        width: '500px',
        maxWidth: '100%',
        textAlign: 'center',
      },
      '&__title': {
        color: 'red',
        fontSize: '30px',
        marginBottom: '30px',
      }
    },
    boxMessage : {
      backgroundColor: '#5b0712fa',
      width:'100%',
      height:48,
      zIndex:9999,
      textAlign:'center',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:30,
  
    },
    spanError : {
      color: 'white',
      lineHeight:'48px',
      font:'normal normal 400 14px/24px Helvetica',
      marginLeft:10
    },

  };
});

export default useStyles
