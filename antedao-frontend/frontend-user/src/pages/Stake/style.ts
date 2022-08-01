import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    wrapper: {
      modalStake: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.custom.colors.black,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      backgroundImage: "url(/images/background-ante.svg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% auto",
      backgroundPosition: "center",
      color: theme.custom.colors.white,
      fontFamily: theme.custom.typography.fontFamilyDM,
      position: "relative",
      paddingTop: 40,
      paddingBottom: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& .message-container": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        "& .message-body": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 8px",
          background: `${theme.custom.colors.error}15`,
          "& .message": {
            display: "flex",
            color: theme.custom.colors.error,
            fontSize: "14px",
            lineHeight: "150%",
          },
        },
      },
      "& .m-auto": {
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      },
      "& .content": {
        width: "calc((1240 / 1440)* 100%)",
        [theme.breakpoints.down("xs")]: {
          // padding: '20px 24px',
          width: "90%",
        },
        "& .stake-area": {
          background: "rgba(35, 38, 47, 0.15)",
          padding: "40px",
          borderRadius: "16px",
          minHeight: "500px",
          border:`1px solid ${theme.custom.colors.grey8}`,
          [theme.breakpoints.down("xs")]: {
            padding: "10px",
            borderRadius: "12px",
            width: "100%",
          },
          "& .MuiGrid-spacing-xs-4 > .MuiGrid-item": {
            paddingBottom: "0",
          },
        },
        "& .wraper-btn": {
          whiteSpace: "nowrap",
          overflow: "auto",
          paddingBottom: 20,
        },
        "& .wraper-btn-container": {
          marginBottom: 20,
        },
        "& .btn": {
          background: theme.custom.colors.grey8,
          borderColor: theme.custom.colors.grey8,
          borderRadius: theme.custom.radius.full,
          border: "0.5px solid",
          color: "rgba(145, 154, 174, 1)",
          boxShadow: "none",
          marginRight: "1rem",
          cursor: "pointer",
          fontWeight: "700",
          textTransform: "lowercase",
          [theme.breakpoints.down("xs")]: {
            marginRight: ".5rem",
            fontSize: "14px",
          },
          "&:disabled": {
            background: theme.custom.colors.disable,
            color: theme.custom.colors.greyBlue,
            cursor: "not-allowed !important",
            pointerEvents: "unset",
            "&:hover": {
              background: theme.custom.colors.disable,
            },
          },
        },
        "& .btn-active": {
          background: theme.custom.colors.primary,
          borderRadius: theme.custom.radius.full,
          border: "0.5px solid",
          borderColor: theme.custom.colors.primary,
          color: theme.custom.colors.white,
          boxShadow: "none",
          marginRight: "1rem",
          cursor: "pointer",
          fontWeight: "700",
          textTransform: "lowercase",
          outline: "0",
          [theme.breakpoints.down("xs")]: {
            marginRight: ".5rem",
            fontSize: "14px",
          },
          "&:disabled": {
            background: theme.custom.colors.disable,
            color: theme.custom.colors.greyBlue,
            cursor: "not-allowed !important",
            pointerEvents: "unset",
            "&:hover": {
              background: theme.custom.colors.disable,
            },
          },
        },
        "& .card-action": {
          background: "rgba(35, 38, 47, 0.3)",
          borderRadius: theme.custom.radius.small8,
          color: "rgba(145, 154, 174, 1)",
          boxShadow: "none",
          marginBottom: 40,
        },
        "& .title": {
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "150%",
          color:theme.custom.colors.white02,
        },
        "& .description": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.darkGrey,
          marginBottom: 40,
        },
        "& .data-result": {
          height: "610px",
          overflow: "auto",
        },
        "& .item-1": {
          padding: "8px 24px",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
          borderRadius: 30,
          "&.active": {
            background: `${theme.custom.colors.gradientMain} !important`,
            color: theme.custom.colors.white
          },
        },
        "& .item-2": {
          borderRadius: "30px",
          padding: "8px 24px",
          background: "#272E39",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
          "&.active": {
            background: `${theme.custom.colors.gradientMain} !important`,
            color: theme.custom.colors.white
          },
        },
      },
      "& .card-info": {
        background: "rgba(35, 38, 47, 0.3)",
        borderRadius: 4,
        padding: "20px 30px",
        marginBottom: 24,
        borderColor: theme.custom.colors.grey8,
        border: "1px solid",
        [theme.breakpoints.down("sm")]: {
          padding: "16px",
          borderRadius: 5,
        },
        "& .logo": {
          width: "auto",
          height: 32,
          margin: "auto 0",
          [theme.breakpoints.down("sm")]: {
            height: 24,
            display: 'none'
          },
        },
        "& .d-flex": {
          display: "flex",
          justifyContent: "space-between",
        },
        "& .label": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        },
        "& .value": {
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "150%",
          color: "#CA22C6",
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            lineHeight: "170%",
          },
        },
        "& .unit": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
        },
        "& .description-1": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
          margin: "20px 0",
        },
        "& .description-2": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
        },
        "& .divider": {
          borderBottom: "1px solid #23262F",
          margin: "20px 0",
        },
        "& button:disabled": {
          cursor: "not-allowed !important",
          pointerEvents: "unset",
          background: theme.custom.colors.primary,
          opacity: 0.5,
          "&:hover": {
            background: theme.custom.colors.primary,
          },
        },
        "& .btn-unstake": {
          background: theme.custom.colors.primary,
          borderRadius: "99px",
          color: theme.custom.colors.white,
          boxShadow: "none",
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "150%",
          padding: "8px 24px",
          "&.is-loading": {
            padding: "8px 15px !important",
            "& .MuiCircularProgress-root": {
              width: "15px !important",
              height: "15px !important",
              marginRight: "5px",
              color: "unset !important",
            },
          },
        },
        "& .group-1": {
          marginBottom: 12,
        },
        "& .group-2": {
          marginBottom: 12,
        },
        "& .data-group": {
          background: theme.custom.colors.darkLight,
          borderRadius: 16,
          padding: "8px 16px",
          display: "flex",
          flexWrap: "wrap",
          [theme.breakpoints.down("sm")]: {
            padding: "8px 12px",
          },
          "& wrap-input": {
            display: "flex",
          },
        },
      },
      "& .card-action": {
        background: "#272e39",
        borderRadius: 24,
        padding: "24px",
        marginBottom: 24,
        [theme.breakpoints.down("sm")]: {
          padding: "16px",
        },

        "& .wrap-btn-action": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-end",
          },
        },
        "& .d-flex-end": {
          display: "flex",
          justifyContent: "flex-end",
        },
        "& .right": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "90px",
        },
        "& .label": {
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "150%",
          color: theme.custom.colors.white,
        },
        "& .value": {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "150%",
          color: "rgba(145, 154, 174, 1)",
        },
        "& .percent": {
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "130%",
          color:theme.custom.colors.white02,
          [theme.breakpoints.down("sm")]: {
            fontSize: "35px",
          },
        },
        "& .unit": {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "150%",
          color: theme.custom.colors.darkGrey,
          transition: "unset !important",
          transform: "unset !important",
          [theme.breakpoints.down("sm")]: {
            whiteSpace: "nowrap",
            fontSize: "12px",
          },
        },
        "& .description-1": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
          margin: "20px 0",
        },
        "& .description-2": {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "150%",
          color: theme.custom.colors.greyLight,
        },
        "& .divider": {
          borderBottom: "1px solid #23262F",
          margin: "20px 0",
        },
        "& .btn-aprove": {
          background: theme.custom.colors.gradientMain,
          borderRadius: "99px",
          color: theme.custom.colors.white,
          boxShadow: "none",
          fontWeight: 700,
          fontSize: "16px",
          width: 115,
          lineHeight: "150%",
          padding: "16px 24px",
          textTransform: "unset",
          [theme.breakpoints.down("sm")]: {
            fontSize: "13px",
          },
          "&.is-loading:disabled": {
            padding: "16px 24px !important",
            background: theme.custom.colors.gradientMain,
            color: theme.custom.colors.white,
            width: "131px",
            "& .MuiCircularProgress-root": {
              width: "15px !important",
              height: "15px !important",
              marginRight: "5px",
              color: "unset !important",
            },
          },
        },
        "& button:disabled": {
          cursor: "not-allowed !important",
          pointerEvents: "unset",
          background:theme.custom.colors.white02,
          color: theme.custom.colors.grey8,
          opacity: 0.5,
          "&:hover": {
            background:theme.custom.colors.white02,
            color: theme.custom.colors.grey8,
          },
        },
        "& .btn-unstake": {
          background: theme.custom.colors.primary,
          borderRadius: "99px",
          color: theme.custom.colors.white,
          boxShadow: "none",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "150%",
          padding: "16px 24px",
          textTransform: "unset",
          "&.is-loading:disabled": {
            padding: "16px 24px !important",
            background: theme.custom.colors.primary,
            color: theme.custom.colors.white,
            width: "131px",
            "& .MuiCircularProgress-root": {
              width: "20px !important",
              height: "20px !important",
              marginRight: "10px",
              color: "unset !important",
            },
          },
        },
        "& .group-1": {
          marginBottom: 16,
        },
        "& .group-2": {
          marginBottom: 16,
        },
        "& .data-group": {
          background: theme.custom.colors.darkLight,
          borderRadius: theme.custom.radius.small4,
          padding: "12px 16px",
          display: "flex",
          flexWrap: "wrap",
          [theme.breakpoints.down("sm")]: {
            padding: "8px 12px",
          },
          "& .button-group": {
            display: "flex",
            margin: "8px 0",
            "& .btn-unit1": {
              // background: '#272e39',
              background: "transparent",
              padding: "4px 16px",
              borderRadius: "24px",
              color: theme.custom.colors.greyBlue,
              boxShadow: "none",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "150%",
              textAlign: "center",
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
                padding: "4px",
                minWidth: 56,
              },
            },
            "& .btn-unit2": {
              // background: '#272e39',
              background: "transparent",
              padding: "4px 16px",
              borderRadius: "24px",
              color: theme.custom.colors.greyBlue,
              boxShadow: "none",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "150%",
              textAlign: "center",
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
                padding: "4px",
                minWidth: 56,
              },
            },
            "& .btn-unit-active": {
              background: theme.custom.colors.primary,
              padding: "4px 16px",
              borderRadius: "24px",
              color: theme.custom.colors.white,
              boxShadow: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "150%",
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
                padding: "4px",
                minWidth: 56,
              },
            },
          },
          "& .wrap-input": {
            display: "flex",
            justifyContent: "space-between",
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& .stake-label": {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          },
          "& label": {
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "150%",
            maxWidth: "100%",
            flex: "0 0 100%",
            color: theme.custom.colors.greyLight,
            transition: "unset !important",
            transform: "unset !important",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
          "& input": {
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "150%",
            color: theme.custom.colors.white,
          },
          "& ::-webkit-input-placeholder": {
            color: "#ffffff !important",
          },
          "& .MuiInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none",
          },
        },
      },
    },
    textInput: {
      color: "red",
      "&::placeholder": {
        display: "block !important",
        color: "red",
      },
    },
    loaderWrap: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      background: 'rgba(0,0,0,0.7)',
    },
  };
});

export default useStyles;
