const bookView = document.getElementById("app");
const addBookForm = document.getElementById("addBookForm");
const addBookButton = document.getElementById("addBookButton");

let isFormShown = false;

let myLibrary = [
    {
        id: 1,
        title: "Book 1",
        author: "Author 1",
        pages: 10,
        read: false
    },
    {
        id: 2,
        title: "Book 2",
        author: "Author 2",
        pages: 20,
        read: true
    },
    {
        id: 3,
        title: "Book 3",
        author: "Author 3",
        pages: 30,
        read: false
    }
];

function Book(title, author, pages, read) {
  this.id = Date.now();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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
    //Close add book form
    addBookForm.style.display = "none";
    isFormShown = false;
    
    //get values of form
    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = document.getElementById("bookPageInput").value;
    const read = document.getElementById("bookReadInput").checked;

    //add new book to librart array based on form values
    myLibrary.push(new Book(title, author, pages, read));

    //render the library
    render();
    
}

function createBookEntry({id, title, author, pages, read}){
    const entry = document.createElement("div");
    entry.setAttribute("id", id.toString());
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

    const deleteButton = document.createElement("Button");
    deleteButton.setAttribute("id", "deleteEntryButton");
    deleteButton.classList.add("library__delete-button", "fa", "fa-trash");
    entry.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        const foundLibraryElement = myLibrary.find( ({id}) => id == event.target.parentElement.id );
        const index = myLibrary.indexOf(foundLibraryElement);
        myLibrary.splice(index, 1);
        render();
        
    })
    
    
    return entry;
}

function render(){

    if(myLibrary.length == 0){
        bookView.innerHTML = "";
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


