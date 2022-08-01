
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
    return {
        loadingContainer: {
            '$ .text_center': {
                display: 'flex',
                justifyContent: 'center',
            },
            '& .circle-loading': {
                display: 'inline-flex',
                animation: 'loading 1s infinite',
                '& .div': {
                    width: '24px',
                    height: '24px',
                    border: '2px solid #8f57ff',
                    borderRadius: '50%',
                    margin: ' 0 5px'
                }

            }
        }
    }

});

export default useStyles;
