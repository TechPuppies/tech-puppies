'use strict';
/**
 * GET /
 * Home page.
 */
var request = require('request');

exports.index = function(req, res) {
    res.render('home');
};

exports.githubStreak = function(req, res) {
    // console.log('https://github.com/users/' + req.user.profile.name + '/contributions_calendar_data');
    request('https://github.com/users/' + req.user.profile.name + '/contributions_calendar_data', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.send('https://github.com/users/' + req.user.profile.name + '/contributions_calendar_data')
            var json = JSON.parse(body);
            var counts = [];
            for (var i = json.length - 1; i > 0; i--) {
                if (json[i][1] === 0) {
                    break;
                } else {
                    counts.push(json[i]);
                }
            }
            res.render('streak', {
                counts: counts
            });
            // if (count <= 0) {
            //     warnOfImpendingStreakDoom();
            // } else {
            //     console.log(count + " commit(s) today");
            // }
        }
    });
};
