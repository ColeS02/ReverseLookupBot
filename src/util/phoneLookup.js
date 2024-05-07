require('dotenv').config();
const axios = require('axios');
async function processPhoneNumber(str) {
    const number = str.replace(/\D/g, '');
    
    if (/^\d{10}$/.test(number)) {
        try {
            const response = await run(number);
            const responseData = extractData(response);

            return {
                success: true,
                message: `Processing phone number: ${number}`,
                data: responseData,
            };
        } catch (error) {
            console.error('Error during phone number processing:', error.message);
        }
    } else {
        return {
            success: false,
            message: 'Invalid phone number. Please enter a 10-digit number.',
        };
    }
}

async function run(number) {
    const options = {
        method: 'GET',
        url: 'https://reverse-phone-api.p.rapidapi.com/3.1/phone',
        params: {
            phone: number,
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'reverse-phone-api.p.rapidapi.com',
        },
    };

    try {
        return await axios.request(options);
    } catch (error) {
        console.error('Error in API request:', error.message);
        throw error;
    }
}

function extractData(response) {
    // Extract only the necessary data from the response
    return {
        status: response.status,
        data: response.data,
    };
}

module.exports = { run, processPhoneNumber };