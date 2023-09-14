{
    'use strict';

    /* create reference to .book-list and template*/
    const bookContainer = document.querySelector('.books-list');
    const templateBook = document.querySelector('#template-book');

    /* create function 'render' */
    function render() {
        const thisBook = this;
        /* walk through every element in dataSource.books */
        for (let elem in dataSource.books) {
            /* generate HTML code based on template and each book data */
            const generatedHTML = templateBook;
            /* generate DOM element */
            thisBook.element = utils.createDOMFromHTML(generatedHTML);
            /* add generated DOM element as a child element to the .books-list */
            bookContainer.appendChild(thisBook.element);
        }
    }
    render();
}
// const thisProduct = this;
// /* generate HMTL based on template */
// const generatedHTML = templates.menuProduct(thisProduct.data);
// /* create element using utils.createElementFromHTML */
// thisProduct.element = utils.createDOMFromHTML(generatedHTML);
// /* find menu container */
// const menuContainer = document.querySelector(select.containerOf.menu);
// /* add element to menu */
// menuContainer.appendChild(thisProduct.element);
// }