import { Grid } from "@material-ui/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import ConfirmDialog from "../../../../components/Base/ConfirmDialog";
import { DATETIME_FORMAT } from "../../../../constants";
import { between0And100, fieldMustBeGreaterThanZero, renderErrorCreatePool } from "../../../../utils/validate";
import useStyles from "../../style";
import CurrencyInputWithValidate from "../CurrencyInputWithValidate";

function CreateEditTierForm(props: any) {
  const classes = useStyles();
  const {
    isOpenEditPopup, setIsOpenEditPopup, editData, isEdit,
    handleCreateUpdateData, is_use_allocation_percent,
    // watchStartTime, watchEndTime
  } = props;
  const renderError = renderErrorCreatePool;

  const { register, errors, handleSubmit} = useForm({
    mode: "onChange",
    reValidateMode: 'onChange',
    defaultValues: {
      ...editData,
      startTime: isEdit && editData.startTime ? moment(editData.startTime, DATETIME_FORMAT) : null,
      endTime: isEdit && editData.endTime ? moment(editData.endTime, DATETIME_FORMAT) : null,
    },
  });

  const submitData = (data: any) => {
    const responseData = {
      ...editData,
      startTime: data.startTime ? data.startTime.format(DATETIME_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(DATETIME_FORMAT) : null,
      percent: data.percent,
      multiple: data.multiple,
    };
    handleCreateUpdateData && handleCreateUpdateData(responseData);
  };
  
  const handleSubmitPopup = async () => {
    return handleSubmit(submitData)();
  };
  return (
    <>
      <ConfirmDialog
        title={isEdit ? ('Edit ' + editData.name) : 'Create Tier'}
        open={isOpenEditPopup}
        confirmLoading={false}
        onConfirm={handleSubmitPopup}
        onCancel={() => { setIsOpenEditPopup(false); }}
        submitText="Save changes"
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.formControl} style={{ marginTop: 0 }}>
              <label className={classes.formControlLabel}>Allocation{is_use_allocation_percent && "(%)"}</label>
              <div style={{ display: is_use_allocation_percent ? 'block' : 'none' }}>
                <CurrencyInputWithValidate
                  decimalsLimit={2}
                  register={register}
                  errors={errors}
                  initValue={editData.percent}
                  controlName='percent'
                  className={classes.formControlInput}
                  validateRule={{
                    required: is_use_allocation_percent,
                    validate: is_use_allocation_percent && {
                      greaterThanZero: fieldMustBeGreaterThanZero,
                      between0And100: between0And100,
                    }
                  }}
                />
              </div>
              {errors.percent &&
                <p className={classes.formErrorMessage}>
                  {renderError(errors, 'percent')}
                </p>
              }
              <div style={{ display: !is_use_allocation_percent ? 'block' : 'none' }}>
                <CurrencyInputWithValidate
                  register={register}
                  errors={errors}
                  initValue={editData.multiple}
                  className={classes.formControlInput}
                  controlName='multiple'
                  validateRule={{
                    required: !is_use_allocation_percent,
                    validate: !is_use_allocation_percent && {
                      greaterThanZero: fieldMustBeGreaterThanZero
                    }
                  }}
                />
              </div>
              {errors.multiple &&
                <p className={classes.formErrorMessage}>
                  {renderError(errors, 'multiple')}
                </p>
              }
            </div>
          </Grid>
        </Grid>
        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.formControl}>
              <label className={classes.formControlLabel}>Start Time</label>
              <div >
                <Controller
                  control={control}
                  name="startTime"
                  rules={{
                    validate: {
                      mustBeInTheRangeOfOverallBuyTimeOfThePool: value => {
                        if (!value) return true
                        const valueUnix = value && moment(value).unix();
                        const watchStartTimeUnix = watchStartTime && moment(watchStartTime).unix();
                        const watchEndTimeUnix = watchEndTime && moment(watchEndTime).unix();
                        return (watchStartTime ? valueUnix >= watchStartTimeUnix : true) && (watchEndTime ? valueUnix <= watchEndTimeUnix : true);
                      }
                    }
                  }}
                  render={(field) => {
                    return (
                      <DatePicker
                        {...field}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={{
                          defaultValue: moment("00:00:00", "HH:mm:ss"),
                          format: "HH:mm"
                        }}
                        onSelect={(datetimeSelected: any) => {
                          setValue(field.name, datetimeSelected, { shouldValidate: true });
                        }}
                        minuteStep={15}
                        placeholder=""
                        className={classes.formDatePicker}
                      />
                    )
                  }}
                />
              </div>
              {errors.startTime &&
                <p className={classes.formErrorMessage}>
                  {renderError(errors, 'startTime')}
                </p>
              }
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.formControl}>
              <label className={classes.formControlLabel}>End Time</label>
              <div >
                <Controller
                  control={control}
                  name="endTime"
                  rules={{
                    validate: {
                      greateOrEqualStartTime: value => {
                        if (!value) return true;
                        const startTime = getValues('startTime');
                        const valueUnix = moment(value).unix();
                        const startTimeUnix = moment(startTime).unix();
                        return startTime ? valueUnix > startTimeUnix : true;
                      },
                      mustBeInTheRangeOfOverallBuyTimeOfThePool: value => {
                        if (!value) return true;
                        const valueUnix = moment(value).unix();
                        const watchStartTimeUnix = watchStartTime && moment(watchStartTime).unix();
                        const watchEndTimeUnix = watchEndTime && moment(watchEndTime).unix();
                        return (watchStartTime ? valueUnix >= watchStartTimeUnix : true) && (watchEndTime ? valueUnix <= watchEndTimeUnix : true);
                      }
                    }
                  }}
                  render={(field) => {
                    return (
                      <DatePicker
                        {...field}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={{
                          defaultValue: moment("00:00:00", "HH:mm:ss"),
                          format: "HH:mm"
                        }}
                        onSelect={(datetimeSelected: any) => {
                          setValue(field.name, datetimeSelected, { shouldValidate: true });
                        }}
                        minuteStep={15}
                        placeholder=""
                        className={classes.formDatePicker}
                      />
                    )
                  }}
                />
              </div>
              {errors.endTime &&
                <p className={classes.formErrorMessage}>
                  {renderError(errors, 'endTime')}
                </p>
              }
            </div>
          </Grid>
        </Grid> */}
      </ConfirmDialog>
    </>
  );
}

export default CreateEditTierForm;
