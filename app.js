let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
    event.preventDefault();
    
    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = document.getElementById("bookPageInput").value;
    const read = document.getElementById("bookReadInput").checked;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);
}

console.log(myLibrary);