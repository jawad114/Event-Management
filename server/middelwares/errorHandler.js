const mongoose = require('mongoose');
const multer = require('multer');
exports.errorHandler = (err, req, res, next) => {
    console.error(err);
    
    if (err instanceof mongoose.Error.ValidationError) { return res.status(400).json({ message: 'Validation Error', errors: err.errors }); }
    
    if (err instanceof multer.MulterError) {return res.status(400).json({ message: err.message });}
  
    if (err.message === 'Error: Images Only!') {return res.status(400).json({ message: 'Images Only!' });}
  
    res.status(500).json({ message: 'Server Error', error: err.message });
  };
