const express = require('express');

//initializing
const booky = express();

booky.use(express.json());
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

booky.listen(3000, () => {
    console.log("Server is running");
}
)