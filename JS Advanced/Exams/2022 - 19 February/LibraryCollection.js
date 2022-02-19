class LibraryCollection{
    constructor(capacity){
        this.capacity = capacity;
        this.books = [];
    }

    addBook = function(bookName, bookAuthor){
        class Book{
            constructor(name, author){
                this.name = name;
                this.author = author;
                this.paid = false;
            }
            toString(){
                return `${this.name} == ${this.author} - ${this.paid?'Has Paid':'Not Paid'}.`;
            }
        }
        if(this.capacity<1){
            throw new Error('Not enough space in the collection.');
        }
        let book = new Book(bookName, bookAuthor);
        this.books.push(book)
        this.capacity--;
        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook = function(bookName){
        let notFound = true;
        for (const book of this.books) {
            if(book.name == bookName){
                notFound = false;

                if(book.paid){
                    throw new Error(`${bookName} has already been paid.`);
                }
                else{
                    book.paid = true;
                    return `${bookName} has been successfully paid.`;
                }
            }
        }
        if(notFound){
            throw new Error(`${bookName} is not in the collection.`);
        }


    }

    removeBook = function(bookName){
        let notFound = true;
        for (const book of this.books) {
            if(book.name == bookName){
                notFound = false;
                if(!book.paid){
                    throw new Error(`${bookName} need to be paid before removing from the collection.`);
                }
                else{
                    let index = this.books.indexOf(book);
                    this.books.splice(index,1);
                    return `${bookName} remove from the collection.`;
                }
            }
        }
        if(notFound){
            throw new Error("The book, you're looking for, is not found.")
        }
    }

    getStatistics = function(bookAuthor){
        if(!bookAuthor){
            this.books.sort((a,b)=>a.name.localeCompare(b.name));
            return `The book collection has ${this.capacity} empty spots left.\n${this.books.join('\n')}`;
        }
        else{
            for (const book of this.books) {
                if(book.author == bookAuthor){
                    return book.toString();
                }
            }
            throw new Error(`${bookAuthor} is not in the collection.`);
        }
    }
}

