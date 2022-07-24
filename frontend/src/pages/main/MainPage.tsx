import React, { FC } from 'react';
import { ProcessState } from 'pages/main/components/ProcessState';
import s from './MainPage.module.sass';
import { DecisionProposer } from './components/DecisionProposer';
import { Export } from './components/Export';

export const MainPage: FC = function MainPage() {
  return (
    <section className={s.content}>
      <aside className={s.topContainer}>
        <ProcessState />
        <DecisionProposer />
        <Export />
      </aside>
    </section>
  );
};
