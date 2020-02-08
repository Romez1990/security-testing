import React from 'react';
import Stepper from '../components/testing/Stepper';
import MainLayout from '../layouts/MainLayout';

function TestingPage(): JSX.Element {
  return (
    <MainLayout>
      <Stepper />
    </MainLayout>
  );
}

export default TestingPage;
