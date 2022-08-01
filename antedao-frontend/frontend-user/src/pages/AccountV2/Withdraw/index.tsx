import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import {withdraw, getWithdrawFee, getUserInfo, getUserInfoLegacy} from '../../../store/actions/sota-tiers';
import {useWeb3React} from '@web3-react/core';
import BigNumber from 'bignumber.js';
import {numberWithCommas} from '../../../utils/formatNumber';
import NumberFormat from 'react-number-format';
import {Dialog, DialogContent, DialogActions, CircularProgress} from '@material-ui/core';
import {sotaTiersActions} from "../../../store/constants/sota-tiers";
import useTokenDetails from "../../../hooks/useTokenDetails";
import useUserTier from "../../../hooks/useUserTier";
import ModalTransaction from "../ModalTransaction";
import ButtonLink from "../../../components/Base/ButtonLink";
import DefaultLayout from "../../../components/Layout/DefaultLayout";
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from '../../../constants/network'


const closeIcon = '/images/icons/close.svg';
const iconWarning = "/images/warning-red.svg";
const REGEX_NUMBER = /^-?[0-9]{0,}[.]{0,1}[0-9]{0,6}$/;

const TOKEN_ADDRESS = process.env.REACT_APP_ANTE || '';



const Withdraw = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyle();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [disableWithdraw, setDisableWithdraw] = useState(true);

  const {tokenDetails: tokenSBXDetails} = useTokenDetails(TOKEN_ADDRESS, 'eth');

  const [listTokenDetails, setListTokenDetails] = useState([]) as any;
  const [openModalTransactionSubmitting, setOpenModalTransactionSubmitting] = useState(false)
  const [transactionHashes, setTransactionHashes] = useState([]) as any;

  const { data: withdrawTransaction, error: withdrawError } = useSelector((state: any) => state.withdraw);
  const {data: userInfo = {}} = useSelector((state: any) => state.userInfoLegacy);
  const {account: connectedAccount, library} = useWeb3React();
  const {data: appChainID} = useSelector((state: any) => state.appNetwork);

  const [currentToken, setCurrentToken] = useState(undefined) as any;
  const [currentStaked, setCurrentStaked] = useState('0');
  // const [currentRate, setCurrentRate] = useState(0);

  const {total} = useUserTier(connectedAccount || '', 'eth');

  const setDefaultToken = () => {
    if(!currentToken) {
      setCurrentToken(listTokenDetails[0])
      setCurrentStaked(userInfo.sbxStaked)
      // setCurrentRate(1)
    } else if (currentToken.symbol === 'ANTE') {
      setCurrentStaked(userInfo.sbxStaked)
    }
  }

  useEffect(() => {
    if(connectedAccount) {
      dispatch(getUserInfo(connectedAccount));
      dispatch(getUserInfoLegacy(connectedAccount));
    }
  }, [connectedAccount, dispatch]);

  useEffect(() => {
    if(withdrawTransaction?.hash) {
      setTransactionHashes([...transactionHashes, {tnx: withdrawTransaction.hash, isApprove: false}]);
      setOpenModalTransactionSubmitting(false);
      dispatch({
        type: sotaTiersActions.WITHDRAW_SUCCESS,
        payload: undefined,
      });
    }
    if(withdrawError.message) setOpenModalTransactionSubmitting(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawTransaction, withdrawError])

  useEffect(() => {
    setListTokenDetails([tokenSBXDetails]);
  }, [tokenSBXDetails, ]);

  useEffect(() => {
    setDefaultToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, listTokenDetails])

  const onWithDraw = () => {
    if (disableWithdraw) return
    dispatch(withdraw(connectedAccount, withdrawAmount, library, currentToken.address));
    setOpenModalTransactionSubmitting(true);
    setWithdrawAmount('');
    setDefaultToken();
  }

  const handleClose = () => {
    setWithdrawAmount('');
    setDefaultToken();
  }

  useEffect(() => {
    if (withdrawAmount === '' || withdrawAmount === '0') {
      setDisableWithdraw(true)
      return
    }
    if (!connectedAccount) return
    if (!isNaN(parseFloat(currentStaked))
      && !isNaN(parseFloat(withdrawAmount))) {
      const staked = new BigNumber(currentStaked).multipliedBy(new BigNumber(10).pow(18))
      const amount = new BigNumber(withdrawAmount).multipliedBy(new BigNumber(10).pow(18))
      const zero = new BigNumber('0')
      setDisableWithdraw(staked.lt(amount) || amount.lte(zero));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, userInfo, withdrawAmount, currentToken]);

  useEffect(() => {
    dispatch(getWithdrawFee(connectedAccount, withdrawAmount === '' ? '0' : withdrawAmount));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawAmount])

  // useEffect(() => {
  //   if (listTokenDetails.length == 0 || rates.length == 0 || !currentToken) return
  //   if (currentToken?.symbol == listTokenDetails?.[0]?.symbol) {
  //     setCurrentRate(1)
  //   } else if (currentToken?.symbol == listTokenDetails[1]?.symbol) {
  //     setCurrentRate(parseFloat(rates?.data?.[0]?.rate))
  //   } else if (currentToken?.symbol == listTokenDetails[2]?.symbol) {
  //     setCurrentRate(parseFloat(rates?.data?.[1]?.rate))
  //   }
  // }, [rates, currentToken, listTokenDetails])

  const handleSelectToken = (e: any) => {
    const tokens = listTokenDetails.filter((tokenDetails: any) => {
      return tokenDetails.symbol === e.target.value
    })

    if (!tokens || !tokens.length) return

    setCurrentToken(tokens[0])
    if (e.target.value === 'ANTE') {
      setCurrentStaked(userInfo.sbxStaked)
    } 
  }
  const handleChange = (e: any) => {
    const value = e.target.value.replaceAll(",", "")
    if (value === '' || REGEX_NUMBER.test(value)) {
      setWithdrawAmount(value);
    }
  }

  return (
    <DefaultLayout>
      <div className={styles.modalWithdraw}>
        {appChainID.appChainID !== POLYGON_CHAIN_ID && <div className={styles.message}>
          <img src={iconWarning} style={{ marginRight: "12px" }} alt="" />
          Please switch to the POLYGON network to Unstake.
        </div>}
        <div className="modal-content">
          <div id="alert-dialog-slide-title" className="modal-content__head">
            <h2 className="title">You
              have <span>{numberWithCommas(total)} Points</span> staked</h2>
          </div>
          <div className="modal-content__body">
            <select name="select_token" id="select-token" onChange={(e) => handleSelectToken(e)}>
              {listTokenDetails && listTokenDetails.map((tokenDetails: any, index: number) => {
                return <option value={tokenDetails?.symbol} key={index}>{
                  index === 0 ? 'AnteDAO (ANTE)' : `NONE`
                }</option>
              })}
            </select>
            <div className={styles.group}>
              <div className="balance">
                <span>Your wallet staked</span>
                <span>{_.isEmpty(currentStaked) ? 0 : numberWithCommas(currentStaked)} {
                  currentToken?.symbol
                  === 'ANTE' ? 'ANTE'
                    : "NONE"
                }</span>
              </div>
              <div className="subtitle">
                <span>Input amount to unstake</span>
              </div>
              <div className="input-group">
                <NumberFormat
                  type="text"
                  placeholder={'0'}
                  thousandSeparator={true}
                  onChange={(e: any) => handleChange(e)}
                  decimalScale={6}
                  value={withdrawAmount}
                  min={0}
                  maxLength={255}
                />
                <div>
                  <button className="btn-max" id="btn-max-withdraw" onClick={() => setWithdrawAmount(currentStaked)}>MAX
                  </button>
                </div>
              </div>
              {/* <div className="balance" style={{marginTop: '16px'}}>
                <span>Equivalent</span>
                <span>{numberWithCommas((parseFloat(withdrawAmount) * currentRate || 0).toString())} Points</span>
              </div> */}
            </div>
          </div>
          <DialogActions className="modal-content__foot">
            <button
              className={"btn btn-staking " + (disableWithdraw || (appChainID.appChainID !== ETH_CHAIN_ID) || (appChainID.walletChainID !== ETH_CHAIN_ID) ? 'disabled' : '')}
              onClick={onWithDraw}
            >Unstake
            </button>
            <ButtonLink
              text={'Cancel'}
              to={'/account?tab=1'}
              className="btn btn-cancel"
              onClick={handleClose}
            />
          </DialogActions>
        </div>

        <Dialog
          open={openModalTransactionSubmitting}
          keepMounted
          onClose={() => setOpenModalTransactionSubmitting(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={commonStyles.loadingTransaction}
        >
          <DialogContent className="content">
            <img alt="close-modal" src={closeIcon} onClick={() => setOpenModalTransactionSubmitting(false)}/>
            <span className={commonStyles.nnb1824d}>Transaction Submitting</span>
            <CircularProgress color="primary" />
          </DialogContent>
        </Dialog>

        {transactionHashes.length > 0 && <ModalTransaction
          transactionHashes={transactionHashes}
          setTransactionHashes={setTransactionHashes}
          open={transactionHashes.length > 0}
        />}
      </div>
    </DefaultLayout>
  );
};

export default Withdraw;
