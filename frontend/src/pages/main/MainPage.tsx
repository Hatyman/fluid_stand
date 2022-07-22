import React, { FC } from 'react';
import { ProcessState } from 'pages/main/components/ProcessState';
import s from './MainPage.module.sass';

export const MainPage: FC = function MainPage() {
  return (
    <section className={s.content}>
      <div className={s.topContainer}>
        <ProcessState />
      </div>
    </section>
  );
};
