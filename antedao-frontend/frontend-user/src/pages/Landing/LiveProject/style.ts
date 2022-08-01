import { makeStyles } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const useStyles = makeStyles((theme: any) => {
  return {
    liveProject: {
      margin: "auto",
      width: "100%",
      position: "relative",
      color: theme.custom.colors.white,
      [theme.breakpoints.down("sm")]: {
        marginBottom: "92px",
        width: "calc((352 / 375)* 100%)",
        display: "flex",
        flexDirection: "column",
        "& > div": {
          textAlign: "center",
          marginBottom: "30px",
        },
        "& .slick-slide": {
          padding: 16,
          border: "1px solid",
          borderColor: theme.custom.colors.grey8,
          borderRadius: theme.custom.radius.medium24,
        },
      },
      "& .p-10": {
        padding: 8,
      },
      "& .title": {
        fontSize: 48,
        fontWeight: 700,
        marginBottom: 25,
        [theme.breakpoints.down("sm")]: {
          marginBottom: 24,
          fontSize: 24,
          textAlign: "left",
        },
      },
      "& img": {
        height: "40px",
        width: "40px",
        [theme.breakpoints.down("sm")]: {
          borderRadius: 16,
        },
      },
    },

    info: {
      width: "100%",
      marginLeft: -6,
      "& > div": {
        font: "normal normal 600 36px/46.8px var(--fontFamily)",
        marginBottom: "32px",
        color: "white",
        [theme.breakpoints.down("sm")]: {
          font: "normal normal 700 24px/36px var(--fontFamily)",
          marginBottom: "20px",
        },
      },

      "& img": {
        width: "100%",
        // height: "100%",
        borderRadius: 20,
        height: 550,
        [theme.breakpoints.down("sm")]: {
          maxHeight: 270,
          objectFit: "cover",
        },
      },
    },
    container: {
      padding: "0 10px",
      color: theme.custom.colors.white,
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
      "& .container": {
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
          // width: "calc(100vw - 20px)",
          width: "100%",
          margin: "auto",
        },
        "& .slick-arrow": {
          zIndex: 1,
          top: "auto",
          "&:before": {
            content: "''",
            width: 40,
            height: 40,
            display: "inline-block",
            backgroundRepeat: "no-repeat",
            border: "2px solid #fff",
            borderRadius: 999,
            backgroundPosition: "center",
            backgroundSize: "auto",
          },
          [theme.breakpoints.only("sm")]: {
            top: "auto",
          },
          [theme.breakpoints.only("md")]: {
            top: "110%",
          },
          [theme.breakpoints.down("xs")]: {
            top: "105%",
          },
        },
        "& .slick-next": {
          right: "30%",
          bottom: 80,
          [theme.breakpoints.down("lg")]: {
            bottom: 80,
          },
          [theme.breakpoints.down("md")]: {
            top: "auto",
            right: "27%",
          },

          "&:before": {
            backgroundImage: "url(/images/right-icon.svg)",
          },
          [theme.breakpoints.down("sm")]: {
            right: "45%",
          },
        },
        "& .slick-prev": {
          right: "35%",
          bottom: 80,
          left: "auto",
          "&:before": {
            backgroundImage: "url(/images/left-icon.svg)",
          },
          [theme.breakpoints.down("sm")]: {
            left: "35%",
          },
          [theme.breakpoints.down("lg")]: {
            top: "100%",
            right: "60%",
            left: "auto",
          },
          [theme.breakpoints.down("lg")]: {
            bottom: 80,
          },
        },
        "& .active_pools": {
          width: "100%",
        },
      },
      "& .content": {
        alignItems: "center",
        "& .network": {
          borderRadius: 9999,
        },
        "& .project_info": {
          marginTop: -70,
          "& > div": {
            marginLeft: "auto",
            width: "90%",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          },
          [theme.breakpoints.only("md")]: {
            marginTop: 10,
          },
          [theme.breakpoints.down("sm")]: {
            marginTop: 10,
          },
        },
      },
      "& .title-project": {
        fontWeight: 700,
        fontSize: 40,
        marginBottom: 12,
        textAlign: "left",
        textOverflow: "ellipsis",
        "white-space": "nowrap",
        "overflow": "hidden",
        [theme.breakpoints.down("sm")]: {
          fontSize: 32,
        },
      },
      "& .project-type": {
        fontWeight: 500,
        fontSize: 14,
        opacity: 0.5,
        textAlign: "left",
      },
      "& .project-name": {
        fontWeight: 700,
        fontSize: 16,
        textAlign: "left",
      },
      "& network": {
        width: 40,
        height: 40,
        marginRight: 12,
        borderRadius: theme.custom.radius.full,
      },
      "& .btn-join": {
        background: theme.custom.colors.gradientMain,
        fontSize: 16,
        fontWeight: 700,
        border: 0,
        borderRadius: theme.custom.radius.full,
        width: "100%",
        padding: "16px 24px",
        height: 54,
        display: "block",
        textAlign: "center",
        marginTop: 35,
        color: theme.custom.colors.white,

        [theme.breakpoints.down("sm")]: {
          height: 48,
        },
      },
    },
    tag: {
      backgroundColor: theme.custom.colors.green,
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: 12,
      height: 30,
      borderRadius: theme.custom.radius.small4,
      alignSelf: "center",
      padding: "7px 10px",
      float: "right",
      position: "relative",
      right: -10,
      [theme.breakpoints.down("sm")]: {
        right: -10,
      },
      "& span": {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
      },
    },
    countdown: {
      textAlign: "center",
      marginTop: 20,
      borderRadius: theme.custom.radius.medium24,
      backgroundColor: theme.custom.colors.secondaryBg,
      boxShadow: "0px 64px 64px -48px rgba(31, 47, 70, 0.12)",
      padding: "25px 32px",
      "& .countdown-item": {
        paddingTop: "12px !important",
      },
      "& p": {
        color: theme.custom.colors.secondary,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
      },
      "& svg": {
        display: "none",
      },
    },
    timer_item: {
      paddingTop: "12px !important",
      justifyContent: "space-between",
      color: theme.custom.colors.white,
      '& div[aria-label*="Countdown timer"]': {
        width: "100px !important",
        height: "72px !important",
      },
      [theme.breakpoints.down("sm")]: {
        '& div[aria-label*="Countdown timer"]': {
          width: "40px !important",
        },
        fontSize: 32,
      },
    },
    timer_number: {
      fontWeight: 700,
      fontSize: 40,
      [theme.breakpoints.down("md")]: {
        fontSize: 32,
      },
    },
    timer_text: {
      opacity: "0.3",
      fontSize: 14,
      fontWeight: 500,
      textTransform: "capitalize",
    },
    border: {
      width: 2,
      height: 27,
      background: "#373B47",
      borderRadius: theme.custom.radius.small,
    },
    tooltip: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "24px",
      color: "#FFFFFF",
      padding: "5px 10px",
    },
  };
});

export default useStyles;
