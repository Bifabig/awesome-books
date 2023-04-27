class Book {
  constructor(title, author) {
    this.id = Math.random() * 1000;
    this.title = title;
    this.author = author;
  }

  storeBook() {
    let book = {};
    // add form validation
    if (this.title && this.author !== '') {
      book = {
        id: this.id,
        title: this.title,
        author: this.author,
      };
    }

    return book;
  }

  addBook() {
    const bookItem = document.createElement('tr');
    bookItem.setAttribute('id', this.id);
    const titlePara = document.createElement('td');
    titlePara.textContent = `"${this.title}" by ${this.author}`;

    const books = document.querySelector('.books');

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'delete');
    deleteButton.textContent = 'Remove';

    titlePara.appendChild(deleteButton);
    bookItem.appendChild(titlePara);
    deleteButton.addEventListener('click', () => this.removeBook());

    return books.appendChild(bookItem);
  }

  removeBook() {
    const bookList = JSON.parse(localStorage.getItem('booksList'));
    const val = bookList.filter((book) => this.id !== book.id);
    localStorage.setItem('booksList', JSON.stringify(val));
    const booksId = document.getElementById(this.id);
    return booksId.remove();
  }
}

let booksList = [];

const previousBookList = JSON.parse(localStorage.getItem('booksList'));
if (previousBookList) {
  booksList = [...previousBookList];
}

const title = document.getElementById('title');
const author = document.getElementById('author');

// add the item to localstorage
const form = document.querySelector('.add-book');
form.addEventListener('submit', (e) => {
  const myBook = new Book(title.value, author.value);
  const msg = document.querySelector('small');

  e.preventDefault();
  myBook.storeBook();

  if (title.value && author.value !== '') {
    myBook.addBook();
    booksList.push(myBook);
    msg.innerText = '';
  } else {
    msg.innerText = '* Title and Author required';
  }

  localStorage.setItem('booksList', JSON.stringify(booksList));

  form.reset();
});
const books = document.querySelector('.books');
booksList.forEach((book) => {
  const currentBooks = document.createElement('tr');

  const currentBook = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('class', 'delete');
  currentBooks.setAttribute('id', `${book.id}`);
  deleteButton.textContent = 'Remove';
  deleteButton.addEventListener('click', () => {
    const newBooksList = booksList.filter((newBook) => newBook.id !== book.id);
    localStorage.setItem('booksList', JSON.stringify(newBooksList));
    booksList = [...newBooksList];
    document.getElementById(book.id).remove();
  });
  currentBook.textContent = `"${book.title}" by ${book.author}`;
  currentBook.append(deleteButton);
  currentBooks.append(currentBook);
  books.append(currentBooks);
});

const date = new Date();
document.getElementById('date-time').innerHTML = date;
