const myLibrary = [];

function Book(title, genre, author, pages, hasRead) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, genre, author, pages, hasRead) {
    myLibrary.push(new Book(title, genre, author, pages, hasRead));
}

function showBooks() {
    myLibrary.forEach(book => console.log(book));
}


