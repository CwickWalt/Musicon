const express = require('express');
const router = express.Router();
const pass = require('../secret/client_pass');

authOptions = {
    client_id = pass.client_id,
    response_type = code,
    redirect_uri = 'http://localhost:4200/',
    state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    scope: 'playlist-read-private playlist-modify-private',
}
module.exports = router;