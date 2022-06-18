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

function dataBook() {
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