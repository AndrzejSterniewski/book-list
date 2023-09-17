{
    'use strict';

    /* create reference to .book-list and template*/
    const bookContainer = document.querySelector('.books-list');
    const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const filtersForm = document.querySelector('.filters');
    const favoriteBooks = [];
    const filters = [];

    render();
    initActions();
//    addToFavorite();

    /* create function 'render' */
    function render() {
        const thisBook = this;
        /* walk through every element in dataSource.books */
        for (let elem in dataSource.books) {
         //   console.log(dataSource.books[elem].rating);
            const ratingBgc = determineRatingBgc(dataSource.books[elem].rating);
            const rankingWidth = dataSource.books[elem].rating * 10;
            /* generate HTML code based on template and each book data */
            const generatedHTML = templateBook(dataSource.books[elem]);
           
            // handlebar:
        //    { ratingBgc: ratingBgc, rankingWidth: rankingWidth };

        /* NEW */
        // const generatedHTML = {
        //     templateBook: dataSource.books[elem],
        //     ratingBgc: ratingBgc,
        //     rankingWidth: rankingWidth,
        //   };

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
            }
            console.log(favoriteBooks);
        });
        /* NEW */
        filtersForm.addEventListener('click', function (event) {
            if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
                //         console.log(event.target.value, event.target.checked);
                (event.target.checked) ? filters.push(event.target.value) : filters.splice('event.target', 1);
                //           console.log('filters', filters);
            }
            filterBooks();
        });
    }
    function filterBooks() {
        console.log('filterBooks active');
        for (let book in dataSource.books) {
            let shouldBeHidden = false;
        //    console.log('details,  adult:', dataSource.books[book].details.adults);
            //        console.log(dataSource.books[book].id);
            //           console.log(dataSource.books[book].details.adults == true);
            console.log('filters', filters);
            for (const filter of filters) {
                console.log('book filter: ', dataSource.books[book].details[filter]);
                if (!dataSource.books[book].details[filter] == true) {
                    console.log(dataSource.books[book].details[filter]);
                    shouldBeHidden = true;
                    console.log('id', dataSource.books[book].id);
                    break;
                }
            }
            console.log('shouldBeHidden', shouldBeHidden);
            if(shouldBeHidden) {
            }
        }
    }
    function determineRatingBgc(rating, background) {
        if(rating < 6) {
            background: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if (rating > 6 && rating <= 8){
            background: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        }else if(rating > 8 && rating <= 9){
            background: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        } else if (rating > 9){
            background: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
       return background;
    } 
}