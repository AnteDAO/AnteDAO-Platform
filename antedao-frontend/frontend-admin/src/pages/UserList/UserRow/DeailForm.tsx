import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import ConfirmDialog from "../../../components/Base/ConfirmDialog";
import { setBonusPointUser } from "../../../request/user";
import { alertFailure, alertSuccess } from "../../../store/actions/alert";
import useStyles from "./style";

function CreateEditClaimConfigForm(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    isOpenDetailPopup, setIsOpenDetailPopup, userData, getUserListInfo,
  } = props;

  const [bonusPoint, setBonusPoint] = useState("0");

  useEffect(()=>{
    if (!isNaN(userData?.bonus_point)) {
      setBonusPoint(userData?.bonus_point)
    }
  }, [userData])

  // const submitData = (data: any) => {
  //   const responseData = {
  //     startTime: convertMomentObjectToDateTimeString(data.startTime),
  //     maxBuy: data.maxBuy,
  //   };
  //   handleCreateUpdateData && handleCreateUpdateData(responseData);
  // };

  const handleSubmitPopup = async () => {
    try {
      await setBonusPointUser({walletAddress: userData?.wallet_address, bonusPoint: Number(bonusPoint)})
      await getUserListInfo('');
      dispatch(alertSuccess('Update bonus point success'));
    } catch (err) {
      console.log(err)
      dispatch(alertFailure('Something wrong'));
    }
    
    // return handleSubmit(submitData)()
    //   .then((res) => {
    //     console.log('Res: ', isValid, errors);
    //     if (isValid) {
    //       clearErrors();
    //     }
    //   });
  };

  return (
    <>
      <ConfirmDialog
        title={'Bonus Point'}
        open={isOpenDetailPopup}
        confirmLoading={false}
        onConfirm={handleSubmitPopup}
        onCancel={() => { setIsOpenDetailPopup(false); }}
      >

        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Wallet: {userData?.wallet_address}</label>
        </div>

        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Staked PKF: {userData?.staked_pkf}</label>
        </div>

        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Staked LP: {userData?.staked_uni}</label>
        </div>

        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Reputation Point: {userData?.reputation_point} (including bonus point)</label>
        </div>

        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Bonus Point</label>
          <input
            type="number"
            name='tokenImages'
            value={bonusPoint}
            onChange={e => setBonusPoint(e.target.value)}
            className={classes.formControlInput}
          />
        </div>

      </ConfirmDialog>

    </>
  );
}

export default CreateEditClaimConfigForm;
