import { FC, useState } from 'react';
import s from './DecisionProposer.module.sass';
import { Button } from '../../../components/Button';

export const DecisionProposer: FC = function DecisionProposer() {
  const [suggestion, setSuggestion] = useState<string>('Increase pump power by 1.13 V');

  if (!suggestion) return null;

  return (
    <div className={s.container}>
      <p className={s.text}>
        Рекомендуется применить следующие измения для устранения отклонения KPI - показателей:
        <br />
        {suggestion}
      </p>
      <Button label={'Применить'} variant={'contained'} />
    </div>
  );
};
