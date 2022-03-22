const { GoogleSpreadsheet } = require('google-spreadsheet');
const docId = process.env.GOOGLE_SHEET_ID
const doc = new GoogleSpreadsheet(docId);


module.exports = {
    getSpreadSheet: async function(){
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        });

        await doc.loadInfo();
        console.log(doc.title);
        return doc.title;
    }
}
