import { Button } from "@material-ui/core";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { PICK_WINNER_RULE, TIERS } from "../../../../constants";
import { pickerRandomWinner } from "../../../../request/participants";
import { alertFailure, alertSuccess } from "../../../../store/actions/alert";
import PickToWinnerForm from './PickToWinnerForm';

function UserPickerToWinner(props: any) { 
  const { poolDetail} = props;
  const dispatch = useDispatch();
  const [onPicker, setOnPicker] = useState<string | null>(null)
  const [onPickerTier, setOnPickerTier] = useState<number>(0)

  const handlePickerRandom = async (data: { maxRandom: number }) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Do you want pick random ?')) {
      return false;
    }
    // Call API random
    await pickerRandomWinner(poolDetail?.id, onPicker, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(alertSuccess('Picker to Random Success'));
          setOnPicker(null)
        } else {
          dispatch(alertFailure('Picker to Random Fail'));
        }
      });
  };
  const isDeployed = !!poolDetail.is_deploy;
  return (
    <>
      <div style={{
        paddingLeft: 30,
        display: 'inline-block',
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { setOnPicker(PICK_WINNER_RULE.RULE_TIER_1); setOnPickerTier(1) }}
          style={{ marginLeft: 10, marginTop: -3 }}
          disabled={isDeployed}
        >Lottery pick Tier 1</Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => { setOnPicker(PICK_WINNER_RULE.RULE_TIER_2); setOnPickerTier(2) }}
          style={{ marginLeft: 10, marginTop: -3 }}
          disabled={isDeployed}
        >Lottery pick Tier 2</Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => { setOnPicker(PICK_WINNER_RULE.RULE_TIER_3); setOnPickerTier(3) }}
          style={{ marginLeft: 10, marginTop: -3 }}
          disabled={isDeployed}
        >Lottery pick Tier 3</Button>
        <PickToWinnerForm
          isVisible={!!onPicker}
          onPicker={onPicker}
          handlePickerRandom={handlePickerRandom}
          tierName={TIERS[onPickerTier]}
          handleClose={() => setOnPicker(null)}
        />
      </div>

    </>
  );
}

export default UserPickerToWinner;
