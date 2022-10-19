import React from 'react';
import './App.css';
import Provider from './context/provider';
import Search from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Search />
      <Table />
    </Provider>
  );
}

export default App;
