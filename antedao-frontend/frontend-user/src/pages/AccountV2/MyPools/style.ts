import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    pageMyPools: {
      borderRadius: theme.custom.radius.small8,

      [theme.breakpoints.down('sm')]: {
        padding: '0',
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
        fontWeight: 700,
        marginBottom: 40,
      },
    },

    des: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.darkGrey,
      fontWeight: 400,
    },

    listDes: {
      fontWeight: 400,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '21px',
      color: theme.custom.colors.darkGrey,
      listStyle: 'disc',
      paddingLeft: 25,
      marginTop:10,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 27,
      },
    },

    headTable: {
      margin: '24px 0',
      display: 'flex',
      justifyContent: 'space-between',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        margin: '20px 0 30px 0',
      },
    },

    leftFillter: {

      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
        display: 'flex',
        justifyContent: 'space-between',
      },
    },

    formControlSelect: {
      maxWidth: '100%',
      border: '2px solid #2C313D',
      borderRadius: theme.custom.radius.small12,
      marginRight: 8,

      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        height: '36px',
      },
    },

    selectBox: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      fontWeight:400,
      lineHeight: '20px',
      color: theme.custom.colors.greyBlue,
      height: 44,
      width: 160,

      '&::before, &::after': {
        display: 'none',
      },

      '& select': {
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        height: 22,
      },

      '& .MuiSelect-select option': {
        backgroundColor: '#222228',
      },

      '& .MuiSelect-icon': {
        color: theme.custom.colors.darkGrey,
        fontSize: 20,
        top: 'calc(50% - 10px)',
        right: 4,
      }
    },

    groupSearch: {
      width: '100%',
      maxWidth: 320,
      border: '2px solid #2C313D',
      borderRadius: theme.custom.radius.small12,
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      height: 48,

      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        height: 36,
      },

      '& img': {
        width: 17,
        height: 17,
        margin: '0 9px',
      },

      '& input': {
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        marginLeft:10,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 16,
        lineHeight: '20px',
        color: theme.custom.colors.darkGrey,
        '&::placeholder': {
          color: theme.custom.colors.greyBlue,
        }
      }
    },

    tableContainer: {
      background: theme.custom.colors.grey8,
      boxShadow: 'none',
      border: '1px solid #2C313D',
      borderRadius:  theme.custom.radius.small8,
    },

    tableCellHead: {
      whiteSpace: 'nowrap',
      height: 44,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.grey6,
      borderBottom: 'none',
    },

    tableCellBody: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.darkGrey,
      borderTop: '1px solid #2C313D',
      borderBottom: 'none',
      verticalAlign: 'middle',
      padding:'20px 16px',

      '& .status_pool': {
        whiteSpace: 'nowrap',
      },
      '& .canceled-whitelist': {
        color: '#D01F36',
      },
      '& .applied-whitelist': {
        color: '#A855F7',
      },
      '& .win-whitelist': {
        color: '#2ADF9E',
      },
      '& .not-win-whitelist': {
        color: theme.custom.colors.darkGrey,
      },
      '& .swapping': {
        color: theme.custom.colors.darkGrey,
      },
      '& .filled': {
        color: '#FFD058',
      },
      '& .claimable': {
        color: '#FFD058',
      },
      '& .completed': {
        color: theme.custom.colors.darkGrey,
      },
      '& .none': {
        color: theme.custom.colors.white02,
      },
    },

    nameToken: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      color: theme.custom.colors.white02,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '200px'
    },

    toDetailPool: {
      color: theme.custom.colors.white02,
      display: 'flex',
      alignItems: 'center',

      '&:hover': {
        opacity: 0.85
      }
    },

    iconToken: {
      position: 'relative',
      marginRight: 6,
      width: 24,
      height: 24,
      borderRadius: '50%',
    },

    boxDataMobile: {
      padding: '20px 20px',
      background: '#171B22',
      borderRadius: theme.custom.radius.small8,
      marginBottom: 20,
      [theme.breakpoints.down('sm')]: {
        padding: '31px 16px',
      },
    },

    iconTokenMobile: {
      width: 25,
      height: 25,
      marginRight: 8,
      borderRadius: '50%',
    },

    nameTokenMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.white02,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxWidth: '150px',
    },

    infoMobile: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    nameMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '24px',
      color: theme.custom.colors.white02,
      marginBottom: 12,
    },

    valueMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      color: theme.custom.colors.darkGrey,
      fontWidth: '400',
      marginBottom: 30,
      '& .status_pool': {
        whiteSpace: 'nowrap',
      },
      '& .canceled-whitelist': {
        color: '#D01F36',
      },
      '& .applied-whitelist': {
        color: '#A855F7',
      },
      '& .win-whitelist': {
        color: '#2ADF9E',
      },
      '& .not-win-whitelist': {
        color: theme.custom.colors.darkGrey,
      },
      '& .swapping': {
        color: theme.custom.colors.darkGrey,
      },
      '& .filled': {
        color: '#FFD058',
      },
      '& .claimable': {
        color: '#FFD058',
      },
      '& .completed': {
        color: theme.custom.colors.darkGrey,
      },
      '& .none': {
        color: theme.custom.colors.white02,
      },
    },

    pagination: {
      '& *': {
        color: 'white',
      },
      '& ul li .Mui-selected':{
        background: theme.custom.colors.gradientMain,
        border:'none'
      }
    },

    btnAction: {
      background: '#ebebeb',
      borderRadius:theme.custom.radius.medium30,
      minWidth: 140,
      height: 32,
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '23.8px',
      textAlign: 'center',
      color: theme.custom.colors.white02,
      textTransform: 'inherit',

      '&.btnCancelWhitelist': {
        background: theme.custom.colors.error,
        cursor: 'pointer',
      },

      '&.btnPreOrder': {
        background: '#FF9330',
        color: '#090B1C',
        cursor: 'pointer',
      },

      '&.btnClaimToken': {
        background: theme.custom.colors.warning,
        cursor: 'pointer',
      },

      '&:disabled': {
        opacity: 0.5,
      }
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.custom.colors.white02,
    },
    empty: {
      color: theme.custom.colors.white02,
      padding: 30,
      textAlign: 'center'
    }

  };
});

export default useStyles;
