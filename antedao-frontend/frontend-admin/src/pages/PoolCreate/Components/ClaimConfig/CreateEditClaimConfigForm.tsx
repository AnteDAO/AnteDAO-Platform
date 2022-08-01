import React from 'react';
import ConfirmDialog from "../../../../components/Base/ConfirmDialog";
import useStyles from "../../style";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from 'antd';
import moment from "moment";
import BigNumber from "bignumber.js";
import CurrencyInputWithValidate from "../CurrencyInputWithValidate";
import { renderErrorCreatePool } from "../../../../utils/validate";
import { convertDateTimeStringToMomentObject, convertMomentObjectToDateTimeString } from "../../../../utils/convertDate";

function CreateEditClaimConfigForm(props: any) {
  const classes = useStyles();
  const { handleClose, editData, handleCreateUpdateData, rows } = props;

  const isEdit = !!editData?.id;

  const renderError = renderErrorCreatePool;
  const { register, setValue, errors, handleSubmit, control } = useForm({
    mode: "onChange",
    reValidateMode: 'onChange',
    defaultValues: {
      ...(editData || {}),
      start_time: editData?.start_time ? convertDateTimeStringToMomentObject(editData?.start_time) : null,
    },
  });
  const submitData = (data: any) => {
    const responseData = {
      ...(editData || {}),
      start_time: convertMomentObjectToDateTimeString(data.start_time),
      max_percent_claim: data.max_percent_claim,
    };
    handleCreateUpdateData && handleCreateUpdateData(responseData);
  };
  const handleSubmitPopup = async () => {
    return handleSubmit(submitData)();
  };
  const totalPercent: BigNumber = rows.reduce((sum: BigNumber, item: any) => sum.plus(item.max_percent_claim), new BigNumber(0));
  const totalPercentWithoutCurrent = totalPercent.minus(editData.max_percent_claim || 0);
  const maxPercentAvailable = new BigNumber(100).minus(totalPercentWithoutCurrent)
  return (
    <>
      <ConfirmDialog
        title={isEdit ? 'Edit' : 'Create'}
        open={!!editData}
        confirmLoading={false}
        onConfirm={handleSubmitPopup}
        onCancel={handleClose}
      >
        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Start Time</label>
          <div >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="start_time"
              render={(field) => {
                return (
                  <DatePicker
                    className={classes.formInputBox}
                    {...field}
                    placeholder=''
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{
                      defaultValue: moment("00:00:00", "HH:mm:ss"),
                      format: "HH:mm"
                    }}
                    onSelect={(datetimeSelected: any) => {
                      setValue(field.name, datetimeSelected, { shouldValidate: true });
                    }}
                    minuteStep={15}
                  />
                )
              }}
            />
          </div>
          {errors.start_time &&
            <p className={classes.formErrorMessage}>
              {renderError(errors, 'start_time')}
            </p>
          }
        </div>


        <div className={classes.formControl}>
          <label className={classes.formControlLabel}>Max Claim (%)</label>
          <div>
            <CurrencyInputWithValidate
              initValue={editData?.max_percent_claim || ''}
              decimalsLimit={2}
              register={register}
              errors={{}}
              controlName='max_percent_claim'
              className={classes.formControlInput}
              placeholder="Please enter a number"
              validateRule={{
                required: true,
                validate: {
                  beetwen0And100: (value: any) => new BigNumber(value).gt(0) && maxPercentAvailable.gte(value),
                },
              }}
            />
          </div>
          {errors.max_percent_claim &&
            <p className={classes.formErrorMessage}>
              {errors.max_percent_claim.type === "required" ?
                "This field is required!"
                : errors.max_percent_claim.type === "beetwen0And100" ?
                  `Please enter between 0 and ${maxPercentAvailable.toString()}!`
                  : ""}
            </p>
          }
        </div>
      </ConfirmDialog>

    </>
  );
}

export default CreateEditClaimConfigForm;
