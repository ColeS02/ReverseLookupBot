const axios = require('axios');
async function processLicensePlate(plate, state) {
    if (plate.size >= 6 && plate.size <= 7) {
        let responseData;
        try {
            const response = await run(plate, state);
            responseData = extractData(response);
        } catch (error) {
            console.error('Error during license plate processing:', error.message);
        }
        try {
            const vinResponse = await runVin(responseData.vin);
            const vinResponseData = extractVinData(vinResponse)
            return {
                success: true,
                message: `Processing License Plate: ${plate}`,
                data: responseData,
            };
            
        } catch (error) {
            console.log('Error during Vin Processing:', error.message)
        }
    } else {
        return {
            success: false,
            message: 'Invalid license plate. Please try again!',
        };
    }
}

async function run(license, state) {

    const encodedParams = new URLSearchParams();
    encodedParams.set('state', state);
    encodedParams.set('plate', license);
    
    const options = {
        method: 'POST',
        url: 'https://vindecoder.p.rapidapi.com/api/v4/decode_plate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'vindecoder.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        return await axios.request(options);
    } catch (error) {
        console.error('Error in API request:', error.message);
        throw error;
    }
}
async function runVin(vin) {
    const options = {
        method: 'GET',
        url: 'https://vindecoder.p.rapidapi.com/v2.0/decode_vin',
        params: {
            vin: vin
        },
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'vindecoder.p.rapidapi.com'
        }
    };

    try {
        return await axios.request(options);
    } catch (error) {
        console.error('Error in API request:', error.message);
        throw error;
    }
}

function extractData(response) {
    return {
        data: response.data,
    };
}

function extractVinData(response) {
    return {
        data: response.specification,
        features: response.features
    };
}

module.exports = { run, processPhoneNumber };