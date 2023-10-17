// Main JS

// book array data
const nowReadingShelf = [];
const hasReadedShelf = [];

// book html container
const nowReadingContainer = document.getElementById("now-book-reading");
const hasReadedContainer = document.getElementById("readed-book-almanac");

// -----------------------------------------------

// start from here
document.addEventListener("DOMContentLoaded", function () {
  const inputBook = document.getElementById("input-book");
  inputBook.addEventListener("submit", function (e) {
    e.preventDefault();
    addNewBook();
  });
});

// -----------------------------------------------

// submit book button - add new book
function addNewBook() {
  const id = +new Date();
  const title = document.getElementById("input-book-title").value;
  const author = document.getElementById("input-book-author").value;
  const year = document.getElementById("input-book-year").value;
  const isComplete = document.getElementById("book-completed-check").checked;

  // prepare data
  const bookData = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  // push data to relevant shelves
  if (!isComplete) {
    nowReadingShelf.push(bookData);
  } else {
    hasReadedShelf.push(bookData);
  }

  createBookElement(bookData);

  console.log({ nowReadingShelf, hasReadedShelf });
  return bookData;
}

// -----------------------------------------------

// create book html element
function createBookElement(item) {
  const containerAddedBook = document.createElement("article");
  containerAddedBook.classList.add("container-book-item");

  // create book desc
  const bookDescElement = document.createElement("div");
  bookDescElement.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.author} - ${item.year}</p>`;

  // button thingy
  const actionButtons = document.createElement("div");
  actionButtons.classList.add("container-action");

  const markReadBtn = document.createElement("button");
  markReadBtn.classList.add("mark-readed-act");
  markReadBtn.innerText = "Mark Read";

  const markUnreadBtn = document.createElement("button");
  markUnreadBtn.classList.add("mark-unread-act");
  markUnreadBtn.innerText = "Mark Unread";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-act");
  deleteBtn.innerText = "Delete Book";

  if (!item.isComplete) {
    actionButtons.appendChild(markReadBtn);
    actionButtons.appendChild(deleteBtn);
  } else {
    actionButtons.appendChild(markUnreadBtn);
    actionButtons.appendChild(deleteBtn);
  }

  containerAddedBook.appendChild(bookDescElement);
  containerAddedBook.appendChild(actionButtons);

  if (!item.isComplete) {
    nowReadingContainer.prepend(containerAddedBook);
    nowReadingShelf.push(item);
  } else {
    hasReadedContainer.prepend(containerAddedBook);
    hasReadedShelf.push(item);
  }
}
