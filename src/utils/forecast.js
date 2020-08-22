const request = require('request')

const forecast = (coordinates, access_key, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${coordinates}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect weather service.')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const currentWeatherObj = body.current
            callback(undefined, `It is ${currentWeatherObj.temperature} degree outside, it feels like ${currentWeatherObj.feelslike} degree. It is currently ${currentWeatherObj.weather_descriptions[0]}`)
        }
    })
}

module.exports = {
    forecast
}