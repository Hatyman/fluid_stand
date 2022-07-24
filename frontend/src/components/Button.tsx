import { FC } from 'react';
import { Button as MuiButton } from '@mui/material';

type OwnProps = {
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
};

export const Button: FC<OwnProps> = function Button(props) {
  return (
    <MuiButton
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      variant={props.variant}
    >
      {props.label}
    </MuiButton>
  );
};
