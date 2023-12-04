const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".section-header button");
const closeDialogBtn = document.querySelector("dialog>img");
const submitBtn = document.getElementById("submit");

const form = document.querySelector("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookReadStatus = document.getElementById("has-read");

const cardContainer = document.querySelector(".card-container")

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = myLibrary.length;

    this.toggleReadStatus = function () {
        if (hasRead) {
            hasRead = false;
        }
        else {
            hasRead = true;
        }
    };
}

function addBookToLibrary(title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, Number(pages), hasRead === "true" ? true : false));
}

function showBooks() {
    myLibrary.forEach(book => console.log(book));
}

function createCard(book) {
    // Create Card Div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status");
    if (book.hasRead) {
        statusDiv.classList.add("read");
    }
    cardDiv.appendChild(statusDiv);

    const closeBtn = document.createElement("img");
    closeBtn.src = "../img/close-thick.png";
    closeBtn.alt = "remove button";
    cardDiv.appendChild(closeBtn);

    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = book.title;
    cardDiv.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("author");
    author.innerText = `by ${book.author}`;
    cardDiv.appendChild(author);

    const pages = document.createElement("p");
    pages.innerText = `${book.pages} pages`;
    cardDiv.appendChild(pages);

    const readButton = document.createElement("button");
    if (book.hasRead) {
        readButton.classList.add("read");
        readButton.innerText = "Read";
    }
    else {
        readButton.innerText = "Not read";
    }
    readButton.addEventListener("click", (e) => {
        book.toggleReadStatus();
        readButton.classList.toggle("read");
        statusDiv.classList.toggle("read");

        if (book.hasRead) {
            readButton.innerText = "Read"
        }
        else {
            readButton.innerText = "Not read"
        }
    });
    cardDiv.appendChild(readButton);

    return cardDiv;
}

function addCard(book) {
    cardContainer.appendChild(createCard(book));
}

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

submitBtn.addEventListener("click", (e) => {
    if (bookTitle.value === '' || bookAuthor.value === '' || bookPages.value === '') {
        //pass
    }
    else {
        e.preventDefault();
        dialog.close();
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.value);
        addCard(myLibrary[myLibrary.length - 1]);
        form.reset();
    }
});

dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close()
    }
});

