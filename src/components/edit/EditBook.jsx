import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './EditBook.module.css';

function EditBook(props) {

  let history = useHistory();

  const [bookID, setBookID] = useState(props.books[props.bookId].id || '');
  const [bookName, setBookName] = useState(props.books[props.bookId].name || '');
  const [bookAutor, setBookAutor] = useState(props.books[props.bookId].autor || '');

  const submitHandler = (e) => {  // сохранение изменений
    e.preventDefault();
    let temp = [...props.books];
    temp[props.bookId].id = bookID; // записываю изменения во временый массив
    temp[props.bookId].name = bookName;
    temp[props.bookId].autor = bookAutor;
    props.setBooks([...temp]);  // отправляем новое состояние
    props.setEdit(false); // закрываем доступ к форме редактирования
    history.goBack(); // идём обратно
  }

  const cancelHandler = (e) => {  // отмена редактирования
    props.setEdit(false); // закрываем доступ к форме редактирования
    history.goBack(); // идём обратно
  }

  return (
    <main className={styles.main}>
      <form onSubmit={submitHandler}>
        <label htmlFor="id">ID</label>
        <input type="text" name="id" id="id" value={bookID} onChange={e => {setBookID(e.currentTarget.value)}} />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={bookName} onChange={e => {setBookName(e.currentTarget.value)}} />
        <label htmlFor="autor">Autor</label>
        <input type="text" name="autor" id="autor" value={bookAutor} onChange={e => {setBookAutor(e.currentTarget.value)}} />
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </main>
  );
}

export default EditBook;