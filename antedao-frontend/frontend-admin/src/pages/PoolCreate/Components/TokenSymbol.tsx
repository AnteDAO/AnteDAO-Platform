import { renderErrorCreatePool } from "../../../utils/validate";
import useStyles from "../style";

function TokenSymbol(props: any) {
  const classes = useStyles();
  const {
    register, errors,
    poolDetail,
  } = props;
  const renderError = renderErrorCreatePool;

  return (
    <>
      <div className={classes.formControl}>
        <label className={classes.formControlLabel}>Token Symbol (display)</label>
        <input
          type="text"
          name='token_symbol'
          defaultValue={poolDetail?.symbol}
          ref={register({ required: true })}
          className={classes.formControlInput}
        />
        {errors.token_symbol &&
          <p className={classes.formErrorMessage}>
            {renderError(errors, 'token_symbol')}
          </p>
        }
      </div>
    </>
  );
}

export default TokenSymbol;
