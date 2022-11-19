import React, { FC, useEffect } from 'react';
import { ProcessState } from 'pages/main/components/ProcessState';
import s from './MainPage.module.sass';
import { DecisionProposer } from './components/DecisionProposer';
import { Export } from './components/Export';
import { CircularProgress } from '@mui/material';
import { TelemetryQuery } from 'services/api/axios-client';
import { useWsClient } from 'services/ws/WebSocketsContext';

export const MainPage: FC = function MainPage() {
  const client = useWsClient();
  const { data, isLoading } = TelemetryQuery.useListQuery();

  useEffect(() => {
    client.sendTextMessage('Sosi sam!');
  }, []);

  console.debug('data', data);

  return (
    <section className={s.content}>
      <aside className={s.topContainer}>
        <ProcessState />
        <DecisionProposer />
        <Export />
      </aside>
      {isLoading && (
        <div className={s.center}>
          <CircularProgress size={50} />
        </div>
      )}
    </section>
  );
};
