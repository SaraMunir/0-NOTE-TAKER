const express = require('express');
// const members = require('./api/members');
const app = express();
const fs = require('fs');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static folder
app.use(express.static('public'));


// app.get('/api/members', function(req, res){
//     res.json(members);
// });

// var noteList = [];
let savedNoteList = [];
app.post('/api/notes', function(req, res){
    var savedNote = fs.readFileSync('db/db.json', 'utf-8');
    // console.log(req.body);
    var savedNoteList = JSON.parse(savedNote);
    console.log( `saved Note is `, savedNote)
    var newNote = JSON.stringify(req.body);
    console.log( `newNote is ` + newNote)
    savedNoteList.push(req.body);
    console.log(savedNoteList);
    // var newNoteList = savedNote.push(newNote);
    // console.log(newNoteList);
    // const writeJson = fs.writeFileSync('./db/db2.json', savedNoteList);
    // console.log(newList);
    var newNoteList = JSON.stringify(savedNoteList);

    const writeJson = fs.writeFileSync('./db/db.json', newNoteList);
    res.json(savedNoteList);
}
)
// /api/notes
app.get('/api/notes', function(req, res){
    var savedNote = fs.readFileSync('db/db.json', 'utf-8');
    var savedNoteList2 = JSON.parse(savedNote);
    res.json(savedNoteList2)
    console.log(savedNoteList);
});

// "api/notes/"


//-   api/notes/
// let readFileStuff = fs.readFileSync("db/db.json", 'utf-8');
//     readFileStuff = JSON.parse(readFileStuff);
//     readFileStuff = readFileStuff.filter(function(notes) {
//       return notes.id != req.params.id;
//     });
//     res.json(readFileStuff);

app.delete('/api/notes/:id', function(req, res){
    savedNoteList =[];//--original array
    var savedNoteforDelete = fs.readFileSync('db/db.json', 'utf-8');
    savedNoteforDelete = JSON.parse(savedNoteforDelete);
    console.log(savedNoteforDelete);


    let deletedStuff = savedNoteforDelete.filter(function(notes) {
        return notes.id != req.params.id;
    });
    // res.json(savedNoteList);
    deletedStuff = JSON.stringify(deletedStuff);
    const writeJson = fs.writeFileSync('./db/db.json', deletedStuff);
    // res.send(savedNoteList.filter(savedNoteList => savedNoteList.id === (req.params[2].id)));
    res.json(savedNoteList)
    
    // console.log(req.params);
    // res.json(members.filter(member => member.id === Number(req.params.id)));
})

const PORT = process.env.PORT || 8080;

app.listen( PORT, function(req, res){
    console.log( `server started on port ${PORT}`);
})
