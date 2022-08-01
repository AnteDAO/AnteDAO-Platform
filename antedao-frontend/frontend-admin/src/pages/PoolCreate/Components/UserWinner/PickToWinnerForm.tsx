import React from 'react';
import ConfirmDialog from "../../../../components/Base/ConfirmDialog";
import useStyles from "../../style";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import CurrencyInputWithValidate from "../CurrencyInputWithValidate";
import { renderErrorCreatePool } from "../../../../utils/validate";

function PickToWinnerForm(props: any) {
  const classes = useStyles();
  const { isVisible, handlePickerRandom, totalUserByTier, tierName, handleClose } = props;

  const renderError = renderErrorCreatePool;

  const { register, errors, handleSubmit, } = useForm({
    mode: "onChange",
    reValidateMode: 'onChange',
    defaultValues: {
      maxRandom: ''
    },
  });

  const submitData = (data: any) => {
    handlePickerRandom(data);
  };

  const handleSubmitPopup = async () => {
    return handleSubmit(submitData)();
  };
  return (
    <>
      <ConfirmDialog
        title={'Maximum Lottery ' + tierName}
        open={isVisible}
        confirmLoading={false}
        onConfirm={handleSubmitPopup}
        onCancel={handleClose}
        submitText="Random"
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.formControl} style={{ marginTop: 0 }}>
              <label className={classes.formControlLabel}>Maximum</label>
              <div>
                <CurrencyInputWithValidate
                  register={register}
                  errors={errors}
                  controlName={'maxRandom'}
                  initValue={0}
                  placeHolder=" "
                  decimalsLimit={0}
                  className={classes.formControlInput}
                  validateRule={{
                    required: true,
                    validate: {
                      greaterThanZero: (value: any) => Number(value) > 0,
                      numberOnly: (value: any) => value === `${Math.round(Number(value))}`
                      // beetwen0AndMaxUser: (value: any) => Number(value) > 0 && Number(value) <= totalUserByTier,
                    }
                  }}
                />
              </div>
              {errors.maxRandom &&
                <p className={classes.formErrorMessage}>
                  {errors.maxRandom.type === 'beetwen0AndMaxUser' ?
                    `Please enter between 0 and ${totalUserByTier}!`
                    : errors.maxRandom.type === 'numberOnly' ?
                      `Please enter number only!`
                      :
                      renderError(errors, 'maxRandom')}
                </p>
              }
            </div>
          </Grid>
        </Grid>
      </ConfirmDialog>
    </>
  );
}

export default PickToWinnerForm;
