const books = [];
const RENDER_EVENT = 'render-book';

function generateID() {
    return +new Date();
}

  function generateInputObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    }
}

function makeData(bookObject) {
    const {id, title, author, year, isCompleted} = bookObject;

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textTimestamp = document.createElement("h4");
    textTimestamp.innerText = author

    const textAuthor = document.createElement("p");
    textAuthor.innerText = year;

    const dataCard = document.createElement("div");
    dataCard.classList.add("card");
    dataCard.append(textTitle, textTimestamp, textAuthor);

    const container = document.createElement("div");
    container.classList.add("container");
    container.append(dataCard);
    container.setAttribute("id", `book-${id}`);
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    const generateID = generateID()
    const inputData = generateInputObject(generateID, title, author, year, false)

    books.push(inputData);

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

