import { Typography } from '@material-ui/core';
import useStyles from "../../style";
import ProgressDisplay from "./ProgressDisplay";

function ProgressDisplaySetting(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors, watch, control,
    poolDetail,
  } = props;

  return (
    <div className={classes.exchangeRate}>
      <Typography className={classes.exchangeRateTitle}>Progress Display Setting</Typography>
      <ProgressDisplay
        poolDetail={poolDetail}
        register={register}
        setValue={setValue}
        errors={errors}
        control={control}
        watch={watch}
      />

      {/* <TokenSoldDisplay
        poolDetail={poolDetail}
        register={register}
        setValue={setValue}
        errors={errors}
        control={control}
        watch={watch}
      /> */}

    </div>
  );
}

export default ProgressDisplaySetting;
