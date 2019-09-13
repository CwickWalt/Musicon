const request = require('request');

const client_id = '2aba058a682c4ebbad948c86d89b222a';
const client_secret = '28a24ced4e554a2f9060ffbcf9e293b3';

let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': `Basic ${btoa(client_id)}:${btoa(client_secret)}`
        },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, (err, res, body) => {
    if (!err && res.statusCode === 200) {
        let token = body.access_token;
        let options = {
            url: 'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, (err, res, body) => {
            console.log(body);
        });
    }
});