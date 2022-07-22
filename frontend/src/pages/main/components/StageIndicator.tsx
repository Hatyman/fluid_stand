import { FC } from 'react';
import s from './StageIndicator.module.sass';
import clsx from 'clsx';

type OwnProps = {
  isActive: boolean;
};

export const StageIndicator: FC<OwnProps> = function StageIndicator(props) {
  return <div className={clsx(s.indicator, props.isActive && s.active)} />;
};
