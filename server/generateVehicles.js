const faker = require('faker')
faker.seed(123)

function generateVehicles(count) {
  const vehicles = []

  for (let i = 1; i <= count; i++) {
    vehicles.push({
      id: faker.random.uuid(),
      make: faker.company.companyName(),
      model: faker.commerce.productName(),
      trim: faker.company.bsAdjective(),
      year: faker.date.year,
      description: faker.random.words(30),
      price: faker.commerce.price(),
      images: [
        {
          low: 'https://loremflickr.com/320/240/car',
          high: 'https://loremflickr.com/1024/768/car'
        },
        {
          low: 'https://loremflickr.com/320/240/car',
          high: 'https://loremflickr.com/1024/768/car'
        },
        {
          low: 'https://loremflickr.com/320/240/car',
          high: 'https://loremflickr.com/1024/768/car'
        },
        {
          low: 'https://loremflickr.com/320/240/car',
          high: 'https://loremflickr.com/1024/768/car'
        },
        {
          low: 'https://loremflickr.com/320/240/car',
          high: 'https://loremflickr.com/1024/768/car'
        }
      ]
    })
  }

  return vehicles
}

module.exports = generateVehicles
