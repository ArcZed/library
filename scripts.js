const myLibrary = [];

const content = document.querySelector('.content');
const card = document.querySelector('.card');
const button = document.querySelector('button');
const label = document.querySelector('.title')
const info = document.querySelector('.info');

button.addEventListener('click', (e) => {
    addBookToLibrary();
})

//Book constructor
function Book(title, author, pages, status){
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function (){
        return `${this.title} written by ${this.author} is ${this.pages} pages long, ${this.status}.`
    }
}
//Add book the array
function addBookToLibrary(){

    let title = prompt("Title of the book: ");
    let author = prompt("Author of the book: ");
    let pages = prompt("How many pages in the book: ");
    let status = prompt("Have read the book: ", "Read/ Not Read");

    myLibrary.push(new Book(title, author, pages, status));

    myLibrary.forEach((book) => {
        label.textContent = `${title}`;
        info.textContent = book.info();
    });
}

