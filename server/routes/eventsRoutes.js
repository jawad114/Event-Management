const express = require('express'); 
const router = express.Router();
const eventController=require('./../controllers/eventController')
const errorHandler = require('./../middelwares/errorHandler');
const multerSetup=require('./../utils/multerSetup')
router.post('/createEvent', multerSetup.upload, eventController.createEvent); 
router.get('/', eventController.getEvents);             
router.get('/:id', eventController.getEvent);     
router.put('/:id', multerSetup.upload, eventController.updateEvent); 
router.delete('/:id', eventController.deleteEvent); 
router.use(errorHandler.errorHandler); 

module.exports = router;