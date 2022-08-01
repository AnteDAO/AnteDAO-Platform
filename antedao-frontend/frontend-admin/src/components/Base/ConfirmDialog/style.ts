import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        width: 600,
        // boxSizing:'border-box',
        padding: '10px 20px'
      }
    },
   
    dialogContent: {
      // padding: '8px 24px',
      overflowY: 'initial'
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '30px 0px' ,

      '& > *:not(:last-child)': {
        marginRight: 5 
      }
    },
    dialogInput: {
      borderRadius: 5,
      border: '1px solid black',
      padding: '10px',
      transition: '.1s all ease-in',

      '&:focus': {
        borderColor: '#FFCC00',
        outline: 'none'
      }
    },
    dialogLabel: {
      marginRight: 10,
      color: '#363636'
    },
    dialogButton: {
      textTransform: 'inherit',
      background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
      color: 'white',
      minWidth:'100px',
      fontWeight: 400,
      borderRadius:'10px',

      '&:hover': {
        backgroundColor: '#c29f15'
      }
    },
    dialogButtonCancel: {
      background: 'black',
      color:'white',

      '&:hover': {
        background: '#00000085',
      }
    }
  }
});

export default useStyles;

