const books = [
    {
        ISBN    :"12345book",
        title   :"Tesla!!!",
        pubData :"2023-07-12",
        language:"en",
        numPage :250,
        author  :[1,2],
        publications :[1],
        category :["tech","space","education"]
    }
];
const author = [
    {
        id :1,
        name :"Arun",
        books :["12345book","sceret book"]
    },
    {
        id :2,
        name :"kumar",
        books :["12345book"]
    }
];
const publications =[
    {
        id :1,
        name :"buddy",
        books:["12345book"]
    }
];
module.exports = {books,author,publications};