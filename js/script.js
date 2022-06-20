const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF';

function generateID() {
  return +new Date();
}

function generateBookObject(id, title, author, year,isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

function findBook(bookID) {
  for (bookItem of books) {
    if (bookItem.id === bookID) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookID) {
  for (index in books) {
    if (books[index].id === bookID) {
      return index;
    }
  }
  return -1;
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }


function inputBook(bookObject) {
  const {id, title, author, year, isCompleted} = bookObject;

  const textTitle = document.createElement('h2');
  textTitle.innerText = title;

  const textAuthor = document.createElement('h3');
  textAuthor.innerText = author;

  const textYear = document.createElement('p');
  textYear.innerText = year;

  const textContainer = document.createElement('div');
  textContainer.classList.add('card');
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement('div');
  container.classList.add('item');
  container.append(textContainer);
  container.setAttribute('id', `book-${id}`);

  if (isCompleted) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      removeBookFromCompleted(id);
      alert("Dihapus");
    });
    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.addEventListener('click', function () {
      readBookFromCompleted(id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.append(deleteButton, readButton);
  
    container.append(buttonContainer);
  } else {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      removeBookFromCompleted(id);
      alert("Dihapus");
    });

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addBookToCompleted(id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.append(deleteButton, checkButton);

    container.append(buttonContainer);
  }

  return container;
}


function addBook() {
  const titleBook = document.getElementById('title').value;
  const authorBook = document.getElementById('author').value;
  const yearBook = document.getElementById('year').value;

  const generatedID = generateID();
  const bookObject = generateBookObject(generatedID, titleBook, authorBook, yearBook, false);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToCompleted(bookID) {
  const bookTarget = findBook(bookID);
  if (bookTarget == null) return;
  bookTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBookFromCompleted(bookID) {
  const bookTarget = findBookIndex(bookID);
  if (bookTarget === -1) return;
  books.splice(bookTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function readBookFromCompleted(bookID) {
  const bookTarget = findBook(bookID);
  if (bookTarget == null) return;
  bookTarget.isCompleted = false;
  
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

  document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
    console.log('Data berhasil di simpan.');
});

document.addEventListener(RENDER_EVENT, function () {
  const readingBook = document.getElementById('reads');
  const redBook = document.getElementById('completed');

  readingBook.innerHTML = '';
  redBook.innerHTML = '';

  for (bookItem of books) {
    const bookElement = inputBook(bookItem);
    if (bookItem.isCompleted) {
      redBook.append(bookElement);
    } else {
      readingBook.append(bookElement);
    }
  }
});

