// Main JS

// book array data
const allShelves = [];

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

  allShelves.push(bookData);

  createBookElement(bookData);

  // console.log(`added new book | total book is ${allShelves.length}`);
  return bookData;
}

// -----------------------------------------------

// create a book html element
function createBookElement(item) {
  const containerAddedBook = document.createElement("article");
  containerAddedBook.classList.add("container-book-item");

  // create book description elements
  const bookDescElement = document.createElement("div");
  bookDescElement.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.author} - ${item.year}</p>`;

  // build button templates
  const actionButtons = document.createElement("div");
  actionButtons.classList.add("container-action");

  const markReadBtn = document.createElement("button");
  markReadBtn.classList.add("mark-readed-act");
  markReadBtn.innerText = "Mark Read";
  markReadBtn.addEventListener("click", function () {
    markRead(item);
    console.log("clicked markRead", item.id);
  });

  const markUnreadBtn = document.createElement("button");
  markUnreadBtn.classList.add("mark-unread-act");
  markUnreadBtn.innerText = "Mark Unread";
  markUnreadBtn.addEventListener("click", function () {
    markUnread(item);
    console.log("clicked markUnread", item.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-act");
  deleteBtn.innerText = "Delete Book";
  deleteBtn.addEventListener("click", function () {
    deleteItem(item);
    console.log("clicked deleteItem", item.id);
  });

  // if-else logics to build html element
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
  } else {
    hasReadedContainer.prepend(containerAddedBook);
  }
}

// reset and regenerate html elements container
function regenerateElement() {
  nowReadingContainer.innerHTML = "";
  hasReadedContainer.innerHTML = "";
  // const
  for (item of allShelves) {
    createBookElement(item);
  }
  // console.log("total book is", allShelves.length);
}

// button funcion action trigger
function markRead(item) {
  item.isComplete = true;
  regenerateElement();
}

function markUnread(item) {
  item.isComplete = false;
  regenerateElement();
}

function deleteItem(item) {
  for (let i = 0; i < allShelves.length; i++) {
    if (allShelves[i].id == item.id) {
      allShelves.splice(i, 1);
    }
    regenerateElement();
  }
}
