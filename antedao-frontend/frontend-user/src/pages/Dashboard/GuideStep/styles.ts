import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
    return {
        guideStep: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px 0 0",
            backgroundColor: "transparent",
            cursor: 'pointer',
            '& h2': {
                font: 'normal normal 700 24px/36px var(--fontFamily)',
                color:  `${theme.custom.colors.white02}!important`,
                zIndex: '1',

                [theme.breakpoints.only('xs')]: {
                    font: 'normal normal 700 18px/27px var(--fontFamily)',
                    textAlign: 'center',
                    width: '80%',
                    xsInline: {
                        display: 'inline',
                    }
                },
            },
            // [theme.breakpoints.only('xs')]: {
            //     padding: "0",
            // },
        },
        xsInline: {
            display: 'none',
            [theme.breakpoints.only('xs')]: {
                display: 'inline',
            },
        },
        step: {
            width: 'calc((820 / 1440)*100%)',
            marginTop: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '& .wrap-circle-step': {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                [theme.breakpoints.only('xs')]: {
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }
            },
            [theme.breakpoints.only('xs')]: {
                height: '400px',
                marginTop: '30px',
            }
        },
        shapeStep: {
            height: '2px',
            width: '20%',
            position: 'relative',
            top: '-30px',
            background: 'linear-gradient(90deg, #CA22C6 100%, #FD849C 100%)',
            zIndex: 1,
            [theme.breakpoints.down('sm')]: {
                top: '-2px',
                width: '2px',
                left: '67px',
                height: '50px',
            },
        },
        circleStep: {
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
            top: '-5px',
            whiteSpace: 'nowrap',
            width: '70px',
            height: '76px',

            '& .circle': {
                // postion : 'rel'
                width: '76px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: 'normal normal 700 30px/39px var(--fontFamily)',

                '& .step-icon': {
                    width: '76px',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    '& img': {
                        width: '100%',
                    },

                    [theme.breakpoints.only('xs')]: {
                        width: '48px',
                        height: '48px',
                        top: 'auto',
                    },
                    [theme.breakpoints.only('md')]: {
                        width: '52px',
                        height: '52px',
                    },
                },

                '& .step-number': {
                    zIndex: 9,
                    font: 'normal normal 700 24px/36px var(--fontFamily)',
                },
            },
            '& .step-name': {
                font: 'normal normal 700 18px/24px var(--fontFamily)',
                marginTop: '18px',
                color: '#B1B5C3',
                letterSpacing: '-0.25px',
                [theme.breakpoints.only('xs')]: {
                    marginTop: '0px',
                    marginLeft: '16px'
                },

            },

            [theme.breakpoints.only('xs')]: {
                flexDirection: 'row',
                top: '0px',
                left: 30,
                width: '100%',
                justifyContent: 'start',
                height: '48px',
            }
        },
    };
});

export default useStyles;
