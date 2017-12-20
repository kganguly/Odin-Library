document.addEventListener("DOMContentLoaded", function () {
    setListeners();
    addBookToLibrary(new Book("Wild", "Steve", 10, false));
    addBookToLibrary(new Book("Humble", "Bob", 99, false));
    addBookToLibrary(new Book("Lost", "Alice", 345, true));
    render();
});

let myLibrary = [];

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    render();
}

function render() {
    const el = document.getElementById("books");
    const bookNodes = document.createDocumentFragment();
    for (let i in myLibrary) {
        const book = myLibrary[i];
        const li = document.createElement("li");
        li.classList.add("book");
        let p = document.createElement("p");
        p.classList.add("title");
        p.textContent = book.title;
        li.appendChild(p);
        p = document.createElement("p");
        p.textContent = book.author;
        li.appendChild(p);
        p = document.createElement("p");
        p.textContent = book.numPages;
        li.appendChild(p);
        p = document.createElement("p");
        p.textContent = book.read ? "Read" : "Unread";
        li.appendChild(p);
        let button = document.createElement("button");
        button.textContent = "X";
        button.addEventListener("click", () => removeBookFromLibrary(i));
        li.appendChild(button);
        bookNodes.appendChild(li);
    }
    el.innerHTML = "";
    el.appendChild(bookNodes);
}

function setListeners() {
    const addBtn = document.getElementById("newBookBtn");
    addBtn.addEventListener("click", showModal);
    window.addEventListener("click", windowOnClick);
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", processForm);
}

function windowOnClick(event) {
    if (event.target === document.getElementsByClassName("modal")[0]) {
        hideModal();
    }
}

function processForm(event) {
    event.preventDefault();
    const elements = event.target.elements;
    addBookToLibrary(new Book(elements.title.value, elements.author.value, elements.numPages.value, elements.read.checked));
    hideModal();
    render();
}

function showModal() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.add("show-modal");
    document.getElementById("new-title").focus();
}

function hideModal() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.remove("show-modal");
}