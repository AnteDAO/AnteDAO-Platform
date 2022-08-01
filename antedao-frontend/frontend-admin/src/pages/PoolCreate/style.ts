import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 720,
    margin: '0 auto',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  p: {
    margin: 0,
    fontSize: '14px'
  },
  relative: {
    position: 'relative',
    maxWidth: '90px'
  },
  relativeMIn: {
    position: 'relative',
    width: '90px'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    border: '1px solid #001F4D',
    padding: '5px 5px',
    color: '#001F4D',
    borderRadius: 10,
    backgroundColor: '#AEAEAE',
    margin: '0px',
    fontSize: '14px',
    height: '-webkit-fill-available',
    lineHeight: 'initial',
  },
  containerCreateEdit: {
    maxWidth: 720,
    // margin: '0 auto',
  },

  boldText: {
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'white',
    boxShadow: `0px 0px 15px rgba(0, 0, 0, 0.1)`,
    borderRadius: 10,
    padding: '50px 25px',
    marginTop: 25
  },
  tableFCFS: {
    minWidth: 450,
    '& td, th': {
      padding: '16px 5px'
    }
  },
  formInput: {
    display: 'block',
    borderRadius: '10px',
    boxSazing: 'border-box',
    border: '1px solid #001F4D',
    width: '100%',
    height: '28px',
    padding: '3px 30px 3px 10px',
    textAlign: 'right',
    '&:focus-visible': {
      outline: 'none'
    },
    '&:disabled': {
      borderColor: '#CBCBCB',
      color: '#D8D8D8',
      background: '#F5F5F5',
      '&+p': {
        borderColor: '#CBCBCB',
        color: '#b4b4b4',
        background: '#e0e0e0',
        minWidth: 15,
        textAlign: 'center',
        display: 'block'
      }
    },
  },
  inputEndBuyTime: {
    paddingRight: 40
  },


  formControl: {
    marginTop: 30,
    position: 'relative',
    '& .button-color': {
      background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
      color: 'white'
    }
  },
  formControlFlex: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },

  formCKEditor: {
    // minHeight: 300,
    // height: 300,
  },
  formControlLabel: {
    fontSize: 14,
    letterSpacing: '0.25px',
    color: '#001F4D'
  },
  formControlBlurLabel: {
    color: '#9A9A9A !important'
  },
  formControlInput: {
    display: 'block',
    border: '1px solid #001F4D',
    width: '100%',
    padding: '13px',
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'white',
    transition: '.1s all ease-in',

    '&:focus': {
      borderColor: '#FFCC00',
      outline: 'none'
    }
  },
  formControlInputLoading: {
    position: 'relative'
  },
  formControlIcon: {
    display: 'inline-block',
    marginTop: 10
  },
  formControlIconExchange: {
    display: 'inline-block',
    marginTop: '2.25rem',
    marginLeft: 5,
    marginRight: 5
  },
  formDatePicker: {
    // maxWidth: 300,
    // width: 240,
    marginTop: 5,
    border: '1px solid #001F4D',
    borderRadius: 10,
    position: 'relative',

    '& .react-date-picker__wrapper': {
      backgroundColor: 'white !important',
    }
  },
  formDatePickerBlock: {
    display: 'block'

  },
  formControlFlexBlock: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '50%'
  },
  // for exchange rate section
  exchangeRate: {
    backgroundColor: 'white',
    fontWeight: 400,
    boxShadow: `4px 4px 4px 4px rgba(0, 0, 0, 0.05)`,
    borderRadius: 15,
    border: ' 1px solid #000000',
    padding: '20px 25px 30px 25px',
    marginTop: 20
  },
  exchangeRateTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#001F4D'
  },
  exchangeRateDesc: {
    marginTop: 30,
    color: '#9A9A9A',
    letterSpacing: '0.25px'
  },
  formControlRate: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginTop: 5,
  },
  formInputBox: {
    border: '1px solid #001F4D',
    padding: '10px',
    width: '100%',
    height: 32,
    fontSize: 14,
    borderRadius: '2px 0px 0px 2px',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    '&:focus': {
      outline: 'none'
    }
  },
  formInputBoxEther: {
    border: '1px solid #000000',
  },
  formInputBoxBS: {
    color: '#000000d9',
  },
  box: {
    right: 0,
    top: 0,
    width: 'max-content',
    minWidth: 50,
    height: 32,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
    color: '#000000d9',
    border: '1px solid #000000',
    borderLeftWidth: 0,
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRadius: '0px 2px 2px 0px',
    padding: 5
  },
  boxEther: {
    backgroundColor: '#FAFAFA'
  },
  formButton: {
    backgroundColor: '#FFCC00',
    boxShadow: '0px 0px 30px rgba(243, 203, 25, 0.15)',
    borderRadius: 10,
    padding: '14px 0px',
    border: 'none',
    display: 'inline-block',
    width: '100%',
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    marginTop: 25,
    marginBottom: 60,
    cursor: 'pointer',
    transition: '.2s all ease-in',

    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
      transform: 'translateY(-7px)'
    },
    '&:focus': {
      outline: 'none'
    }
  },

  formButtonDeployed: {
    backgroundColor: '#9A9A9A',
    // boxShadow: '0px 0px 30px rgba(243, 203, 25, 0.15)',
    borderRadius: 10,
    padding: '10px 0px',
    border: 'none',
    display: 'inline-block',
    width: '45%',
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    marginTop: 25,
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    cursor: 'not-allowed',

    // transition: '.2s all ease-in',
    // '&:hover': {
    //   boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
    //   transform: 'translateY(-7px)'
    // },
    // '&:focus': {
    //   outline: 'none'
    // }
  },

  formButtonDeploy: {
    backgroundColor: '#001F4D',
    // boxShadow: '0px 0px 30px rgba(243, 203, 25, 0.15)',
    borderRadius: 10,
    padding: '10px 0px',
    border: '1px solid #001F4D',
    display: 'inline-block',
    width: '45%',
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    marginTop: 25,
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    cursor: 'pointer',
    transition: '.2s all ease-in',

    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
      transform: 'translateY(-7px)'
    },
    '&:focus': {
      outline: 'none'
    }
  },

  formButtonUpdatePool: {
    background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
    // boxShadow: '0px 0px 30px rgba(243, 203, 25, 0.15)',
    borderRadius: 10,
    padding: '10px 0px',
    border: 'none',
    display: 'inline-block',
    width: '45%',
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    marginTop: 25,
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    cursor: 'pointer',
    transition: '.2s all ease-in',

    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
      transform: 'translateY(-7px)'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  formDescription : {
    marginTop: 7,
    color: 'blue',
    fontStyle:'italic',
  },

  formErrorMessage: {
    marginTop: 7,
    color: 'red',
  },
  formErrorMessageAbsolute: {
    marginTop: 0
    // position: 'absolute',
    // bottom: '-20px'
  },
  tokenInfo: {
    marginTop: 15,
    padding: '20px 15px',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,

    '& > .tokenInfoBlock': {
      color: '#363636',
      textAlign: 'left'
    },

    '& .tokenInfoLabel': {
      fontSize: 14,
      color: '#636363'
    },

    '& .wordBreak': {
      width: 150,
      maxWidth: 150,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },

    '& .tokenInfoContent': {
      marginTop: 7,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center'
    },

    '& .tokenInfoText': {
      marginLeft: 15
    }
  },
  loadingTokenIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  circularProgress: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  panelUserJoin: {
    padding: '0 5px',
  },
  winnerCautionMessage: {
    color: 'blue',
    marginBottom: 10,
    fontStyle:'italic'
  },
  flexRowStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  bypassRequiredSwitch: {
    marginLeft: 10
  },
  formButtonCreate: {
    marginBottom: 20,
    borderRadius: 10,
    '&:disabled': {
      color: '#00000042',
      background: '#0000001f',
    }
  },
  table: {
    border: '1px solid #000000',
    borderRadius: '10px',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.05)',
  },
  formButtonEdit: {
    background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
    color: 'white',
    '&:disabled': {
      color: '#00000042',
      background: '#0000001f',
    }
  }
}))

export default useStyles
