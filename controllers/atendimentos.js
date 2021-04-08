const atendimento_model = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('GET /atendimentos'))

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    atendimento_model.adiciona(atendimento, res)
  })
}