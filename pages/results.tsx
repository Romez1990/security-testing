import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Results from '../components/results/Results';
import Column from '../components/results/Column';

function ResultsPage(): JSX.Element {
  return (
    <MainLayout>
      {/*<Results />*/}
      <Column />
    </MainLayout>
  );
}

export default ResultsPage;
