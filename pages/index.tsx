import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Stepper from '../components/Stepper';
import Results from '../components/Results';

function IndexPage() {
  const [result, setResult] = useState<number | null>(null);

  function onResult(result: number) {
    setResult(result);
  }

  function restart() {
    setResult(null);
  }

  return (
    <MainLayout>
      {!result
        ? <Stepper onResult={onResult} />
        : <Results result={result} restart={restart} />
      }
    </MainLayout>
  );
}

export default IndexPage;
