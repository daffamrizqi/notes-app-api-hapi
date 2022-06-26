const handler = require("./handler")

const routes = [
    {
        // test method
        method: "GET",
        path: '/',
        handler: handler.defaultHandler
    },
    {
        // create new note
        method: "POST",
        path: '/notes',
        handler: handler.addNoteHandler
    },
    {
        // get all notes
        method: "GET",
        path: '/notes',
        handler: handler.getAllNotesHandler
    },
    {
        // get note by id
        method: "GET",
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler
    },
    {
        // edit note by id
        method: "PUT",
        path: '/notes/{id}',
        handler: handler.editNoteHandler
    },
    {
        // delete note by id
        method: "DELETE",
        path: '/notes/{id}',
        handler: handler.deleteNoteHandler
    },

]

module.exports = routes