const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const playlistsRoutes = require('./routes/playlists');
const loginRoutes = require('./routes/login');

app.use(express.static)

app.use(cors({origin: 'http://localhost:4200'}));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/login', loginRoutes);
app.use('/api/playlists', playlistsRoutes);

console.log('listening on 3000');
app.listen(3000);