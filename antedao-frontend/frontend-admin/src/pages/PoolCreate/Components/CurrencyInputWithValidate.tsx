import React, { useState } from 'react';
import CurrencyInput from "react-currency-input-field";
import useStyles from "../style";
import { renderErrorCreatePool } from "../../../utils/validate";

function CurrencyInputWithValidate(props: any) {
  const classes = useStyles();
  const {
    register, errors, initValue, controlName, validateRule,
    className, placeHolder, decimalsLimit = 6, disabled,
  } = props; 
  const renderError = renderErrorCreatePool;
  const [value, setValue] = useState((initValue === 0) ? ('') : (`${Number(initValue)}`));

  return (
    <>
      <CurrencyInput
        placeholder={placeHolder || "Please enter a number"}
        value={value}
        decimalsLimit={decimalsLimit}
        groupSeparator=","
        decimalSeparator="."
        onValueChange={(value: any) => {
          setValue(value !== undefined ? value : '');
        }}
        allowNegativeValue={false}
        className={className || classes.formInputBox}
        disabled={disabled}
      />
      <input
        type='hidden'
        name={controlName}
        value={value}
        ref={register(validateRule)}
      />

      {errors.controlName &&
        <p className={classes.formErrorMessage}>
          {renderError(errors, controlName)}
        </p>
      }
    </>
  );
}

export default CurrencyInputWithValidate;
