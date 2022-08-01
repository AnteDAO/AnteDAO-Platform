import BigNumber from "bignumber.js";

export const renderError = (errors: any, prop: string) => {
  if (errors[prop]) {
    const errorName = prop.split("_").join(' ');
    const errorType = errors[prop].type;

    switch (errorType) {
      case 'required': {
        return 'This field is required';
      }
      case 'greaterOrEqualToday': {
        return `The ${errorName} must be after current date.`;
      }
      case 'greateOrEqualStartTime': {
        return 'This finish time must be after the start time';
      }
      case 'greaterOrEqualFinishTime': {
        return 'This relase time must be after the finish time';
      }
      case 'validAddress': {
        return "Address receive is invalid.";
      }
      case 'invalidToken': {
        return errors[prop].message;
      }
      case 'tokenAlreadyUsed': {
        return 'Token address is already in use.';
      }
    };
  }

  return;
};

export const renderErrorCreatePool = (errors: any, prop: string) => {
  if (errors[prop]) {
    const errorName = prop.split("_").join(' ');
    const errorType = errors[prop].type;

    switch (errorType) {
      case 'required': {
        return 'This field is required';
      }
      case 'greateOrEqualStartJoinPoolTime': {
        return 'This end join pool time must be after the start join pool time';
      }
      case 'greaterOrEqualEndJoinPoolTime': {
        return 'This relase time must be after the finish time';
      }

      case 'greaterOrEqualToday': {
        return `The ${errorName} must be after current date.`;
      }
      case 'greateOrEqualStartTime': {
        return 'Start Time must be before End time';
      }
      case 'greaterOrEqualFinishTime': {
        return 'This relase time must be after the finish time';
      }

      case 'greaterThanZero': {
        return 'This field must be greater than 0';
      }
      case 'totalSoldCoinGreaterThanZero': {
        return 'Total Sold Coin must be greater than 0.';
      }
      case 'maxBuyGreaterThanZero': {
        return 'Max Buy must be greater than 0.';
      }
      case 'minBuyGreaterMaxBuy': {
        return 'Min Buy must be less than Max Buy.';
      }


      case 'validAddress': {
        return "Address receive is invalid.";
      }
      case 'invalidToken': {
        return errors[prop].message;
      }
      case 'tokenAlreadyUsed': {
        return 'Token address is already in use.';
      }
      case 'networkNotMatch': {
        return 'Your selected network can\'t deploy. Please switch network in MetaMask or change this option';
      }
      case 'mustBeInTheRangeOfOverallBuyTimeOfThePool': {
        return 'Start/End Buy Time of each tier must be in the range of overall Buy time of the pool';
      }
      case 'between0And100': {
        return 'Please enter between 0 and 100!';
      }
      case 'allocationEqualOneHunred': {
        return 'Total Allocation must be equal to 100%';
      }
      case 'allocationHigherThanZero': {
        return 'Tier allocation must be higher than 0% or 0x';
      }

    };
  }

  return;
};

export const fieldMustBeGreaterThanZero = (value: any) => new BigNumber(value).gt(0);

export const between0And100 = (value: any) => !value || (Number(value) >= 0 && Number(value) <= 100);


