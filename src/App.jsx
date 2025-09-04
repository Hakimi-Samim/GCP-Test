import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import './index.css';

// import './App.css' // add this file if not created yet

const App = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <Main />
      {/* <Header/> */}
    </div>
  );
}

export default App;
