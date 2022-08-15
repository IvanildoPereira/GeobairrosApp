const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
require('dotenv/config');
require('./database')
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/addresses');
const productRoutes = require('./routes/product')
const perfilRoutes = require('./routes/perfil')

// Path Images
app.use('/uploads/', express.static(path.join('uploads')));

// Passing the body to json
app.use(express.json());

// Config cors

app.use(cors());

// Routes
app.use('/users/', userRoutes);
app.use('/address/', addressRoutes);
app.use('/product/', productRoutes);
app.use('/perfil/', perfilRoutes);

// Route doesn't exist
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// General errors
app.use((error, req, res, next) => {
    // Delete files
    if (req.file) {
        fs.unlink(req.file.path, err => {
            if(err){
                const error = new HttpError('Somethinh goes wrong on file system.', 500);
                throw error;
            }
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});
app.listen(process.env.PORT || 8000);

