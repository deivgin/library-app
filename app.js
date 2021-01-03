//get needed DOM elements
const bookView = document.getElementById("app");
const addBookForm = document.getElementById("addBookForm");
const addBookButton = document.getElementById("addBookButton");

//variables
let isFormShown = false;
let myLibrary = [];

//Book object constructor
function Book(title, author, pages, read) {
  this.id = Date.now();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


//Add book button event listener
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
    
    //get values of form
    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = document.getElementById("bookPageInput").value;
    const read = document.getElementById("bookReadInput").checked;

    //add new book to librart array based on form values
    myLibrary.push(new Book(title, author, pages, read));

    //reset add book form
    addBookForm.style.display = "none";
    isFormShown = false;
    addBookForm.reset();
    
    //render the library
    render();
    
}

function createBookEntry({id, title, author, pages, read}){
    //create entry DOM element
    const entry = document.createElement("div");
    entry.setAttribute("id", id.toString());
    entry.classList.add("library");

    //create Title
    const bookTitle = document.createElement("h2");
    bookTitle.innerHTML = title;
    bookTitle.classList.add("library__title");
    entry.appendChild(bookTitle);

    //create author
    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `Written by ${author}`;
    entry.appendChild(bookAuthor);

    //create pages
    const bookPages = document.createElement("p");
    bookPages.innerHTML = `${pages.toString()} pages`;
    entry.appendChild(bookPages);

    //create reading status
    const bookReadingStatus = document.createElement("button");
    bookReadingStatus.innerHTML = read ? "Read" : "Not read";
    bookReadingStatus.classList.add("library__reading-status");
    bookReadingStatus.classList.add(read ? "library__reading-status--read" : "library__reading-status--not-read");
    entry.appendChild(bookReadingStatus);

    bookReadingStatus.addEventListener("click", (event) => {
        //find the object in our array
        const foundLibraryElement = myLibrary.find( ({id}) => id == event.target.parentElement.id );
        //if to change the targeted entry reading status
        if(foundLibraryElement.read == true){
            //change reading status in array
            foundLibraryElement.read = false;
            //change the class and inner html of selected entry (not object but DOM element)
            event.target.classList.remove("library__reading-status--read");
            event.target.classList.add("library__reading-status--not-read");
            event.target.innerHTML = "Not read";
        }else if(foundLibraryElement.read == false){
            foundLibraryElement.read = true;
            event.target.classList.remove("library__reading-status--not-read");
            event.target.classList.add("library__reading-status--read");
            event.target.innerHTML = "Read";
        }
    });

    //create delete button
    const deleteButton = document.createElement("Button");
    deleteButton.setAttribute("id", "deleteEntryButton");
    deleteButton.classList.add("library__delete-button", "fa", "fa-trash");
    entry.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        const foundLibraryElement = myLibrary.find( ({id}) => id == event.target.parentElement.id );
        const index = myLibrary.indexOf(foundLibraryElement);
        myLibrary.splice(index, 1);
        render();
        
    });
    
    
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


