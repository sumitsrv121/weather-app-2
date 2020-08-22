const path = require('path')
const express = require('express')
const hbs = require('hbs')

const { forecast } = require('./utils/forecast')
const { getGeocode } = require('./utils/geocode')

const app = express()

//tokens
const access_token = 'pk.eyJ1Ijoic3VtaXRzcnYiLCJhIjoiY2s4bzYxaTgyMHZmYjNtbzJxYjkwYjloeiJ9.1N5Pcdhmov-rp3VPsLBXRQ'
const access_key = 'd595ad99b566924efd4a8faad1920418'

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const paritalsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(paritalsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Sumit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sumit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please call 001 to get support.',
        title: 'Help',
        name: 'Sumit'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        })
    }
    getGeocode(req.query.address, access_token, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        const coordinates = `${latitude},${longitude}`
        forecast(coordinates, access_key, (error, report) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: report,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Sumit',
        error: 'Help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Sumit',
        error: 'Page not Found'
    })
})


app.listen(3000, () => {
    console.log('server running on port', 3000)
})