import { makeStyles } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme: any) => {
  return {
    listPools: {
      position: "relative",
      margin: "auto",
      width: "100%",
      marginBottom: 50,
      "& .list-pool-header": {
        display: "flex",
        [theme.breakpoints.only("xs")]: {
          marginBottom: "24px",
          marginTop: "60px",
          alignItems: "center",
        },
      },
      "&.listPools2": {
        width: 820,
        maxWidht: "100%",
      },

      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginBottom: 20,
      },

      "& h2": {
        marginBottom: 50,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 48,
        lineHeight: "56px",
        color: theme.custom.colors.white,
        [theme.breakpoints.down("xs")]: {
          font: "normal normal 700 24px/32px var(--fontFamily)",
          marginBottom: 0,
        },
      },

      "& h3": {
        marginBottom: 20,
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: "36px",
        color: "#FFFFFF",
      },

      "& .pools": {
        position: "relative",
        [theme.breakpoints.down("xs")]: {
          width: "calc(100vw - 20px)",
          margin: "auto"
        },
        '& .slick-list': {
          '& .slick-track': {
            marginLeft: 'inherit',
          },

          [theme.breakpoints.down("xs")]: {
            // width: "calc(100vw - 100px) !important",
            padding: "0 30px 0 0 !important",
          },
        },
        "& .slick-arrow": {
          "&:before": {
            content: "''",
            width: 30,
            height: 30,
            display: "inline-block",
            backgroundRepeat: "no-repeat",
            border: "2px solid #fff",
            borderRadius: 999,
            backgroundPosition: "center",
            backgroundSize: "auto",
          },
          [theme.breakpoints.down("sm")]: {
            top: "-10%",
            width: 30,
            height: 30,
          },
        },
        "& .slick-next": {
          "&:before": {
            backgroundImage: "url(/images/right-icon.svg)",
          },
          [theme.breakpoints.down("sm")]: {
            right: "5%",
          },
        },
        "& .slick-prev": {
          left: -55,
          "&:before": {
            backgroundImage: "url(/images/left-icon.svg)",
          },
          [theme.breakpoints.down("sm")]: {
            left: "auto",
            right: 60,
          },
        },
        [theme.breakpoints.down("xs")]: {
          width: "calc(100vw - 20px)",
          margin: "auto",
        },
      },

      "& .active_pools": {
        marginTop: 10,
        display: "Grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
        margin: "auto",
        placeContent: "center",

        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      },

      "& .pools_completed_sales": {},

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
      "& .mySwiper": {
        "& .swiper": {
          width: "100%",
          height: "100%",
        },
        "& .swiper-slide": {},
      },
    },
    cardUpcoming: {
      padding: "12px",
      "& .cardHeader": {
        borderRadius: 22,
        "& img": {
          borderRadius: 12,
        },
      },
    },
  };
});

export default useStyles;
