import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useLocation } from "react-router";
import { withRouter } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';

BigNumber.config({ EXPONENTIAL_AT: 50 });
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const AppContainer = (props: any) => {
  const { data: loginUser } = useTypedSelector(state => state.user);
  const { data: loginInvestor } = useTypedSelector(state => state.investor);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  useEffect(() => {
    // onLoginWithoutLoginPage();
  }, [props.location.pathname]);

  useEffect(() => {
    const windowObj = window as any;
    const { ethereum } = windowObj;

    if (ethereum) {

      ethereum.on('accountsChanged', function (accounts: any) {
      });
      ethereum.on('chainChanged', (newNetworkId: string) => {

      });
    }
  }, [loginUser, loginInvestor]);

  return (
    <>
      {props.children}
    </>
  );
};

export default withRouter(AppContainer);
