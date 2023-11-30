const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".section-header button");
const closeDialogBtn = document.querySelector("dialog>div>div>button");
const submitBtn = document.getElementById("submit");

const form = document.querySelector("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookReadStatus = document.getElementById("has-read");

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = myLibrary.length;
}

function addBookToLibrary(title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, Number(pages), hasRead === "true" ? true : false));
}

function showBooks() {
    myLibrary.forEach(book => console.log(book));
}


addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

submitBtn.addEventListener("click", (e) => {
    if (bookTitle.value === '' || bookAuthor.value === '') {
        alert("Please insert the book title and author name")
    }
    else {
        e.preventDefault();
        dialog.close();
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.value);
        form.reset();
    }
});

