const books = [];
const RENDER_EVENT = 'render-book';

function generateID() {
    return +new Date();
}

  function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
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

function inputBook(bookObject) {
    const {id, title, author, year, isCompleted} = bookObject;

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("h4");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("card");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("item");
    container.append(textContainer);
    container.setAttribute("id", `book-${id}`);

    if (isCompleted) {
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.addEventListener("click",
        function() {
            readBookFromCompleted(id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            removeBookFromCompleted(id);
        });

        container.append(readButton, deleteButton);
    } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");
        checkButton.addEventListener("click",
        function() {
            addBookToCompleted(id);
        });

        container.append(checkButton);
    }
    return container;
}

function addBook() {
    const titleBook = document.getElementById("title").value;
    const authorBook = document.getElementById("author").value;
    const yearBook = document.getElementById("year").value;

    const generateID = generateID()
    const bookObject = generateBookObject(generateID, titleBook, authorBook, yearBook, false)

    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById("form");

    submitForm.addEventListener('submit', function(event) {
        event.preventDefault()
        addBook();
    });
});

document.addEventListener(RENDER_EVENT, function() {
    console.log(books);
});

