import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    space: {
      marginTop: 170,
      width: "calc((1240 / 1440) * 100%)",
      maxWidth: "calc(100vw - 100px)",
      margin: "auto",
      [theme.breakpoints.down("sm")]: {
        marginTop: 20,
        width: "calc((345 / 375) * 100%)",
        maxWidth: "calc(100vw - 10px)",
      },
    },
    info: {
      "& > div": {
        marginBottom: "32px",
        [theme.breakpoints.down("sm")]: {
          font: "normal normal 700 24px/36px var(--fontFamily)",
          marginBottom: "20px",
        },
      },
      "& a": {
        background: theme.custom.colors.gradientMain,
        borderRadius: "60px",
        padding: "18px 70px",
        color: "white",
        minWidth: 255,
        fontSize: 16,
        fontWeight: 700,
        [theme.breakpoints.down("sm")]: {
          width: 220,
        },
      },
      "& .slogan": {
        fontSize: 64,
        color: theme.custom.colors.white,
        fontWeight: 700,
        marginBottom: 50,
        [theme.breakpoints.down("sm")]: {
          fontSize: 40,
          lineHeight: "48px",
        },
        "& b": {
          background: "-webkit-linear-gradient(#FD849C, #6901FC)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      },
    },

    upcoming: {
      margin: "170px auto",
      "& .container": {
        width: "calc(100% + 30px)",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        }
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "100px",
        width: "100%",
        marginTop: "100px",
      },
    },

    cardContainer2: {
      margin: "108px 0 130px 0",
      width: "100%",
      paddingBottom: "42%",
      background:
        "linear-gradient(270deg, #12161B 0%, rgba(18, 22, 27, 0) 100%)",
      position: "relative",
      "& img": {
        width: "100%",
        height: "100%",
      },
      "& > div": {
        position: "absolute",
        width: "99%",
        height: "100%",
      },
      "& .content": {
        marginTop: "217px",
        [theme.breakpoints.down("sm")]: {
          marginTop: "40px",
          textAlign: "left",
        },
      },
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "58%",
        margin: "80px 0",
      },
    },

    cardContainer3: {
      margin: "170px auto",
      marginBottom: "150px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "92px",
        width: "calc((356 / 375)* 100%)",
      },
      "& .title_wrap": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& .title": {
        color: "#fff",
        font: "normal normal 700 48px/46.8px var(--fontFamily)",
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
          width: "calc((342 / 375)* 100%)",
          font: "normal normal 700 24px/36px var(--fontFamily)",
          marginBottom: 30,
        },
      },
      "& .search": {
        [theme?.breakpoints?.down("xs")]: {
          display: "flex",
          width: "100%",
          marginBottom: 25,
        },
      },
    },

    card4Border: {
      position: "relative",
      marginBottom: 200,
      [theme.breakpoints.down("sm")]: {
        marginBottom: "60px",
      },
    },

    cardContainer4: {
      height: "100%",
      borderRadius: 16,
      justifyContent: "space-between",
      alignItems: "center",
      margin: "auto",
      backgroundImage: "url(/images/landing/banner_2.png)",
      backgroundPosition: "center -100px",
      backgroundRepeat: "no-repeat",
      paddingTop: 100,
      [theme.breakpoints.down("sm")]: {
        width: "calc((342 / 375)* 100%)",
        marginLeft: "12px",
        backgroundSize: "contain",
        backgroundPosition: "center -50px",
      },

      "& img": {
        position: "absolute",
        left: "50%",
        [theme.breakpoints.down("sm")]: {
          borderRadius: 16,
        },
      },

      "& > div": {
        position: "relative",
        textAlign: "center",
        "& > div": {
          [theme.breakpoints.down("sm")]: {
            font: "normal normal 700 18px/27px var(--fontFamily)",
            marginBottom: "25px",
          },
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "19px",
          marginBottom: "17px",
          "& a": { padding: "14px 52px" },
        },
      },
    },
    lasquare: {
      margin: "auto",
      marginBottom: 130,
      [theme.breakpoints.down("sm")]: {
        width: "calc((342 / 375)* 100%)",
        marginBottom: 80,
        marginTop: 110,
      },
      "& .lasquare_info": {
        textAlign: "center",
        margin: "auto",
        color: theme.custom.colors.white,
      },
      "& .title": {
        fontSize: 48,
        fontWeight: 700,
        marginBottom: 25,
        [theme.breakpoints.down("sm")]: {
          marginBottom: 16,
          fontSize: 24,
        },
      },
      "& .description": {
        fontSize: 16,
        fontWeight: 400,
        opacity: "0.5",
        width: 840,
        margin: "auto",
        marginBottom: 50,
        [theme.breakpoints.down("sm")]: {
          marginBottom: 32,
          width: "100%",
          fontSize: 12,
        },
      },
      "& .left": {
        paddingRight: 20,
        "& > div:last-child": {
          width: "100%",
          maxWidth: "100%",
          flexBasis: "100%",
          maxHeight: 355,
          objectFit: "contain",
        },
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          maxWidth: "100%",
        },
      },
      "& .right": {
        paddingLeft: 20,
        "& > div:first-child": {
          width: "100%",
          maxHeight: 355,
          objectFit: "contain",
          maxWidth: "100%",
          flexBasis: "100%",
        },
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          maxWidth: "100%",
          display: "none",
        },
      },

      "& .item_lasquare": {
        position: "relative",
        borderRadius: "10px",
        height: "100%",
        "&:before": {
          content: '""',
          position: "absolute",
          zIndex: 2,
          left: 0,
          bottom: 0,
          borderRadius: "0 0 9px 9px",
          right: 0,
          width: "100%",
          height: "33%",
          background:
            "linear-gradient(180deg, rgba(9, 9, 9, 0) 0%, #141416 100%)",
          [theme.breakpoints.down("sm")]: {
            left: 0,
          },
        },

        [theme.breakpoints.down("sm")]: {
          maxWidth: "calc(100vw - 48px)",
          margin: 0,

          "&:before": {
            width: "100%",
          },

          "&:after": {
            width: "100%",
          },
        },

        "& .name": {
          position: "absolute",
          bottom: 30,
          left: 30,
          color: theme.custom.colors.white,
          fontSize: 18,
          fontWeight: 700,
          zIndex: 4,
          [theme.breakpoints.down("sm")]: {
            fontSize: 14,
            left: 13,
          }
        },
      },
      "& img": {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        objectFit: "contain",
      },
      "& .view_more": {
        textAlign: "center",
        marginTop: 60,
        "& .btn-view": {
          width: 160,
          background: "transparent",
          padding: "19px 44px",
          textAlign: "center",
          border: "2px solid #777E90",
          borderRadius: 90,
          color: theme.custom.colors.white,
          fontSize: 16,
          fontWeight: 700,
          [theme.breakpoints.down("sm")]: {
            width: 144,
            padding: "11px 30px",
          },
        },
      },
      "& .hidden": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
      "& .center_align": {
        justifyContent: "center",
      }
    },
  };
});

export default useStyles;
