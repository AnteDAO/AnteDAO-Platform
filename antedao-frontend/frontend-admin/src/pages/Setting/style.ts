import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    settingPage: {
      '& .has-err > input': {
        borderColor: "#ff4d4f"
      },
      marginLeft: '60px',
      "& .d-flex-1": {
        display: "flex",
        "& input:first-child": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
          fontFamily: 'Roboto-Medium',
          color: "#000",
          border: '1px solid #D9D9D9',
          borderRadius: '2px',
          padding: '5px 8px',
          width: '412px !important',
          background: '#fff',
        },
        '& .MuiFormControlLabel-root': {
          marginLeft: 0
        },
        '& .MuiInputBase-adornedEnd': {
          background: '#FAFAFA',
          boxShadow: 'inset -1px 0px 0px #D9D9D9, inset 0px 1px 0px #D9D9D9, inset 0px -1px 0px #D9D9D9',
          borderRadius: '0px 2px 2px 0px',
        },
        '& .MuiInputAdornment-positionEnd': {
          width: '23px',
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
        },
        '& .sw': {
          height: '100%',
          marginLeft: 48
        }
      },
      "& .d-flex": {
        display: "flex",
        "& input:first-child": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
          fontFamily: 'Roboto-Medium',
          color: "#000",
          border: '1px solid #D9D9D9',
          borderRadius: '2px',
          padding: '5px 8px',
          maxWidth: '100px',
          width: '40px',
          background: '#fff',
        },
        '& .MuiFormControlLabel-root': {
          marginLeft: 0
        },
        '& .MuiInputBase-adornedEnd': {
          background: '#FAFAFA',
          boxShadow: 'inset -1px 0px 0px #D9D9D9, inset 0px 1px 0px #D9D9D9, inset 0px -1px 0px #D9D9D9',
          borderRadius: '0px 2px 2px 0px',
        },
        '& .MuiInputAdornment-positionEnd': {
          width: '23px',
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
        },
        '& .sw': {
          height: '100%',
          marginLeft: 48
        }
      },
      '& form': {
        maxWitdh: '412px',
        '& label + .MuiInput-formControl': {
          marginTop: '29px',
        }
      },
      '& .MuiFormLabel-root:first-child': {
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '18px',
        fontFamily: 'Roboto-Medium',
        color: '#000000',
        transform: 'translate(0, 0) scale(1)'
      },
      '& .label': {
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '25px',
        fontFamily: 'Roboto-Medium',
        color: '#000000',
      },
      "& input:first-child": {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "22px",
        fontFamily: 'Roboto-Medium',
        color: "#000",
        border: '1px solid #D9D9D9',
        borderRadius: '2px',
        padding: '5px 12px',
        width: '412px',
      },
      "& ::-webkit-input-placeholder": {
        color: "#fff !important",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none !important",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none !important",
      },
      '& .btn-update': {
        background: theme.custom.colors.bgButton,
        boxShadow: '0px 2px 4px rgba(138, 146, 166, 0.3)',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '175%',
        border: 'none',
        padding: '8px 24px',
        color: '#FFFFFF',
        marginTop: '16px'
      },
      '& .btn-loading': {
        background: `${theme.custom.colors.bgButton} !important`,
        boxShadow: '0px 2px 4px rgba(138, 146, 166, 0.3)',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: 16,
        minWidth:115,
        height:44,
        lineHeight: '175%',
        border: 'none',
        padding: '8px 24px',
        color: '#FFFFFF',
        marginTop: '16px',
      },
      '& .MuiButtonBase-root.Mui-disabled': {
        background: '#C4C4C4'
      },
      '& .description' : {
       paddingTop:'20px',
        color:'blue',
        fontStyle:'italic'
      }
    },
  }
});

export default useStyles;
