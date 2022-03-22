const axios = require('axios')

module.exports = {
    getRequest : async function(url) {
        const response = await axios.get(url);
        if(response.status === 200) {
            return response.data
        }
        else {
            console.log("Unable to fetch data for the given word")
            return [];
        }
    }
}