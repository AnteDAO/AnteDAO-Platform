import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    LotteryWinners: {
      // background: '#303035',
      // borderRadius: 12,
      // padding: '28px 28px',
      // marginBottom: 12,
      // color: '#FFFFFF',
      width: "100%",

      // [theme?.breakpoints?.down('md')]: {
      //   padding: '28px 20px',
      //   width: "100%",
      // },
    },
    p: {
      wordBreak:'break-word',
      fontStyle:'normal',
      fontWeight:400,
      fontFamily:theme.custom.typography.fontFamilyDM,
    },

    title: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '24px',
      marginBottom: 20,

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    title2: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSeight: '500',
      fontSize: 16,
      lineHeight: '24px',
      marginBottom: 6,
    },

    LotteryWinnersDesc: {
      marginTop: 15,
      marginBottom: 16,
      font: 'normal normal normal 14px/24px var(--fontFamily)',
    },

    LotteryWinnersMessage: {
      marginBottom: 16,
      font: 'normal normal normal 14px/24px var(--fontFamily)',
      fontWeight: 'bold',
      fontSize: 15,
      color: '#8db4ff'
    },

    table: {
      '& .MuiTableBody-root td': {
        font: 'normal normal normal 14px/24px var(--fontFamily)',
      }
    },
    infiniteContainer: {
      width: '100%',
      background: '#171B22',
      border: '1px solid #44454B',
      borderRadius: 8,
      height: 273,
      '&::-webkit-scrollbar': {
        width: 10,
        borderRadius: 8,
      },
      '&::-webkit-scrollbar-track:': {
        background: '#f1f1f1',
        borderRadius: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: 8,
      }
    },
    refreshContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: 5,
    },
    refreshText: {
      textAlign: 'center',
      padding: '7px 20px',
      background: '#919AAE',
      borderRadius: 20,
      color: '#12161B',
      fontSize: 14,
    },

    tableContainer: {
      width: '100%',
      background: '#171B22',

      '& th, & td': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '21px',
        color: '#FFFFFF',
        padding: 10,
        '&:last-child .MuiTableCell-root': {
          borderBottom: 0,
        }
      },

      '& th': {
        [theme?.breakpoints?.down('sm')]: {
          fontSize: 14,
          lineHeight: '20px',
        },
      },

      '& .MuiTableCell-root': {
        borderBottom: '1px solid #44454B',
        '&:first-child': {
          textAlign: 'center',
        },
      },
      '& tr:last-child .MuiTableCell-root': {
        borderBottom: 0,
      }
    },

    tableHeaderWrapper: {
      background: '#12161B',
      borderRadius: '8px 8px 0px 0px',
      borderBottom:'1px solid #2C313D',

      '& th': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '24px',
        color: '#FFFFFF',
        padding: 12,
        [theme?.breakpoints?.down('sm')]: {
          fontSize: 14,
          fontFamily: theme.custom.typography.fontFamilyDM,
          fontWeight: 'bold',
        },
      },

      '& tr th:first-child': {
        width: 80,
        textAlign: 'center',
      }
    },
    tableRow: {
      borderBottom:'1px solid #2C313D',
    },

    tableHeader: {
    },

    tableSearchWrapper: {
      maxWidth: '100%',
      position: 'relative',
      background: '#12161B',
      border: '1px solid #44454B',
      borderRadius: 32,

      '& input': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '24px',
        color: '#919AAE',
        height: 40,
        padding: '0 50px 0 20px',
        width: '100%',
        [theme?.breakpoints?.down('sm')]: {
          height: 36,
          fontSize: 10,
          fontWeight:400,
        },
        '&::placeholder': {
          color: '#919AAE',
          fontSize: '14px',
          [theme?.breakpoints?.down('sm')]: {
            fontSize: '10px',
          },
        },
      },
    },

    tableSearchIcon: {
      width: 19.31,
      height: 20,
      position: 'absolute',
      right: 11,
      top: '50%',
      transform: 'translateY(-50%)',
      [theme?.breakpoints?.down('sm')]: {
        width: 16,
      height: 16,
      },
    },

    tableSearch: {
      background: 'transparent',
      padding: '14px 0px 14px 12px',
      border: 'none',
      color: 'white',
      width: '80%',

      '&:focus': {
        outline: 'none',
      },

      '&::placeholder': {
        color: '#999999',
        fontWeight: 400,
        fontSize: 15
      },
    },

    pagination: {
      '& *': {
        color: 'white'
      }
    }
  };
});

export default useStyles;
