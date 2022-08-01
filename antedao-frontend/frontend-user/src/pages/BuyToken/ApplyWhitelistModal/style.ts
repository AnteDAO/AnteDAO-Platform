import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        background: '#020616',
        padding: 60,
        maxWidth: 540,
        width: 540,
        textAlign: 'center',

        [theme?.breakpoints?.down('sm')]: {
          padding: '30px 20px',
        },
      },
    },
    socialDialog: {
      '& .MuiPaper-root': {
        fontFamily:theme.custom.typography.fontFamilyDM,
        background:" #1B1B1D",
        fontSize: '16px',
        padding: '30px 45px',
        borderRadius: '12px',
        maxWidth: '1030px',
        minHeight: '517px',
        [theme.breakpoints.down('md')]: {
          padding: '30px 20px',
        },

        '& .socialForm': {
          '& > .row': {
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('md')]: {
              flexDirection: 'row',
              '& > * + *': {
                '--tw-space-x-reverse': 0,
                marginRight: 'calc(1rem * var(--tw-space-x-reverse))',
                marginLeft: 'calc(1rem * calc(1 - var(--tw-space-x-reverse)))',
              },
            },
          },

          '& .input-group': {
            display: 'block',
            width: '100%',

            '& .label': {
              fontWeight: 700,
              color: theme.custom.colors.grey7,
              textTransform:"uppercase",
              fontSize: 12,
              lineHeight: '12px',
              margin: '24px 0 12px 8px'
            },

            '& input': {
              width: '100%',
              height: '48px',
              padding: '8px 16px 8px 24px',
              color: theme.custom.colors.grey6,
              border: `2px solid ${theme.custom.colors.grey8}`,
              background:"transparent",
              boxSizing: 'border-box',
              borderRadius: '12px',
            },

            '& input:placehoder':{
              color: theme.custom.colors.grey6,
            },

            '& input[type="text"]:disabled': {
              color: '#AEAEAE'
            },
          },
        }
      },
      '& .MuiDialogContent-root': {
        overflow: 'visible',
        [theme.breakpoints.up('md')]: {
        },
        [theme.breakpoints.down('md')]: {
          padding: '0',
        },
      },

      '& .MuiDialogActions-root': {
        paddingTop: '24px',
        paddingRight: 0,
        marginTop: '0',
        borderTop: '1px solid #2C313D',

        [theme.breakpoints.down('md')]: {
          '& button': {
            width: '100%'
          }
        },
      },

      [theme.breakpoints.down('md')]: {
        '& .MuiPaper-root': {
          margin: '10px'
        },

        '& .MuiDialog-paperFullWidth': {
          width: 'calc(100% - 24px)'
        }
      }
    },
    socialStep: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
      },
      position: 'relative',
      '& p': {
        marginBlockStart: 0,
        marginBlockEnd: '12px',
      }
    },
    table:{
      display: "flex",
      marginTop: ".75rem",
      border: `1px solid  ${theme.custom.colors.grey8}`,
      borderRadius: "8px",
    },
    socialStepNunber: {
      height: '1.5rem',
      width: '1.5rem',
      borderRadius: '50%',
      backgroundColor: '#222228',
      display: 'flex',
      position: 'absolute',
      left: '-2.5rem',
      [theme.breakpoints.down('md')]: {
        position: 'relative',
        left: '0',
        marginRight: '.5rem',
      },
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '.75rem',
      lineHeight: '.75rem',
      minWidth: '24px'
    },
    socialFollowTable: {
      [theme.breakpoints.up('sm')]: {
        tableLayout: 'fixed',
      },
      fontFamily:theme.custom.typography.fontFamilyDM,
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px',
      lineHeight: '21px',
      borderRadius: '8px',
      color: theme.custom.colors.grey6,
      overflow: 'hidden',

      '& thead': {
        backgroundColor: '#24232F',
        textAlign: 'left',
        borderRadius: '8px 8px 0px 0px',
        height: '48px',
        lineHeight: '23.8px',
        color: theme.custom.colors.white02

      },
      '& tbody': {
        borderRadius: '0px 0px 8px 8px',
        '& tr:first-child': {
          borderBottom: '1px solid #23262F',
          borderTop: '1px solid #23262F'
        }
      },
      '& th': {
        padding: '.7rem',
        [theme.breakpoints.up('md')]: {
          padding: '0 1rem',
        },

        '& span': {
          lineHeight: '24px',
          verticalAlign: 'top'
        }
      },
      '& td': {
        height: '44px',
        padding: '.7rem .5rem',
        [theme.breakpoints.up('md')]: {
          padding: '0 1rem',
        },

        '& svg': {
          marginLeft: '.3rem',

          [theme.breakpoints.up('sm')]: {
            marginLeft: 'auto',
          },
          verticalAlign: 'text-bottom'
        }
      },
      '& > tr > td + td': {
        paddingLeft: '4rem'
      },
      '& .flex-cell': {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
          justifyContent: 'flex-end'
        },
      }
    },
    socialAnchorlink: {
      color: theme.custom.colors.tertiary,
      '&:hover': {
        textDecoration: 'underline',
        color: `${theme.custom.colors.tertiary}80`,
      },
    },
    iconToken: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      marginRight: 12,
      objectFit:"cover"
    },
    dialogLabel: {
      font: 'normal normal normal 12px/18px var(--fontFamily)',
      textAlign: 'left',
    },
    dialogContentTypo: {
      color: 'white',
      fontSize: 16,
      marginTop: 40,
      fontWeight: 700,

      '&:first-child': {
        marginTop: 0
      }
    },
    dialogContentBlock: {
      marginTop: 20,
    },
    dialogTitle: {
      '&#customized-dialog-title':{
        background:theme.custom.colors.darkDeepBlack,
     
      },
      '& .MuiTypography-h5': {
        font: 'normal normal 700 24px/32px var(--fontFamily)',
      },
      '& .MuiTypography-h6': {
        paddingBottom: 16,
        font: 'normal normal bold 18px/24px var(--fontFamily)',
      },

      '& .MuiSvgIcon-root': {
        margin: '18px',
      }
    },
    dialogPrivacy: {
      display: 'flex',
      alignItems: 'center'
    },
    dialogPrivacyText: {
      fontSize: 16
    },
    dialogPrivacyHighlight: {
      color: '#3C5EA2'
    },
    dialogCheckbox: {
      padding: 0,
      marginRight: 8,

      '& .MuiSvgIcon-root': {
        fill: 'white'
      }
    },
    dialogNetworks: {
      display: 'flex'
    },
    dialogInput: {
      width: '100%',
      padding: '8px 15px',
      marginTop: 15,
      background: '#11152A',
      borderRadius: 4,
      border: 'none',
      color: 'white',
      font: 'normal normal normal 14px/24px var(--fontFamily)',

      '&:focus': {
        outline: 'none',
        color: 'white'
      }
    },
    dialogButton: {
      marginTop: 25,
      display: 'flex',
      width: '100%',
      background: '#3232DC',
      borderRadius: 60,
      padding: '0',
      color: 'white',
      border: 'none',
      font: 'normal normal bold 14px/18px var(--fontFamily)',
      cursor: 'pointer',
      transition: '.2s all ease-out',
      height: '42px',
      alignItems: 'center',
      justifyContent: 'center',

      '&:focus': {
        outline: 'none'
      },

      '&:hover': {
        opacity: .8,
        color: 'white'
      },

      '&:active': {
        transform: 'translateY(-3px)'
      },
    },
    error: {
      color: '#ec0c29',
      marginTop: 8,
      display: 'block',
      marginLeft: 4,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5
    },
    footerButton:{
      height:48,
      minWidth:174,
      padding: "8px 24px",
      background:theme.custom.colors.gradientMain,
      color:theme.custom.colors.white02,
      font: `normal normal bold 14px/18px ${theme.custom.typography.fontFamilyDM}`,
    },
    close:{
      background:theme.custom.colors.grey8,
    }
  };
});

export default useStyles;
