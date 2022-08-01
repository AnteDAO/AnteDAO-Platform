import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    tabTierBenefits: {
      marginTop: -10,
    },

    tableContainer: {
      background: '#191920',
      boxShadow: 'none',
    },

    tableCellHead: {
      height: 48,
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
      background: '#191920',
      borderBottom: 'none',
    },

    tableRow: {
      background: '#222228',
    },

    tableCellBody: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
      borderBottom: '1px solid #37373D',
    },

    tierBenefitsMobile: {

    },

    itemTierMobile: {
      marginBottom: 30,
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
    },

    nameTierMobile: {
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'bold',
      marginBottom: 17,
    },

    listActiveTierMobile: {
    },

    valueActiveMobile: {
      display: 'flex',
      alignItems: 'flex-start',
      fontFamily: theme.custom.typography.fontFamilyDM,
      fontWeight: 'normal',
      marginBottom: 6,

      '& img': {
        marginRight: 6,
        marginTop: 4,
      },

      '& span': {
        fontFamily: theme.custom.typography.fontFamilyDM,
        fontWeight: 'bold',
        color: theme.custom.colors.secondary,
      }
    }
  };
});

export default useStyles;
