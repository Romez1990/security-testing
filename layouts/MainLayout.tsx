import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';
import AppBar from '../components/AppBar';

interface Props {
  title?: string;
  children: ReactNode;
}

function MainLayout({ title, children }: Props) {
  return (
    <BaseLayout title={title}>
      <AppBar />
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
