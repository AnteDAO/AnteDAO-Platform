import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerRight: {
    display: 'flex',
  },
  tableContainer: { 
    padding: '30px 20px',
    borderRadius: 10,
    boxShadow: 'none',
    marginTop: 25,
    background:'none'
  },
  selectSearch:{
    margin: 20,
  },
  table: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 14,
    // backgroundColor: 'white',
  },
  tableHeader: {
    padding: '0px 0px 25px 30px',
    color: '#001F4D',
    fontWeight: 400
  },
  tableBody: {
    '& > .MuiTableRow-root:last-child': {
      borderBottom: '1px solid #E5E5E5'
    },
    '& > .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: 'white'
    },
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
  exportBtn: {
    padding: '13px 20px',
    background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
    border: 'none',
    borderRadius: 10,
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',

    '&:focus': {
      outline: 'none'
    }
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
    fontFamily: 'Roboto-Medium'
  },
  refreshCampaignsIcon: {
    transition: '.2s all ease-in',
  }
}))

export default useStyles;
