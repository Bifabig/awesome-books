let booksList = [];

const form = document.querySelector('.add-book');
const books = document.querySelector('.books');
const title = document.getElementById('title');
const author = document.getElementById('author');

// add the book to the view page
const addBook = (book) => {
  const bookItem = document.createElement('p');
  bookItem.setAttribute('id', book.id);

  const titlePara = document.createElement('p');
  titlePara.textContent = book.title;

  const authorPara = document.createElement('p');
  authorPara.textContent = book.author;

  const lineBreak = document.createElement('hr');

  function removeBook(bookId) {
    const newArray = booksList.filter((book) => book.id !== bookId);
    localStorage.setItem('booksList', JSON.stringify(newArray));

    const booksId = document.getElementById(bookId);
    booksId.remove();

    booksList = newArray;
  }

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('class', 'delete');
  deleteButton.textContent = 'Remove';
  deleteButton.addEventListener('click', () => removeBook(book.id));

  bookItem.appendChild(titlePara);
  bookItem.appendChild(authorPara);
  bookItem.appendChild(deleteButton);
  bookItem.appendChild(lineBreak);

  books.appendChild(bookItem);
};

// load books from local storage
const loadBooks = () => {
  const storedBooks = localStorage.getItem('booksList');
  if (storedBooks !== null) {
    booksList = JSON.parse(storedBooks);
    booksList.forEach((book) => {
      addBook(book);
    });
  }
};

// add the item to localstorage
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (title.value && author.value !== '') {
    const book = {
      id: Math.random() * 1000,
      title: title.value,
      author: author.value,
    };

    addBook(book);

    booksList.push(book);
    localStorage.setItem('booksList', JSON.stringify(booksList));

    form.reset();
  }
});

loadBooks();
