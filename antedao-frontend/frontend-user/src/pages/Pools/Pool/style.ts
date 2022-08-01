import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    link: {
      display: 'block',
      width: '100%',
    },
    row: {
      fontSize: '16px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '46px',
      mixBlendMode: 'normal',
      padding: '50px 0 50px 0',
    },
    name: {
      color: '#919AAE',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: '240px',
      width: '24%',

      '& img': {
        width: '112px',
        height: '57px',
        marginRight: '10px',
        borderRadius: '50%',
      }
    },
    ratio: {
      minWidth: '120px',
      width: '12%',
      color: '#919AAE'
    },
    status: {
      color: '#919AAE',
    },
    poolType: {
      textTransform: 'capitalize',
      minWidth: '120px',
      width: '12%',
      color: '#919AAE'
    },
    progress: {
      minWidth: '400px',
      width: '40%',
      color: '#919AAE',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transition: '.2s all ease-in',

      '& > span': {
        marginRight: '10px',
        minWidth: '60px'
      },
      '& .progress': {
        width: '280px',
        height: '5px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative',
        transition: '.2s all ease-in',
      },
      '& .current-progress': {
        width: '280px',
        height: '5px',
        borderRadius: '10px',
        backgroundColor: '#232394',
        position: 'absolute',
        left: 0,
        top: 0,
        transition: '.2s all ease-in',
      }
    },
    [theme.breakpoints.down('xs')]: {
      row: {
        padding: '0 15px',
        minHeight: '46px',
        height: 'auto'
      },
      ratio: {
        display: 'none'
      },
      poolType: {
        display: 'none'
      },
      progress: {
        width: '30%',
        minWidth: '90px',
        '& .progress': {
          display: "none"
        }
      },
      name: {
        width: '50%',
        minWidth: '150px',
      },
    }
  };
});

export default useStyles;
