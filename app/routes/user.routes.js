module.exports = (app)=>{
    const users = require('../controller/userController.js');

    app.post('/users',users.create);
    app.get('/users',users.getAll);
    app.get('/users/:userId', users.getById);
 
    // Update a Book with bookId
    app.put('/users/:userId', users.update);
 
    // Delete a Book with bookId
    app.delete('/users/:userId', users.delete);
}

