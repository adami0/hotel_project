'use strict'
const express = require('express')
const app = express()

const userRoutes = require('./user/userRoute')
const roomsRoutes = require('./rooms/roomsRoute')
const reservationRoutes = require('./reservation/reservationRoute')
const clientRoutes = require('./client/clientRoute')
const kpiRoutes = require('./kpi/kpiRoute')

app.use('/user', userRoutes)
app.use('/rooms', roomsRoutes)
app.use('/client', clientRoutes)
app.use('/reservation', reservationRoutes)
app.use('/kpi', kpiRoutes)

app.use('*', (req, res) => {
  res.boom.notFound() // Responds with a 404 status code
})

module.exports = app
