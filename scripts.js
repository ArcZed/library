const myLibrary = [];
const body = document.querySelector('body');
const content = document.querySelector('.content');

const newBook = document.querySelector('.newBook');

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector('#closeBtn');
const submitBtn = document.querySelector('#submitBtn');

const btitle = document.querySelector('#btitle');
const bauthor = document.querySelector('#bauthor');
const bpages = document.querySelector('#bpages');
const bnotes = document.querySelector('#bnotes');
const bstatus = document.querySelector("#bstatus");
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
            dialog.close(bstatus.checked);
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

    dialog.close(bstatus.checked);
});

dialog.addEventListener('close', (e) => {
    if(dialog.returnValue === "default"){
        //no input
        console.log("closed without inputting");
    }
    else{
        //accept input and run the addBook function
        let bookStatus = dialog.returnValue;
        book = new Book(btitle.value, bauthor.value, bpages.value, bnotes.value, bookStatus)
        myLibrary.push(book);
        addBookToLibrary();
        console.log(myLibrary);
    }

    //reset dialog
    dialog.style.display = "none";
    let input = dialog.querySelectorAll("input");
    input.forEach((item) => {
        item.value = "";
    })
    dialog.querySelector("textarea").value = "";
    bstatus.checked = false;
});

//Book constructor
function Book(title, author, pages, notes, status){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;
    status === "true" ? this.status = true : this.status = false;

}

function addBookToLibrary(){

    content.innerHTML = "";

    //create a card for each book
    myLibrary.forEach((book) => {
        
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

        title.textContent = book.title;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        notes.textContent = `Review: ${book.notes}`;

        if (book.status) {changeStatusBtn.textContent = `Status: Read`;}
        else             {changeStatusBtn.textContent = `Status: Not Read`;}

        deleteBtn.textContent = `Delete`;

        book.index = myLibrary.indexOf(book);
        card.setAttribute("index", `${book.index}`);

        //add delete button
        deleteBtn.addEventListener("click", (e)=>{
            deleteBook(deleteBtn, card);
        });

        //add change status button
        changeStatusBtn.addEventListener("click", (e) =>{
            book.status = !book.status;
            console.log(myLibrary);
            addBookToLibrary();
        });
});
}


function deleteBook (deleteBtn, card){

    myLibrary.splice(deleteBtn.parentElement.getAttribute("index"), 1);
    
    myLibrary.forEach((book) => {
        book.index = myLibrary.indexOf(book);
        card.setAttribute("index", `${book.index}`);
    })
    addBookToLibrary();

}
