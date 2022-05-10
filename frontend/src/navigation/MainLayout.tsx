import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import logo from 'assets/logo.png';
import s from './MainLayout.module.sass';

export const MainLayout: FC = function MainLayout() {
  return (
    <article>
      <header className={s.header}>
        <img src={logo} alt={'TPU logo'} className={s.logo} draggable={false} />
      </header>
      <Outlet />
    </article>
  );
};
