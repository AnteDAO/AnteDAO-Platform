import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalWhitelistCancel: {

      '& .MuiDialog-paper': {
        width: 424,
        background: '#1F242C',
        borderRadius: 12,
        color: '#FFFFFF',
      }
    },

    headModalWhitelistCancel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      padding: '32px 22px 0px 22px',
      textAlign: 'center',
    },

    btnColseModal: {
      position: 'absolute',
      top: 12,
      right: 14,
      minWidth: 'auto',
      padding: 0,
      background: 'transparent',
      boxShadow: 'none',
      borderRadius: '50%',
    },

    iconModal: {
      width: 40,
      height: 40,
    },

    titleModal: {
      marginTop: 20,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: '27px',
      textAlign: 'center',
    },

    comtentModalWhitelistCancel: {
      padding: '12px 50px',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      textAlign: 'center',
      color: theme.custom.colors.darkGrey,
    },

    footerModalWhitelistCancel: {
      padding: '0px 30px 30px 30px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: 12,

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },

      '& button': {
        marginLeft: 0,
        height: 42,
        background: theme.custom.colors.gradientMain,
        borderRadius: 60,
        boxShadow: 'none',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
        textAlign: 'center',
        color: '#FFFFFF',
        textTransform: 'inherit',

        '&:hover': {
          background: '#3232DC',
        }
      },

      '& button:last-child': {
        marginLeft: 0,
        background: '#12161B',

        '&:hover': {
          background: '#727272',
        }
      },
    },
  };
});

export default useStyles;
