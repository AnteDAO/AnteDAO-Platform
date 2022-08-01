import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    backgroundComponent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: "190px 0 100px",
      height: "750px",
      minHeight: "740px",
      overflow: "hidden",
      backgroundImage: "url(/images/landing/Asset_1.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "auto",
      backgroundPositionY: "110%",
      backgroundPositionX: "right",
      [theme.breakpoints.only("sm")]: {
        height: "auto",
        minHeight: 500,
        padding: "110px 0 100px",
      },
      [theme.breakpoints.only("xs")]: {
        height: "500px",
        minHeight: 300,
      },
      "& > img": {
        width: "100%",
        objectFit: "cover",
        PointerEvent: "none",
      },

      "& .btn": {
        flex: "0 0 280px",
        margin: "8px",
        // height: "42px",
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "18px",
        color: theme.custom.colors.secondary,
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "60px",
        border: `2px solid ${theme.custom.colors.secondary}`,

        "&:hover": {
          cursor: "pointer",
        },

        [theme.breakpoints.down("xs")]: {
          flex: "0 0 42px",
          width: "280px",
        },
      },

      [theme.breakpoints.down("sm")]: {
        "& > img": {
          height: "400px",
        },
      },

      [theme.breakpoints.down("xs")]: {
        padding: "0",
        backgroundSize: "45%",
        backgroundPosition: "115% 30%",
        "& .hidden": {
          display: "none",
        },
      },
      "& .asset_bg": {
        position: "absolute",
        right: "15%",
        top: "2%",
        width: "calc((500 / 1092)* 100%)",
        zIndex: 1,
        PointerEvent: "none",
      },
      "& .asset_sm": {
        position: "absolute",
        right: "35%",
        top: "2%",
        width: "calc((225 / 1092)* 100%)",
        zIndex: 1,
        "pointer-events": "none",
        [theme.breakpoints.down("xs")]: {
          // width: 140,
          zIndex: 2,
          top: "2%",
          right: "20%",
        },
      },
    },
    wrongNetwork: {
      position: "absolute",
      width: "100%",
      height: "44px",
      background: "rgba(208, 31, 54, 0.4)",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      "& .btn-close": {
        position: "absolute",
        top: "10px",
        right: "20px",
        height: "unset",
        padding: "0",
      },

      "& .btn-change-network": {
        background: "none",
        border: "1px solid #FFFFFF",
        borderRadius: "30px",
        height: "28px",
        padding: "0 14px",
      },

      "& p, & p a": {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#FFFFFF",
      },

      "& p a": {
        TextDecoration: "underline",
      },
    },
    mainContent: {
      width: "calc((1240 / 1440)* 100%)",
      margin: "auto",
      overflow: "hidden",
      "& .description": {
        fontWeight: "700",
      },
      "& h1": {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "64px",
        lineHeight: "62px",
        color: theme.custom.colors.white,
        textAlign: "left",
        marginTop: 15,
        zIndex: 999,

        [theme.breakpoints.down("xs")]: {
          fontSize: "40px",
          lineHeight: "48px",
        },
      },
      "& h1 img": {
        [theme.breakpoints.down("xs")]: {
          height: "20px",
        },
      },

      "& p": {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "24px",
        color: "#ffff",
        marginTop: "32px",
        textAlign: "left",

        [theme.breakpoints.down("xs")]: {
          fontSize: "16px",
          lineHeight: "20px",
          marginTop: "12px",
        },
      },

      "& .sub-des": {
        opacity: 0.5,
        fontSize: "18px",
        maxWidth: 700,
        [theme.breakpoints.down("sm")]: {
          fontSize: 14,
        },
      },

      [theme.breakpoints.down("sm")]: {
        margin: "10% 40px",
        width: "calc(100vw - 80px)",
      },

      [theme.breakpoints.down("xs")]: {
        margin: "27% 16px 20px 16px",
        width: "calc(100vw - 40px)",
        "& h1": {
          fontSize: "36px",
          lineHeight: "48px",
        },
      },
    },
    info: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "28px",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        marginTop: "16px",
      },
    },
    infoDetail: {
      padding: "0 32px",

      "&:nth-child(2)": {
        borderLeft: "1px solid #fff2",
        borderRight: "1px solid #fff2",
      },

      "& p": {
        margin: "2px",
      },

      "& p:last-child": {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "24px",
        color: "#FFF",
      },

      [theme.breakpoints.down("xs")]: {
        marginBottom: "12px",
        border: "none !important",
      },
    },
    buttonArea: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      marginTop: "40px",

      "& .btn": {
        maxWidth: 170,
        cursor: "pointer",
        font: "normal normal 500 16px/24px var(--fontFamily)",
        padding: "19px 37.5px",
        borderRadius: "60px",
        background: theme.custom.colors.gradientMain,
        color: theme.custom.colors.white,
        fontWeight: 700,
        height: "48px",
      },
      "& .btn-whitepaper": {
        border: "none",
      },

      "& .btn-launch": {
        marginLeft: 40,
        background: "none",
        borderColor: "#777E90",
        [theme.breakpoints.down("xs")]: {
          marginLeft: 10,
        },
      },

      [theme.breakpoints.down("xs")]: {
        marginTop: "20px",
        flexDirection: "row",
        alignItems: "center",
        "& .btn": {
          maxWidth: "unset",
          minWidth: "155px",
          padding: "16px 20px",
        },
        "& .btn-crowdloan": {
          marginTop: "16px",
        },
      },
    },
  };
});

export default useStyles;
