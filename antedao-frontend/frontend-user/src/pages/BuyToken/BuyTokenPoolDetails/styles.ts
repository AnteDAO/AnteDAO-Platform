import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    sectionBuyTokenPoolDetails: {
      // background: '#303035',
      // borderRadius: 12,
      // padding: '28px 28px',
      // marginBottom: 12,
      // color: '#FFFFFF',
      // fontFamily: theme.custom.typography.fontFamilyDM,

      // [theme?.breakpoints?.down('sm')]: {
      //   padding: '28px 20px',
      // },
    },

    topSection: {
      display: 'flex',
      justifyContent: 'space-between',

      [theme?.breakpoints?.down('sm')]: {
        flexDirection: 'column',
        alignContent: 'center',
      },
    },

    title: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '24px',
      marginBottom: 20,
      textTransform: 'uppercase',

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        marginBottom: 16,
      },
    },

    rightTopSection: {
      display: 'flex',
    },

    itemSocsial: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      marginRight: 10,

      '&:hover': {
        opacity: 0.8
      },
    },

    midSection: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20
    },

    socsialContainer: {
      margin: 'auto',
      marginBottom: 10,
    },

    listContent: {
      width: '50%',
      paddingRight: 10,

      [theme?.breakpoints?.down('sm')]: {
        width: '100%',
        paddingRight: 0,
      },
    },

    itemListContent: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
      marginBottom: 14,
      fontWeight: 500,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '20px',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
      },

      '& a': {
        color: '#FFFFFF',
        wordBreak: 'break-word',
      }
    },

    iconBrank: {
      marginLeft: 10,
      verticalAlign: 'middle'
    },

    nameItemListContent: {
      minWidth: 140,
      marginRight: 12,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.darkGrey,

      [theme?.breakpoints?.down('sm')]: {
        width: 130,
        minWidth: 130,
        fontSize: 14,
        fontWeight: 400,
      },
    },

    titleBot: {
      lineHeight: '20px',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 12,
    },

    botSection: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.darkGrey,
      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
      },
    },

    btnOpenModal: {
      color: theme.custom.colors.secondary,
      textDecoration: 'underline',
      cursor: 'pointer',
    },

    modalTiers: {

      '& .MuiDialog-paper': {
        width: 1200,
        maxWidth: '100%',
        background: '#1F242C',
        borderRadius: '12px',
      }
    },

    headerModal: {
      padding: 30,
      paddingBottom: 0,
      position: 'relative',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 24,
      lineHeight: '150%',
      color: '#FFFFFF',

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 18,
        lineHeight: '150%',
        alignContent: 'center',
        paddingTop: 14,
        paddingLeft: 16,
        paddingRight: 20,
      },
    },

    btnCloseModal: {
      position: 'absolute',
      top: 29,
      right: 29,
      cursor: 'pointer',

      '&:hover': {
        opacity: 0.8
      },
      [theme?.breakpoints?.down('sm')]: {
        top: 18,
        right: 18,
      },
    },

    modalContentTiers: {
      maxWidth: '100%',
    },

    contentModal: {
      padding: 30,
      paddingTop: 0,

      [theme?.breakpoints?.down('sm')]: {
        padding: 20,
        maxHeight: 'calc(100vh - 150px)',
      },
    },

    table: {
      background: '#222228',
      border: '1px solid #37373D',
      borderRadius: 8,
      '& .MuiTableBody-root td': {
        font: 'normal normal normal 14px/24px var(--fontFamily)',
      },
      '& .valueItemTierWeb': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: '150%',
        color: '#919AAE',
        marginBottom: 8,
      },
    },

    tableContainer: {
      maxWidth: '100%',
      width: '100%',
      background: 'transparent',
      color: '#999999',
      marginTop: 20,
      borderRadius: '8px 8px 8px 8px',
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },

      '& th, & td': {
        borderTop: '1px solid #37373D',
        borderBottom: 0,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 16,
        lineHeight: '24px',
        color: '#FFFFFF',
        paddingLeft: 40,
      },

      '& .MuiTableCell-root': {
        borderTop: '1px solid #37373D',
        borderBottom: 0,
      }
    },

    tableHeaderWrapper: {
      backgroundColor: '#12161B',

      '& th': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
        color: '#FFFFFF',
      }
    },
    tableBodyWrapper : {
      backgroundColor: '#171B22',
    },
    tableHeader: {
      color: 'white !important' as any,
      fontWeight: 700,
      fontSize: 14,
      textAlign: 'center',
      '& > span': {
        display: 'inline-block',
      },
      [theme.breakpoints.down('xs')]: {
        '& > span': {
          // width: '120px',
          display: 'inline-block'
        }
      },
      [theme.breakpoints.down('md')]: {
        '& > span': {
          width: '120px',
        }
      },
    },
    boxTierMobile: {
      display: "flex",
      flexDirection: "row",
      justifyContent:'space-between',
      backgroundColor: '#171B22',
      marginBottom: 20,
      borderRadius: 8,
      padding: "24px 16px 10px 16px",
      border: '1px solid #44454B',

      "&:last-child": {
        borderBottom: 0,
      }
    },
    tierAllocation: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between',
      }
    },
    spaceTierAllocation: {
      width: '122px',
      [theme.breakpoints.up('sm')]: {
        width: '0px'
      }
    },
    nameItemTierMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontStyle: 'normal',
      fontSize: 16,
      lineHeight: '150%',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    valueItemTierMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 16,
      fontStyle: 'normal',
      lineHeight: '150%',
      fontWeight: 400,
      color: '#919AAE',
    },

    itemTierMobile: {
      textAlign:'center',
      margin: '0px 30px'
      }
  };
});

export default useStyles;
