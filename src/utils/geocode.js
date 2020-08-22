const request = require('request')

const getGeocode = (location, access_token, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${access_token}&limit=1`
    const uri = encodeURI(url)

    request({ url: uri, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect with the service.')
        } else if (body.features.length === 0) {
            callback('Unable to find the location')
        } else {
            const coordinates = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined, coordinates)
        }
    })
}

module.exports = {
    getGeocode
}