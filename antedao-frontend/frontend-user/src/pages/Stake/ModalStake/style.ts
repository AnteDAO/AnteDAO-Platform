import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
    return {
        modalStake: {
            width: '424px',
            transformOrigin: '120px 270px',
            boxSizing: 'border-box',
            padding: '0 0 24px',
            color: '#919AAE',
            fontSize: '14px',
            lineHeight: '1.5715',
            listStyle: 'none',
            pointerEvents: 'none',
            position: 'relative',
            top: '200px',
            maxWidth: 'calc(100vw - 32px)',
            margin: '0 auto',
            outline: 'none',
            '& .ant-modal-content': {
                position: 'relative',
                backgroundColor: theme.custom.colors.darkDeepBlack,
                backgroundClip: 'padding-box',
                border: '1px solid #23262F',
                borderRadius: '12px',
                pointerEvents: 'auto',
                '& :focus': {
                    border: 'none'
                },
            },
            '& .img': {
                width: 'auto',
                height: 44,
                margin: 'auto 0',
            },
            '& .ant-modal-body': {
                padding: 30,
                fontSize: '14px',
                lineHeight: '1.5715',
                wordWrap: 'break-word',
                background:"rgba(255, 255, 255, 0.05)",
                [theme.breakpoints.down("sm")]: {
                    padding: '32px 15px 24px'
                  },
            },
            '& .ant-modal-confirm-body-wrapper': {
                padding: 0,
                margin: 0
            },
            '& .ant-modal-confirm-body': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            '& .ant-modal-confirm-title': {
                display: 'flex',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '150%',
                marginTop: 24
            },
            '& .ant-modal-confirm-content': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#777E90',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '150%',
                marginTop: 8,
                textAlign:'center'
            },
            '& .ant-modal-confirm-btns': {
                display: 'flex',
                justifyContent: 'center',
                margin: '24px 0 0'
            },
            '& .btn-1': {
                background: theme.custom.colors.gradientMain,
                borderRadius: '99px',
                color: '#FCFCFD',
                boxShadow: 'none',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '16px',
                padding: '16px 24px',
                width: 175,
                textTransform: "capitalize",
                height:48
            },
            '& .btn-2': {
                background: theme.custom.colors.grey7,
                borderRadius: '99px',
                color: '#FCFCFD',
                boxShadow: 'none',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '16px',
                padding: '16px 24px',
                width: 175,
                textTransform:"capitalize",
                marginLeft: 16,
                height:48
            },
        },
    };
});

export default useStyles;
