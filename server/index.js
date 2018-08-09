const { router, get, post } = require('microrouter')
const { json, send } = require('micro')
const { pick } = require('lodash')
const generateVehicles = require('./generateVehicles')

const vehicles = generateVehicles(100)

const getVehicle = (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id)

  if (!vehicle) {
    send(res, 404)
    return
  }

  send(res, 200, { vehicle })
}

const getVehicles = async (req, res) => {
  const vehicleSummaries = vehicles.map(v => {
    const leanVehicle = pick(v, [
      'id',
      'make',
      'model',
      'trim',
      'price',
      'images'
    ])
    leanVehicle.images = [leanVehicle.images[0]]
    return leanVehicle
  })
  send(res, 200, { vehicles: vehicleSummaries })
}

const reserveVehicle = async (req, res) => {
  const { vehicleId } = await json(req)

  if (!vehicleId || !vehicles.find(v => v.id === vehicleId)) {
    send(res, 400, { validationError: 'Invalid vehicle id' })
    return
  }

  send(res, 200, { orderPlacedAt: Date.now() })
}

module.exports = router(
  get('/vehicles', getVehicles),
  get('/vehicles/:id', getVehicle),
  post('/reserve', reserveVehicle)
)
