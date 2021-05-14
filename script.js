let myLibrary = [];
textContainer = document.querySelector(".text-container");

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages,
    this.read = read;
    };

Book.prototype.info = function() {
  const infostring = this.title + ", " + this.author + ", " +
  this.pages + " pages, " + this.read;
  return infostring;
};

Book.prototype.displayBook = function() {
  const div = document.createElement("div");
  div.classList.add("book-container");
  var att = document.createAttribute("data-index")
  att.value = myLibrary.indexOf(this);
  div.setAttributeNode(att);
  //display book info
  const p = document.createElement("p");
  p.classList.add("book-info");
  p.textContent = this.info();
  div.appendChild(p);
  //add remove book button
  const removeButton = document.createElement("button");
  removeButton.classList.add("book-remove");
  removeButton.innerText = "Remove Book";
  div.appendChild(removeButton);
  const readButton = document.createElement("button");
  readButton.classList.add("read-status");
  readButton.innerText = "Change Read Status";
  div.appendChild(readButton);
  textContainer.appendChild(div);
};

Book.prototype.addBookToLibrary = function() {
  myLibrary.push(this);
};

Book.prototype.changeReadStatus = function() {
  this.read = !this.read;
}

function removeBookFromLibrary (index) {
  if (index > -1) {
  myLibrary.splice(index, 1);
};
};

function refreshBooks(myLibrary) {
  while (textContainer.firstChild) {
    textContainer.removeChild(textContainer.firstChild);
  }
  myLibrary.forEach(function (book) {
    book.displayBook();
  });
  removeButtons = document.querySelectorAll(".book-remove");
  removeButtons.forEach(function(removeButton) {
    removeButton.addEventListener("click", function(){
      const bookIndex = event.target.parentNode.getAttribute("data-index")
      removeBookFromLibrary(bookIndex);
      refreshBooks(myLibrary)
    });
  });
  readButtons = document.querySelectorAll(".read-status");
  readButtons.forEach(function(readButton) {
    readButton.addEventListener("click", function() {
      const bookIndex = event.target.parentNode.getAttribute("data-index")
      myLibrary[bookIndex].changeReadStatus();
      refreshBooks(myLibrary);
    })
  })
}
//initialize page
const hobbit = new Book ("The Hobbit","J.R.R Tolkien",288,true);
const pearlsOfLutra = new Book ("Pearls of Lutra", "Brian Jacques", 375, true);
const hamlet = new Book ("Hamlet", "William Shakespeare", 104,false);
hobbit.addBookToLibrary();
pearlsOfLutra.addBookToLibrary();
hamlet.addBookToLibrary();
refreshBooks(myLibrary);

document.getElementById("new-book").addEventListener("click", function() {
  const newTitle = prompt("Enter book title: ");
  const newAuthor = prompt("Enter book author: ");
  const newPages = prompt("How many pages?");
  const newRead = confirm("Have you read this book? Click OK if yes or Cancel if no");
  newBook = new Book(newTitle, newAuthor, newPages, newRead);
  newBook.addBookToLibrary();
  refreshBooks(myLibrary);
});
