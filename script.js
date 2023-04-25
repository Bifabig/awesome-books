const booksContainer = document.querySelector('.books');
const submitBtn = document.querySelector('.add-book');
// const removeBtn = document.getElementById('remove');
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;

const books = [];

const booksMethod = () => {
  books.map((books) => {
    const postElement = document.createElement('div');
    postElement.classList.add('book');
    postElement.innerHTML = `
      <h2>${books.title}</h2>
      <h3>${books.author}</h3>
      <button>remove</button>
      `;
    return booksContainer.appendChild(postElement);
  });
};

function addBook(title, author) {
  books.push({ title, author });
}

// function removeBook(index) {
//   // use array.filter()
//   return books.filter(index);
// }

submitBtn.addEventListener('submit', addBook(title, author));
// removeBtn.addEventListener('click', removeBook);
booksMethod();
