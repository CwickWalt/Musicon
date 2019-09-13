const express = require('express');
const router = express.Router();

const passport = require('passport');
const SpotifyStrategy = require('../../node_modules/passport-spotify').Strategy;
const pass = require('../secret/client_pass');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
    new SpotifyStrategy(
        {
            clientID: pass.client_id,
            clientSecret: pass.client_secret,
            callbackURL: `http://localhost:4200/user/${access_token}`
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            User.findOrCreate({ spotifyId: profileId }, (err, user) => {
                return done(err, user);
            });
        }
    )
);

router.get('/auth/spotify',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private'],
        showDialog: true
    }), 
    (req, res, next) => {

    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
});

router.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    })

module.exports = router;