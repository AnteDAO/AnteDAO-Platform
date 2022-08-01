import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        background: '#1F242C',
        padding: 30,
        maxWidth: 900,
        width:640
      },
      '& .MuiDialogContent-root':{
        padding:0
      }
    },
    // dialogContentBlock:{
    //   '&:not(:first-child)':{
    //     marginTop:24
    //   }
    // },
    dialogContentTypo: {
      color: 'white',
      marginTop: 24,
      font: 'normal normal 700 14px/24px var(--fontFamily)',
      '&:first-child': {
        marginTop: 0
      }
    },
    dialogTitle: {
      background: 'transparent !important',
      '& .MuiTypography-h6': {
        font: 'normal normal 700 18px/27px var(--fontFamily)',
        textAlign:'center',
     
      },

      '& .MuiSvgIcon-root': {
        fontSize: '1rem'
      }
    },
    dialogPrivacy: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom:24,
      borderBottom:'1px solid #2C313D'
    },
    dialogPrivacyText: {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 16,
        lineHeight: '24px',
        color: '#919AAE',
    },
    dialogPrivacyHighlight: {
      color: '#CA22C6',
      fontWeight: 'normal',

      '&:hover': {
        color: '#4767af',
        textDecoration: 'underline',
      }
    },
    dialogCheckbox: {
      padding: 0,
      marginRight: 8,

      '& .MuiSvgIcon-root': {
        fill: 'white'
      }
    },
    dialogNetworks: {
      display: 'grid',
      gap:16,
      gridTemplateColumns:'1fr 1fr 1fr'
    },
    [theme.breakpoints.down('xs')]: {
      dialog: {
        '& .MuiPaper-root': {
          background: '#1F242C',
          margin: '16px',
          padding:16,
          maxWidth: '100%',
          width: '100%',
        },
      },
      dialogContentBlock: {
   
        '& .MuiPaper-root': {
          padding: '20px 0'
        }
      },
      dialogPrivacy: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 0,
      }
    }
  };
});

export default useStyles;
