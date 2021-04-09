const pets_model = require('../models/pets')

module.exports = app => {
  app.post('/pets', (req, res) => {
    const pet = req.body

    pets_model.adiciona(pet, res)
  })
}