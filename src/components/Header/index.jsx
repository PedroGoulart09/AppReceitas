/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import profileIcon from '../../images/profileIcon.svg';
import {
  AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './header.css';

function Header({ title, isSearchButton }) {
  const history = useHistory();
  const [isSearchBar, setIsSearchBar] = useState(false);
  const titles = ['Drinks', 'Foods'];
  return (
    <header
      className="header"
    >

      <button
        className="header-buttons"
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <AiOutlineUser />
      </button>

      <h2
        className={ titles.includes(title) ? '' : 'position-title' }
        data-testid="page-title"
      >
        {title}

      </h2>

      <section style={ { display: 'flex', alignItems: 'center' } }>
        {isSearchButton
        && (
          <button
            style={ { transform: 'translateY(15px)' } }
            className="header-buttons"
            type="button"
            src={ searchIcon }
            data-testid="search-top-btn"
            onClick={ () => setIsSearchBar(!isSearchBar) }
          >

            <AiOutlineSearch />
          </button>)}

      </section>

      {isSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchButton: PropTypes.bool.isRequired,
};

export default Header;
