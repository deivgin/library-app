const bookView = document.getElementById("app");
const addBookForm = document.getElementById("addBookForm");
const addBookButton = document.getElementById("addBookButton");
let isFormShown = false;

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const book1 = new Book("1", "1", 1, true);
const book2 = new Book("2", "2", 1, true);
const book3 = new Book("3", "3", 1, true);
myLibrary.push(book1,book2,book3)

addBookButton.addEventListener("click", ()=>{
    if(!isFormShown){
        addBookForm.style.display = "flex";
        isFormShown = true;
    }else{
        addBookForm.style.display = "none";
        isFormShown = false;
    }  
});

function addBookToLibrary(event) {
    event.preventDefault();
    
    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = document.getElementById("bookPageInput").value;
    const read = document.getElementById("bookReadInput").checked;

    myLibrary.push(new Book(title, author, pages, read));
    
    render();
}

function createBookEntry({title, author, pages, read}){
    const entry = document.createElement("div");
    entry.classList.add("library");

    const bookTitle = document.createElement("h2");
    bookTitle.innerHTML = title;
    bookTitle.classList.add("library__title");
    entry.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `Written by ${author}`;
    entry.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.innerHTML = `${pages.toString()} pages`;
    entry.appendChild(bookPages);

    const bookReadingStatus = document.createElement("p");
    bookReadingStatus.innerHTML = read ? "Read" : "Not read";
    bookReadingStatus.classList.add(read ? "library__reading-status--read" : "library__reading-status--not-read");
    entry.appendChild(bookReadingStatus);
    
    
    return entry;
}

function render(){

    if(myLibrary.length == 0){
        const emptyEntry = document.createElement("div");
        emptyEntry.classList.add("library");
        const emptyEntryTitle = document.createElement("h2");
        emptyEntryTitle.innerHTML = "No Entries";
        emptyEntryTitle.classList.add("library__title");
        emptyEntry.appendChild(emptyEntryTitle);
        bookView.appendChild(emptyEntry);
    }else{
        bookView.innerHTML = "";

        myLibrary.map(item => {
            bookView.appendChild(createBookEntry(item))
        });
    }
    
}

render();


