{
    'use strict';

    render();
    initActions();
    addToFavorite();

    /* create reference to .book-list and template*/
    const bookContainer = document.querySelector('.books-list');
    const templateBook = document.querySelector('#template-book');
    const favoriteBooks = [];

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
        const thisBook = this;
        /* prepare reference to list of all elements book_image in booksList list */
        const books = bookContainer.querySelectorAll('.book_image');
        /* walk through every element in the list */
        for (let book in books) {
            /* add EventListener to each item in the list */
            book.addEventListener('dbclick', function (event) {
                /* prevent default action */
                event.preventDefault();
                /* add class favorite to every cdbclicked element */
                book.classList.add('favorite');
                /* get id from data-id id of the element */
                const dataId = book.getAttribute('data-id');
                /* add this id to favoriteBooks array */
                favoriteBooks.push(dataId);
            });
        }
    }
    function addToFavorite() {
    }
}