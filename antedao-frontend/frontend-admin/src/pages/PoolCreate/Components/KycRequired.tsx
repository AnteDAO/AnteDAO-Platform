import FormControl from '@material-ui/core/FormControl';
import { Switch } from 'antd';
import { useEffect } from 'react';
import { Controller } from "react-hook-form";
import { renderErrorCreatePool } from "../../../utils/validate";
import useStyles from "../style";

function KycRequired(props: any) {
  const classes = useStyles();
  const {
    setValue, errors, control,
    poolDetail
  } = props;
  const renderError = renderErrorCreatePool;

  useEffect(() => {
    if (poolDetail && poolDetail.kyc_bypass) {
      setValue('kyc_bypass', poolDetail.kyc_bypass);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetail]);

  return (
    <>
      <div className={classes.formControl}>
        <FormControl component="fieldset">
          <div className={classes.flexRowStart}>
            <label className={classes.formControlLabel}>KYC Bypass</label>
            <Controller
              control={control}
              name="kyc_bypass"
              render={(field:any) => {
                const { value, onChange } = field;
                return (
                  <Switch
                    onChange={async (switchValue) => {
                      await onChange(switchValue);
                    }}
                    checked={value}
                    checkedChildren="Bypass"
                    unCheckedChildren="Required"
                    className={classes.bypassRequiredSwitch}
                  />
                )
              }}
            />
          </div>
          <p className={classes.formErrorMessage}>
            {
              renderError(errors, 'kyc_bypass')
            }
          </p>
        </FormControl>
      </div>
    </>
  );
}

export default KycRequired;
