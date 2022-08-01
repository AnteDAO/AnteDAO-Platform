import { makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createTheme'

interface Props {
  spacing: number;
}

const useStyles = makeStyles<Theme, Props>(props => ({
  button: {
    background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
    border: 'none',
    borderRadius: 10,
    display: 'inline-flex',
    fontFamily: 'Roboto-Medium',
    cursor: 'pointer',
    transition: '.2s all ease-in',
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItem:'center',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
      transform: 'translateY(-7px)'
    }
  },
  buttonDisable:{
    background: '#C4C4C4',
    pointerEvents:'none',
    border: 'none',
    borderRadius: 10,
    display: 'inline-flex',
    fontFamily: 'Roboto-Medium',
    transition: '.2s all ease-in',
    height:'100%',
    width:'100%',
    justifyContent:'center',
    alignItem:'center'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: 'white',
    fontWeight: 500,
    margin:0,

  },
  buttonWrap:{
    height:44,
    minWidth:202,
    display:'inline-flex',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonWrapDisable:{
    cursor:'not-allowed',
    height:44,
    minWidth:202,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    marginLeft: props => props.spacing
  }
}));

export default useStyles;
