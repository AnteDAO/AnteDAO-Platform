import { ACCEPT_CURRENCY } from "../../../constants";
import useStyles from "../style";
import ExchangeRateDisplayPriceSwitch from "./ExchangeRateDisplayPriceSwitch";
import ExchangeRateETH from "./ExchangeRateETH";
import ExchangeRateUSDTDisplay from "./ExchangeRateUSDTDisplay";

function ExchangeRate(props: any) {
  const classes = useStyles();
  const {
    register, setValue, errors, control, watch,
    poolDetail,
    token
  } = props;

  const acceptCurrency = watch('acceptCurrency');

  return (
    <div className={classes.exchangeRate}>
      {acceptCurrency === ACCEPT_CURRENCY.ETH &&
        <ExchangeRateDisplayPriceSwitch
          poolDetail={poolDetail}
          register={register}
          token={token}
          setValue={setValue}
          errors={errors}
          control={control}
          watch={watch}
        />
      }

      <ExchangeRateETH
        poolDetail={poolDetail}
        register={register}
        token={token}
        setValue={setValue}
        errors={errors}
        control={control}
        watch={watch}
      />


      {acceptCurrency === ACCEPT_CURRENCY.ETH &&
        <ExchangeRateUSDTDisplay
          poolDetail={poolDetail}
          register={register}
          token={token}
          setValue={setValue}
          errors={errors}
          control={control}
          watch={watch}
        />
      }
    </div>
  );
}

export default ExchangeRate;
