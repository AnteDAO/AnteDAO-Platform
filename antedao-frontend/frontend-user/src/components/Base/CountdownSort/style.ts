import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownSort: {
      '& p':{
        font : 'normal normal 700 16px/24px var(--fontFamily)',
      }
       
    },
  };
});

export default useStyles;
