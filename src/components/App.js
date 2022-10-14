import React from 'react';
import AppRouter from './Router';

function App() {
  const URL = "https://pre-onboarding-selection-task.shop/";

  return (
    <>
      <AppRouter urlObj={URL}/>
    </>
  );
}

export default App;
