const { GoogleSpreadsheet } = require('google-spreadsheet');
const moment = require('moment')
const _ = require('lodash')
const {getRequest} = require("../helper/curl");

module.exports = {
    getWordOfTheDay: async function(req) {
        let date;
        if(!_.isEmpty(req.query)) {
            date = req.query.date
        }
        else {
            date = moment().format("YYYY-MM-DD");
        }
        const expectedDate = new Date(date);
        expectedDate.setHours(0,0,0,0);
        const firstDate = new Date("2022-03-22");
        firstDate.setHours(0,0,0,0);
        const timeDiff = expectedDate.getTime()  - firstDate.getTime() ;
        const daysDiff = timeDiff/(1000 * 60 * 60 * 24);
        const docId = process.env.GOOGLE_SHEET_ID
        const doc = new GoogleSpreadsheet(docId);
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const wordList = await sheet.getRows({
            offset: daysDiff,
            limit:1
        });
        let wordOfTheDay = wordList[0].word;
        return ({word: wordOfTheDay});
    },

    getWordOfTheDayDetails: async function(req) {
        const wordOfTheDay = await module.exports.getWordOfTheDay(req)
        const url = process.env.WORD_DETAILS_URL;
        let wordDetails = await getRequest(url+wordOfTheDay.word);
        return ({
            word: wordOfTheDay,
            details: wordDetails
        });
    }

}