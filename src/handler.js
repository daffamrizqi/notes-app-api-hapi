const { v4: uuidv4 } = require('uuid');
const notes = require('./notes')


const defaultHandler = () => {
    return "Welcome to my API folks!"
}


const getAllNotesHandler = (req, h) => {
    if (notes.length < 1) {
        const response = h.response({
            message: "You haven't add any notes!",
            data: {
                notes
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "Success",
        message: "Success fethcing all notes!",
        data: {
            notes
        }
    })
    response.code(200)
    return response
}


const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload
    const id = uuidv4() // generate unique id
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = { id, title, tags, body, createdAt, updatedAt }

    notes.push(newNote)

    const isSuccess = notes.filter(note => note.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: "New note successfully added to database!",
            data: {
                noteId: id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: "Failed",
        message: "Failed to add new note!"
    })
    response.code(500)
    return response
}

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params

    const note = notes.filter(note => note.id === id)[0]

    if (note !== undefined) {
        return {
            status: "success",
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: "Failed",
        message: `Note with id ${id} does not exist!`
    })
    response.code(404)
    return response
}

const editNoteHandler = (req, h) => {
    const { id } = req.params
    const { title, tags, body } = req.payload
    const updatedAt = new Date().toISOString()

    // finding index to update
    const index = notes.findIndex(note => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: "success",
            message: `Note has been updated!`,
            data: {
                note: notes[index]
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "failed",
        message: "Id not found!"
    })
    response.code(404)
    return response
}

const deleteNoteHandler = (req, h) => {
    const { id } = req.params

    // finding index to delete
    const index = notes.findIndex(note => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
            status: "success",
            message: "A note has been deleted!",
            data: {
                noteId: id
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: "failed",
        message: "Id not found!"
    })
    response.code(404)
    return response
}


module.exports = {
    addNoteHandler,
    defaultHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteHandler,
    deleteNoteHandler
}