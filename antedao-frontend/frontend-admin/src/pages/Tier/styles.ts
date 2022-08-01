import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

    tierTitle: {
        fontWeight: 400,
        fontSize: 18,
        fontFamily:'Roboto-Medium',
        color: '#000000',
    },
    fromTable: {
        paddingTop: '20px'
    },
    tierFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tierFlexEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '40px',
        textAlign: 'center',
        lineHeight: '40px',
    },
    tierInput: {
        border: '1px solid #D9D9D9',
        borderRadius: '2px 0px 0px 2px',
        width: 100,
        fontSixe: '14px',
        textAlign: 'right',
        padding: '0px 10px',
        '&:focus': {
            outline: 'none'
        },
        '&.error': {
            borderColor: 'red'
        },
    },
    tierSBX: {
        border: '1px solid #D9D9D9',
        borderRadius: '0px 2px 2px 0px',
        borderLeft: 'none',
        padding: '0px 20px',
        fontWeight: 500,
        fontSixe: '14px',
        background: '#FAFAFA',
    },
    tierButton: {
        padding: '13px 20px',
        background: 'linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)',
        border: 'none',
        borderRadius: 10,
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',

        '&:focus': {
            outline: 'none'
        },
        '&:disabled': {
            background: '#C4C4C4',
        }
    },
    titleSBX: {
        borderLeft: '1px solid black',
    },
    formErrorMessage: {
        color: 'red',
        marginTop: 10
    },
    skeleton: {
        padding: '25px 0px',
        marginTop: 10
    },
    errorMessage: {
        fontWeight: 500,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 15,
        color: 'red'
    },

}));
export default useStyles;