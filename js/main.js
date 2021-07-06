/* eslint-disable max-classes-per-file */
document.addEventListener('DOMContentLoaded', () => {

  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class Elements {

    addBtn;
    removeBtn = [];
    bookTitle;
    bookAuthor;
    bookWrap;
    constructor() {
      this.setAddBtn();
      this.setAddEvent();
      this.bookTitle = document.getElementById('title');
      this.bookAuthor = document.getElementById('author');
      this.bookWrap = document.querySelector('.book-ul');
      this.updateRemoveBtn();
    }

    updateContent = (books, removeFunc) => {
      this.bookWrap.innerHTML = '';
      books.forEach((book, index) => {
        this.bookWrap.innerHTML += `<li>
            <div class="book-info">
              <p><span class="book-title">"${book.title}"</span> by <span class="book-author">${book.author}</span></p>
            </div>
            <button type="button" class="removeBtn" data-key=${index}>Remove</button>
          </li>`;

      });
      this.updateRemoveBtn();
      this.setRemoveEvent(removeFunc);
    }

    getTitle = () => {
      return this.bookTitle.value;
    }

    getAuthor = () => {
      return this.bookAuthor.value;
    }

    setAddBtn = () => {
      this.addBtn = document.querySelector('.add');
    }

    setAddEvent = (addFunc) => {
      if (!this.addBtn) return;
      this.addBtn.addEventListener('click', () => addFunc());
    }

    updateRemoveBtn = () => {
      this.removeBtn = [...document.querySelectorAll('.removeBtn')];
    }

    setRemoveEvent = (removeFunc) => {
      if (this.removeBtn.length < 1) return;

      this.removeBtn.forEach((btn) => btn.addEventListener('click', () => removeFunc));
    }
  }

  class Engine {
    elements = new Elements();
    collection = {
      books: []
    }

    addBook = (e) => {
      let title = elements.getTitle();
      let author = elements.getAuthor();
      if (title.length <= 2 || author.length <= 2) {
        e.preventDefault();
      } else {
        this.collection.books.push(new Book(title, author));
        this.updateLocalStorage();
      }
    }

    removeBook = (btn) => {
      let { books } = this.collection;
      books = books.filter((book, i) => i !== +btn.dataset.key);
      this.collection.books = books;
      this.updateLocalStorage();
      this.getBooksFromLocalStorage();
      elements.updateContent(this.collection.books, this.removeBook.bind(this));
    }

  }
  let elements = new Elements();
  elements.updateContent([]);
});