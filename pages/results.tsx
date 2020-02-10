import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Results from '../components/results/Results';
import Column from '../components/results/Column';
import Pie from '../components/results/Pie';

function ResultsPage(): JSX.Element {
  return (
    <MainLayout>
      {/*<Results />*/}
      <Column />
      <Pie />
    </MainLayout>
  );
}

export default ResultsPage;
