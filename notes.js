const fs = require('fs');
const chalk  = require('chalk');

const addNote = function(title, body){
    const notes = loadNotes();
    // const duplicateNotes = notes.filter(note => note.title === title);
    const duplicateNotes = notes.find(note => note.title === title);

    debugger

    if(duplicateNotes !== undefined){
        console.log('Note is already available');       
    }
    else{
        notes.push({
            title: title,
            body: body
        })
        console.log("New Note Added!!")
        saveNotes(notes);
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {
    try{
        const dataJSON = fs.readFileSync('notes.json').toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const NotesToKeep = notes.filter((note) =>{
        return note.title !== title;
    });  
    // console.log(title);
    if(NotesToKeep.length === notes.length) {
        console.log(chalk.red.inverse('NO note removed!!'));
    }
    else{
        console.log(chalk.green.inverse('Notes Removed!!'));

    }
    saveNotes(NotesToKeep);
}

const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.green.inverse('YOUR NOTES:'));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) =>{
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note !== undefined){
        console.log(chalk.inverse(note.title));
        console.log(note.body);     
    }
    else{
        console.log(chalk.red.inverse('No note found!!'));
    }
}

const notes = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};

module.exports = notes;