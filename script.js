class Book {
  constructor(title, author) {
    this.id = Math.random() * 1000;
    this.title = title;
    this.author = author;
  }

  storeBook() {
    let book = {};
    if (this.title && this.author !== "") {
      book = {
        id: this.id,
        title: this.title,
        author: this.author,
      };
    }

    return book;
  }

  addBook() {
    const bookItem = document.createElement("p");
    bookItem.setAttribute("id", this.id);
    const titlePara = document.createElement("p");
    titlePara.textContent = this.title;
    const authorPara = document.createElement("p");
    authorPara.textContent = this.author;

    const lineBreak = document.createElement("hr");

    const books = document.querySelector(".books");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.textContent = "Remove";

    bookItem.appendChild(titlePara);
    bookItem.appendChild(authorPara);
    bookItem.appendChild(deleteButton);
    bookItem.appendChild(lineBreak);

    deleteButton.addEventListener("click", () => {
      this.removeBook(this.id);
      books.removeChild(bookItem);
    });

    return books.appendChild(bookItem);
  }

  removeBook(id) {
    const newArray = JSON.parse(localStorage.getItem("booksList"));
    const filteredArray = newArray.filter((book) => book.id !== id);
    localStorage.setItem("booksList", JSON.stringify(filteredArray));
  }
}

let booksList = [];

window.onload = () => {
  booksList = JSON.parse(localStorage.getItem("booksList")) || [];
  booksList.forEach((book) => {
    const newBook = new Book(book.title, book.author);
    newBook.id = book.id;
    newBook.addBook();
  });
};

const title = document.getElementById("title");
const author = document.getElementById("author");

// add the item to localstorage
const form = document.querySelector(".add-book");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const book = new Book(title.value, author.value);
  book.storeBook();

  book.addBook();
  booksList.push(book);
  localStorage.setItem("booksList", JSON.stringify(booksList));

  form.reset();
});
