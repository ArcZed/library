const myLibrary = [];
const body = document.querySelector('body');
const content = document.querySelector('.content');
// const card = document.querySelector('.card');
// const button = document.querySelector('button');
// const label = document.querySelector('.title')
// const info = document.querySelector('.info');

const newBook = document.querySelector('.newBook');

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector('#closeBtn');
const submitBtn = document.querySelector('#submitBtn');

const btitle = document.querySelector('#btitle');
const bauthor = document.querySelector('#bauthor');
const bpages = document.querySelector('#bpages');
const bnotes = document.querySelector('#bnotes');
const bstatus = document.querySelector("#bstatus").value;
const deleteBtn = document.querySelector(".deleteBtn");

let book;
//show the dialog
newBook.addEventListener('click', (e) => {
    dialog.style.display = "block";
    dialog.showModal();
});

document.addEventListener('keydown', (e)=> {
    switch (e.code)  {
        case "Escape": 
        dialog.style.display = "none";
        dialog.close("default");
        break;
        case "Enter":
            e.preventDefault(); 
            book = new Book(btitle.value, bauthor.value, bpages.value, bnotes.value);
            myLibrary.push();
            dialog.close(myLibrary);
        break;
        default:
        break;
    }
});

closeBtn.addEventListener('click', (e) => {
    dialog.close("default");
    dialog.style.display = "block";
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    //store the input into the library array and submit it
    dialog.close(myLibrary);
});

dialog.addEventListener('close', (e) => {
    if(dialog.returnValue === "default"){
        //no input
        console.log("closed without inputting");
    }
    else{
        //accept input and run the addBook function
        book = new Book(btitle.value, bauthor.value, bpages.value, bnotes.value, myLibrary.length)
        myLibrary.push(book);
        addBookToLibrary();
        console.log('running');
    }
    dialog.style.display = "none";
});
//change status listener

//Book constructor
function Book(title, author, pages, notes, index){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;
    this.index = index;
}

function addBookToLibrary(){

    let bookIndex;

    //check read status

    //create a card for each book
    const card = document.createElement("div");
    card.className = "card";
    content.appendChild(card);

    const title = document.createElement("div");
    title.className = "title";
    card.appendChild(title);
    const author = document.createElement("div");
    author.className = "author";
    card.appendChild(author);
    const pages = document.createElement("div");
    pages.className = "pages";
    card.appendChild(pages);
    const notes = document.createElement("div");
    notes.className = "notes";
    card.appendChild(notes);
    const changeStatusBtn = document.createElement("div");
    changeStatusBtn.className = "changeStatus";
    card.appendChild(changeStatusBtn);
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "deleteBtn";
    card.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", (e)=>{
        content.removeChild(deleteBtn.parentElement);
        console.log(myLibrary[bookIndex].index);
        myLibrary.splice(myLibrary[bookIndex], 1)
    })

    myLibrary.forEach((book ) => {
        title.textContent = book.title;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        notes.textContent = `Notes: ${book.notes}`;
        changeStatusBtn.textContent = `Change status: Read`;
        deleteBtn.textContent = `Delete`;
        bookIndex = book.index
        console.log(book);
    });
}

function changeReadStatus(){

    haveRead? changeStatusBtn.textContent = "Change status: Read" : 
              changeStatusBtn.textContent = "Change status: Not read";
    haveRead = !haveRead

}


function deleteBookCard(){
    
}

