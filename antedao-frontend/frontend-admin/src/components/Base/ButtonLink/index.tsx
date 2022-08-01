import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./style";

type IButton = {
  text: string;
  icon?: any;
  to: string;
  spacing?: number;
  className?: string;
  onClick?: any;
  disabled?: boolean;
};

const ButtonLink: React.FC<IButton> = (props: IButton) => {
  const {
    text,
    spacing = 10,
    to,
    className = "",
    onClick,
    disabled,
  } = props;
  const classes = useStyles({
    spacing,
  });

  const cssClass = className || classes.button;
  const cssClassDisable = className || classes.buttonDisable;

  return (
    <>
      {!disabled ? (
        <div className={classes.buttonWrap}>
          <Link className={cssClass} {...(onClick && { onClick })} to={to}>
            <p className={classes.buttonContent}>
              <span className={classes.buttonText}>{text}</span>
            </p>
          </Link>
        </div>
      ) : (
        <div className={classes.buttonWrapDisable}>
          <Link className={cssClassDisable} to={""}>
            <p className={classes.buttonContent}>
              <span className={classes.buttonText}>{text}</span>
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default ButtonLink;
