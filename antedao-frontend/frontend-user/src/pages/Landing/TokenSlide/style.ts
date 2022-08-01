import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      width: 1000,
      overflow: 'hidden',
      marginLeft: 80,
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: -2,
        bottom: 0,
        width: 100,
        background: 'linear-gradient(270deg, rgba(2, 6, 24, 0) 0%, #020618 100%)',
        [theme.breakpoints.down('sm')]: {
          left: -4,
        }
      },

      '&:after': {
        content: '""',
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: -2,
        bottom: 0,
        width: 100,
        background: 'linear-gradient(270deg, #020618 0%, rgba(2, 6, 24, 0) 100%)',
      },

      [theme.breakpoints.down('sm')]: {
        maxWidth: 'calc(100vw - 48px)',
        margin: 0,

        '&:before': {
          width: 40
        },

        '&:after': {
          width: 40
        },
      },
    },
    slider: {
      display: 'flex',
      alignItems: 'center',
      animation: `$slideshow 10s linear infinite`,

      '& > a': {
        minWidth: 300,
        marginRight: 8,
      },
      '&.paused': {
        animationPlayState: 'paused'
      }
    },

    "@keyframes slideshow": {
      "  0%": { transform: 'translateX(0)' },
      "100%": { transform: 'translateX(-924px)' }
    }
  }
});

export default useStyles;