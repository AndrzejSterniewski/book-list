{
    'use strict';

    /* create reference to .book-list and template*/
    const bookContainer = document.querySelector('.books-list');
    const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const filtersForm = document.querySelector('.filters');
    const favoriteBooks = [];
 //   const filters = [];

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
        //    const books = bookContainer.querySelectorAll('.book__image');
        bookContainer.addEventListener('dblclick', function (event) {
            /* prevent default action */
            event.preventDefault();
            console.log('element clicked', event.target);
            /* check if book isn't in avorite list */
            if (event.target.offsetParent.classList.contains('book__image')) {
                if (!event.target.offsetParent.classList.contains('favorite')) {
                    /* add class favorite to every dbclicked element */
                    event.target.offsetParent.classList.add('favorite');
                    /* get id from data-id id of the element */
                    const dataId = event.target.offsetParent.getAttribute('data-id');
                    /* add this id to favoriteBooks array */
                    favoriteBooks.push(dataId);
                }
                else {
                    /* remove book from favoriteBooks array */
                    favoriteBooks.splice(event.target.offsetParent.target, 1);
                    /* remove class favorite from book */
                    event.target.offsetParent.classList.remove('favorite');
                }
                console.log(favoriteBooks);
            }
            console.log(favoriteBooks);
        });
        /* NEW */
        filtersForm.addEventListener('click', function (event) {
            if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
                console.log(event.target.value, event.target.checked);
            }
        });
    }
    function addToFavorite() {
    }
}