import React, { useState } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Header from './components/header/Header';
import Book from './components/book/Book';
import EditBook from './components/edit/EditBook';

import booksJSON from './database/books.json';

function App() {

  const [ bookState, setBookState ] = useState(booksJSON);
  const [ forEdit, setForEdit ] = useState(false);
 
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route path="/books" exact>
            <Book books={bookState} setBooks={setBookState} setEdit={setForEdit} />
          </Route>
          <Route path="/edit">
            {forEdit?
            <EditBook books={bookState} setBooks={setBookState} bookId={forEdit} setEdit={setForEdit}/>:
            <Redirect to="/"/>}
          </Route>
          <Route> {/* не делал отдельную страницу под 404 */}
            <main style={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
              <h1>Home page or Not Found</h1>
            </main>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
