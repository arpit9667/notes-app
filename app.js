const chalk  = require('chalk');
const notes = require('./notes.js');
const yargs = require('yargs');


yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder:{
        title: {
            description: "ADD Title",
            demandOption: true,
            type: 'string'
        },
        body: {
            description: "Provide a Body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log("Adding a new note");
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            description: 'Name of the note to delete',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
       notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            description: "Read a note",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log(argv.title);
        notes.readNote(argv.title);
    }

})

yargs.parse();