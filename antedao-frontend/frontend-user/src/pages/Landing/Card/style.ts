import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    item: {
      "&:not(first-child)": {
        [theme.breakpoints.down("sm")]: {
          margin: 0,
        },
      },
    },
    borderCardImage: {
      position: "relative",
      marginBottom: 15,
      width: "100%",
      minHeight: "214px",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",

      "& img": {
        objectFit: "cover",
      },
    },
    banner: {
      width: "100%",
      height: 190,
      objectFit: "cover",
      borderRadius: 22,
      minHeight: 180,
      maxHeight: 190,
    },
    icon: {
      width: 45,
      height: 45,
      position: "absolute",
      bottom: 0,
      borderRadius: theme.custom.radius.full,
      border: "3.5px solid",
      borderColor: theme.custom.colors.secondaryBg,
    },
    cardTittle: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "24px",
      textAlign: "center",
      color: theme.custom.colors.white,
      display: '-webkit-box',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '-webkitLineClamp': '1', /* số dòng hiển thị */
  	  '-webkitBoxOrient': 'vertical',
    },
    cardContent: {
      fontSize: 12,
      fontWeight: 400,
      textAlign: "center",
      color: theme.custom.colors.white,
      opacity: "0.3",
      marginTop: 10,
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "16px",
      height: 35,
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": "2",
      },
    borderCard: {
      position: "relative",
      borderRadius: "20px",
      border: "none",
      background: "#24232F",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      [theme.breakpoints.down("sm")]: {
        margin: "2px",
        marginRight: 16,
      },
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      borderRadius: "16px",
      background: "#24232F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px 12px 28px",

      [theme.breakpoints.down("sm")]: {},
    },
    tag: {
      backgroundColor: theme.custom.colors.green,
      color: theme.custom.colors.white,
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: 12,
      height: 30,
      borderRadius: theme.custom.radius.small4,
      alignSelf: "flex-start",
      padding: "7px 10px",
      position: "absolute",
      top: 12,
      left: 12,
      "& span": {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
      },
    },
  };
});

export default useStyles;
