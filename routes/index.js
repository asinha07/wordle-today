const express = require('express');
const {getWordOfTheDayDetails} = require("../api/service/wordleService");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wordleoftheday',  function(req, res, next) {
    getWordOfTheDayDetails(req).then(function(details) {
        console.log(details.word.word);
        res.render('wordForm',{word:details.word.word, details: details.details})
    }).catch(function (err) {
        console.log(err)
        res.render('index', {title: "error"})
    });
});


module.exports = router;
