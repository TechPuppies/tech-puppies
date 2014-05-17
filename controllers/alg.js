'use strict';
/**
 * GET /
 * Home page.
 */
exports.getHome = function(req, res) {
    res.render('alg/home');
};

exports.getMission = function(req, res) {
    res.render('alg/'+ req.params.season + '/' + req.params.mission);
};