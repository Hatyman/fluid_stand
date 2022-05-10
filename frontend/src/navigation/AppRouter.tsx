import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'navigation/routes';
import { MainLayout } from 'navigation/MainLayout';
import { MainPage } from 'pages/main/MainPage';

export const AppRouter: FC = function AppRouter() {
  return (
    <Routes>
      <Route path={routes.home} element={<MainLayout />}>
        <Route index={true} element={<MainPage />} />
      </Route>
    </Routes>
  );
};
