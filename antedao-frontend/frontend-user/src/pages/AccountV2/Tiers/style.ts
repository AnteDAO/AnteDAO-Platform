import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    tierTitle: {
      fontWeight: 700,
      fontSize: 24,
      lineHeight: '36px',
      color: theme.custom.colors.white02,

      [theme.breakpoints.down('sm')]: {
        fontWeight: 700,
        marginBottom: 30,
      },
    },

    listInfo: {
      height: '95px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      textAlign: 'center',
      borderRadius: theme.custom.radius.small8,
      background: theme.custom.colors.grey8,
      margin: '24px 0 43px 0',
      '& li:nth-child(2)': {
        borderRight: '1px solid rgb(255 255 255 / 10%)',
        borderLeft: '1px solid rgb(255 255 255 / 10%)',
      }
      ,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '85px',
        margin: 0,
        gridTemplateColumns: '1fr 1fr 1.2fr',
      },
    },

    itemInfo: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      height: '50px',
      marginTop: '18px',
      padding: '0 7px',

      [theme.breakpoints.down('sm')]: {
        height: 37,
      },
    },

    nameItemInfo: {
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.white02,
      fontWeight: 400,
      marginBottom: '6px',
      [theme.breakpoints.down('sm')]: {
        fontWeight: 400,
        fontSize: '11px',
        LineHeight: '16.5px',
        textAlign: 'center',
        marginBottom: 0,
      },
    },

    valueItemInfo: {
      fontSize: 24,
      lineHeight: '36px',
      minHeight: 24,
      color: theme.custom.colors.secondary,
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      wordBreak: 'break-word',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        fontWeight: 700,
        fontSize: '14px',
        LineHeight: '23.8px',
        textAlign: 'center',
      },
    },

    iconUserTier: {
      height: 20,
      marginRight: 5,
    },

    message: {
      background: 'rgb(255 255 255 / 10%)',
      borderRadius: theme.custom.radius.small8,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.white02,
      padding: '11px 12px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 35,

      [theme.breakpoints.down('sm')]: {
        padding: '12px 20px',
        marginBottom: 30,
      },

      '& img': {
        marginRight: 6,

        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }
    },

    menuTier: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      listStyle: 'none',
      borderBottom: '1px solid rgb(255 255 255 / 10%)',

      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
    },

    itemTabMyTier: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      color: '#AEAEAE',
      padding: '8px 20px',
      marginBottom: -3,
      cursor: 'pointer',
      position: 'relative',

      [theme.breakpoints.down('sm')]: {
        padding: '8px 0px',
      },

      '&:after': {
        content: '""',
        background: 'transperent',
        borderRadius: theme.custom.radius.medium,
        display: 'block',
        width: '100%',
        height: 4,
        position: 'absolute',
        bottom: 0,
        left: 0,
      },

      '&.active': {
        color: theme.custom.colors.secondary,
        cursor: 'inherit',

        '&:after': {
          background: theme.custom.colors.secondary,
        },
      }
    },

    tierComponent: {
      transition: '1s',
      color: theme.custom.colors.darkGrey,
      borderRadius: theme.custom.radius.small8,
      minHeight: '450px',
      fontSize: 16,
      '&.inactive': {
        opacity: 0,
      },
      '&.active': {
        opacity: 1,
      },
      '&.bg-none': {
        background: 'none',
        padding: '0',
      }
    },

    bodyPage: {
      borderBottom: '1px solid #2C313D',
      marginBottom: '24px',
      width: '92%',
      marginLeft: '40px',

      [theme.breakpoints.down('sm')]: {
        paddingBottom: 0,
        marginLeft: 0,
        width: '100%',
      },
    },

    btnHow: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
      background: '#444449',
      border: '1px solid #58585A',
      borderRadius: theme.custom.radius.small8,
      minHeight: 46,
      padding: '10px 16px',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '18px',
      color: theme.custom.colors.white02,
      cursor: 'pointer',

      '&:hover': {
        color: theme.custom.colors.white02,
        opacity: 0.85,
        textDecoration: 'inherit',
      }
    },

    iconBtnHow: {
      marginRight: 8,
    },

    iconArrowRight: {
      marginLeft: 'auto',
    },

    btnStake: {
      minWidth: 175,
      borderRadius: theme.custom.radius.full,
      height: 48,
      background: theme.custom.colors.gradientMain,
      fontSize: 16,
      color: theme.custom.colors.white02,
      padding: '18px 25px',
      textTransform: 'capitalize',
      marginBottom:40,
      [theme.breakpoints.down('sm')]: {
        height: 43,
        fontWeight: 500,
        width: '100%',
        margin: 'auto',
      },

      '&:hover': {
        background:  theme.custom.colors.gradientMain,
        opacity: 0.6,
        transition: '0.5s',
      },

      '&.inactive': {
        pointerEvents: 'none',
        border: 'none',
        background:  theme.custom.colors.greyLight,
        color: theme.custom.colors.white02,
      },
      '&.notStake': {
        [theme.breakpoints.down('sm')]: {
          width: '50%',
          margin: '12px 0',
        }
      },
    },
    noneKYC: {
      display: 'flex',
      justifyContent: ' space-between',
      alignItems: 'center',
      margin: '30px 0px',
      color: theme.custom.colors.darkGrey,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },

    },
    showMore: {
      fontSize: '14px',
      margin: '24px 25px',

      listStyleType: 'unset',
      lineHeight: '21px',

      '& li': {
        marginBottom: '16px',
        '& a': {
          color: theme.custom.colors.white02,
        }
      }
    }
  };
});

export default useStyles;
