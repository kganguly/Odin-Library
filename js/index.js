document.addEventListener("DOMContentLoaded", function () {
    setListeners();
    loadData();
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

function addBookToLibrary(book, doStoreData = true) {
    myLibrary.push(book);
    if (doStoreData) storeData();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    storeData();
}

function toggleBookReadInLibrary(index) {
    const book = myLibrary[index];
    book.read = !book.read;
    storeData();
}

function storeData() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    console.log(`STORE: ${JSON.stringify(myLibrary)}`);
}

function loadData() {
    const data = localStorage.getItem("library");
    console.log(`DATA: ${data}`);
    if (!data) {
        addBookToLibrary(new Book("Wild", "Steve", 10, false));
        addBookToLibrary(new Book("Humble", "Bob", 99, false));
        addBookToLibrary(new Book("Lost", "Alice", 345, true));
    } else {
        const jsonArray = JSON.parse(data);
        for (let bookJson of jsonArray) {
            addBookToLibrary(new Book(bookJson.title, bookJson.author, bookJson.numPages, bookJson.read), false);
        }
    }
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

        let div = document.createElement("div");
        div.classList.add("readmark");
        if (book.read) div.classList.add("read");
        div.innerText = "\u2713";
        div.addEventListener("click", () => {
            toggleBookReadInLibrary(i);
            event.target.classList.toggle("read");
        });
        li.appendChild(div);

        let button = document.createElement("button");
        button.textContent = "X";
        button.classList.add("remove-button");
        button.addEventListener("click", () => {
            removeBookFromLibrary(i);
            render();
        });
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
    const form = document.forms[0];
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