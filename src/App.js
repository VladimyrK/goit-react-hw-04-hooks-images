import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar';
import ImageFinder from './components/ImageFinder';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <Searchbar onSubmit={query => setQuery(query)} />
      <ImageFinder query={query} />
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
}

export default App;
