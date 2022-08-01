import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './style'

type IButton = {
  text: string;
  icon?: any;
  to: string;
  spacing?: number;
  className?: string;
  onClick?: any,
  isNew?:boolean,
  href?:string
}

const ButtonLink: React.FC<IButton> = (props: IButton) => {
  const { text, icon, spacing = 10, to, className = '', onClick, isNew = false, href = null } = props;
  const classes = useStyles({
    spacing
  });

  const cssClass = className || classes.button;
  if (href) {
    return (
      <a
      className={cssClass}
      {...( onClick && { onClick })}
      href={href}
    >
      <p className={classes.buttonContent}>
          {
            icon && <img src={`/images/${icon}`} width={20} alt=""/>
          }
          <span className={ isNew ? classes.buttonTextNew : classes.buttonText}>{text}</span>
      </p>
    </a>
    )
  }else{
    return (
      <Link
        className={cssClass}
        {...( onClick && { onClick })}
        to={to}
      >
        <p className={classes.buttonContent}>
            {
              icon && <img src={`/images/${icon}`} width={20} alt=""/>
            }
            <span className={ isNew ? classes.buttonTextNew : classes.buttonText}>{text}</span>
        </p>
      </Link>
    )
  }
}

export default ButtonLink;
