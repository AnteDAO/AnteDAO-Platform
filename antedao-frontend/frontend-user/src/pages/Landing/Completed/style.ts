import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    list_wrap: {
      color: "#fff",
      borderRadius: 15,
      background: "transparent",
      [theme?.breakpoints?.down("xs")]: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 0,
      },
      "& .wrapHeadTitle": {
        fontSize: 14,
        background: theme.custom.colors.secondaryBg,
        borderRadius: "15px 15px 0 0",
        padding: "15px 32px",

        "& h5": {
          opacity: "0.5",
          fontSize: 14,
        },
        [theme?.breakpoints?.down("xs")]: {
          display: "none",
        },
      },
      "& .wrapBody": {
        borderRadius: "0 0 15px 15px",
        padding: "28px 32px 24px",
        border: "1px solid #24232F",
        [theme?.breakpoints?.down("xs")]: {
          border: "none",
          padding: 0,
        },
        "& .pool_detail": {
          "& .item": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: 27,
            "& .chain-ico": {
              width: 30,
              height: 30,
              objectFit: "cover",
              [theme?.breakpoints?.down("xs")]: {
                marginLeft: "auto",
                marginRight: 0,
              },
            },
            [theme?.breakpoints?.down("xs")]: {
              borderBottom: "none",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              width: "100%",
              margin: "auto",
              paddingBottom: '16px',
            },
            "& .MuiGrid-item": {
              [theme?.breakpoints?.down("xs")]: {
                padding: "16px 0 0",
              }
            }
          },
          "&:last-child": {
            "& .item": {
              borderBottom: 0,
              marginBottom: 0,
            },
          },
          "& .item_info": {
            display: "flex",
            alignSelf: "center",
            color: theme.custom.colors.white,
            fontWeight: 400,
            fontSize: 18,
            paddingBottom: 18,
            "& .img-group" : {
              position: 'relative',
            },
            "& .border_img": {
              width: 45,
              height: 45,
              borderRadius: 9999,
              marginRight: 15,
              objectFit: "cover",
              border:`2px solid violet`
            },
            "& .titles":{
              position: 'absolute',
              right:10,
              bottom:0,
              fontSize:10,
              padding:'3px 2px',
              background:theme.custom.colors.gradientMain,
              borderRadius:'50%'
            },
            "& img": {
              width: 45,
              height: 45,
              borderRadius: 9999,
              marginRight: 15,
              objectFit: "cover",
            },
            "& .name-item": {
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              "& p": {
                paddingRight: 10,
                wordBreak: "break-word",
              },
              "& span": {
                fontSize: 14,
                opacity: "0.5",
                fontWeight: 700,
              },
            },
            [theme?.breakpoints?.down("xs")]: {
              padding: "4px 0",
              fontWeight: 500,
            },
          },
        },
        "& .text_right": {
          textAlign: "right",
          "& .item_info": {
            justifyContent: "flex-end",
          },
        },
      },
    },
    headTit: {
      fontSize: 14,
      borderRadius: "15px 15px 0 0",
      color: theme.custom.colors.white,
      fontWeight: 700,
      opacity: "0.3",
    },
  };
});

export default useStyles;
