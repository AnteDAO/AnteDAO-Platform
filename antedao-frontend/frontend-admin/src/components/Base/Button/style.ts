import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    button: {
      display: 'flex',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '100%',
      height: '40px',
      backgroundColor: '#fff',
      fontWeight: 500,
      fontSize: '14px',
      boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
      borderRadius: '8px',
      border: 0,
      outline: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      '&__loading': {
        marginLeft: '10px',
        '& svg': {
          color: '#fff',
        }
      },
      '&:hover': {
        backgroundColor: theme.custom.colors.primary,
        transition: 'all ease 1s',
      },
      '&--primary': {
        color: '#fff',
        backgroundColor: theme.custom.colors.primary,
        '&:hover': {
          backgroundColor: theme.custom.colors.secondary,
        }
      },

      '&--secondary': {
        color: '#fff',
        backgroundColor: theme.custom.colors.secondary,
        '&:hover': {
          backgroundColor: theme.custom.colors.primary,
        }
      },

      '&--metamask': {
        color: '#fff',
        backgroundColor: theme.custom.colors.metamask,
        '&:hover': {
          backgroundColor: theme.custom.colors.secondary,
        }
      },
      '&:disabled': {
        cursor: 'not-allowed',
        backgroundColor: 'gray',
        '&:hover': {
          backgroundColor: 'gray',
        }
      },

      [theme.breakpoints.up('md')]: {
        // height: '60px',
      },
    }
  };
});

export default useStyles;
