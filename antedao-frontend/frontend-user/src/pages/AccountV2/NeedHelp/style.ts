import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    pageNeedHelp: {
      borderRadius: '12px',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.darkGrey,

      [theme.breakpoints.down('sm')]: {
      },
    },

    title: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: '36px',
      color: theme.custom.colors.white02,
      marginBottom: 24,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 40,
      },
    },

    sectionBody: {
      marginBottom: 24,
      display: 'flex',
      alignItems: 'flex-start',

      [theme.breakpoints.down('sm')]: {
        marginBottom: 30,
        '&:last-child': {
          marginBottom: 0,
        }
      },
    },

    sectionBodyQuestions: {
      width: 'calc((389/950)*100%)',
      maxWidth: '100%',

      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },

    iconSectionBody: {
      height: '17px',
      marginRight: 14,
    },

    subTitle: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.white02,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 30,
      }
    },

    des: {

      '& a': {
        color: theme.custom.colors.secondary,
      }
    },

    groupSearch: {
      width: '100%',
      background: '#222228',
      border: '1px solid #44454B',
      borderRadius: 4,
      display: 'flex',
      marginBottom: 20,

      '& input': {
        height: 36,
        width: '100%',
        border: 'none',
        outline: 'none',
        padding: 12,
        background: 'transparent',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '20px',
        color: '#AEAEAE',
      }
    },

    boxQuestions: {
      marginBottom: 12,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 30,
        '&:last-child': {
          marginBottom: 0,
        }
      },
    },

    listGuideQuestions: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',

      '& li:nth-child(2)': {
        '& a': { color: theme.custom.colors.secondary },
      },

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
    },

    listFAQsQuestions: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',

      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
    },

    nameQuestions: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.secondary,
      marginBottom: 12,
    },

    itemQuestions: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.darkGrey,
      marginBottom: 10,
      paddingRight: 5,


      '& a': {
        color: theme.custom.colors.darkGrey,
        textDecorationLine: 'underline',

        '&:hover': {
          color: theme.custom.colors.secondary,
        }
      }
    },
  };
});

export default useStyles;
