import { CircularProgress, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Base/Button';
import { alertFailure } from '../../store/actions/alert';
import { connectWallet, login, resetUserState } from '../../store/actions/user';
import { adminRoute } from "../../utils";
import { userAlreadyExists } from '../../utils/user';
import useStyles from './style';
const loginLogo = '/images/landing/logo.svg';

// const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loadingUserExists, setLoadingUserExists] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userExists, setUserExists] = useState(false);
  const [currentPage, setCurrentPage] = useState('walletConnect');
  const { data: ethAddress = '', loading = false } = useSelector((state: any) => state.userConnect);
  const { loading: userRegisterLoading = false, error: errorRegister } = useSelector((state: any) => state.userRegister);
  const { data: loginUser, loading: userLoginLoading, error } = useSelector((state: any) => state.user);

  const { watch, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const password = useRef({});
  password.current = watch("password", "");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderErrorRequired = (errors: any, prop: string) => {
    if (errors[prop]) {
      if (errors[prop].type === "required") {
        return 'This field is required';
      }
    }
  }

  useEffect(() => {
    if (error || errorRegister) {
      dispatch(alertFailure(error || errorRegister));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, errorRegister]);

  useEffect(() => {
    if (ethAddress) {
      setCurrentPage('signIn');
    } else {
      setCurrentPage('walletConnect');
    }
  }, [ethAddress]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (currentPage === 'signIn') {
        setLoadingUserExists(true);

        const userExists = await userAlreadyExists(ethAddress);
        setLoadingUserExists(false);

        setUserExists(userExists);
      } else setUserExists(false);
    };

    ethAddress && checkUserExists();
  }, [currentPage, ethAddress, loginUser]);

  useEffect(() => {
    if (loginUser) {
      props.history.push(adminRoute('/campaigns'));
    }
    return () => {
      error && dispatch(resetUserState());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser, error]);

  const handleFormSubmit = (data: any) => {
    const { passwordLogin } = data;
    dispatch(login(passwordLogin));

    // if (!userExists) {
    //   dispatch(registerAccount(data));
    // } else {
    //   const { passwordLogin } = data;
    //   dispatch(login(passwordLogin));
    // }
  }

  const render = () => {
    if (currentPage === 'walletConnect') {
      return (
        <>
          <div className="login__logo-ether-title">
            Connect Your Wallet
          </div>
          <div className="login__logo-ether">
            <img src="/images/ethereum.jpg" className="logo-ether" alt='' />
            <div className="login__logo-ether-desc">
              <p className="logo__desc--bold">
                Web3 Wallet Detected
              </p>
              <p>
                Connect to continue signing in!
              </p>
            </div>
          </div>
          <Button
            onClick={handleUserLogin}
            label="Connect Wallet"
            loading={loading}
            disabled={loading}
            buttonType="metamask"
            className={`login__button ${currentPage === 'walletConnect' && 'login__button--bold'}`}
          />
        </>
      )
    } else {
      if (loadingUserExists) {
        return (
          <div className="login__user-loading">
            <CircularProgress size={75} thickness={4} value={100} />
            <p className="login__user-loading-text">Loading Ethereum Wallet</p>
          </div>
        );
      } else {
        return (
          <>
            <div className="login__logo-ether-title">
              Wallet Connected
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="login__form">
              <TextField id="standard-secondary" value={ethAddress} label="Current Ethereum Address" color="secondary" className="login__form-field" disabled />

              <p className="login__form-desc login__form-privacy">
                By clicking sign in you indicate that you have read and agree to our Terms of Service and Privacy Policy
              </p>
              {/*<Link className="login__form-desc login__form-forgot-password" to={adminRoute('/register')}>Sign up ?</Link>*/}
              <button disabled={userRegisterLoading || userLoginLoading} type="submit" className="login__form-button">
                Sign in
                {
                  (userRegisterLoading || userLoginLoading) && <CircularProgress size={20} style={{ marginLeft: 10 }} />
                }
              </button>
            </form>
          </>
        )
      }
    }
  }

  const handleUserLogin = () => {
    dispatch(connectWallet());
  };

  return (
    <Container fixed>
      <div className={classes.login}>
        <span className="login__logo">
          <img src={loginLogo} alt="login-logo" />
        </span>
        <div className="login__wrap">
          {
            render()
          }
        </div>
      </div>
    </Container>
  )
};

export default withRouter(Login);
