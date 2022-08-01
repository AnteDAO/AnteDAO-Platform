import React, { useEffect } from 'react';
//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import AppContainer from "./AppContainer";
import ErrorBoundary from './components/Base/ErrorBoundary';
import PrivateRoute from './components/Base/PrivateRoute';
import AdminCreate from "./pages/AdminList/AdminDetail/AdminCreate";
import AdminEdit from "./pages/AdminList/AdminDetail/AdminEdit";
import AdminList from "./pages/AdminList/AdminList";
import CaptchaWhitelist from "./pages/CaptchaWhitelist";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import ErrorPage from './pages/ErrorPage';
import KycUserCreate from './pages/KycUserList/KycUserDetail/KycUserCreate';
import KycUserEdit from './pages/KycUserList/KycUserDetail/KycUserEdit';
import KycUserList from './pages/KycUserList/KycUserList';
import Login from './pages/Login';
import NetworkChange from './pages/NetworkChange';
import NotFoundPage from './pages/NotFoundPage';
import PoolCreate from "./pages/PoolCreate/PoolCreate";
import PoolEdit from "./pages/PoolCreate/PoolEdit";
import Pools from "./pages/Pools";
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import StakingPoolCreate from "./pages/StakingPoolCreate/PoolCreate";
import StakingPoolEdit from "./pages/StakingPoolCreate/PoolEdit";
import StakingPools from "./pages/StakingPools";
import Tier from './pages/Tier';
import TransactionPending from './pages/TransactionPending';
import UserList from "./pages/UserList";
import { clearAlert } from './store/actions/alert';
import { adminRoute } from "./utils";



/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);
  const { history } = props;

  useEffect(() => {
    const { type, message } = alert;
    if (type && message) {
      NotificationManager[type](message);
    }
  }, [alert]);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(clearAlert());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Switch>
        <Route
          exact path="/"
          render={() => <Redirect to={`${adminRoute()}`} />}
        />
        <PrivateRoute exact path={adminRoute()} component={() => <Redirect to={adminRoute('/campaigns')} />} />
        <PrivateRoute path={adminRoute('/campaigns')} exact component={Pools} />
        <PrivateRoute path={adminRoute('/campaigns/add')} exact component={PoolCreate} />
        <PrivateRoute exact path={adminRoute('campaign-detail/:id')} component={PoolEdit} />
        <PrivateRoute exact path={adminRoute('/campaign-detail/pending/:id')} component={TransactionPending} />

        <PrivateRoute path={adminRoute('/setting')} component={Setting} />
        <PrivateRoute path={adminRoute('/profile')} component={Profile} />

        {/*<Route path={adminRoute('/register')} component={Register} />*/}
        <Route path={adminRoute('/login')} component={Login} />
        <PrivateRoute path={adminRoute('/users')} component={UserList} />
        <PrivateRoute path={adminRoute('/tier')} component={Tier} />

        <PrivateRoute path={adminRoute('/admins')} component={AdminList} />
        <PrivateRoute path={adminRoute('/admin-detail/:id')} component={AdminEdit} />
        <PrivateRoute path={adminRoute('/admin-create')} component={AdminCreate} />
        
        <PrivateRoute path={adminRoute('/kyc-users')} component={KycUserList} />
        <PrivateRoute path={adminRoute('/kyc-user-detail/:id')} component={KycUserEdit} />
        <PrivateRoute path={adminRoute('/kyc-user-create')} component={KycUserCreate} />

        <Route path={adminRoute('/captcha-whitelist')} component={CaptchaWhitelist} />

        <PrivateRoute path={adminRoute('/staking')} exact component={StakingPools} />
        <PrivateRoute path={adminRoute('/staking/add')} exact component={StakingPoolCreate} />
        <PrivateRoute path={adminRoute('/staking/:id')} exact component={StakingPoolEdit} />

        <PrivateRoute path={adminRoute('/network-change')} component={NetworkChange} />
        <PrivateRoute path={('/coming-soon')} component={ComingSoon} />
        <PrivateRoute exact path={adminRoute('/error')} component={ErrorPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
};

const RoutesHistory = withRouter(Routes);

const routing = function createRouting() {
  return (
    <>
      <NotificationContainer />
      <Router>
        <AppContainer>
          <ErrorBoundary>
            <RoutesHistory />
          </ErrorBoundary>
        </AppContainer>
      </Router>
    </>
  );
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
