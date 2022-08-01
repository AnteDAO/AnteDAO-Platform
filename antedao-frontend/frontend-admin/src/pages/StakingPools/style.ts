import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme:any) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin:'50px 0px 10px 0px'
  },
  headerRight: {
    display: 'flex',
  },
  tableContainer: {
    padding: '30px 20px',
    borderRadius: 10,
  },
  table: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    backgroundColor: 'white',
  },
  tableHeader: {
    color: '#000000',
    fontWeight: 400,
    fontSize: 18,
    fontFamily:'Roboto-Medium',
    '&:last-child': {
      textAlign:'center',
    },
    '&:nth-child(2),&:nth-child(3)': {
      textAlign:'center',
    }
  },
  tableBody: {
    '& > .MuiTableRow-root:last-child': {
      borderBottom: '1px solid #E5E5E5'
    },
    '& > .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: 'white'
    },
  },
  inputTable : {
    maxWidth: 90,
    border: '1px solid #ddd6d6',
    borderRadius:'2px 0px 0px 2px',
    height: 32,
    padding: '5px 10px',
    textAlign:'right',
    '&:focus': {
      outline: 'none',
    }
  },
  flexInput : {
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  token : {
    fontSize: 14,
    fontWeight:400,
    color: 'rgba(0, 0, 0, 0.85)',
    fontStyle:'normal',
    textAlign:'center',
    padding: '5px 10px',
    borderRadius:'0px 2px 2px 0px',
    border:'1px solid #ddd6d6',
    borderLeft:'none',
    background: '#FAFAFA',
  },
  swicthButton : {
    textAlign:'center',
  },
  buttonUpdate : {
    background: theme.custom.colors.bgButton,
    color:'white',
  },
  buttonLoading : {
    minWidth:90,
    height: 36,
  },
  pagination: {
    display:'flex',
    justifyContent:'flex-end',
    marginTop: 30,
    fontSize: 12,
    fontWeight: 400,
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#001F4D',
      color:'white',
    }
  },
  skeleton: {
    padding: '25px 0px',
    marginTop: 10
  },
  noDataMessage: {
    fontWeight: 500,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15
  },
  errorMessage: {
    fontWeight: 500,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15,
    color: 'red'
  },
  refreshCampaigns: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  refreshCampaignsContainer: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',

    '&:hover .refreshCampaignsIcon': {
      transform: 'rotateZ(180deg)',
      fill: '#FFCC00'
    }
  },
  refreshCampaignsText: {
    marginLeft: 10,
    fontWeight: 500,
    fontSize: 15,
    transition: '.2s all ease-in',
    fontFamily: 'Roboto-Medium',
    marginTop: 13,
  },
  refreshCampaignsIcon: {
    transition: '.2s all ease-in',
  },
  fontDescription : {
    marginTop:"10px",
    fontStyle:"italic",
    color:'blue',
  },
  textMessage: {
    color:'red',
    fontSize: 12,
    fontStyle:'italic'
  }
}))

export default useStyles;
