const express = require('express');
const _ = require('lodash')
const { getWordOfTheDay, getWordDetails, getWordOfTheDayDetails} = require("../api/service/wordleService");
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('Wordle route is working ');
});

router.get('/wordoftheday', async function (req, res, next) {
    res.send(await getWordOfTheDay(req));
});

router.get('/wordofthedaydetails', async function (req, res, next) {
    res.send(await getWordOfTheDayDetails(req));
});

module.exports = router;