import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    listPools: {
      width: '100%',
      marginBottom: 32,
      "& .overlay": {
        position: 'absolute',
        zIndex: 2
      },
      "& .list-pool-header": {
        display: "flex",
      },
      "&.listPools2": {
        width: 820,
        maxWidht: "100%",
      },
      "& h3": {
        marginBottom: 50,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: "36px",
        color: "#CA22C6",
      },

      "& h4": {
        marginBottom: 20,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: "36px",
        color: "#FFFFFF",
      },

      "& .pools": {
        display: "Grid",
        gridTemplateColumns: "repeat(3, calc(33% - 9.5px))",
        gap: 20,
        margin: "auto",
        placeContent: "center",

        [theme.breakpoints.down("sm")]: {
          display: "block",
        },
      },

      "& .active_pools": {
        marginTop: 40,
        display: "Grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
        margin: "auto",
        placeContent: "center",

        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      },

      "& .pools_wrap": {
        background: 'transparent',
        borderRadius: '0 0 15px 15px',
        border: '1px solid #24232F',
        overflow: 'auto',
        '& .pools_wrap-scroll': {
          minWidth: 940,

          "& .MuiGrid-item": {
            zIndex: 9,
          }
        }
      },

      "& .btn": {
        height: "42px",
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "18px",
        color: "#FFFFFF",
        border: "none",
        outline: "none",
        padding: "0 27px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "60px",
        backgroundColor: "#D01F36",
        margin: "40px auto 0",
        cursor: "pointer",
      },
    },
    listPoolsHeader: {
      display: 'flex',
      alignItems: 'flex-end',
      marginTop: 60,
      marginBottom: 44,
      justifyContent: 'center',
      flexWrap: 'wrap',

      '&.marginV3': {
        marginBottom: 32,
        [theme?.breakpoints?.down('xs')]: {
          alignItems: 'baseline',
          marginBottom: 30,
          flexDirection: 'row'
        },
      },
      [theme?.breakpoints?.down('xs')]: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column',
        alignItems: 'baseline',
        '& h2': {
          font: 'normal normal 700 18px/27px var(--fontFamily)',
        },
      },
    },
    poolHeaderRight: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      [theme?.breakpoints?.down('xs')]: {
        marginTop : 25,
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 0,
      },
      '&.marginHearderRight' :{
        [theme?.breakpoints?.down('xs')]: {
          marginTop : 0,
        },
      },
    },
   
    listPoolsTitle: {
      font: 'normal normal 700 24px/36px var(--fontFamily)',
      color: '#fff'
    },
    wrapHeadTitle: {
      height: '50px',
      padding: '0 32px',
      background: theme.custom.colors.grey8,
      borderRadius: '15px 15px 0px 0px',
    },
    headTitle: {
      font: 'normal normal 700 16px/24px var(--fontFamily)',
      color: '#fff',
      opacity: '0.5',
    }
  };
});

export default useStyles;
