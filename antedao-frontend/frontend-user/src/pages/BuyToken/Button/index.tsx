import React from 'react';
import useStyles from './style';
import { BeatLoader } from "react-spinners";

type ButtonPropsType = {
  background?: string;
  text: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean,
  style?: {},
  className?:any
}

const Button: React.FC<ButtonPropsType> = (props: ButtonPropsType) => {
  const styles = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, background = 'transparent', text = '', disabled = false, onClick, loading = false,className } = props;
  const customStyle = {
    ...style,
  };

  return (
    <button style={customStyle} className={styles.button +" "+ className} disabled={disabled || loading} onClick={onClick}>
      {
        loading ? <BeatLoader color={'white'} size={8} /> : `${text}`
      }
    </button>
  )
}

export default Button;
