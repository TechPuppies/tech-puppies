#!/usr/bin/env node

'use strict';
var Mailgun = require('mailgun').Mailgun;
var User = require('../models/User');
var secrets = require('../config/secrets');
var mongoose = require('mongoose');
var request = require('request');

function remind(recipients) {
    var mg = new Mailgun('key-3aniznv36j1avkoat06-80phy8pgow77');
    mg.sendText('techpuppies@wenguer.com', recipients,
        '[TechPuppies-Github Streak Reminder] Don\'t break the streak.',
        'Your GitHub streak is about to break. Go and make a commit quick!',
        function(err) {
            if (err) console.log('Oh noes: ' + err);
            else console.log('Success');
            return 1;
        });
}

function checkFor(user) {
    request('https://github.com/users/' + user.profile.name + '/contributions_calendar_data', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (json[json.length - 1][1] === 0) {
                console.log('remind ' + user.profile.name);
                remind([user.email]);
            }
        }
        return 1;
    });
}

console.log('reminds start');
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

User.find({}, function(err, users) {
    users.forEach(function(user) {
        checkFor(user);
    });
    mongoose.disconnect()
    return 1;
});
