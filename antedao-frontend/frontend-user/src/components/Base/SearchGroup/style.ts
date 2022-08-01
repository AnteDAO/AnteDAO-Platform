import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    searchGroup: {
      position: 'relative',
      width: '295px',
      height: '45px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',

      [theme?.breakpoints?.down('xs')]: {
        display: 'none'
      },
      '& input': {
        background: 'transparent',
        border: '1px solid #2C313D',
        boxSizing: 'border-box',
        borderRadius: '32px',
        outline: 'none',
        color: '#FFFFFF;',
        width: '100%',
        height: '45px',
        padding: '10px 0px 10px 38px',
      },
      '& ::-webkit-input-placeholder': {
        color: '#424959 !important'
      },
      '& input:focus': {
        color: '#FFFFFF'
      },
      '& img': {
        position: 'absolute',
        left: 12,
        transform: 'translateY(-50%)',
        top: '50%',
      },
    },
    listbox: {
      top: 42,
      width: 295,
      margin: 0,
      padding: 10,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: '#1F242C',
      borderRadius: '20px',
      overflowY: 'scroll',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',

      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': ' inset 0 0 6px rgba(0,0,0,0.3)',
        // borderRadius: '20px',
        backgroundColor: '#1F242C',
      },
      '&::-webkit-scrollbar': {
        width: 8,
        backgroundColor: '#F5F5F5',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '20px',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
        backgroundColor: '#AEAEAE',
      },
      '& a, &>li': {
        display: 'flex',
        padding: '8px 0px 8px 10px',
        font: 'normal normal 600 14px/21px var(--fontFamily)',
        color: '#AEAEAE',
        borderRadius: '25px',
        overflow: 'hidden'
      },
      '& a:hover': {
        opacity: '0.5',
        cursor: 'pointer',
      },
    },
  };
});

export default useStyles;
