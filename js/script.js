const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, pages, hasRead));
}

function showBooks() {
    myLibrary.forEach(book => console.log(book));
}


