/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Book.module.css';

import up from './../../images/caret-up.svg';
import down from './../../images/caret-down.svg';

function Book(props) {
  let history = useHistory();
  const [checkbox, setCheckbox] = useState([]);

  function sortBooks(dataset) { // из дата-атрибутов будет подставляться поле по которому сортирую
    let way = 1;
    let temp = [...props.books];

    dataset?.way === 'asc' ? way = 1: way = -1;  // устанавливаю напрвление сортировки asc, desc

    temp.sort((a, b) => {
      if (a[dataset?.prop] > b[dataset?.prop]) return way;
      if (a[dataset?.prop] === b[dataset?.prop]) return 0;
      if (a[dataset?.prop] < b[dataset?.prop]) return -way;
    });

    props.setBooks([...temp]);
  }

  function delItem(data) { // удаление штучное
    let temp = [...props.books];
    temp.splice(data.dataset?.item, 1);
    props.setBooks([...temp]);
  }

  function delAllCheckedItems(e) { // удаление по чекбоксам
    e.preventDefault();
    let temp = [...props.books];
    let inputs = document.querySelectorAll('input');  // знаю, что похорошему через рефы, но надобыло как-то освобождать чекбоксы
    checkbox.map( (index) => {
      temp.splice(index, 1);  // собственно удаление
      inputs[index].checked = false;  // и освобождение чекбокса
    });
    setCheckbox([]);  // чищу стейт выбранных чекбоксов
    props.setBooks([...temp]);
  }

  function checkboxHandler(e) { // контроль за чекбоксами с помощью стейта
    let item = e.currentTarget.value;
    let temp = [...checkbox];
    !temp.includes(item) ? temp.push(item) : temp.splice(temp.indexOf(item),1); // добавляю или удаляю в стейте активные чекбоксы
    setCheckbox([...temp]);
  }

  function editHendler(target) {  // редактирование по клику
    props.setEdit(target.dataset.index); // отправляю в родительский компонент кого редактируем
    history.push('/edit');  // используем возжделенный react-router вместо модалок
  }

  return (
    <form onSubmit={delAllCheckedItems}>  {/* подписался на событие для удаления по чекбоксам */}
      <table className={styles.table}>
        <tbody className="Book">
          <tr>
            <th>
              { checkbox.length === 0 ? 
              "":
              <button type="submit">del all</button>} {/* показываю кнопку если есть "активный" чекбокс */}
            </th>
            <th>
              <img
                src={up}
                alt="up"
                data-prop="id"
                data-way="asc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                /> {/* хотел решить делегированием, но передумал */}
              <img
                src={down}
                alt="down"
                data-prop="id"
                data-way="desc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                />
            </th>
            <th>
              <img
                src={up}
                alt="up"
                data-prop="name"
                data-way="asc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                />
              <img
                src={down}
                alt="down"
                data-prop="name"
                data-way="desc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                />
            </th>
            <th>
              <img
                src={up}
                alt="up"
                data-prop="autor"
                data-way="asc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                />
              <img
                src={down}
                alt="down"
                data-prop="autor"
                data-way="desc"
                onClick={(e)=>{sortBooks(e.currentTarget.dataset)}}
                />
            </th>
          </tr>
          {props.books.map( (book, index)=>{
            return (
            <tr key={index}>
              <td>
                <input type="checkbox" name="del" value={index} onChange={checkboxHandler} /> {/* отлавливаем чекбокс */}
              </td>
              <td data-index={index} onClick={e => editHendler(e.currentTarget)}> {/* таже ситуация с делегированием */}
                {book.id}
              </td>
              <td data-index={index} onClick={e => editHendler(e.currentTarget)}>
                {book.name}
              </td>
              <td data-index={index} onClick={e => editHendler(e.currentTarget)}>
                {book.autor}
              </td>
              <td>
                <button type="button" data-item={index} onClick={e => delItem(e.currentTarget)}>Del</button> {/* одиночное удаление по клику */}
              </td>
            </tr>
            );
          } )}
        </tbody>
      </table>
    </form>
  );
}

export default Book;
