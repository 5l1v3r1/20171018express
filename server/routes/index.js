//const todosController = require('../controllers').todos;
//const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const noteItemsController = require('../controllers').noteItems;
const dateItemsController = require('../controllers').dateItems;
const appointmentController = require('../controllers').appointment;


module.exports = (app) => {
  app.get('/', (req, res) => res.sendFile(`../view/index.html`));
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the NOTE SYSTEM API!',
  }));
  app.post('/api/users', usersController.create);//create user
  app.post('/api/users/check', usersController.check);//check user pwd
  app.get('/api/users/:userid', usersController.retrieve);//get user info
  app.get('/api/users/search/:category/:price/:location', usersController.search);//get user info

  //if I uncommemnt above it retrieve it wont work...

  app.post('/api/users/:userid', usersController.update);//update user
  app.post('/api/users/pwd/:userid', usersController.updatePwd);//update pwd

  app.post('/api/notes/:userid', noteItemsController.create);//create note
  app.post('/api/notes/:userid/items/:noteid', noteItemsController.update);//update note
  app.get('/api/notes/:userid/items/:noteid', noteItemsController.destroy);//delete note

  app.post('/api/dates/:userid', dateItemsController.create);//create date
  app.post('/api/dates/:userid/items/:dateid', dateItemsController.update);//update date
  app.get('/api/dates/items', dateItemsController.retrieve);//get user info
  app.get('/api/dates/:userid/items/:dateid', dateItemsController.destroy);//delete date



  app.post('/api/appointment', appointmentController.create);//create appointment
  // app.post('/api/appointment/:clientid/items/:clientid', appointmentController.update);//update appointment
  // app.post('/api/appointment/items', appointmentController.retrieve);//post user info
  //
  // app.get('/api/appointment/:clientid', appointmentController.retrieve);//get client info
  // app.get('/api/appointment/:clientid/items/:appointmentid', appointmentController.destroy);//delete appointment
};
