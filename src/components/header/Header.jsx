import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">Test app</Link>
      <nav>
        <Link to="/books">Books</Link>
      </nav>
    </header>
  );
}
export default Header;