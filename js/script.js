const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".section-header button");
const closeDialogBtn = document.querySelector("dialog>img");
const submitBtn = document.getElementById("submit");

const form = document.querySelector("form");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookReadStatus = document.getElementById("has-read");

const cardContainer = document.querySelector(".card-container");
const placeholder = document.querySelector(".placeholder");

const myLibrary = [];


function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.toggleReadStatus = function () {
        if (this.hasRead) {
            this.hasRead = false;
        }
        else {
            this.hasRead = true;
        }
    };
}

function addBookToLibrary(title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, Number(pages), hasRead === "true" ? true : false));
}

function createCard(book) {
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

    closeBtn.addEventListener("click", e => {
        let index = Array.from(cardContainer.children).indexOf(cardDiv);
        cardDiv.remove();
        myLibrary.splice(index, 1);

        updatePlaceholder();
    });

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
    readButton.addEventListener("click", e => {
        book.toggleReadStatus();
        readButton.classList.toggle("read");
        statusDiv.classList.toggle("read");

        if (book.hasRead) {
            e.target.textContent = "Read";
        }
        else {
            e.target.textContent = "Not read";
        }

        console.log(book);
    });
    cardDiv.appendChild(readButton);

    return cardDiv;
}

function addCard(book) {
    cardContainer.appendChild(createCard(book));
}

function updatePlaceholder() {
    if (myLibrary.length > 0) {
        placeholder.style.display = "none";
    }
    else {
        placeholder.style.display = "block";
    }
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
        updatePlaceholder();
        form.reset();
    }
});
