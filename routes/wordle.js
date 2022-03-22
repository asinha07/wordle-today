const express = require('express');
const {getSpreadSheet} = require("../api/helper/gsheet");
const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send('Wordle route is working ');
});

router.get('/sheetTitle', async function (req, res, next) {
    let data = await getSpreadSheet();
    res.send('Wordle route is working ' + data);
});

module.exports = router;