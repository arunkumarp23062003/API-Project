const express = require('express');
var bodyParser = require('body-parser');
//initializing
const booky = express();

booky.use(express.json());
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
const database = require("./database");

/*
Route   :/
descriptions :get all the book
access : public
parameters : none
methods : get
*/

booky.get("/" , (req,res) => {
    return res.json({books :database.books});
})

/*
Route   :/is
descriptions :get all the book based on isbn
access : public
parameters : isbn
methods : get
*/

booky.get("/is/:isbn", (req,res) => {
    const getSpecifiedBook = database.books.filter( (book) => book.ISBN === req.params.isbn);
    if(getSpecifiedBook.length == 0) {
        return res.json({error:`The requested book with id ${req.params.isbn} not found`});
    }
    return res.json({books:getSpecifiedBook});
});

/*
Route   :/is
descriptions :get all the book based on category
access : public
parameters : category
methods : get
*/

booky.get("/c/:category",(req,res) => {
    const getSpecifiedBook = database.books.filter ( 
        (book) => book.category.includes(req.params.category));
    if(getSpecifiedBook.length == 0) {
        return res.json({error:`The requested book with category ${req.params.category} not found`});
    }
    return res.json({books:getSpecifiedBook});

})

/*
Route   :/l
descriptions :get all the book based on language
access : public
parameters : language
methods : get
*/
booky.get("/l/:language",(req,res) => {
    const getSpecifiedBook = database.books.filter ( 
        (book) => book.language.includes(req.params.language));
    if(getSpecifiedBook.length == 0) {
        return res.json({error:`The requested book with language ${req.params.language} not found`});
    }
    return res.json({books:getSpecifiedBook});

})

/*
Route   :/author
descriptions :get all the book based on author
access : public
parameters : none
methods : get
*/

booky.get('/author',(req,res)=>{
    return res.json({author:database.author});
})


/*
Route   :/author
descriptions :get all the author based on name
access : public
parameters : name
methods : get
*/

booky.get('/author/:name',(req,res)=>{
    const getSpecifiedBook = database.author.filter((author) => author.name.includes(req.params.name));
    if(getSpecifiedBook.length == 0) {
        return res.json({error:`The requested book with name ${req.params.name} not found`});
    }
    return res.json({books:getSpecifiedBook});
    
})


/*
Route   :/author/book/:isbn
descriptions :get all the book based on author
access : public
parameters : isbn
methods : get
*/

booky.get('/author/book/:isbn',(req,res)=> {
    const getSpecifiedBook = database.author.filter((author) => author.books.includes(req.params.isbn));
    if(getSpecifiedBook.length == 0) {
        return res.json({ error:`The requested book with language ${req.params.isbn} not found` })
    }
    return res.json({author:getSpecifiedBook})
})

/*
Route   :/publications
descriptions :get all the publications
access : public
parameters : none
methods : get
*/

booky.get('/publications',(req,res)=>{
    return res.json({publications:database.publications});
    
})

/*
Route   :/publications/:isbn
descriptions :get all the publications based on 
access : public
parameters : isbn
methods : get
*/

booky.get('/publications/:isbn',(req,res)=>{
    const getSpecifiedBook = database.publications.filter((publications) => publications.books.includes(req.params.isbn));
    if(getSpecifiedBook.length == 0) {
        return res.json({ error:`The requested book with publications ${req.params.isbn} not found` })
    }
    return res.json({publications:getSpecifiedBook})
})

//post method
/*
Route   :/book/new
descriptions :post the new book 
access : public
parameters : none
methods : post
*/

booky.post('/book/new',(req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
})
/*
Route   :/author/new
descriptions :post the new author
access : public
parameters : none
methods : post
*/

booky.post('/author/new',(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({author: database.author});
})

/*
Route   :/publications/new
descriptions :post the new author
access : public
parameters : none
methods : post
*/

booky.post('/publications/new',(req,res) => {
    const newPublications = req.body;
    const authorize = database.publications.filter(pub => JSON.stringify(pub) === JSON.stringify(newPublications));
    if(authorize.length > 0) {
        return res.json({publications: database.publications});
    }
    database.publications.push(newPublications);
    return res.json({publications: database.publications});
})

//put method
/*
Route   :/publications/book/update
descriptions :update the new isbn 
access : public
parameters : isbn
methods : put
*/ 

booky.put('/publications/update/book/:isbn',(req, res) => {
    database.publications.forEach((pub) => {
        if(pub.id === req.body.pubID) {
            return pub.books.push(req.params.isbn);
        }
    })
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubID;
        }
    });
    return res.json({
        books:database.books,
        publications:database.publications,
        message :"Successfully updated publication"
    });
});

//delete method
/*
Route   :/delete/book
descriptions :delete the book based on the isbn 
access : public
parameters : isbn
methods : delete
*/ 

booky.delete("/delete/book/:isbn",(req,res) => {
    const updatedDatabase = database.books.filter(book => book.ISBN !== req.params.isbn);
    database.books = updatedDatabase;
    return res.json({books:database.books});
});

/*
Route   :/delete/book
descriptions :delete the book based on the isbn 
access : public
parameters : isbn
methods : delete
*/ 
booky.delete('/book/delete/author/:isbn/:authorId',(req,res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const updatedbooks = book.author.filter((auth) => auth !== parseInt(req.params.authorId));
            book.author = updatedbooks;
            return;
        }
    });
    database.author.forEach((auth) => {
        if(auth.id === parseInt(req.params.authorId)) {
            const updatedAuthor = auth.books.filter((author) => author !== req.params.isbn);
            auth.books = updatedAuthor;

        }
    });
    return res.json({
        books:database.books,
        author:database.author,
        message:"Successfully completed"
    });
});

booky.listen(3000, () => {
    console.log("Server is running");
}
)