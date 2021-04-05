var express = require('express');
var router = express.Router();
var slugGenerator = require('random-word-slugs');


/* GET home page. */
router.get('/create', function(req, res, next) {
    const slug = slugGenerator.generateSlug();
    res.status(200).json(slug);
});

module.exports = router;
