{
    'use strict';

    /* create reference to .book-list and template*/
    const bookContainer = document.querySelector('.books-list');
    const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const favoriteBooks = [];

    render();
    initActions();
    addToFavorite();

    /* create function 'render' */
    function render() {
        const thisBook = this;
        /* walk through every element in dataSource.books */
        for (let elem in dataSource.books) {
            /* generate HTML code based on template and each book data */
            const generatedHTML = templateBook(dataSource.books[elem]);
            /* generate DOM element based on generated HTML */
            thisBook.element = utils.createDOMFromHTML(generatedHTML);
            /* add generated DOM element as a child element to the .books-list */
            bookContainer.appendChild(thisBook.element);
        }
    }
    /* Add initAcions function */
    function initActions() {
        /* prepare reference to list of all elements book__image in booksList list */
        const books = bookContainer.querySelectorAll('.book__image');
        /* walk through every element in the list */
        for (let book of books) {
            /* add EventListener to each item in the list */
            book.addEventListener('dblclick', function (event) {
                /* prevent default action */
                event.preventDefault();
                console.log('element clicked');
                /* check if book isn't in avorite list */
                if(!book.classList.contains('favorite')){
                    /* add class favorite to every dbclicked element */
                book.classList.add('favorite');
                /* get id from data-id id of the element */
                const dataId = book.getAttribute('data-id');
                /* add this id to favoriteBooks array */
                favoriteBooks.push(dataId);
                } 
                else {
                    /* remove book from favoriteBooks array */
                    favoriteBooks.splice(book, 1);
                    /* remove class favorite from book */
                    book.classList.remove('favorite');
                }
                console.log(favoriteBooks);
            });
        }
    }
    function addToFavorite() {
    }
}