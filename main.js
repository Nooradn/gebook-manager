const bookShelf = [];

document.addEventListener("DOMContentLoaded", function () {
  const inputBook = document.getElementById("input-book");
  inputBook.addEventListener("submit", function (e) {
    e.preventDefault();
    onSubmitBook();
  });
});

function onSubmitBook() {
  const id = +new Date();
  const title = document.getElementById("input-book-title").value;
  const author = document.getElementById("input-book-author").value;
  const year = document.getElementById("input-book-year").value;
  const isComplete = document.getElementById("book-completed-check").checked;

  const bookData = {
    id, //num
    title, //str
    author, //str
    year, //num
    isComplete, //bool
  };

  const containerReading = document.getElementById("now-book-reading");
  const containerReaded = document.getElementById("readed-book-almanac");

  const containerAddedBook = document.createElement("article");
  containerAddedBook.classList.add("container-book-item");

  const addedBook = document.createElement("div");
  addedBook.innerHTML = `
    <h3>${title}</h3>
    <p>${author} - ${year}</p>`;

  const makeActionButton = document.createElement("div");
  makeActionButton.classList.add("container-action");

  if (!isComplete) {
    makeActionButton.innerHTML = `
    <button class='mark-readed-act'>Mark as Completed</button>
    <button class='delete-act'>Delete Book</button>`;
  } else {
    makeActionButton.innerHTML = `
    <button class="mark-unread-act">Unread</button>
    <button class='delete-act'>Delete Book</button>`;
  }

  containerAddedBook.append(
    addedBook,
    makeActionButton
  );

  if (!isComplete) {
    containerReading.prepend(containerAddedBook);
  } else {
    containerReaded.prepend(containerAddedBook);
  }

  bookShelf.push(bookData);
  console.log(bookShelf);
  console.log(bookData);
  return bookData;
}
