import React from 'react';
import AppRouter from './Router';

function App() {
  //로컬스토리지 정보 확인, 가져오기, 로딩
  const URL = "https://pre-onboarding-selection-task.shop/";

  return (
    <>
      <AppRouter urlObj={URL}/>
    </>
  );
}

export default App;
