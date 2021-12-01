import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [inputQuery, setInputQuery] = useState('');

  const handleInputQuery = e => {
    setInputQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputQuery.trim() === '') {
      toast.error('Input query to find image...');
      return;
    }

    onSubmit(inputQuery);
    setInputQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputQuery}
          onChange={handleInputQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
