class Phone {
    constructor(id, name, phone) {
      this.id = id;
      this.name = name;
      this.phone = phone;
    }
  }
  
  class UI {
    static displayPhones() {
      const books = Store.getPhones();
  
      books.forEach((book) => UI.addPhoneToList(book));
    }
  
    static addPhoneToList(book) {
      const list = document.querySelector('#phone-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deletePhone(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#phone-form');
      container.insertBefore(div, form);
  
      setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }
  
    static clearFields() {
      document.querySelector('#id').value = '';
      document.querySelector('#name').value = '';
      document.querySelector('#phone').value = '';
    }
  }
  
  class Store {
    static getPhones() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addPhone(book) {
      const books = Store.getPhones();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removePhone(phone) {
      const books = Store.getPhones();
  
      books.forEach((book, index) => {
        if(book.phone === phone) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayPhones);
  
  document.querySelector('#phone-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
  
    if(id === '' || name === '' || phone === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      const book = new Phone(id, name, phone);
  
      UI.addPhoneToList(book);
  
      Store.addPhone(book);
  
      UI.showAlert('Phone Added', 'success');
  
      UI.clearFields();
    }
  });
  
  document.querySelector('#phone-list').addEventListener('click', (e) => {
    UI.deletePhone(e.target);
  
    Store.removePhone(e.target.parentElement.previousElementSibling.textContent);
  
    UI.showAlert('Phone Removed', 'success');
  });