import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import AppBar from '../components/layout/AppBar';

interface Props {
  title?: string;
  children: ReactNode;
}

function MainLayout({ title, children }: Props): JSX.Element {
  return (
    <BaseLayout title={title}>
      <AppBar />
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
