import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableUserJoin: {
    minHeight: 300,
  },
  middleColumn: {
    width: 60,
  },
  smallColumn: {
    width: 60,
  },
  errorMessage: {
    fontWeight: 500,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15,
    color: 'red'
  },
  noDataMessage: {
    fontWeight: 500,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 15
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
    fontSize: 12,
    fontWeight: 400,
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: '#001F4D',
      color: 'white',
    }
  },
  status: {
    display: 'inline-block',
    width: 'max-content',
    minWidth: 123,
    padding: '6px 16px',
    textAlign: 'center',
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    letterSpacing: '0.02857em',
    '&.complete': {
      backgroundColor: '#00C608',
    },
    '&.pending': {
      backgroundColor: '#DF7800',
    }
  }
});

export default useStyles
