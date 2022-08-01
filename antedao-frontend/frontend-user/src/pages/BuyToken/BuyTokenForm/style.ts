import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    currencyName: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '24px',
      color:  theme.custom.colors.secondary,
    },

    btnGroup: {
      marginTop: 20,
      paddingTop: 12,
      borderTop: '1px solid #44454B',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 12,

      '&>div>button': {
        height: 42,
        width: '100%',
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '24px',
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 60,
      },

      '&>div.swap-btn>button': {
        background: `${theme.custom.colors.gradientMain} !important`,
      },

      '&>.swap-btn>button:disabled': {
        background: `${theme.custom.colors.grey8} !important`,
        color: theme.custom.colors.grey6,
        cursor: 'not-allowed',
      },

      '&>div.approve-btn>button': {
        background: `${ theme.custom.colors.gradientMain} !important`,
      },

      '&>div.approve-btn>button:disabled': {
        background:  `${theme.custom.colors.grey8} !important`,
        color: theme.custom.colors.grey6,
        cursor: 'not-allowed',
      },

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 12,
        paddingTop: 32,
        gridTemplateColumns: '1fr',

        '&>div.approve-button>button': {
          marginBottom: 12,
        },
      },
    },

    buyTokenForm: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      background: theme.custom.colors.darkLightBg,
      borderRadius: 16,
      padding: '30px 40px 40px',
      marginTop: 24,
      color: theme.custom.colors.white02,
      [theme?.breakpoints?.down('sm')]: {
        padding: '30px 16px',
      },
    },
    buyTokenFormIner:{
      display: 'grid',
      gridColumnGap: 40,
      gridTemplateColumns: '1fr 1fr',
      [theme?.breakpoints?.down('sm')]: {
        gridTemplateColumns: '1fr',
        
      },
    },

    leftBuyTokenForm: {

    },

    rightBuyTokenForm: {
      wordBreak: 'break-word',
    },

    listStep: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    step: {
      width: 'calc(50% - 2.5px)',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '24px',
      color:  theme.custom.colors.grey6,
      paddingBottom: 8,
      textAlign: 'center',
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'center',
      position:'relative',
      '& img': {
        marginRight: 9,
      },
      '&:after':{
        content:"''",
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor:'#272E39',
        height:8,
        width:'100%'
      },
      '&:first-child::after':{
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
      },
      '&:last-child::after':{
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
      },

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 25,
        marginBottom: 28,
        fontSize: 14,
        lineHeight: '18px',
        paddingBottom: 12,
      },
    },

    stepOneActive: {
      color: theme.custom.colors.secondary,
      fontWeight: 700,
      '&::after':{
        left:0,
        background: theme.custom.colors.gradientMainReverse,
      },
    },

    stepTwoActive: {
      color: theme.custom.colors.secondary,
      fontWeight: 700,
      '&::after':{
        right:0,
        background: theme.custom.colors.gradientMainReverse,
      },
    },

    activeDisableStep1: {
      color:  theme.custom.colors.secondary,
      fontWeight: 700,
      opacity: 0.5,
      '&::after':{
        left:0,
        background: theme.custom.colors.gradientMainReverse,
      },
    },

    title: {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '32px',
      marginBottom: 24,

    },

    title2: {
      marginBottom: 4,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      color:  theme.custom.colors.grey6,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    buyTokenFormTitle: {
      marginTop: 10,
      lineHeight: '24px',
      color: '#AEAEAE',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 500,
      fontSize: 16,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '20px',
        marginTop: 0,
      },
    },

    buyTokenInputForm: {
      background: theme.custom.colors.darkLightBg,
      border: `2px solid ${ theme.custom.colors.grey8}`,
      maxWidth: '100%',
      padding: ' 8px 8px 8px 16px',
      borderRadius: 12,
    },

    buyTokenInputWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: '18px',

      [theme?.breakpoints?.down('sm')]: {
        display: 'grid',
        gridTemplateColumns:' 1fr 125px',
      },

      '& span': {
        fontWeight: 'bold'
      },

    },

    buyTokenInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color:  theme.custom.colors.white02,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      flex:1,

      '&:focus': {
        outline: 'none'
      },

      '&::placeholder': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontSize: 14,
        lineHeight: '210px',
        color:  theme.custom.colors.grey6,
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },

    buyTokenInputLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#999999',
      font: 'normal normal normal 12px/18px var(--fontFamily)',
    },

    buyTokenFee: {
      color: '#999999',
      marginTop: 10,
      font: 'normal normal normal 12px/18px var(--fontFamily)',
    },

    buyTokenEstimate: {
      marginTop: 20,

      [theme.breakpoints.down('sm')]: {
        marginTop: 24,
      },
    },

    buyTokenEstimateLabel: {
      font: 'normal normal bold 14px/18px var(--fontFamily)',
    },

    buyTokenEstimateAmount: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 18,
      lineHeight: '27px',
      color:  theme.custom.colors.secondary,
      marginTop: 4,
    },

    [theme.breakpoints.down('xs')]: {
      btnGroup: {}
    },

    poolErrorBuyWarning: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      marginTop: 25,
      fontWeight: 'bold',
      color: '#fff100',
      fontSize: 15
    },

    poolErrorBuy: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      marginTop: 25,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#D01F36'
    },

    purchasableCurrency: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: theme.custom.colors.grey6,
    },

    purchasableCurrencyIcon: {
      width: 30,
      height: 30,
      marginRight: 7
    },

    purchasableCurrencyMax: {
      background:  theme.custom.colors.primary,
      borderRadius: 24,
      minWidth: 61,
      height: 32,
      border: 'none',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginLeft: 13,

      '&:hover': {
        opacity: '.9'
      },

      '&:focus': {
        outline: 'none'
      },

      '&:active': {
        transform: 'translateY(-3px)'
      }
    },

    approveWarning: {
      marginTop: 16,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',

      [theme.breakpoints.down('sm')]: {
        marginTop: 32,
      },
    },

    allowcationWrap: {
      marginBottom: 14,
      fontFamily: theme.custom.typography.fontFamilyDM,
      color: theme.custom.colors.white02,
      fontSize: 14,
      lineHeight: '20px',
      display: 'grid',
      gridColumnGap: 12,
      gridTemplateColumns: 'minmax(140px, 155px) 1fr',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'minmax(140px, 140px) 1fr',
      },
    },

    allowcationTitle: {
     font:'normal normal 400 14px/21px var(--fontFamily)',
     color: theme.custom.colors.grey6
    },

    allowcationContent: {
    },
    captchaContainer: {
      margin: "auto",
      marginTop: 10,
      marginBottom: -10,
      width: "fit-content",
      textAlign: "center"
    }
  };
});

export default useStyles;
