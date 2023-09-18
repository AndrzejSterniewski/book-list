{
    'use strict';

    const templates = {
        templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML),
    };

    class BooksList {
        constructor(data) {
            const thisBook = this;
            thisBook.data = data;
            thisBook.initData();
            thisBook.getElements();
            thisBook.render();
            thisBook.initActions();
            thisBook.filterBooks();
            thisBook.determineRatingBgc();
        }
        initData() {
            this.data = dataSource.books;
        }

        getElements() {
            const thisBook = this;
            thisBook.bookContainer = document.querySelector('.books-list');
            thisBook.filtersForm = document.querySelector('.filters');
            thisBook.favoriteBooks = [];
            thisBook.filters = [];
        }

        render() {
            const thisBook = this;
            /* walk through every element in dataSource.books */
            for (let elem in dataSource.books) {
                console.log('elem.rating', dataSource.books[elem].rating);
                const ratingBgc = thisBook.determineRatingBgc(dataSource.books[elem].rating);
                console.log(ratingBgc);
                const ratingWidth = dataSource.books[elem].rating * 10;
                console.log(ratingWidth);
                /* generate HTML code based on template and each book data */
                //    const generatedHTML = templateBook(dataSource.books[elem]);

                console.log(dataSource.books[elem]);
                /* NEW */
                const bookDataTemplate = {
                    name: dataSource.books[elem].name,
                    price: dataSource.books[elem].price,
                    id: dataSource.books[elem].id,
                    image: dataSource.books[elem].image,
                    ratingWidth: ratingWidth,
                    ratingBgc: ratingBgc,
                    rating: dataSource.books[elem].rating,
                };
                const generatedHTML = templates.templateBook(bookDataTemplate);
                /* generate DOM element based on generated HTML */
                thisBook.element = utils.createDOMFromHTML(generatedHTML);
                /* add generated DOM element as a child element to the .books-list */
                thisBook.bookContainer.appendChild(thisBook.element);
            }

            thisBook.bookContainer.addEventListener('click', function (event) {
                event.preventDefault();
            });
        }
        initActions() {
            const thisBook = this;
            /* prepare reference to list of all elements book__image in booksList list */
            //    const books = bookContainer.querySelectorAll('.book__image');
            thisBook.bookContainer.addEventListener('dblclick', function (event) {
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
                        thisBook.favoriteBooks.push(dataId);
                    }
                    else {
                        /* remove book from favoriteBooks array */
                        thisBook.favoriteBooks.splice(event.target.offsetParent.target, 1);
                        /* remove class favorite from book */
                        event.target.offsetParent.classList.remove('favorite');
                    }
                }
            });
            thisBook.filtersForm.addEventListener('click', function (event) {
                if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
                    (event.target.checked) ? thisBook.filters.push(event.target.value) : thisBook.filters.splice('event.target', 1);
                }
                thisBook.filterBooks();
            });
        }
        filterBooks() {
            const thisBook = this;
            for (let book of dataSource.books) {
                let shouldBeHidden = false;
                let activeBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
                for (const filter of thisBook.filters) {
                    if (!book.details[filter] == true) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                if (shouldBeHidden) {
                    activeBook.classList.add('hidden');
                } else {
                    activeBook.classList.remove('hidden');
                }
            }
        }
        determineRatingBgc(rating) {
            if (rating < 6) {
                return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
                return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
        }

    }
    const app = new BooksList();
}